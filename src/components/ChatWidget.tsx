import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Loader2, MessagesSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { useLanguage } from '@/contexts/LanguageContext';
import { t3 } from '@/lib/t3';

interface ChatContact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
}

interface ChatMessage {
  id: string;
  contact_id: string;
  sender: 'user' | 'admin';
  message: string;
  created_at: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<'form' | 'chat'>('form');
  const [contact, setContact] = useState<ChatContact | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({ firstName: '', lastName: '', email: '', phone: '' });
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const presenceChannelRef = useRef<ReturnType<typeof supabase.channel> | null>(null);
  const { toast } = useToast();
  const { language } = useLanguage();
  const l = language;

  const getSecretToken = () => localStorage.getItem('chat_secret_token') || '';

  useEffect(() => {
    const savedContactId = localStorage.getItem('chat_contact_id');
    const savedToken = localStorage.getItem('chat_secret_token');
    if (savedContactId && savedToken) { loadContact(savedContactId, savedToken); }
  }, []);

  useEffect(() => {
    if (!contact?.id || !isOpen) { if (presenceChannelRef.current) { presenceChannelRef.current.untrack(); } return; }
    if (!presenceChannelRef.current) {
      presenceChannelRef.current = supabase.channel('chat-presence', { config: { presence: { key: contact.id } } });
      presenceChannelRef.current.subscribe(async (status) => {
        if (status === 'SUBSCRIBED') { await presenceChannelRef.current?.track({ contact_id: contact.id, first_name: contact.first_name, last_name: contact.last_name, online_at: new Date().toISOString() }); }
      });
    } else {
      presenceChannelRef.current.track({ contact_id: contact.id, first_name: contact.first_name, last_name: contact.last_name, online_at: new Date().toISOString() });
    }
    return () => { presenceChannelRef.current?.untrack(); };
  }, [contact?.id, isOpen]);

  useEffect(() => { return () => { if (presenceChannelRef.current) { supabase.removeChannel(presenceChannelRef.current); presenceChannelRef.current = null; } }; }, []);

  useEffect(() => {
    if (!contact?.id) return;
    const handleVisibilityChange = () => {
      if (document.visibilityState === 'hidden') { presenceChannelRef.current?.untrack(); }
      else if (document.visibilityState === 'visible' && isOpen) { presenceChannelRef.current?.track({ contact_id: contact.id, first_name: contact.first_name, last_name: contact.last_name, online_at: new Date().toISOString() }); }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => { document.removeEventListener('visibilitychange', handleVisibilityChange); };
  }, [contact?.id, isOpen]);

  useEffect(() => {
    if (!contact?.id) return;
    const channel = supabase.channel(`chat-${contact.id}`).on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'chat_messages', filter: `contact_id=eq.${contact.id}` }, (payload) => {
      const newMsg = payload.new as ChatMessage;
      setMessages(prev => { if (prev.some(m => m.id === newMsg.id)) return prev; return [...prev, newMsg]; });
    }).subscribe();
    return () => { supabase.removeChannel(channel); };
  }, [contact?.id]);

  useEffect(() => { messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [messages]);

  const loadContact = async (contactId: string, secretToken: string) => {
    try {
      const { data: result, error } = await supabase.functions.invoke('get-chat-data', { body: { contactId, secretToken, type: 'contact' } });
      if (result?.data && !error) { setContact(result.data); setStep('chat'); loadMessages(contactId, secretToken); }
      else { localStorage.removeItem('chat_contact_id'); localStorage.removeItem('chat_secret_token'); }
    } catch { localStorage.removeItem('chat_contact_id'); localStorage.removeItem('chat_secret_token'); }
  };

  const loadMessages = async (contactId: string, secretToken: string) => {
    try { const { data: result } = await supabase.functions.invoke('get-chat-data', { body: { contactId, secretToken, type: 'messages' } }); if (result?.data) { setMessages(result.data as ChatMessage[]); } } catch {}
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data: result, error } = await supabase.functions.invoke('get-chat-data', { body: { type: 'create-contact', firstName: formData.firstName, lastName: formData.lastName, email: formData.email, phone: formData.phone } });
      if (error || !result?.data) { throw new Error(result?.error || 'Failed to create contact'); }
      localStorage.setItem('chat_contact_id', result.data.id);
      localStorage.setItem('chat_secret_token', result.secretToken);
      setContact(result.data);
      setStep('chat');
      const welcomeMessage = t3(l, `Bonjour ${formData.firstName} ! Merci de nous contacter. Comment pouvons-nous vous aider ?`, `Hello ${formData.firstName}! Thank you for contacting us. How can we help you?`, `¡Hola ${formData.firstName}! Gracias por contactarnos. ¿Cómo podemos ayudarle?`);
      await supabase.functions.invoke('get-chat-data', { body: { type: 'send-welcome', contactId: result.data.id, secretToken: result.secretToken, message: welcomeMessage } });
      loadMessages(result.data.id, result.secretToken);
    } catch (error: any) {
      toast({ title: t3(l, "Erreur", "Error", "Error") as string, description: t3(l, "Une erreur est survenue. Veuillez réessayer.", "Something went wrong. Please try again.", "Algo salió mal. Por favor, inténtelo de nuevo.") as string, variant: "destructive" });
    } finally { setIsLoading(false); }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !contact) return;
    const messageText = newMessage.trim();
    setNewMessage('');
    setIsLoading(true);
    try {
      await supabase.functions.invoke('get-chat-data', { body: { type: 'send-message', contactId: contact.id, secretToken: getSecretToken(), message: messageText } });
      const notifBody = { firstName: contact.first_name, lastName: contact.last_name, email: contact.email, phone: contact.phone, message: messageText, contactId: contact.id };
      await Promise.allSettled([supabase.functions.invoke('send-chat-notification', { body: notifBody }), supabase.functions.invoke('send-slack-notification', { body: notifBody })]);
    } catch (error: any) { console.error('Error sending message:', error); } finally { setIsLoading(false); }
  };

  return (
    <>
      <button onClick={() => setIsOpen(true)} className={`fixed bottom-6 right-6 z-50 rounded-full bg-primary text-primary-foreground shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-2 ${isOpen ? 'scale-0' : 'scale-100'} px-5 h-14`}>
        <MessagesSquare className="w-5 h-5" />
        <span className="text-sm font-semibold whitespace-nowrap">{t3(l, 'Parlons-en !', 'Need help?', '¡Hablemos!')}</span>
      </button>

      <div className={`fixed bottom-6 right-6 z-50 w-[360px] max-w-[calc(100vw-48px)] bg-background rounded-2xl shadow-2xl border border-border overflow-hidden transition-all duration-300 ${isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}`} style={{ height: step === 'form' ? 'auto' : '500px' }}>
        <div className="bg-primary text-primary-foreground p-4 flex items-center justify-between">
          <div>
            <h3 className="font-semibold">Tolia Chat</h3>
            <p className="text-sm text-primary-foreground/70">{step === 'form' ? t3(l, 'Démarrer une conversation', 'Start a conversation', 'Iniciar una conversación') : t3(l, 'En ligne', 'Online', 'En línea')}</p>
          </div>
          <button onClick={() => setIsOpen(false)} className="w-8 h-8 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors"><X className="w-4 h-4" /></button>
        </div>

        {step === 'form' ? (
          <form onSubmit={handleFormSubmit} className="p-4 space-y-4">
            <p className="text-sm text-muted-foreground">{t3(l, 'Veuillez renseigner vos coordonnées pour démarrer la conversation.', 'Please enter your details to start the conversation.', 'Ingrese sus datos para iniciar la conversación.')}</p>
            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label htmlFor="chat-firstName" className="text-xs">{t3(l, 'Prénom', 'First name', 'Nombre')} *</Label>
                <Input id="chat-firstName" value={formData.firstName} onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))} required maxLength={100} className="h-9" />
              </div>
              <div className="space-y-1">
                <Label htmlFor="chat-lastName" className="text-xs">{t3(l, 'Nom', 'Last name', 'Apellido')} *</Label>
                <Input id="chat-lastName" value={formData.lastName} onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))} required maxLength={100} className="h-9" />
              </div>
            </div>
            <div className="space-y-1">
              <Label htmlFor="chat-email" className="text-xs">Email *</Label>
              <Input id="chat-email" type="email" value={formData.email} onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))} required maxLength={320} className="h-9" />
            </div>
            <div className="space-y-1">
              <Label htmlFor="chat-phone" className="text-xs">{t3(l, 'Téléphone', 'Phone', 'Teléfono')} *</Label>
              <Input id="chat-phone" type="tel" value={formData.phone} onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))} required maxLength={50} className="h-9" />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (<><Loader2 className="w-4 h-4 mr-2 animate-spin" />{t3(l, 'Démarrage...', 'Starting...', 'Iniciando...')}</>) : t3(l, 'Démarrer la conversation', 'Start conversation', 'Iniciar conversación')}
            </Button>
          </form>
        ) : (
          <div className="flex flex-col h-[calc(500px-72px)]">
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] px-4 py-2 rounded-2xl ${msg.sender === 'user' ? 'bg-primary text-primary-foreground rounded-br-sm' : 'bg-secondary text-foreground rounded-bl-sm'}`}>
                    <p className="text-sm">{msg.message}</p>
                    <p className={`text-xs mt-1 ${msg.sender === 'user' ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>
                      {new Date(msg.created_at).toLocaleTimeString(t3(l, 'fr-FR', 'en-GB', 'es-ES') as string, { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>
            <form onSubmit={handleSendMessage} className="p-4 border-t border-border flex gap-2">
              <Input value={newMessage} onChange={(e) => setNewMessage(e.target.value)} placeholder={t3(l, "Écrivez votre message...", "Write your message...", "Escriba su mensaje...") as string} className="flex-1" disabled={isLoading} maxLength={5000} />
              <Button type="submit" size="icon" disabled={isLoading || !newMessage.trim()}>
                {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
              </Button>
            </form>
          </div>
        )}
      </div>
    </>
  );
};

export default ChatWidget;
