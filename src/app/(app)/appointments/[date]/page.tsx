
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
import { Appointment, addAppointmentAtom } from '@/lib/state';
import { useSetAtom } from 'jotai';

const availableTimes = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
];

export default function BookAppointmentPage() {
  const router = useRouter();
  const params = useParams();
  const { date } = params;
  const { toast } = useToast();
  const addAppointment = useSetAtom(addAppointmentAtom);


  const selectedDate = parse(date as string, 'yyyy-MM-dd', new Date());

  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [patientName, setPatientName] = useState('');
  const [patientEmail, setPatientEmail] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleTimeSelect = (time: string) => {
    setSelectedTime(time);
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!patientName || !patientEmail) {
       toast({
        variant: 'destructive',
        title: 'Campos Incompletos',
        description: 'Por favor, introduce tu nombre y correo electrónico.',
      });
      return;
    }

    const newAppointment: Omit<Appointment, 'id'> = {
        name: patientName,
        time: selectedTime!,
        type: 'Consulta',
        date: selectedDate,
        status: 'Confirmada'
    }

    await addAppointment(newAppointment);
    
    setIsConfirmed(true);
     toast({
        title: 'Cita Confirmada',
        description: `Tu cita para el ${format(selectedDate, 'PPP', { locale: es })} a las ${selectedTime} ha sido agendada.`,
      });
  };

  if (isConfirmed) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center max-w-md mx-auto">
        <Card className="w-full shadow-lg">
            <CardHeader>
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                    <CheckCircle className="h-10 w-10 text-green-600" />
                </div>
                <CardTitle className='pt-4 text-2xl'>¡Cita Confirmada!</CardTitle>
                <CardDescription>
                    Hemos agendado tu cita con éxito.
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
                <p className='text-md'>
                    <span className="font-semibold">Paciente:</span> {patientName}
                </p>
                 <p className='text-md'>
                    <span className="font-semibold">Fecha:</span> {format(selectedDate, 'PPP', { locale: es })}
                </p>
                 <p className='text-md'>
                    <span className="font-semibold">Hora:</span> {selectedTime}
                </p>
                <p className="text-muted-foreground pt-4 text-sm">
                    Recibirás una confirmación por correo electrónico en breve.
                </p>
            </CardContent>
        </Card>
         <Button onClick={() => router.push('/appointments')} className="mt-8 w-full text-lg py-6">
          Agendar otra cita
        </Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl">
        <Button variant="ghost" onClick={() => router.back()} className="mb-4 text-muted-foreground hover:text-foreground">
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
                  className="py-6 text-base"
                >
                  {time}
                </Button>
              ))}
            </CardContent>
          </Card>
        </div>
        <div>
            {selectedTime && (
                <Card className="sticky top-20">
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
                            <Button type="submit" className="w-full py-6 text-lg">
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
