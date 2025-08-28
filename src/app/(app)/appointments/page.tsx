
'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components//ui/avatar';
import { format, isSunday } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';
import { WhatsAppIcon } from '@/components/whatsapp-icon';
import { useRouter } from 'next/navigation';
import { useAtom } from 'jotai';
import { appointmentsAtom, Appointment } from '@/lib/state';
import { ManualAppointmentForm } from '@/components/appointments/manual-appointment-form';
import { CalendarPlus } from 'lucide-react';

const holidays = [
    new Date(2024, 0, 1), // Año Nuevo
    new Date(2024, 4, 1), // Día del Trabajo
    new Date(2024, 11, 25), // Navidad
];

export default function AppointmentsPage() {
  const [appointments] = useAtom(appointmentsAtom);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const router = useRouter();


  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;
    setSelectedDate(date);
    const formattedDate = format(date, 'yyyy-MM-dd');
    router.push(`/appointments/${formattedDate}`);
  };
  
  const DayContent = ({ date }: { date: Date }) => {
      const hasAppointments = appointments.some(d => format(d.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'));
      return (
        <div className="relative h-full w-full flex items-center justify-center">
            <span>{format(date, 'd')}</span>
            {hasAppointments && <div className="absolute bottom-1 h-1.5 w-1.5 rounded-full bg-primary" />}
        </div>
      );
    };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div className="md:col-span-2">
        <Card>
            <CardHeader>
                <CardTitle>Agendar Nueva Cita</CardTitle>
                <CardDescription>
                    Selecciona un día en el calendario o agenda una cita manualmente.
                </CardDescription>
            </CardHeader>
            <CardContent className="p-2">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                className="w-full"
                locale={es}
                components={{ DayContent: DayContent as any }}
                modifiers={{
                    sunday: (date) => isSunday(date),
                    holiday: holidays,
                    disabled: (date) => date < new Date(new Date().setDate(new Date().getDate() - 1)) || isSunday(date) || holidays.some(h => format(h, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'))
                }}
                 modifiersClassNames={{
                    sunday: 'text-red-500 bg-red-500/10 font-bold',
                    holiday: 'text-blue-500 bg-blue-500/10 font-bold',
                }}
              />
            </CardContent>
        </Card>
      </div>
      <div className="md:col-span-1 space-y-6">
        <Card className='sticky top-4'>
          <CardHeader>
            <div className='flex items-center justify-between'>
                <div>
                    <CardTitle>
                      Próximas Citas
                    </CardTitle>
                    <CardDescription>
                      Un resumen de tus citas confirmadas.
                    </CardDescription>
                </div>
                <ManualAppointmentForm>
                    <Button size="icon" variant="outline">
                        <CalendarPlus className="h-5 w-5" />
                        <span className="sr-only">Agendar Cita Manualmente</span>
                    </Button>
                </ManualAppointmentForm>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 max-h-[60vh] overflow-y-auto">
            {appointments.length > 0 ? (
              [...appointments]
                .sort((a, b) => new Date(a.date).setHours(parseInt(a.time.split(':')[0]), parseInt(a.time.split(':')[1].slice(0,2))) - new Date(b.date).setHours(parseInt(b.time.split(':')[0]), parseInt(b.time.split(':')[1].slice(0,2))))
                .map((appt, index) => (
                  <div
                    key={`${appt.name}-${index}`}
                    className="flex items-center space-x-4 rounded-lg border p-3"
                  >
                    <Avatar>
                      <AvatarImage
                        data-ai-hint="person portrait"
                        src={`https://picsum.photos/seed/${appt.name}/40/40`}
                        alt="Avatar"
                      />
                      <AvatarFallback>{appt.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <p className="font-semibold">{appt.name}</p>
                      <p className="text-sm text-muted-foreground">
                       {format(new Date(appt.date), 'PPP', { locale: es })} - {appt.time}
                      </p>
                    </div>
                     <Badge
                        variant={
                          appt.status === 'Confirmada'
                            ? 'default'
                            : appt.status === 'Pendiente'
                            ? 'secondary'
                            : 'destructive'
                        }
                        className='text-xs'
                      >
                        {appt.status}
                      </Badge>
                  </div>
                ))
            ) : (
               <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 p-12 text-center h-48">
                    <p className="text-muted-foreground">
                       No tienes citas próximas.
                    </p>
                </div>
            )}
          </CardContent>
        </Card>
        <Card>
            <CardHeader>
              <CardTitle>¿Necesitas Ayuda?</CardTitle>
              <CardDescription>
                Agenda tu cita por WhatsApp si lo prefieres.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button className="w-full" asChild>
                <Link
                  href="https://wa.me/1234567890?text=Hola%2C%20me%20gustar%C3%ADa%20agendar%20una%20nueva%20cita."
                  target="_blank"
                >
                  <WhatsAppIcon className="mr-2 h-4 w-4" />
                  Agendar por WhatsApp
                </Link>
              </Button>
            </CardContent>
        </Card>
      </div>
    </div>
  );
}
