'use server';
/**
 * @fileOverview AI-powered follow-up message generator for patients after appointments.
 *
 * - generateAiFollowUpMessage - A function that generates personalized follow-up messages.
 * - GenerateAiFollowUpMessageInput - The input type for the generateAiFollowUpMessage function.
 * - GenerateAiFollowUpMessageOutput - The return type for the generateAiFollowUpMessage function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateAiFollowUpMessageInputSchema = z.object({
  patientName: z.string().describe('The name of the patient.'),
  appointmentNotes: z.string().describe('Notes from the patient\'s appointment.'),
  patientHistory: z.string().optional().describe('Relevant patient history.'),
});
export type GenerateAiFollowUpMessageInput = z.infer<typeof GenerateAiFollowUpMessageInputSchema>;

const GenerateAiFollowUpMessageOutputSchema = z.object({
  followUpMessage: z.string().describe('The personalized follow-up message for the patient.'),
});
export type GenerateAiFollowUpMessageOutput = z.infer<typeof GenerateAiFollowUpMessageOutputSchema>;

export async function generateAiFollowUpMessage(input: GenerateAiFollowUpMessageInput): Promise<GenerateAiFollowUpMessageOutput> {
  return generateAiFollowUpMessageFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateAiFollowUpMessagePrompt',
  input: {schema: GenerateAiFollowUpMessageInputSchema},
  output: {schema: GenerateAiFollowUpMessageOutputSchema},
  prompt: `You are an AI assistant designed to generate personalized follow-up messages for patients after their appointments.

  Your goal is to create a message that is both helpful and encouraging, promoting patient engagement and adherence to treatment plans.

  Consider the following information when crafting the message:

  Patient Name: {{{patientName}}}
  Appointment Notes: {{{appointmentNotes}}}
  Patient History (if available): {{{patientHistory}}}

  Please generate a follow-up message that is conversational and tailored to the patient's specific needs and circumstances. The message should:

  - Acknowledge the appointment and thank the patient for their visit.
  - Summarize key takeaways from the appointment notes.
  - Offer personalized advice or recommendations based on the appointment notes and patient history.
  - Encourage the patient to follow their treatment plan and address any concerns or questions they may have.
  - Maintain a positive and supportive tone throughout the message.

  Follow-up Message:`,
});

const generateAiFollowUpMessageFlow = ai.defineFlow(
  {
    name: 'generateAiFollowUpMessageFlow',
    inputSchema: GenerateAiFollowUpMessageInputSchema,
    outputSchema: GenerateAiFollowUpMessageOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
