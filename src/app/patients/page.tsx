import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { AiFollowUpGenerator } from '@/components/patients/ai-follow-up-generator';

const patients = [
  {
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    lastVisit: '2023-11-20',
    status: 'Activo',
    notes: 'La paciente informó sentirse mucho mejor después del último tratamiento. Se recetaron dos semanas más de medicación.',
    history: 'Historial de alergias estacionales.',
  },
  {
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    lastVisit: '2023-11-18',
    status: 'Activo',
    notes: 'Revisión de rutina. Todos los signos vitales son normales. Se recomendó continuar con el ejercicio regular.',
    history: 'Sin historial médico significativo.',
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    lastVisit: '2023-10-05',
    status: 'Inactivo',
    notes: 'La paciente no asistió a su última cita de seguimiento programada.',
    history: 'Tratada previamente por una lesión deportiva menor.',
  },
  {
    name: 'William Kim',
    email: 'will@email.com',
    lastVisit: '2023-11-21',
    status: 'Activo',
    notes: 'Se discutieron los resultados de las pruebas. Los resultados son positivos. No se necesita ninguna otra acción en este momento.',
    history: 'N/A',
  },
  {
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    lastVisit: '2023-09-15',
    status: 'Inactivo',
    notes: 'Completó el curso completo de tratamiento.',
    history: 'Tratada por una infección respiratoria.',
  },
];

export default function PatientsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Pacientes</CardTitle>
        <CardDescription>
          Gestiona tus pacientes y visualiza sus detalles.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Paciente</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead>Última Visita</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {patients.map((patient) => (
              <TableRow key={patient.email}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Avatar className="h-9 w-9">
                      <AvatarImage data-ai-hint="person portrait" src={`https://picsum.photos/seed/${patient.name}/40/40`} alt="Avatar" />
                      <AvatarFallback>{patient.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="grid gap-1">
                      <p className="text-sm font-medium leading-none">
                        {patient.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {patient.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Badge
                    variant={patient.status === 'Activo' ? 'secondary' : 'outline'}
                     className={patient.status === 'Activo' ? 'bg-green-100 text-green-800' : ''}
                  >
                    {patient.status}
                  </Badge>
                </TableCell>
                <TableCell>{patient.lastVisit}</TableCell>
                <TableCell className="text-right">
                    <AiFollowUpGenerator patient={patient} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
