
'use client';

import { useState, useMemo } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { SendHorizonal, Search } from 'lucide-react';

const initialConversations = [
  {
    id: 1,
    name: 'Ana Pérez',
    lastMessage: '¡Hola! Quisiera confirmar mi cita de mañana.',
    time: '10:42 AM',
    avatar: 'https://picsum.photos/seed/Ana/40/40',
  },
  {
    id: 2,
    name: 'Carlos Gómez',
    lastMessage: 'Gracias por el recordatorio.',
    time: 'Ayer',
    avatar: 'https://picsum.photos/seed/Carlos/40/40',
  },
  {
    id: 3,
    name: 'Luisa Fernández',
    lastMessage: '¿Podrían enviarme los resultados de mis análisis?',
    time: 'Ayer',
    avatar: 'https://picsum.photos/seed/Luisa/40/40',
  },
  {
    id: 4,
    name: 'Jorge Díaz',
    lastMessage: 'Perfecto, muchas gracias.',
    time: 'Hace 3 días',
    avatar: 'https://picsum.photos/seed/Jorge/40/40',
  },
  {
    id: 5,
    name: 'Sofía Castro',
    lastMessage: 'Necesito reagendar mi consulta.',
    time: 'Hace 5 días',
    avatar: 'https://picsum.photos/seed/Sofia/40/40',
  },
];

const initialMessages = [
    { id: 1, convoId: 2, sender: 'patient', text: '¡Hola! Quisiera confirmar mi cita de mañana.', time: '10:42 AM' },
    { id: 2, convoId: 2, sender: 'doctor', text: '¡Hola, Carlos! Claro, tu cita está confirmada para mañana a las 11:30 AM. ¿Necesitas algo más?', time: '10:43 AM' },
    { id: 3, convoId: 2, sender: 'patient', text: 'No, eso es todo. ¡Muchas gracias!', time: '10:44 AM' },
    { id: 4, convoId: 2, sender: 'doctor', text: 'De nada. ¡Que tengas un buen día!', time: '10:45 AM' },
    { id: 5, convoId: 1, sender: 'patient', text: '¡Hola! Quisiera confirmar mi cita de mañana.', time: '10:42 AM' },
];


export default function WhatsAppPage() {
  const [conversations, setConversations] = useState(initialConversations);
  const [messages, setMessages] = useState(initialMessages);
  const [activeConversation, setActiveConversation] = useState(conversations[1]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newMessage, setNewMessage] = useState('');

  const filteredConversations = useMemo(() => {
    return conversations.filter(convo => convo.name.toLowerCase().includes(searchQuery.toLowerCase()));
  }, [conversations, searchQuery]);
  
  const activeMessages = useMemo(() => {
      return messages.filter(msg => msg.convoId === activeConversation.id);
  }, [messages, activeConversation]);

  const handleSendMessage = (e: React.FormEvent) => {
      e.preventDefault();
      if (!newMessage.trim()) return;

      const newMsg = {
          id: messages.length + 1,
          convoId: activeConversation.id,
          sender: 'doctor',
          text: newMessage,
          time: new Date().toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
      };

      setMessages(prev => [...prev, newMsg]);
      setNewMessage('');
  }


  return (
    <div className="grid h-[calc(100vh-8rem)] grid-cols-1 md:grid-cols-4 xl:grid-cols-5 gap-4">
      <Card className="md:col-span-1 xl:col-span-1 flex flex-col">
        <CardHeader className='p-4'>
            <div className="relative">
                <Search className="absolute left-2.5 top-3 h-5 w-5 text-muted-foreground" />
                <Input placeholder="Buscar conversaciones..." className="pl-9 text-lg md:text-base" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
            </div>
        </CardHeader>
        <ScrollArea className="flex-1">
          <div className="flex flex-col">
            {filteredConversations.map((convo) => (
              <div
                key={convo.id}
                onClick={() => setActiveConversation(convo)}
                className={cn(
                  'flex cursor-pointer items-center gap-3 border-b p-4 transition-colors hover:bg-accent',
                  activeConversation.id === convo.id && 'bg-accent'
                )}
              >
                <Avatar className="h-12 w-12">
                  <AvatarImage data-ai-hint="person portrait" src={convo.avatar} alt={convo.name} />
                  <AvatarFallback>{convo.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1 overflow-hidden">
                  <p className="truncate font-semibold text-lg">{convo.name}</p>
                  <p className="truncate text-base text-muted-foreground">
                    {convo.lastMessage}
                  </p>
                </div>
                <time className="text-sm text-muted-foreground self-start pt-1">
                  {convo.time}
                </time>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
      <div className="flex flex-col md:col-span-3 xl:col-span-4">
        <Card className="flex-1 flex flex-col">
            <CardHeader className="border-b p-4">
                <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage data-ai-hint="person portrait" src={activeConversation.avatar} alt={activeConversation.name} />
                      <AvatarFallback>{activeConversation.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                    </Avatar>
                    <div>
                        <p className="font-semibold text-xl">{activeConversation.name}</p>
                        <p className="text-base text-muted-foreground">En línea</p>
                    </div>
                </div>
            </CardHeader>
          <CardContent className="flex-1 p-4">
            <ScrollArea className="h-full">
                <div className="space-y-4 pr-4">
                    {activeMessages.map(message => (
                        <div key={message.id} className={cn("flex w-max max-w-[75%] flex-col gap-1 rounded-lg px-4 py-3 text-base", 
                            message.sender === 'patient' ? "ml-auto bg-muted" : "bg-primary text-primary-foreground"
                        )}>
                            <p>{message.text}</p>
                            <span className={cn("text-xs self-end", message.sender === 'patient' ? 'text-muted-foreground' : 'text-primary-foreground/80')}>{message.sender === 'doctor' ? `Tú - ${message.time}` : message.time}</span>
                        </div>
                    ))}
                </div>
            </ScrollArea>
          </CardContent>
          <div className="border-t p-4 bg-background">
            <form onSubmit={handleSendMessage} className="relative">
              <Input
                placeholder="Escribe un mensaje..."
                className="pr-14 h-12 text-lg md:text-base"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                className="absolute right-2 top-1/2 -translate-y-1/2 h-9 w-9"
              >
                <SendHorizonal className="h-6 w-6" />
                <span className="sr-only">Enviar mensaje</span>
              </Button>
            </form>
          </div>
        </Card>
      </div>
    </div>
  );
}
