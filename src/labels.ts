import type { PaymentStatus } from './types';

// Turns a status into a sentence for the user.
export function statusLabel(status: PaymentStatus): string {
  if (status === 'paid') {
    return 'Paid. You can leave the lot.';
  }
  if (status === 'expired') {
    return 'This parking session has expired.';
  }
  // Hover over "status" on the next line: TypeScript knows it can only be 'unpaid' here.
  return 'Payment needed (' + status + ').';
}