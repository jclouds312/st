
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';

const medicalCourses = [
  {
    id: 'entendiendo-su-diagnostico',
    title: 'Entendiendo su Diagnóstico',
    description:
      'Aprenda más sobre su condición, opciones de tratamiento y qué esperar.',
    imageUrl: 'https://picsum.photos/600/400?random=1',
    imageHint: 'gráfico médico',
  },
  {
    id: 'nutricion-vida-saludable',
    title: 'Nutrición para una Vida Saludable',
    description:
      'Descubra las mejores opciones dietéticas para apoyar su salud y recuperación.',
      imageUrl: 'https://picsum.photos/600/400?random=2',
      imageHint: 'comida saludable',
  },
  {
    id: 'guia-cuidados-postoperatorios',
    title: 'Guía de Cuidados Postoperatorios',
    description: 'Una guía paso a paso para asegurar una recuperación sin problemas después de la cirugía.',
    imageUrl: 'https://picsum.photos/600/400?random=3',
    imageHint: 'recuperación del paciente',
  },
];

const systemCourses = [
    {
      id: 'capacitacion-sistema-medicos',
      title: 'Capacitación del Sistema para Médicos',
      description: 'Aprenda a utilizar todas las funciones de MediFlow para optimizar la atención al paciente.',
      imageUrl: 'https://picsum.photos/600/400?random=4',
      imageHint: 'doctor computadora',
    },
    {
      id: 'guia-administradores',
      title: 'Guía para Administradores',
      description: 'Gestione equipos, configuraciones y supervise el rendimiento de la plataforma.',
      imageUrl: 'https://picsum.photos/600/400?random=5',
      imageHint: 'panel de control',
    },
    {
      id: 'integracion-n8n',
      title: 'Integración con n8n',
      description: 'Aprenda a conectar MediFlow con otras aplicaciones utilizando n8n para automatizar flujos de trabajo.',
      imageUrl: 'https://picsum.photos/600/400?random=6',
      imageHint: 'automatización de flujo de trabajo',
    },
]

export default function CoursesPage() {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Capacitación para Pacientes</h1>
        <p className="text-muted-foreground">
          Acceda a materiales educativos y recursos para su viaje de salud.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {medicalCourses.map((course) => (
          <Card key={course.title} className="flex flex-col">
            <CardHeader className="p-0">
              <Image
                src={course.imageUrl}
                alt={course.title}
                width={600}
                height={400}
                data-ai-hint={course.imageHint}
                className="aspect-video w-full rounded-t-lg object-cover"
              />
            </CardHeader>
            <div className="flex flex-1 flex-col p-6">
                <CardTitle className="mb-2">{course.title}</CardTitle>
                <CardDescription className="flex-1">{course.description}</CardDescription>
            </div>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/courses/${course.id}`}>Ver Curso</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
       <div>
        <h1 className="text-2xl font-bold tracking-tight">Capacitación del Sistema</h1>
        <p className="text-muted-foreground">
          Recursos para que los médicos y administradores dominen el sistema.
        </p>
      </div>
       <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {systemCourses.map((course) => (
          <Card key={course.title} className="flex flex-col">
            <CardHeader className="p-0">
              <Image
                src={course.imageUrl}
                alt={course.title}
                width={600}
                height={400}
                data-ai-hint={course.imageHint}
                className="aspect-video w-full rounded-t-lg object-cover"
              />
            </CardHeader>
            <div className="flex flex-1 flex-col p-6">
                <CardTitle className="mb-2">{course.title}</CardTitle>
                <CardDescription className="flex-1">{course.description}</CardDescription>
            </div>
            <CardFooter>
              <Button asChild className="w-full">
                <Link href={`/courses/${course.id}`}>Ver Capacitación</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
