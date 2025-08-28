
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
import { format } from 'date-fns';
import { es } from 'date-fns/locale';
import { useAtomValue, useSetAtom } from 'jotai';
import { appointmentsAtom, getAppointmentsAtom, Appointment } from '@/lib/state';
import { useEffect, useState } from 'react';
import { doc, getDoc, DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Skeleton } from '@/components/ui/skeleton';

type Patient = {
  id: string;
  name: string;
  email: string;
  lastVisit: string;
  status: string;
  notes: string;
  history: string;
};

export default function PatientProfilePage() {
    const params = useParams();
    const patientId = params.id as string;
    
    const allAppointments = useAtomValue(appointmentsAtom);
    const getAppointments = useSetAtom(getAppointmentsAtom);

    const [patient, setPatient] = useState<Patient | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchPatient = async () => {
            if (!patientId) return;
            setIsLoading(true);
            const patientDocRef = doc(db, 'patients', patientId);
            const patientDocSnap = await getDoc(patientDocRef);

            if (patientDocSnap.exists()) {
                setPatient({ id: patientDocSnap.id, ...patientDocSnap.data() } as Patient);
            } else {
                notFound();
            }
            setIsLoading(false);
        }
        fetchPatient();
        
        const unsubscribe = getAppointments();
        return () => unsubscribe();
    }, [patientId, getAppointments]);

    if (isLoading || !patient) {
        return (
            <div className='space-y-6'>
                <div className="flex items-center gap-4">
                    <Skeleton className="h-24 w-24 rounded-full" />
                    <div className='space-y-2'>
                        <Skeleton className="h-7 w-48" />
                        <Skeleton className="h-5 w-64" />
                        <Skeleton className="h-6 w-20 rounded-full" />
                    </div>
                </div>
                <div className='grid md:grid-cols-2 gap-6'>
                    <Skeleton className="h-40" />
                    <Skeleton className="h-40" />
                </div>
                <Skeleton className="h-64" />
                <Skeleton className="h-48" />
            </div>
        )
    }
    
    const patientAppointments = allAppointments.filter(appt => appt.name.toLowerCase().includes(patient.name.split(' ')[0].toLowerCase()));

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
