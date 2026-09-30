// The shapes of the data in our app.
// Nothing in this file runs. It's all for the checker (lesson 1).

// Lesson 3: a union. A status is exactly one of these three.
export type PaymentStatus = 'unpaid' | 'paid' | 'expired';

// Lesson 2: what the user types on the slot + PIN screen.
export interface SlotRequest {
  slotNumber: number; // a number, because we compare it (1 to 20)
  pin: string;        // text, so "0042" keeps its zeros
}

// Lesson 2: what we get back after looking up a slot.
export interface ParkingSession {
  slotNumber: number;
  enteredAt: string;     // a UTC date as text, e.g. "2026-09-30T01:15:00Z"
  amountDue: number;     // pesos
  status: PaymentStatus; // lesson 3: only the three allowed values
  receiptNo?: string;    // optional: only exists after payment
}

// this function will take a aslotrequest and return nothing
export type SubmitHandler = (req: SlotRequest) => void;