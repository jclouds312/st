'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { SendHorizonal, Search } from 'lucide-react';

const conversations = [
  {
    name: 'Ana Pérez',
    lastMessage: '¡Hola! Quisiera confirmar mi cita de mañana.',
    time: '10:42 AM',
    avatar: 'https://picsum.photos/seed/Ana/40/40',
  },
  {
    name: 'Carlos Gómez',
    lastMessage: 'Gracias por el recordatorio.',
    time: 'Ayer',
    avatar: 'https://picsum.photos/seed/Carlos/40/40',
    active: true,
  },
  {
    name: 'Luisa Fernández',
    lastMessage: '¿Podrían enviarme los resultados de mis análisis?',
    time: 'Ayer',
    avatar: 'https://picsum.photos/seed/Luisa/40/40',
  },
  {
    name: 'Jorge Díaz',
    lastMessage: 'Perfecto, muchas gracias.',
    time: 'Hace 3 días',
    avatar: 'https://picsum.photos/seed/Jorge/40/40',
  },
  {
    name: 'Sofía Castro',
    lastMessage: 'Necesito reagendar mi consulta.',
    time: 'Hace 5 días',
    avatar: 'https://picsum.photos/seed/Sofia/40/40',
  },
];

const messages = [
    { id: 1, sender: 'patient', text: '¡Hola! Quisiera confirmar mi cita de mañana.', time: '10:42 AM' },
    { id: 2, sender: 'doctor', text: '¡Hola, Carlos! Claro, tu cita está confirmada para mañana a las 11:30 AM. ¿Necesitas algo más?', time: '10:43 AM' },
    { id: 3, sender: 'patient', text: 'No, eso es todo. ¡Muchas gracias!', time: '10:44 AM' },
    { id: 4, sender: 'doctor', text: 'De nada. ¡Que tengas un buen día!', time: '10:45 AM' },
];


export default function WhatsAppPage() {
  return (
    <div className="grid h-[calc(100vh-8rem)] grid-cols-1 md:grid-cols-3">
      <Card className="md:col-span-1">
        <CardHeader className='p-4'>
            <div className="relative">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Buscar conversaciones..." className="pl-8" />
            </div>
        </CardHeader>
        <ScrollArea className="h-full">
          <div className="flex flex-col">
            {conversations.map((convo) => (
              <div
                key={convo.name}
                className={cn(
                  'flex cursor-pointer items-center gap-3 border-b p-4 transition-colors hover:bg-accent',
                  convo.active && 'bg-accent'
                )}
              >
                <Avatar className="h-10 w-10">
                  <AvatarImage data-ai-hint="person portrait" src={convo.avatar} alt={convo.name} />
                  <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate font-semibold">{convo.name}</p>
                  <p className="truncate text-sm text-muted-foreground">
                    {convo.lastMessage}
                  </p>
                </div>
                <time className="text-xs text-muted-foreground">
                  {convo.time}
                </time>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
      <div className="flex flex-col md:col-span-2">
        <Card className="flex-1">
            <CardHeader className="border-b p-4">
                <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage data-ai-hint="person portrait" src="https://picsum.photos/seed/Carlos/40/40" alt="Carlos Gómez" />
                      <AvatarFallback>CG</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold">Carlos Gómez</p>
                        <p className="text-sm text-muted-foreground">En línea</p>
                    </div>
                </div>
            </CardHeader>
          <CardContent className="h-[calc(100%-8rem)] p-4">
            <ScrollArea className="h-full">
                <div className="space-y-4">
                    {messages.map(message => (
                        <div key={message.id} className={cn("flex w-max max-w-[75%] flex-col gap-2 rounded-lg px-3 py-2 text-sm", 
                            message.sender === 'patient' ? "ml-auto bg-muted" : "bg-primary text-primary-foreground"
                        )}>
                            <p>{message.text}</p>
                            <span className="text-xs text-muted-foreground self-end">{message.sender === 'doctor' ? `Tú - ${message.time}` : message.time}</span>
                        </div>
                    ))}
                </div>
            </ScrollArea>
          </CardContent>
          <div className="border-t p-4">
            <div className="relative">
              <Input
                placeholder="Escribe un mensaje..."
                className="pr-12"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-1 top-1/2 -translate-y-1/2"
              >
                <SendHorizonal className="h-5 w-5" />
                <span className="sr-only">Enviar mensaje</span>
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
