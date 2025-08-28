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
    status: 'Active',
    notes: 'Patient reported feeling much better after the last treatment. Prescribed two more weeks of medication.',
    history: 'History of seasonal allergies.',
  },
  {
    name: 'Jackson Lee',
    email: 'jackson.lee@email.com',
    lastVisit: '2023-11-18',
    status: 'Active',
    notes: 'Routine check-up. All vitals are normal. Advised to continue with regular exercise.',
    history: 'No significant medical history.',
  },
  {
    name: 'Isabella Nguyen',
    email: 'isabella.nguyen@email.com',
    lastVisit: '2023-10-05',
    status: 'Inactive',
    notes: 'Patient missed their last scheduled follow-up.',
    history: 'Previously treated for a minor sports injury.',
  },
  {
    name: 'William Kim',
    email: 'will@email.com',
    lastVisit: '2023-11-21',
    status: 'Active',
    notes: 'Discussed test results. Results are positive. No further action is needed at this time.',
    history: 'N/A',
  },
  {
    name: 'Sofia Davis',
    email: 'sofia.davis@email.com',
    lastVisit: '2023-09-15',
    status: 'Inactive',
    notes: 'Completed full course of treatment.',
    history: 'Treated for a respiratory infection.',
  },
];

export default function PatientsPage() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Patients</CardTitle>
        <CardDescription>
          Manage your patients and view their details.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Patient</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Last Visit</TableHead>
              <TableHead className="text-right">Actions</TableHead>
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
                    variant={patient.status === 'Active' ? 'secondary' : 'outline'}
                     className={patient.status === 'Active' ? 'bg-green-100 text-green-800' : ''}
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
