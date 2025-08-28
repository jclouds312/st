
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
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { es } from 'date-fns/locale';

const allAppointments = [
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
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const appointmentsForSelectedDay = allAppointments.filter(
    (appt) =>
      selectedDate &&
      format(appt.date, 'yyyy-MM-dd') === format(selectedDate, 'yyyy-MM-dd')
  );

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
      <div className="md:col-span-1">
        <div className="space-y-6">
            <Card>
                <CardHeader>
                    <CardTitle>Crear Cita</CardTitle>
                </CardHeader>
                <CardContent>
                    <Button className="w-full">Agendar Nueva Cita</Button>
                </CardContent>
            </Card>
            <Card>
            <CardContent className="p-0">
              <Calendar
                mode="single"
                selected={selectedDate}
                onSelect={setSelectedDate}
                className="w-full"
                locale={es}
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
                ? 'Mostrando citas para el día seleccionado.'
                : 'Un resumen de todas tus citas.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {appointmentsForSelectedDay.length > 0 ? (
              appointmentsForSelectedDay.map((appt) => (
                <div key={appt.name} className="flex items-center space-x-4 rounded-lg border p-4">
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
                    <p className="text-sm text-muted-foreground">{appt.type}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-medium">{appt.time}</p>
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
    </div>
  );
}
