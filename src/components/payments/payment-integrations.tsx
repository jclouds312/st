
'use client';

import { Button } from '@/components/ui/button';
import { CreditCard } from 'lucide-react';

const paymentProviders = [
  {
    name: 'Stripe',
    style: { backgroundColor: '#635BFF', color: 'white' },
    icon: <CreditCard className="mr-2 h-5 w-5" />,
  },
  {
    name: 'PayPal',
    style: { backgroundColor: '#003087', color: 'white' },
    icon: <CreditCard className="mr-2 h-5 w-5" />,
  },
  {
    name: 'MercadoPago',
    style: { backgroundColor: '#009EE3', color: 'white' },
    icon: <CreditCard className="mr-2 h-5 w-5" />,
  },
  {
    name: 'Bancolombia',
    style: { backgroundColor: '#FFD700', color: 'black' },
    icon: <CreditCard className="mr-2 h-5 w-5" />,
  },
  {
    name: 'Nequi',
    style: { backgroundColor: '#A940FF', color: 'white' },
    icon: <CreditCard className="mr-2 h-5 w-5" />,
  },
];

export function PaymentIntegrations() {
  return (
    <div className="space-y-4">
      {paymentProviders.map((provider) => (
        <Button
          key={provider.name}
          className="w-full justify-start py-6 text-lg"
          style={provider.style}
        >
          {provider.icon}
          Conectar con {provider.name}
        </Button>
      ))}
    </div>
  );
}
