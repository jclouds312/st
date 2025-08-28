
'use client';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';
import { Webhook, Bot } from 'lucide-react';
import { WhatsAppIcon } from '@/components/whatsapp-icon';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';

const teamMembers = [
    { name: "Dr. Evelyn Reed", email: "evelyn.reed@mediflow.com", role: "Médico" },
    { name: "Leo Carter", email: "leo.carter@mediflow.com", role: "Enfermero/a" },
    { name: "Mia Evans", email: "mia.evans@mediflow.com", role: "Admin" },
]

export default function SettingsPage() {
  const { toast } = useToast();
  const [isWhatsAppConnected, setIsWhatsAppConnected] = useState(false);
  const [isN8nConnected, setIsN8nConnected] = useState(false);

  const handleConnectWhatsApp = () => {
    setIsWhatsAppConnected(true);
    toast({
      title: 'WhatsApp Conectado',
      description: 'Tu número ha sido conectado exitosamente (simulado).',
    });
  }

  const handleConnectN8n = () => {
    setIsN8nConnected(true);
    toast({
      title: 'n8n Conectado',
      description: 'La integración con n8n ahora está activa (simulado).',
    });
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Configuración</h1>
        <p className="text-muted-foreground">
          Gestiona tu cuenta, equipo y configuración de la aplicación.
        </p>
      </div>
      <Tabs defaultValue="profile" className="w-full">
        <TabsList className="grid w-full grid-cols-2 md:grid-cols-5">
          <TabsTrigger value="profile">Perfil</TabsTrigger>
          <TabsTrigger value="team">Gestionar Equipo</TabsTrigger>
          <TabsTrigger value="whatsapp">WhatsApp</TabsTrigger>
          <TabsTrigger value="courses">Gestión de Cursos</TabsTrigger>
          <TabsTrigger value="integrations">Integraciones</TabsTrigger>
        </TabsList>
        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle>Perfil</CardTitle>
              <CardDescription>
                Actualiza tu información personal.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nombre</Label>
                <Input id="name" defaultValue="Dr. Alex Chen" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Correo Electrónico</Label>
                <Input id="email" type="email" defaultValue="alex.chen@mediflow.com" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Guardar Cambios</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="team">
          <Card>
            <CardHeader>
              <CardTitle>Miembros del Equipo</CardTitle>
              <CardDescription>
                Invita y gestiona a los miembros de tu equipo.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Nombre</TableHead>
                    <TableHead>Correo Electrónico</TableHead>
                    <TableHead>Rol</TableHead>
                    <TableHead className="text-right">Acciones</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                    {teamMembers.map((member) => (
                        <TableRow key={member.email}>
                            <TableCell>{member.name}</TableCell>
                            <TableCell>{member.email}</TableCell>
                            <TableCell>{member.role}</TableCell>
                            <TableCell className="text-right">
                                <Button variant="outline" size="sm">Eliminar</Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
              </Table>
            </CardContent>
            <CardFooter className="justify-between">
                <Input placeholder="Correo del nuevo miembro" className="max-w-xs" />
                <Button>Invitar Miembro</Button>
            </CardFooter>
          </Card>
        </TabsContent>
         <TabsContent value="whatsapp">
          <Card>
            <CardHeader>
              <CardTitle>Integración con WhatsApp</CardTitle>
              <CardDescription>
                Conecta tu número de WhatsApp para gestionar conversaciones.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="whatsapp-number">Número de WhatsApp</Label>
                <Input id="whatsapp-number" placeholder="+1 (555) 123-4567" />
              </div>
               <div className="space-y-2">
                <Label htmlFor="welcome-message">Mensaje de Bienvenida Automático</Label>
                <Textarea id="welcome-message" placeholder="Hola, gracias por contactar a nuestra clínica. ¿Cómo podemos ayudarte?" />
              </div>
            </CardContent>
            <CardFooter className="justify-between">
              <Button onClick={handleConnectWhatsApp} disabled={isWhatsAppConnected}>
                <WhatsAppIcon className="mr-2 h-4 w-4" />
                {isWhatsAppConnected ? "Conectado" : "Conectar WhatsApp"}
              </Button>
               <Dialog>
                <DialogTrigger asChild>
                    <Button variant="secondary">
                      <Bot className="mr-2 h-4 w-4" />
                      Configurar Chatbot
                    </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Configurar Chatbot de IA</DialogTitle>
                    <DialogDescription>
                      Define respuestas automáticas y flujos de conversación inteligentes. Esta es una demostración.
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4 py-4">
                     <div className="space-y-2">
                        <Label>Disparador del Flujo</Label>
                        <Input placeholder="Ej: 'Hola', 'Quiero una cita'" />
                        <p className="text-xs text-muted-foreground">Palabras clave que inician la automatización.</p>
                      </div>
                       <div className="space-y-2">
                        <Label>Respuesta de la IA</Label>
                        <Textarea placeholder="Ej: '¡Hola! Gracias por contactarnos. ¿En qué podemos ayudarte hoy: agendar una cita, consultar resultados o hablar con un especialista?'" />
                         <p className="text-xs text-muted-foreground">El mensaje que enviará la IA. Puedes ofrecer opciones.</p>
                      </div>
                  </div>
                   <DialogFooter>
                    <Button onClick={() => toast({ title: 'Flujo Guardado', description: 'Tu configuración del chatbot ha sido guardada (simulado).' })}>Guardar Flujo</Button>
                  </DialogFooter>
                </DialogContent>
               </Dialog>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="courses">
          <Card>
            <CardHeader>
              <CardTitle>Gestión de Cursos</CardTitle>
              <CardDescription>
                Sube nuevas clases online y materiales de capacitación.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="course-title">Título del Curso</Label>
                <Input id="course-title" placeholder="Ej., Técnicas Avanzadas de Sutura" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course-desc">Descripción</Label>
                <Textarea id="course-desc" placeholder="Un breve resumen del contenido del curso." />
              </div>
              <div className="space-y-2">
                <Label htmlFor="course-video">Archivo de Video o URL</Label>
                <Input id="course-video" type="text" placeholder="https://ejemplo.com/video.mp4 o" />
                 <Input id="picture" type="file" />
              </div>
            </CardContent>
            <CardFooter>
              <Button>Subir Curso</Button>
            </CardFooter>
          </Card>
        </TabsContent>
        <TabsContent value="integrations">
          <Card>
            <CardHeader>
              <CardTitle>Integraciones</CardTitle>
              <CardDescription>
                Conecta MediFlow con otras aplicaciones para automatizar flujos de trabajo.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
               <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-4">
                    <div className='flex items-center gap-2'>
                        <Webhook className="h-8 w-8" />
                        <CardTitle className="text-2xl">n8n</CardTitle>
                    </div>
                    <Button onClick={handleConnectN8n} disabled={isN8nConnected}>{isN8nConnected ? "Conectado" : "Conectar"}</Button>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground">
                        Automatiza tus flujos de trabajo conectando MediFlow con cientos de otras aplicaciones a través de n8n.
                    </p>
                </CardContent>
               </Card>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
