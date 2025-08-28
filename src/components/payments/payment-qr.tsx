'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import Image from 'next/image';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, QrCode } from 'lucide-react';

const formSchema = z.object({
  patientName: z.string().min(2, 'Patient name is required.'),
  amount: z.coerce.number().min(0.01, 'Amount must be greater than 0.'),
});

type PaymentDetails = z.infer<typeof formSchema>;

export function PaymentQR() {
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(
    null
  );
  const { toast } = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      patientName: '',
      amount: 0,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    setPaymentDetails(values);
  }

  function handleVerifyPayment() {
    toast({
      title: 'Payment Verified',
      description: `Payment of $${paymentDetails?.amount.toFixed(
        2
      )} for ${paymentDetails?.patientName} has been confirmed.`,
    });
    setPaymentDetails(null);
    form.reset();
  }

  if (paymentDetails) {
    return (
      <Card className="w-full text-center">
        <CardHeader>
          <CardTitle>Payment Request</CardTitle>
          <CardDescription>
            Scan the QR code to complete the payment.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col items-center gap-4">
          <Image
            src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=payment-for-${paymentDetails.patientName.replace(
              ' ',
              '-'
            )}-amount-${paymentDetails.amount}`}
            alt="Payment QR Code"
            width={200}
            height={200}
            className="rounded-lg"
          />
          <div className="text-lg">
            Patient: <span className="font-semibold">{paymentDetails.patientName}</span>
          </div>
          <div className="text-3xl font-bold">
            ${paymentDetails.amount.toFixed(2)}
          </div>
        </CardContent>
        <CardFooter className="flex-col gap-2">
          <Button onClick={handleVerifyPayment} className="w-full">
            <CheckCircle className="mr-2 h-4 w-4" />
            Verify Payment
          </Button>
          <Button
            variant="outline"
            onClick={() => setPaymentDetails(null)}
            className="w-full"
          >
            Cancel
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>QR Code Payment System</CardTitle>
        <CardDescription>
          Generate a QR code to collect payment from a patient.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="patientName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Patient Name</FormLabel>
                  <FormControl>
                    <Input placeholder="e.g., John Doe" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input type="number" step="0.01" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <Button type="submit" className="w-full">
                <QrCode className="mr-2 h-4 w-4" />
                Generate QR Code
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
