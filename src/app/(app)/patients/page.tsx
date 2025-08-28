
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
import { MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import Link from 'next/link';
import { format, parseISO } from 'date-fns';

const patients = [
  {
    id: 'olivia-martin',
    name: 'Olivia Martin',
    email: 'olivia.martin@email.com',
    lastVisit: '2023-11-20',
    status: 'Activo',
    notes: 'La paciente informó sentirse mucho mejor después del último tratamiento. Se recetaron dos semanas más de medicación.',
    history: 'Historial de alergias estacionales.',
  },
  {
    id: 'jackson-lee',
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    lastVisit: '2023-11-18',
    status: 'Activo',
    notes: 'Revisión de rutina. Todos los signos vitales son normales. Se recomendó continuar con el ejercicio regular.',
    history: 'Sin historial médico significativo.',
  },
  {
    id: 'isabella-nguyen',
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    lastVisit: '2023-10-05',
    status: 'Inactivo',
    notes: 'La paciente no asistió a su última cita de seguimiento programada.',
    history: 'Tratada previamente por una lesión deportiva menor.',
  },
  {
    id: 'william-kim',
    name: 'William Kim',
    email: 'will@email.com',
    lastVisit: '2023-11-21',
    status: 'Activo',
    notes: 'Se discutieron los resultados de las pruebas. Los resultados son positivos. No se necesita ninguna otra acción en este momento.',
    history: 'N/A',
  },
  {
    id: 'sofia-davis',
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
              <TableHead className="hidden md:table-cell">Estado</TableHead>
              <TableHead className="hidden md:table-cell">Última Visita</TableHead>
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
                      <p className="text-sm text-muted-foreground md:hidden">
                        {patient.email}
                      </p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">
                  <Badge
                    variant={patient.status === 'Activo' ? 'default' : 'secondary'}
                     className={patient.status === 'Activo' ? 'bg-green-600/20 text-green-700 border-green-600/20' : ''}
                  >
                    {patient.status}
                  </Badge>
                </TableCell>
                <TableCell className="hidden md:table-cell">{format(parseISO(patient.lastVisit), 'PPP')}</TableCell>
                <TableCell className="text-right">
                    <div className="flex items-center justify-end gap-2">
                        <AiFollowUpGenerator patient={patient} />
                        <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button aria-haspopup="true" size="icon" variant="ghost">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Toggle menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem asChild>
                                <Link href={`/patients/${patient.id}`}>Ver Perfil</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem>Editar</DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">Eliminar</DropdownMenuItem>
                        </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
