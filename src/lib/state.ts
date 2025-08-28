import { atom } from 'jotai';

export type Appointment = {
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
    date: new Date(2024, 6, 23),
    status: 'Confirmada',
  },
  {
    name: 'Noah Williams',
    time: '11:30 AM',
    type: 'Revisión',
    date: new Date(2024, 6, 23),
    status: 'Confirmada',
  },
];

export const appointmentsAtom = atom<Appointment[]>(initialAppointments);
