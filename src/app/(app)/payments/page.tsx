
import { PaymentQR } from '@/components/payments/payment-qr';
import { PaymentIntegrations } from '@/components/payments/payment-integrations';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function PaymentsPage() {
  return (
    <div className="mx-auto max-w-md space-y-8">
      <PaymentQR />
      <Card>
        <CardHeader>
            <CardTitle>Conectar Pasarelas de Pago</CardTitle>
            <CardDescription>
                Habilita tus métodos de pago preferidos para recibir pagos en línea.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <PaymentIntegrations />
        </CardContent>
      </Card>
    </div>
  );
}
