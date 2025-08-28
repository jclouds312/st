
'use client';

import { notFound, useParams } from 'next/navigation';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { AiFollowUpGenerator } from '@/components/patients/ai-follow-up-generator';
import { format, parseISO } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAtom } from 'jotai';
import { appointmentsAtom } from '@/lib/state';

const patients = [
  {
    id: 'olivia-martin',
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    lastVisit: '2023-11-20',
    status: 'Activo',
    notes: 'La paciente informó sentirse mucho mejor después del último tratamiento. Se recetaron dos semanas más de medicación.',
    history: 'Historial de alergias estacionales. Diagnosticada con asma en la infancia.',
  },
  {
    id: 'jackson-lee',
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    lastVisit: '2023-11-18',
    status: 'Activo',
    notes: 'Revisión de rutina. Todos los signos vitales son normales. Se recomendó continuar con el ejercicio regular.',
    history: 'Sin historial médico significativo. No fumador, bebe ocasionalmente.',
  },
  {
    id: 'isabella-nguyen',
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    lastVisit: '2023-10-05',
    status: 'Inactivo',
    notes: 'La paciente no asistió a su última cita de seguimiento programada.',
    history: 'Tratada previamente por una lesión deportiva menor en la rodilla derecha (2022).',
  },
  {
    id: 'william-kim',
    name: 'William Kim',
    email: 'will@email.com',
    lastVisit: '2023-11-21',
    status: 'Activo',
    notes: 'Se discutieron los resultados de las pruebas. Los resultados son positivos. No se necesita ninguna otra acción en este momento.',
    history: 'Hipertensión diagnosticada en 2021, controlada con medicación.',
  },
  {
    id: 'sofia-davis',
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    lastVisit: '2023-09-15',
    status: 'Inactivo',
    notes: 'Completó el curso completo de tratamiento.',
    history: 'Tratada por una infección respiratoria. Sin alergias conocidas.',
  },
];


export default function PatientProfilePage() {
    const params = useParams();
    const patientId = params.id as string;
    const [appointments] = useAtom(appointmentsAtom);

    const patient = patients.find(p => p.id === patientId);

    if (!patient) {
        notFound();
    }
    
    const patientAppointments = appointments.filter(appt => appt.name.toLowerCase().includes(patient.name.split(' ')[0].toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
        <Avatar className="h-24 w-24 border">
          <AvatarImage data-ai-hint="person portrait" src={`https://picsum.photos/seed/${patient.name}/100/100`} alt={patient.name} />
          <AvatarFallback>{patient.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
        </Avatar>
        <div className="grid gap-1">
          <h1 className="text-2xl font-bold">{patient.name}</h1>
          <p className="text-muted-foreground">{patient.email}</p>
           <Badge
                variant={patient.status === 'Activo' ? 'default' : 'secondary'}
                className={`w-fit ${patient.status === 'Activo' ? 'bg-green-600/20 text-green-700 border-green-600/20' : ''}`}
            >
                {patient.status}
            </Badge>
        </div>
        <div className="ml-auto flex gap-2">
            <AiFollowUpGenerator patient={patient} />
        </div>
      </div>

        <div className="grid md:grid-cols-2 gap-6">
            <Card>
                <CardHeader>
                    <CardTitle>Historial Clínico</CardTitle>
                    <CardDescription>Resumen de la información médica relevante del paciente.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm">{patient.history}</p>
                </CardContent>
            </Card>
             <Card>
                <CardHeader>
                    <CardTitle>Últimas Notas</CardTitle>
                    <CardDescription>Notas de la consulta más reciente.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-sm">{patient.notes}</p>
                </CardContent>
            </Card>
        </div>

      <Card>
        <CardHeader>
          <CardTitle>Historial de Citas</CardTitle>
          <CardDescription>Un registro de todas las citas pasadas y próximas.</CardDescription>
        </CardHeader>
        <CardContent>
           <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Hora</TableHead>
                  <TableHead>Tipo</TableHead>
                  <TableHead>Estado</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {patientAppointments.length > 0 ? patientAppointments.map((appt, index) => (
                  <TableRow key={`${appt.date}-${index}`}>
                    <TableCell>{format(appt.date, 'PPP', { locale: es })}</TableCell>
                    <TableCell>{appt.time}</TableCell>
                    <TableCell>{appt.type}</TableCell>
                    <TableCell>
                      <Badge
                        variant={
                          appt.status === 'Confirmada'
                            ? 'default'
                            : appt.status === 'Pendiente'
                            ? 'secondary'
                            : 'destructive'
                        }
                      >
                        {appt.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                )) : (
                    <TableRow>
                        <TableCell colSpan={4} className="text-center h-24">
                            No hay citas registradas para este paciente.
                        </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
        </CardContent>
      </Card>
      
       <Card>
        <CardHeader>
            <CardTitle>Nueva Nota de Consulta</CardTitle>
            <CardDescription>Añada notas sobre la visita actual.</CardDescription>
        </CardHeader>
        <CardContent className='space-y-4'>
            <Textarea placeholder="Escriba aquí las notas de la consulta..." rows={6} />
            <Button>Guardar Nota</Button>
        </CardContent>
       </Card>

    </div>
  );
}

