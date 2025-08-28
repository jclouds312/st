
'use client';

import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, QrCode, Download, CalendarPlus } from 'lucide-react';
import { WhatsAppIcon } from '../whatsapp-icon';

const formSchema = z.object({
  patientName: z.string().min(2, 'El nombre del paciente es requerido.'),
  amount: z.coerce.number().min(0.01, 'El monto debe ser mayor que 0.'),
  concept: z.string().min(3, "El concepto es requerido.")
});

type PaymentDetails = z.infer<typeof formSchema>;

export function PaymentQR() {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null
  );
  const { toast } = useToast();
  const qrImageRef = useRef<HTMLImageElement>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: '',
      amount: 0,
      concept: 'Consulta Médica'
    },
  });

  const qrData = paymentDetails ? encodeURIComponent(`pago:${paymentDetails.patientName};monto:${paymentDetails.amount};concepto:${paymentDetails.concept}`) : "";
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=${qrData}`;


  function onSubmit(values: z.infer<typeof formSchema>) {
    setPaymentDetails(values);
  }

  function handleVerifyPayment() {
    toast({
      title: 'Pago Verificado',
      description: `El pago de $${paymentDetails?.amount.toFixed(
        2
      )} para ${paymentDetails?.patientName} ha sido confirmado.`,
    });
    setPaymentDetails(null);
    form.reset();
  }

  async function handleDownloadQR() {
      if(!qrUrl) return;
      try {
        const response = await fetch(qrUrl);
        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = downloadUrl;
        link.download = `qr-pago-${paymentDetails?.patientName.replace(/\s/g, '-')}.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(downloadUrl);
      } catch (error) {
          toast({
              variant: 'destructive',
              title: 'Error al Descargar',
              description: 'No se pudo descargar la imagen del código QR.'
          })
      }
  }

  function handleSendWhatsApp() {
    const message = `Hola ${paymentDetails?.patientName}, aquí está el código QR para tu pago de $${paymentDetails?.amount.toFixed(2)} por ${paymentDetails?.concept}. Puedes escanear la imagen adjunta.`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    toast({
        title: 'Listo para Enviar',
        description: "Se ha abierto WhatsApp. Adjunta el QR descargado al mensaje."
    })
  }
  
   function handleAddToAppointment() {
    toast({
        title: 'Funcionalidad no implementada',
        description: "Próximamente podrás agregar este QR directamente a una cita."
    })
  }


  if (paymentDetails) {
    return (
      <Card className="w-full text-center">
        <CardHeader>
          <CardTitle className="text-2xl">Solicitud de Pago</CardTitle>
          <CardDescription>
            Escanee el código QR para completar el pago.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <div className='p-4 border rounded-lg'>
             <Image
                ref={qrImageRef}
                src={qrUrl}
                alt="Código QR de Pago"
                width={250}
                height={250}
                className="rounded-lg"
                crossOrigin='anonymous'
              />
          </div>
          <div className="text-lg">
            Paciente: <span className="font-semibold">{paymentDetails.patientName}</span>
          </div>
           <div className="text-md text-muted-foreground">
            Concepto: <span className="font-semibold text-foreground">{paymentDetails.concept}</span>
          </div>
          <div className="text-4xl font-bold">
            ${paymentDetails.amount.toFixed(2)}
          </div>
        </CardContent>
        <CardFooter className="grid grid-cols-2 gap-3">
           <Button onClick={handleVerifyPayment} className="w-full col-span-2">
            <CheckCircle className="mr-2 h-5 w-5" />
            Verificar Pago
          </Button>
           <Button variant="secondary" onClick={handleDownloadQR}>
            <Download className="mr-2 h-5 w-5" />
            Descargar
          </Button>
          <Button variant="secondary" onClick={handleSendWhatsApp}>
            <WhatsAppIcon className="mr-2 h-5 w-5" />
            WhatsApp
          </Button>
           <Button
            variant="outline"
            onClick={() => setPaymentDetails(null)}
            className="w-full col-span-2"
          >
            Cancelar
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-2xl">Sistema de Pago con Código QR</CardTitle>
        <CardDescription>
          Genere un código QR para cobrar el pago de un paciente.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="patientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nombre del Paciente</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej., Juan Pérez" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="concept"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Concepto</FormLabel>
                  <FormControl>
                    <Input placeholder="Ej., Consulta Médica" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Monto</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <Button type="submit" className="w-full py-6 text-lg">
                <QrCode className="mr-2 h-5 w-5" />
                Generar Código QR
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
