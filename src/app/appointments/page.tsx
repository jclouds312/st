
'use client';

import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, CalendarProps } from '@/components/ui/calendar';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { format, parse } from 'date-fns';
import { es } from 'date-fns/locale';
import Link from 'next/link';
import { WhatsAppIcon } from '@/components/whatsapp-icon';
import { PlusCircle } from 'lucide-react';

type Appointment = {
  name: string;
  time: string;
  type: string;
  date: Date;
  status: 'Confirmada' | 'Pendiente' | 'Cancelada';
};

const initialAppointments: Appointment[] = [
  {
    name: 'Liam Johnson',
    time: '10:00 AM',
    type: 'Consulta',
    date: new Date(2024, 6, 23), // Note: month is 0-indexed, so 6 is July
    status: 'Confirmada',
  },
  {
    name: 'Noah Williams',
    time: '11:30 AM',
    type: 'Revisión',
    date: new Date(2024, 6, 23),
    status: 'Confirmada',
  },
  {
    name: 'Emma Brown',
    time: '2:00 PM',
    type: 'Seguimiento',
    date: new Date(2024, 6, 24),
    status: 'Pendiente',
  },
  {
    name: 'James Jones',
    time: '3:30 PM',
    type: 'Consulta',
    date: new Date(2024, 6, 24),
    status: 'Cancelada',
  },
  {
    name: 'Olivia Davis',
    time: '9:00 AM',
    type: 'Consulta',
    date: new Date(2024, 6, 25),
    status: 'Confirmada',
  },
  {
    name: 'Lucas Garcia',
    time: '1:00 PM',
    type: 'Revisión',
    date: new Date(2024, 6, 25),
    status: 'Confirmada',
  },
];

export default function AppointmentsPage() {
  const [appointments, setAppointments] =
    useState<Appointment[]>(initialAppointments);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(
    new Date()
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newAppointment, setNewAppointment] = useState({
    name: '',
    time: '',
    type: 'Consulta',
  });

  const appointmentsForSelectedDay = appointments.filter(
    (appt) =>
      selectedDate &&
      format(appt.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );

  const handleDateSelect = (date: Date | undefined) => {
    setSelectedDate(date);
  };
  
  const handleDayDoubleClick = (day: Date) => {
      setSelectedDate(day);
      setIsModalOpen(true);
  }

  const handleAddAppointment = () => {
    if (selectedDate && newAppointment.name && newAppointment.time) {
      const [hours, minutes] = newAppointment.time.split(':');
      const dateWithTime = new Date(selectedDate);
      dateWithTime.setHours(parseInt(hours, 10));
      dateWithTime.setMinutes(parseInt(minutes, 10));

      setAppointments([
        ...appointments,
        {
          ...newAppointment,
          date: dateWithTime,
          status: 'Pendiente',
        },
      ]);
      setNewAppointment({ name: '', time: '', type: 'Consulta' });
      setIsModalOpen(false);
    }
  };
  
  const DayContent: CalendarProps['components'] = {
    DayContent: ({ date }) => {
      const hasAppointments = appointments.some(d => format(d.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd'));
      return (
        <div className="relative h-full w-full">
            <span>{format(date, 'd')}</span>
            {hasAppointments && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 h-1.5 w-1.5 rounded-full bg-primary" />}
        </div>
      );
    },
  };

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div className="md:col-span-1">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Crear Cita</CardTitle>
              <CardDescription>
                Agenda tu cita manualmente o por WhatsApp.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
               <Button className="w-full" onClick={() => setIsModalOpen(true)}>
                 <PlusCircle className="mr-2 h-4 w-4" />
                Agendar Manualmente
              </Button>
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
          <Card>
            <CardContent className="p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={handleDateSelect}
                onDayDoubleClick={handleDayDoubleClick}
                className="w-full"
                locale={es}
                components={DayContent}
              />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Estadísticas</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <CardDescription>Esta Semana</CardDescription>
                <span className="font-bold">25</span>
              </div>
              <div className="flex justify-between">
                <CardDescription>Este Mes</CardDescription>
                <span className="font-bold">120</span>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
      <div className="md:col-span-2">
        <Card>
          <CardHeader>
            <CardTitle>
              {selectedDate
                ? `Citas para ${format(selectedDate, 'PPP', { locale: es })}`
                : 'Todas las Citas'}
            </CardTitle>
            <CardDescription>
              {selectedDate
                ? 'Mostrando citas para el día seleccionado. Haz doble clic en un día del calendario para agregar una nueva cita.'
                : 'Un resumen de todas tus citas.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {appointmentsForSelectedDay.length > 0 ? (
              appointmentsForSelectedDay
                .sort((a, b) => a.date.getTime() - b.date.getTime())
                .map((appt) => (
                  <div
                    key={appt.name + appt.time}
                    className="flex items-center space-x-4 rounded-lg border p-4"
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
                        {appt.type}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium">{format(appt.date, 'p', { locale: es })}</p>
                      <Badge
                        variant={
                          appt.status === 'Confirmada'
                            ? 'default'
                            : appt.status === 'Pendiente'
                            ? 'secondary'
                            : 'destructive'
                        }
                        className={
                          appt.status === 'Confirmada'
                            ? 'bg-green-100 text-green-800'
                            : appt.status === 'Pendiente'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-red-100 text-red-800'
                        }
                      >
                        {appt.status}
                      </Badge>
                    </div>
                  </div>
                ))
            ) : (
              <p className="text-center text-muted-foreground">
                No hay citas para este día.
              </p>
            )}
          </CardContent>
        </Card>
      </div>
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Agendar Nueva Cita para {selectedDate ? format(selectedDate, 'PPP', { locale: es }) : ''}</DialogTitle>
                </DialogHeader>
                <div className="space-y-4 py-4">
                    <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">Nombre</Label>
                        <Input id="name" value={newAppointment.name} onChange={(e) => setNewAppointment({ ...newAppointment, name: e.target.value })} className="col-span-3" />
                    </div>
                     <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="time" className="text-right">Hora</Label>
                        <Input id="time" type="time" value={newAppointment.time} onChange={(e) => setNewAppointment({ ...newAppointment, time: e.target.value })} className="col-span-3" />
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant="outline">Cancelar</Button>
                    </DialogClose>
                    <Button onClick={handleAddAppointment}>Guardar Cita</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    </div>
  );
}

