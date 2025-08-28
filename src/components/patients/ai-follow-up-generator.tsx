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
  patientName: z.string().min(2, 'Patient name is required.'),
  appointmentNotes: z.string().min(10, 'Appointment notes are required.'),
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
        title: 'Message Generated',
        description: 'AI-powered follow-up message created successfully.',
      });
    } catch (error) {
      console.error(error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to generate AI follow-up message.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  function handleCopyToClipboard() {
    navigator.clipboard.writeText(generatedMessage);
    toast({
      title: 'Copied to Clipboard',
      description: 'Message ready to be pasted.',
    });
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <Bot className="mr-2 h-4 w-4" />
          AI Follow-up
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>AI-Powered Follow-up Message</DialogTitle>
          <DialogDescription>
            Generate a personalized follow-up message for {patient.name}.
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
                    <FormLabel>Patient Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
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
                    <FormLabel>Appointment Notes</FormLabel>
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
                    <FormLabel>Patient History (Optional)</FormLabel>
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
                    Generating...
                  </>
                ) : (
                  <>
                    <Bot className="mr-2 h-4 w-4" />
                    Generate Message
                  </>
                )}
              </Button>
            </form>
          </Form>
          <div className="flex flex-col space-y-4">
            <Card className="flex-1">
              <CardHeader>
                <CardTitle className="text-base">Generated Message</CardTitle>
              </CardHeader>
              <CardContent className="text-sm text-muted-foreground">
                {isLoading && (
                   <div className="flex items-center justify-center h-full">
                      <Loader2 className="h-8 w-8 animate-spin text-primary" />
                   </div>
                )}
                {!isLoading && !generatedMessage && (
                  <p>Your AI-generated message will appear here.</p>
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
                  Copy
                </Button>
                <Button className="w-full">
                  <WhatsAppIcon className="mr-2 h-4 w-4" />
                  Send via WhatsApp
                </Button>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
