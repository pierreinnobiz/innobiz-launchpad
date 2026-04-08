import { useState, useEffect, useRef, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { LogOut, Send, MessageCircle, User, Clock, Loader2, Bell, BellOff } from 'lucide-react';

interface Contact {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  created_at: string;
}

interface Message {
  id: string;
  contact_id: string;
  message: string;
  sender: string;
  is_read: boolean;
  created_at: string;
}

interface PresenceState {
  contact_id: string;
  first_name: string;
  last_name: string;
  online_at: string;
}

const Admin = () => {
  const { user, isAdmin, loading, signOut } = useAuth();
  const navigate = useNavigate();
  
  const [contacts, setContacts] = useState<Contact[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [sendingMessage, setSendingMessage] = useState(false);
  const [unreadCounts, setUnreadCounts] = useState<Record<string, number>>({});
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [notificationPermission, setNotificationPermission] = useState<NotificationPermission>('default');
  const [onlineContacts, setOnlineContacts] = useState<Set<string>>(new Set());
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const contactsRef = useRef<Contact[]>([]);

  // Keep contacts ref updated
  useEffect(() => {
    contactsRef.current = contacts;
  }, [contacts]);

  // Subscribe to presence channel
  useEffect(() => {
    if (!isAdmin) return;

    const presenceChannel = supabase.channel('chat-presence');

    presenceChannel
      .on('presence', { event: 'sync' }, () => {
        const state = presenceChannel.presenceState();
        const onlineIds = new Set<string>();
        
        Object.values(state).forEach((presences: any) => {
          presences.forEach((presence: PresenceState) => {
            if (presence.contact_id) {
              onlineIds.add(presence.contact_id);
            }
          });
        });
        
        setOnlineContacts(onlineIds);
      })
      .on('presence', { event: 'join' }, ({ newPresences }) => {
        newPresences.forEach((presence: any) => {
          if (presence.contact_id) {
            setOnlineContacts(prev => new Set([...prev, presence.contact_id]));
            
            // Show notification for online status
            const contactName = `${presence.first_name || ''} ${presence.last_name || ''}`.trim();
            if (contactName) {
              toast.info(`${contactName} est en ligne`, {
                duration: 3000,
              });
            }
          }
        });
      })
      .on('presence', { event: 'leave' }, ({ leftPresences }) => {
        leftPresences.forEach((presence: any) => {
          if (presence.contact_id) {
            setOnlineContacts(prev => {
              const newSet = new Set(prev);
              newSet.delete(presence.contact_id);
              return newSet;
            });
          }
        });
      })
      .subscribe();

    return () => {
      supabase.removeChannel(presenceChannel);
    };
  }, [isAdmin]);

  // Check notification permission on mount
  useEffect(() => {
    if ('Notification' in window) {
      setNotificationPermission(Notification.permission);
      setNotificationsEnabled(Notification.permission === 'granted');
    }
  }, []);

  // Request notification permission
  const requestNotificationPermission = async () => {
    if (!('Notification' in window)) {
      toast.error('Les notifications ne sont pas supportées par votre navigateur');
      return;
    }

    try {
      const permission = await Notification.requestPermission();
      setNotificationPermission(permission);
      setNotificationsEnabled(permission === 'granted');
      
      if (permission === 'granted') {
        toast.success('Notifications activées');
      } else if (permission === 'denied') {
        toast.error('Notifications bloquées. Vérifiez les paramètres de votre navigateur.');
      }
    } catch (err) {
      console.error('Error requesting notification permission:', err);
    }
  };

  // Show browser notification
  const showNotification = useCallback((title: string, body: string, contactId: string) => {
    if (!notificationsEnabled || Notification.permission !== 'granted') return;

    const notification = new Notification(title, {
      body,
      icon: '/favicon.ico',
      tag: contactId, // Prevents duplicate notifications for same contact
      requireInteraction: true,
    });

    notification.onclick = () => {
      window.focus();
      const contact = contactsRef.current.find(c => c.id === contactId);
      if (contact) {
        setSelectedContact(contact);
      }
      notification.close();
    };

    // Auto-close after 10 seconds
    setTimeout(() => notification.close(), 10000);
  }, [notificationsEnabled]);

  // Subscribe to ALL new messages for notifications
  useEffect(() => {
    if (!isAdmin) return;

    const channel = supabase
      .channel('all-messages-notifications')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
        },
        (payload) => {
          const newMsg = payload.new as Message;
          
          // Only notify for user messages (not admin's own messages)
          if (newMsg.sender === 'user') {
            // Find the contact
            const contact = contactsRef.current.find(c => c.id === newMsg.contact_id);
            const contactName = contact 
              ? `${contact.first_name} ${contact.last_name}` 
              : 'Nouveau visiteur';

            // Show browser notification
            showNotification(
              `Nouveau message de ${contactName}`,
              newMsg.message.substring(0, 100),
              newMsg.contact_id
            );

            // Also show toast in-app
            toast.info(`Nouveau message de ${contactName}`, {
              description: newMsg.message.substring(0, 50) + (newMsg.message.length > 50 ? '...' : ''),
              action: {
                label: 'Voir',
                onClick: () => {
                  if (contact) setSelectedContact(contact);
                },
              },
            });

            // Update unread counts
            setUnreadCounts(prev => ({
              ...prev,
              [newMsg.contact_id]: (prev[newMsg.contact_id] || 0) + 1,
            }));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAdmin, showNotification]);

  // Subscribe to new contacts
  useEffect(() => {
    if (!isAdmin) return;

    const channel = supabase
      .channel('new-contacts')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_contacts',
        },
        (payload) => {
          const newContact = payload.new as Contact;
          setContacts(prev => [newContact, ...prev]);
          
          // Notify about new contact
          showNotification(
            'Nouveau contact',
            `${newContact.first_name} ${newContact.last_name} a démarré une conversation`,
            newContact.id
          );
          
          toast.info('Nouveau contact', {
            description: `${newContact.first_name} ${newContact.last_name}`,
          });
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [isAdmin, showNotification]);

  // Redirect if not authenticated or not admin
  useEffect(() => {
    if (!loading && (!user || !isAdmin)) {
      if (!user) {
        navigate('/auth');
      } else if (!isAdmin) {
        toast.error("Vous n'avez pas les droits d'accès admin");
        navigate('/');
      }
    }
  }, [user, isAdmin, loading, navigate]);

  // Fetch contacts
  useEffect(() => {
    const fetchContacts = async () => {
      const { data, error } = await supabase
        .from('chat_contacts')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Error fetching contacts:', error);
        return;
      }
      setContacts(data || []);
    };

    if (isAdmin) {
      fetchContacts();
    }
  }, [isAdmin]);

  // Fetch unread counts
  useEffect(() => {
    const fetchUnreadCounts = async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('contact_id, is_read')
        .eq('sender', 'user')
        .eq('is_read', false);
      
      if (error) {
        console.error('Error fetching unread counts:', error);
        return;
      }

      const counts: Record<string, number> = {};
      data?.forEach((msg) => {
        counts[msg.contact_id] = (counts[msg.contact_id] || 0) + 1;
      });
      setUnreadCounts(counts);
    };

    if (isAdmin) {
      fetchUnreadCounts();
    }
  }, [isAdmin, messages]);

  // Fetch messages for selected contact
  useEffect(() => {
    if (!selectedContact) return;

    const fetchMessages = async () => {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('contact_id', selectedContact.id)
        .order('created_at', { ascending: true });
      
      if (error) {
        console.error('Error fetching messages:', error);
        return;
      }
      setMessages(data || []);

      // Mark messages as read
      await supabase
        .from('chat_messages')
        .update({ is_read: true })
        .eq('contact_id', selectedContact.id)
        .eq('sender', 'user')
        .eq('is_read', false);
    };

    fetchMessages();

    // Subscribe to new messages
    const channel = supabase
      .channel(`messages-${selectedContact.id}`)
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages',
          filter: `contact_id=eq.${selectedContact.id}`,
        },
        (payload) => {
          setMessages((prev) => [...prev, payload.new as Message]);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedContact]);

  // Scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!newMessage.trim() || !selectedContact) return;
    
    setSendingMessage(true);
    
    const { error } = await supabase.from('chat_messages').insert({
      contact_id: selectedContact.id,
      message: newMessage.trim(),
      sender: 'admin',
      is_read: true,
    });

    if (error) {
      console.error('Error sending message:', error);
      toast.error("Erreur lors de l'envoi du message");
    } else {
      setNewMessage('');
    }
    
    setSendingMessage(false);
  };

  const handleLogout = async () => {
    await signOut();
    navigate('/');
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-card border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <MessageCircle className="h-6 w-6 text-primary" />
          <h1 className="text-xl font-semibold">Administration Chat</h1>
        </div>
        <div className="flex items-center gap-4">
          {/* Notification toggle */}
          <Button
            variant={notificationsEnabled ? "default" : "outline"}
            size="sm"
            onClick={requestNotificationPermission}
            className="gap-2"
          >
            {notificationsEnabled ? (
              <>
                <Bell className="h-4 w-4" />
                Notifications ON
              </>
            ) : (
              <>
                <BellOff className="h-4 w-4" />
                Activer les notifications
              </>
            )}
          </Button>
          <span className="text-sm text-muted-foreground">{user?.email}</span>
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="h-4 w-4 mr-2" />
            Déconnexion
          </Button>
        </div>
      </header>

      <div className="flex h-[calc(100vh-73px)]">
        {/* Contacts sidebar */}
        <div className="w-80 border-r bg-card">
          <div className="p-4 border-b">
            <h2 className="font-medium text-sm text-muted-foreground uppercase tracking-wider">
              Conversations ({contacts.length})
            </h2>
          </div>
          <ScrollArea className="h-[calc(100%-57px)]">
            {contacts.length === 0 ? (
              <div className="p-6 text-center text-muted-foreground">
                Aucune conversation
              </div>
            ) : (
              contacts.map((contact) => (
                <button
                  key={contact.id}
                  onClick={() => setSelectedContact(contact)}
                  className={`w-full p-4 text-left border-b transition-colors hover:bg-muted/50 ${
                    selectedContact?.id === contact.id ? 'bg-muted' : ''
                  }`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="h-5 w-5 text-primary" />
                        </div>
                        {/* Online indicator */}
                        <span 
                          className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${
                            onlineContacts.has(contact.id) 
                              ? 'bg-green-500' 
                              : 'bg-muted-foreground/30'
                          }`}
                          title={onlineContacts.has(contact.id) ? 'En ligne' : 'Hors ligne'}
                        />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <p className="font-medium">
                            {contact.first_name} {contact.last_name}
                          </p>
                          {onlineContacts.has(contact.id) && (
                            <span className="text-xs text-green-600 font-medium">En ligne</span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground truncate max-w-[160px]">
                          {contact.email}
                        </p>
                      </div>
                    </div>
                    {unreadCounts[contact.id] > 0 && (
                      <Badge variant="default" className="bg-primary">
                        {unreadCounts[contact.id]}
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {formatDate(contact.created_at)}
                  </div>
                </button>
              ))
            )}
          </ScrollArea>
        </div>

        {/* Chat area */}
        <div className="flex-1 flex flex-col">
          {selectedContact ? (
            <>
              {/* Contact info header */}
              <div className="p-4 border-b bg-card">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="h-5 w-5 text-primary" />
                    </div>
                    {/* Online indicator */}
                    <span 
                      className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-card ${
                        onlineContacts.has(selectedContact.id) 
                          ? 'bg-green-500' 
                          : 'bg-muted-foreground/30'
                      }`}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">
                        {selectedContact.first_name} {selectedContact.last_name}
                      </p>
                      {onlineContacts.has(selectedContact.id) ? (
                        <Badge variant="outline" className="text-green-600 border-green-600 text-xs">
                          En ligne
                        </Badge>
                      ) : (
                        <Badge variant="outline" className="text-muted-foreground text-xs">
                          Hors ligne
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {selectedContact.email} • {selectedContact.phone}
                    </p>
                  </div>
                </div>
              </div>

              {/* Messages */}
              <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                  {messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`flex ${msg.sender === 'admin' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                          msg.sender === 'admin'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <p className="text-sm">{msg.message}</p>
                        <p
                          className={`text-xs mt-1 ${
                            msg.sender === 'admin'
                              ? 'text-primary-foreground/70'
                              : 'text-muted-foreground'
                          }`}
                        >
                          {formatDate(msg.created_at)}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>

              {/* Message input */}
              <form onSubmit={handleSendMessage} className="p-4 border-t bg-card">
                <div className="flex gap-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    placeholder="Votre réponse..."
                    disabled={sendingMessage}
                    className="flex-1"
                  />
                  <Button type="submit" disabled={sendingMessage || !newMessage.trim()}>
                    {sendingMessage ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </form>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center text-muted-foreground">
              <div className="text-center">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>Sélectionnez une conversation</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Admin;
