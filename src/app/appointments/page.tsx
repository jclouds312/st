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
import { WhatsAppIcon } from '@/components/whatsapp-icon';

const upcomingAppointments = [
    {
        name: "Liam Johnson",
        time: "10:00 AM",
        type: "Consultation"
    },
    {
        name: "Noah Williams",
        time: "11:30 AM",
        type: "Check-up"
    },
    {
        name: "Emma Brown",
        time: "2:00 PM",
        type: "Follow-up"
    },
     {
        name: "James Jones",
        time: "3:30 PM",
        type: "Consultation"
    }
]

export default function AppointmentsPage() {
  return (
    <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
        <Card className="sm:col-span-2" x-chunk="dashboard-05-chunk-0">
          <CardHeader className="pb-3">
            <CardTitle>Appointments</CardTitle>
            <CardDescription className="max-w-lg text-balance leading-relaxed">
              Manage and view your patient appointments.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button>Create New Appointment</Button>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-05-chunk-1">
          <CardHeader className="pb-2">
            <CardDescription>This Week</CardDescription>
            <CardTitle className="text-4xl">25</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +10% from last week
            </div>
          </CardContent>
        </Card>
        <Card x-chunk="dashboard-05-chunk-2">
          <CardHeader className="pb-2">
            <CardDescription>This Month</CardDescription>
            <CardTitle className="text-4xl">120</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-xs text-muted-foreground">
              +5% from last month
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardContent className="p-0">
              <Calendar
                mode="single"
                className="w-full p-3"
                classNames={{
                  months:
                    'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
                  month: 'space-y-4',
                  caption: 'flex justify-center pt-1 relative items-center',
                  caption_label: 'text-sm font-medium',
                  nav: 'space-x-1 flex items-center',
                  nav_button:
                    'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100',
                  nav_button_previous: 'absolute left-1',
                  nav_button_next: 'absolute right-1',
                  table: 'w-full border-collapse space-y-1',
                  head_row: 'flex',
                  head_cell:
                    'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem]',
                  row: 'flex w-full mt-2',
                  cell: 'h-9 w-9 text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20',
                  day: 'h-9 w-9 p-0 font-normal aria-selected:opacity-100',
                  day_selected:
                    'bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground',
                  day_today: 'bg-accent text-accent-foreground',
                  day_outside: 'text-muted-foreground opacity-50',
                  day_disabled: 'text-muted-foreground opacity-50',
                  day_range_middle:
                    'aria-selected:bg-accent aria-selected:text-accent-foreground',
                  day_hidden: 'invisible',
                }}
              />
            </CardContent>
          </Card>
        </div>
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Upcoming</CardTitle>
              <CardDescription>
                Your next appointments for today.
              </CardDescription>
            </CardHeader>
            <CardContent className="grid gap-4">
                {upcomingAppointments.map((appt) => (
                    <div className="flex items-center gap-4" key={appt.name}>
                        <Avatar className="hidden h-9 w-9 sm:flex">
                        <AvatarImage data-ai-hint="person portrait" src={`https://picsum.photos/seed/${appt.name}/40/40`} alt="Avatar" />
                        <AvatarFallback>{appt.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="grid gap-1">
                        <p className="text-sm font-medium leading-none">{appt.name}</p>
                        <p className="text-sm text-muted-foreground">{appt.type}</p>
                        </div>
                        <div className="ml-auto font-medium">{appt.time}</div>
                    </div>
                ))}
            </CardContent>
            <CardContent>
              <Button size="sm" className="w-full flex items-center gap-2">
                <WhatsAppIcon className="h-4 w-4" />
                Schedule via WhatsApp
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
