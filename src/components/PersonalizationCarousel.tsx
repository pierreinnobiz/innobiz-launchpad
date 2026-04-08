import React from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';

// Import all variation images
import variation1 from '@/assets/tolia-variation-1.jpg';
import variation2 from '@/assets/tolia-variation-2.jpg';
import variation3 from '@/assets/tolia-variation-3.jpg';
import variation4 from '@/assets/tolia-variation-4.jpg';
import variation5 from '@/assets/tolia-variation-5.jpg';
import variation6 from '@/assets/tolia-variation-6.jpg';
import variation7 from '@/assets/tolia-variation-7.jpg';
import variation8 from '@/assets/tolia-variation-8.jpg';
import variation9 from '@/assets/tolia-variation-9.jpg';
import variation10 from '@/assets/tolia-variation-10.jpg';
import variation11 from '@/assets/tolia-variation-11.jpg';
import variation12 from '@/assets/tolia-variation-12.jpg';
import variation13 from '@/assets/tolia-variation-13.jpg';

interface VariationItem {
  image: string;
  style: string;
  room: string;
  pattern: string;
}

const variations: VariationItem[] = [
  {
    image: variation1,
    style: "Scandinave",
    room: "Chambre lumineuse",
    pattern: "Base blanc pur"
  },
  {
    image: variation2,
    style: "Japonais zen",
    room: "Salon avec tatamis",
    pattern: "Base noir mat"
  },
  {
    image: variation3,
    style: "Nature",
    room: "Salle de bain spa",
    pattern: "Base vert sauge"
  },
  {
    image: variation4,
    style: "Scandinave",
    room: "Bureau cosy",
    pattern: "Base rose poudré"
  },
  {
    image: variation5,
    style: "Méditerranéen",
    room: "Salon lumineux",
    pattern: "Base terracotta"
  },
  {
    image: variation6,
    style: "Japonais",
    room: "Salle à manger zen",
    pattern: "Base beige naturel"
  },
  {
    image: variation7,
    style: "Scandinave hygge",
    room: "Chambre élégante",
    pattern: "Base bleu marine"
  },
  {
    image: variation8,
    style: "Japandi",
    room: "Espace méditation",
    pattern: "Base crème"
  },
  {
    image: variation9,
    style: "Scandinave",
    room: "Cuisine moderne",
    pattern: "Base vert forêt"
  },
  {
    image: variation10,
    style: "Luxe",
    room: "Salle de bain spa",
    pattern: "Verre givré blanc"
  },
  {
    image: variation11,
    style: "Hôtellerie",
    room: "Lobby d'hôtel",
    pattern: "Verre givré noir"
  },
  {
    image: variation12,
    style: "Scandinave naturel",
    room: "Salon lumineux",
    pattern: "Base bois chêne clair"
  },
  {
    image: variation13,
    style: "Japonais traditionnel",
    room: "Salon de thé",
    pattern: "Base bois bouleau"
  }
];

const PersonalizationCarousel: React.FC = () => {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: true,
      }}
      className="w-full"
    >
      <CarouselContent className="-ml-2 md:-ml-4">
        {variations.map((item, index) => (
          <CarouselItem key={index} className="pl-2 md:pl-4 basis-full sm:basis-1/2 lg:basis-1/3">
            <div className="relative group overflow-hidden rounded-2xl border border-border/50 bg-card transition-all duration-300 hover:shadow-xl hover:border-primary/30">
              <div className="aspect-square overflow-hidden">
                <img
                  src={item.image}
                  alt={`Tolia ${item.pattern} - ${item.room}`}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-2 py-1 text-xs font-medium bg-primary/80 rounded-full mb-2">{item.style}</span>
                <h4 className="font-semibold text-sm mb-1">{item.room}</h4>
                <p className="text-xs text-white/80">{item.pattern}</p>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <div className="flex justify-center gap-4 mt-8">
        <CarouselPrevious className="relative inset-0 translate-x-0 translate-y-0 bg-background border-border hover:bg-primary hover:text-primary-foreground hover:border-primary" />
        <CarouselNext className="relative inset-0 translate-x-0 translate-y-0 bg-background border-border hover:bg-primary hover:text-primary-foreground hover:border-primary" />
      </div>
    </Carousel>
  );
};

export default PersonalizationCarousel;
