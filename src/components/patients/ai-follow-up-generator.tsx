'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import {
  generateAiFollowUpMessage,
  type GenerateAiFollowUpMessageInput,
} from '@/ai/flows/generate-ai-follow-up-message';
import { Bot, Clipboard, Send, Loader2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { WhatsAppIcon } from '../whatsapp-icon';

const formSchema = z.object({
  patientName: z.string().min(2, 'El nombre del paciente es requerido.'),
  appointmentNotes: z.string().min(10, 'Las notas de la cita son requeridas.'),
  patientHistory: z.string().optional(),
});

type Patient = {
  name: string;
  notes: string;
  history?: string;
};

export function AiFollowUpGenerator({ patient }: { patient: Patient }) {
  const [isOpen, setIsOpen] = useState(false);
  const [generatedMessage, setGeneratedMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: patient.name,
      appointmentNotes: patient.notes,
      patientHistory: patient.history || '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsLoading(true);
    setGeneratedMessage('');
    try {
      const result = await generateAiFollowUpMessage(
        values as GenerateAiFollowUpMessageInput
      );
      setGeneratedMessage(result.followUpMessage);
      toast({
        title: 'Mensaje Generado',
        description: 'Mensaje de seguimiento creado con IA exitosamente.',
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'No se pudo generar el mensaje de seguimiento con IA.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleCopyToClipboard() {
    if (!generatedMessage) return;
    navigator.clipboard.writeText(generatedMessage);
    toast({
      title: 'Copiado al Portapapeles',
      description: 'Mensaje listo para ser pegado.',
    });
  }

  function handleSendWhatsApp() {
     if (!generatedMessage) return;
     const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(generatedMessage)}`;
     window.open(whatsappUrl, '_blank');
  }


  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Bot className="mr-2 h-4 w-4" />
          Seguimiento con IA
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Mensaje de Seguimiento con IA</DialogTitle>
          <DialogDescription>
            Generar un mensaje de seguimiento personalizado para {patient.name}.
          </DialogDescription>
        </DialogHeader>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="patientName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nombre del Paciente</FormLabel>
                    <FormControl>
                      <Input {...field} readOnly />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="appointmentNotes"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Notas de la Cita</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={6} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="patientHistory"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Historial del Paciente (Opcional)</FormLabel>
                    <FormControl>
                      <Textarea {...field} rows={4} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={isLoading} className="w-full">
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generando...
                  </>
                ) : (
                  <>
                    <Bot className="mr-2 h-4 w-4" />
                    Generar Mensaje
                  </>
                )}
              </Button>
            </form>
          </Form>
          <div className="flex flex-col space-y-4">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="text-base">Mensaje Generado</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground min-h-[200px]">
                {isLoading && (
                   <div className="flex items-center justify-center h-full">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                   </div>
                )}
                {!isLoading && !generatedMessage && (
                  <p>Su mensaje generado por IA aparecerá aquí.</p>
                )}
                {generatedMessage && (
                  <p className="whitespace-pre-wrap">{generatedMessage}</p>
                )}
              </CardContent>
            </Card>
            {generatedMessage && (
              <div className="flex flex-col gap-2 sm:flex-row">
                <Button
                  variant="outline"
                  onClick={handleCopyToClipboard}
                  className="w-full"
                >
                  <Clipboard className="mr-2 h-4 w-4" />
                  Copiar
                </Button>
                <Button onClick={handleSendWhatsApp} className="w-full">
                  <WhatsAppIcon className="mr-2 h-4 w-4" />
                  Enviar por WhatsApp
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
