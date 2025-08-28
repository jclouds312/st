'use client';

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, PlayCircle, Clock } from 'lucide-react';
import Image from 'next/image';
import { notFound } from 'next/navigation';

const coursesData = {
  'entendiendo-su-diagnostico': {
    title: 'Entendiendo su Diagnóstico',
    description: 'Aprenda más sobre su condición, opciones de tratamiento y qué esperar.',
    imageUrl: 'https://picsum.photos/1200/600?random=1',
    imageHint: 'gráfico médico',
    modules: [
      { title: 'Módulo 1: Introducción a su Condición', content: 'Video de 10 minutos explicando los conceptos básicos.' },
      { title: 'Módulo 2: Opciones de Tratamiento', content: 'Revisión detallada de los tratamientos disponibles.' },
      { title: 'Módulo 3: Cambios en el Estilo de Vida', content: 'Consejos sobre dieta, ejercicio y manejo del estrés.' },
    ],
  },
  'nutricion-vida-saludable': {
    title: 'Nutrición para una Vida Saludable',
    description: 'Descubra las mejores opciones dietéticas para apoyar su salud y recuperación.',
    imageUrl: 'https://picsum.photos/1200/600?random=2',
    imageHint: 'comida saludable',
     modules: [
      { title: 'Módulo 1: Principios de Nutrición', content: 'Fundamentos de una dieta balanceada.' },
      { title: 'Módulo 2: Planificación de Comidas', content: 'Cómo crear planes de comidas saludables y deliciosos.' },
      { title: 'Módulo 3: Cocina Saludable', content: 'Técnicas de cocina para preservar nutrientes.' },
    ],
  },
   'guia-cuidados-postoperatorios': {
    title: 'Guía de Cuidados Postoperatorios',
    description: 'Una guía paso a paso para asegurar una recuperación sin problemas después de la cirugía.',
    imageUrl: 'https://picsum.photos/1200/600?random=3',
    imageHint: 'recuperación del paciente',
     modules: [
      { title: 'Módulo 1: Cuidado de Heridas', content: 'Instrucciones sobre cómo mantener el sitio quirúrgico limpio y seguro.' },
      { title: 'Módulo 2: Manejo del Dolor', content: 'Estrategias para controlar el dolor postoperatorio.' },
      { title: 'Módulo 3: Rehabilitación y Ejercicio', content: 'Ejercicios seguros para promover la curación.' },
    ],
  },
  'capacitacion-sistema-medicos': {
    title: 'Capacitación del Sistema para Médicos',
    description: 'Aprenda a utilizar todas las funciones de MediFlow para optimizar la atención al paciente.',
    imageUrl: 'https://picsum.photos/1200/600?random=4',
    imageHint: 'doctor computadora',
     modules: [
      { title: 'Módulo 1: Gestión de Pacientes', content: 'Cómo registrar, actualizar y gestionar perfiles de pacientes.' },
      { title: 'Módulo 2: Programación de Citas', content: 'Uso del calendario para gestionar citas y recordatorios.' },
      { title: 'Módulo 3: Funciones de IA', content: 'Aprovechamiento de la IA para generar resúmenes y seguimientos.' },
    ],
  },
  'guia-administradores': {
    title: 'Guía para Administradores',
    description: 'Gestione equipos, configuraciones y supervise el rendimiento de la plataforma.',
    imageUrl: 'https://picsum.photos/1200/600?random=5',
    imageHint: 'panel de control',
     modules: [
      { title: 'Módulo 1: Configuración del Sistema', content: 'Configuración inicial y personalización de la plataforma.' },
      { title: 'Módulo 2: Gestión de Equipos', content: 'Invitar y administrar roles de miembros del equipo.' },
      { title: 'Módulo 3: Informes y Análisis', content: 'Seguimiento del rendimiento y generación de informes.' },
    ],
  },
  'integracion-n8n': {
    title: 'Integración con n8n',
    description: 'Aprenda a conectar MediFlow con otras aplicaciones utilizando n8n para automatizar flujos de trabajo.',
    imageUrl: 'https://picsum.photos/1200/600?random=6',
    imageHint: 'automatización de flujo de trabajo',
     modules: [
      { title: 'Módulo 1: Introducción a n8n', content: 'Conceptos básicos de n8n y su funcionamiento.' },
      { title: 'Módulo 2: Creación de Flujos de Trabajo', content: 'Guía paso a paso para construir su primer flujo de trabajo.' },
      { title: 'Módulo 3: Casos de Uso Avanzados', content: 'Ejemplos de automatizaciones complejas para su clínica.' },
    ],
  },
};

export default function CourseDetailPage({
  params,
}: {
  params: { courseId: string };
}) {
  const course = coursesData[params.courseId as keyof typeof coursesData];

  if (!course) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <div className="relative h-64 w-full rounded-lg">
        <Image
          src={course.imageUrl}
          alt={course.title}
          fill
          data-ai-hint={course.imageHint}
          className="rounded-lg object-cover"
        />
        <div className="absolute inset-0 rounded-lg bg-black/50" />
        <div className="absolute bottom-6 left-6 text-white">
          <h1 className="text-4xl font-bold">{course.title}</h1>
          <p className="text-lg">{course.description}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Módulos del Curso</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {course.modules.map((module, index) => (
                  <AccordionItem value={`item-${index}`} key={module.title}>
                    <AccordionTrigger>{module.title}</AccordionTrigger>
                    <AccordionContent>
                      <div className="flex items-center justify-between">
                        <p>{module.content}</p>
                        <Button variant="ghost" size="icon">
                          <PlayCircle className="h-6 w-6" />
                        </Button>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Horario de Clases</CardTitle>
            </CardHeader>
            <CardContent>
              <Calendar
                mode="multiple"
                className="w-full justify-center p-0"
              />
               <p className="text-sm text-muted-foreground mt-2 text-center">Seleccione las fechas que le funcionen.</p>
            </CardContent>
          </Card>
          <div className="space-y-2">
            <Button className="w-full">
              <CheckCircle className="mr-2 h-4 w-4" />
              Inscribirse en el Curso
            </Button>
             <Button variant="secondary" className="w-full">
              <Clock className="mr-2 h-4 w-4" />
              Agendar Clase Privada
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
