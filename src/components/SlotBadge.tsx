// Lesson 5: the props object's shape. Same idea as SlotRequest in lesson 2.
interface SlotBadgeProps {
  slotNumber: number;
  reserved?: boolean;
}

// "SlotBadge takes one object that fits SlotBadgeProps.
//  Pull slotNumber and reserved out of it. If reserved is missing, use false."
export function SlotBadge({ slotNumber, reserved = false }: SlotBadgeProps) {
  return (
    <p>
      Slot {slotNumber}
      {reserved && ' (reserved)'}
    </p>
  );
}