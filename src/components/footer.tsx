import { Twitter, Facebook, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';
import { MediFlowLogo } from './icons';

export function Footer() {
  return (
    <footer className="mt-auto border-t bg-background">
      <div className="container mx-auto px-4 py-8 md:px-6">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="flex flex-col items-start gap-4">
            <Link href="/dashboard" className="flex items-center gap-2 font-semibold">
              <MediFlowLogo className="h-8 w-8 text-primary" />
              <span className="text-xl font-semibold">MediFlow</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Optimizando la Atención al Paciente.
            </p>
          </div>
          <div className="grid gap-4 md:col-span-2 md:grid-cols-3">
            <div>
              <h3 className="font-semibold">Navegación</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="/dashboard" className="text-muted-foreground hover:text-foreground">Panel</Link></li>
                <li><Link href="/appointments" className="text-muted-foreground hover:text-foreground">Citas</Link></li>
                <li><Link href="/patients" className="text-muted-foreground hover:text-foreground">Pacientes</Link></li>
                <li><Link href="/settings" className="text-muted-foreground hover:text-foreground">Configuración</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Legal</h3>
              <ul className="mt-4 space-y-2 text-sm">
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Términos de Servicio</Link></li>
                <li><Link href="#" className="text-muted-foreground hover:text-foreground">Política de Privacidad</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">Síguenos</h3>
              <div className="mt-4 flex space-x-4">
                <Link href="#" aria-label="Twitter" className="text-muted-foreground hover:text-foreground">
                  <Twitter className="h-5 w-5" />
                </Link>
                <Link href="#" aria-label="Facebook" className="text-muted-foreground hover:text-foreground">
                  <Facebook className="h-5 w-5" />
                </Link>
                <Link href="#" aria-label="Instagram" className="text-muted-foreground hover:text-foreground">
                  <Instagram className="h-5 w-5" />
                </Link>
                <Link href="#" aria-label="LinkedIn" className="text-muted-foreground hover:text-foreground">
                  <Linkedin className="h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} MediFlow. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
