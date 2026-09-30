// A union of string literals: only these three values are allowed.
export type PaymentStatus = 'unpaid' | 'paid' | 'expired';

// What the user types in.
export interface SlotRequest {
  slotNumber: number;
  pin: string; //string for the leading 0s like 0067 will not be 67
}

// What the API should send back
export interface ParkingSession {
  slotNumber: number;
  enteredAt: string;    // ISO date string in UTC, e.g. "2026-09-30T01:15:00Z"
  amountDue: number;    // in pesos
  status: PaymentStatus;
  receiptNo?: string;   // the ? means "may be missing"
}

//session: ParkingSession means "This function expects 
//an object that strictly matches the ParkingSession interface."

export function describe(session: ParkingSession): string {
  if (session.status === 'paid') {
    return `Slot ${session.slotNumber} is paid. Receipt ${session.receiptNo ?? 'pending'}.`;
  }
  return `Slot ${session.slotNumber} owes ₱${session.amountDue.toFixed(2)}.`;
}

const example: ParkingSession = {
  slotNumber: 7,
  enteredAt: '2026-09-30T01:15:00Z',
  amountDue: 60,
  status: 'unpaid', //ts case sensitive
};