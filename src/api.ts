import type { ParkingSession, SlotRequest } from './types';

// Practice stand-in for the real backend. Accepts PIN 1234 only.
// takes a slotRequest, returns either a parkingsession object or null if wrong pin
export function fakeLookup(req: SlotRequest): ParkingSession | null {
  if (req.pin !== '1234') {//just a sample
    return null;
  }
  return {
    slotNumber: req.slotNumber,
    enteredAt: new Date(Date.now() - 95 * 60 * 1000).toISOString(), //just sample, 95 mins ago
    amountDue: 60,
    status: 'unpaid',
    receiptNo: 'aswadawdw',
  };
}

// The API gives UTC. This shows it in Philippine time, whatever the phone's clock is set to.
export function formatLocal(isoUtc: string): string {
  return new Intl.DateTimeFormat('en-PH', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Asia/Manila',
  }).format(new Date(isoUtc));
}