
import { atom } from 'jotai';
import { collection, query, where, getDocs, Timestamp, addDoc, onSnapshot } from 'firebase/firestore';
import { db } from './firebase';

export type Appointment = {
  id?: string;
  name: string;
  time: string;
  type: string;
  date: Date;
  status: 'Confirmada' | 'Pendiente' | 'Cancelada';
};

// This atom will hold the appointments fetched from Firestore
export const appointmentsAtom = atom<Appointment[]>([]);

// Atom to get appointments from firestore
export const getAppointmentsAtom = atom(
  (get) => get(appointmentsAtom),
  (_get, set) => {
    const q = query(collection(db, "appointments"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const appointments: Appointment[] = [];
      querySnapshot.forEach((doc) => {
          const data = doc.data();
          appointments.push({
              id: doc.id,
              ...data,
              date: (data.date as Timestamp).toDate(),
          } as Appointment);
      });
      set(appointmentsAtom, appointments);
    });
    return unsubscribe;
  }
);


export const addAppointmentAtom = atom(
  null,
  async (_get, _set, newAppointment: Omit<Appointment, 'id'>) => {
    try {
      await addDoc(collection(db, "appointments"), {
        ...newAppointment,
        date: Timestamp.fromDate(newAppointment.date)
      });
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }
);
