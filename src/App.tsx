import { SlotBadge } from './components/SlotBadge';

export default function App() {
  return (
    <div style={{ padding: 24 }}>
      <SlotBadge slotNumber={3} />
      <SlotBadge slotNumber={12} reserved />
    </div>
  );
}