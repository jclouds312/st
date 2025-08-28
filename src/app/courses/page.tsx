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

const courses = [
  {
    title: 'Understanding Your Diagnosis',
    description:
      'Learn more about your condition, treatment options, and what to expect.',
    imageUrl: 'https://picsum.photos/600/400?random=1',
    imageHint: 'medical chart',
    link: '#',
  },
  {
    title: 'Nutrition for a Healthy Life',
    description:
      'Discover the best dietary choices to support your health and recovery.',
      imageUrl: 'https://picsum.photos/600/400?random=2',
      imageHint: 'healthy food',
    link: '#',
  },
  {
    title: 'Post-Operative Care Guide',
    description: 'A step-by-step guide to ensure a smooth recovery after surgery.',
    imageUrl: 'https://picsum.photos/600/400?random=3',
    imageHint: 'patient recovery',
    link: '#',
  },
  {
    title: 'Managing Chronic Pain',
    description:
      'Techniques and strategies for living comfortably with chronic pain.',
      imageUrl: 'https://picsum.photos/600/400?random=4',
      imageHint: 'yoga meditation',
    link: '#',
  },
  {
    title: 'Physical Therapy Exercises',
    description: 'A library of exercises to help you regain strength and mobility.',
    imageUrl: 'https://picsum.photos/600/400?random=5',
    imageHint: 'physical therapy',
    link: '#',
  },
  {
    title: 'Mental Wellness and You',
    description:
      'Resources to support your mental health throughout your treatment journey.',
      imageUrl: 'https://picsum.photos/600/400?random=6',
      imageHint: 'calm serene',
    link: '#',
  },
];

export default function CoursesPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Patient Courses</h1>
        <p className="text-muted-foreground">
          Access educational materials and resources for your health journey.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((course) => (
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
                <Link href={course.link}>Start Course</Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
