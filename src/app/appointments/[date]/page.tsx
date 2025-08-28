
'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { format, parse } from 'date-fns';
import { es } from 'date-fns/locale';
import { ArrowLeft, CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

const availableTimes = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
];

export default function BookAppointmentPage() {
  const router = useRouter();
  const params = useParams();
  const { date } = params;
  const { toast } = useToast();

  const selectedDate = parse(date as string, 'yyyy-MM-dd', new Date());

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientEmail) {
       toast({
        variant: 'destructive',
        title: 'Campos Incompletos',
        description: 'Por favor, introduce tu nombre y correo electrónico.',
      });
      return;
    }
    // Lógica para guardar la cita...
    console.log({
      date: selectedDate,
      time: selectedTime,
      name: patientName,
      email: patientEmail,
    });
    setIsConfirmed(true);
     toast({
        title: 'Cita Confirmada',
        description: `Tu cita para el ${format(selectedDate, 'PPP', { locale: es })} a las ${selectedTime} ha sido agendada.`,
      });
  };

  if (isConfirmed) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto">
        <Card className="w-full">
            <CardHeader>
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-6 w-6 text-green-600" />
                </div>
                <CardTitle className='pt-4'>¡Cita Confirmada!</CardTitle>
                <CardDescription>
                    Hemos agendado tu cita con éxito.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
                <p className='text-sm'>
                    <span className="font-semibold">Paciente:</span> {patientName}
                </p>
                 <p className='text-sm'>
                    <span className="font-semibold">Fecha:</span> {format(selectedDate, 'PPP', { locale: es })}
                </p>
                 <p className='text-sm'>
                    <span className="font-semibold">Hora:</span> {selectedTime}
                </p>
                <p className="text-muted-foreground pt-4 text-xs">
                    Recibirás una confirmación por correo electrónico en breve.
                </p>
            </CardContent>
        </Card>
         <Button onClick={() => router.push('/appointments')} className="mt-6 w-full">
          Agendar otra cita
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
        </Button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Selecciona una Hora</CardTitle>
              <CardDescription>
                Horarios disponibles para el{' '}
                <span className="font-semibold text-primary">
                  {format(selectedDate, 'PPP', { locale: es })}
                </span>
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-2 lg:grid-cols-3 gap-3">
              {availableTimes.map((time) => (
                <Button
                  key={time}
                  variant={selectedTime === time ? 'default' : 'outline'}
                  onClick={() => handleTimeSelect(time)}
                >
                  {time}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
        <div>
            {selectedTime && (
                <Card>
                    <CardHeader>
                        <CardTitle>Confirma tu Cita</CardTitle>
                        <CardDescription>
                            Estás agendando para el{' '}
                            <span className="font-semibold text-primary">
                                {format(selectedDate, 'PPP', { locale: es })}
                            </span> a las{' '}
                            <span className="font-semibold text-primary">
                                {selectedTime}
                            </span>
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleConfirmBooking} className="space-y-4">
                            <div>
                                <Label htmlFor="name">Nombre Completo</Label>
                                <Input id="name" type="text" value={patientName} onChange={e => setPatientName(e.target.value)} placeholder="Tu nombre completo" />
                            </div>
                            <div>
                                <Label htmlFor="email">Correo Electrónico</Label>
                                <Input id="email" type="email" value={patientEmail} onChange={e => setPatientEmail(e.target.value)} placeholder="tu@email.com" />
                            </div>
                            <Button type="submit" className="w-full">
                                Confirmar Cita
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            )}
        </div>
      </div>
    </div>
  );
}
