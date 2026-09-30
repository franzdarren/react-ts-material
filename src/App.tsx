import Button from '@mui/material/Button';
import {SlotBadge} from './components/SlotBadge'

export default function App() {
  return (
    <div style={{ padding: 24 }}>
      <h1>asd</h1>
      <Button variant="contained" disabled >material ui button</Button>
      <Button variant="text">material ui button</Button>
      <SlotBadge slotNumber={3} />
      <SlotBadge slotNumber={12} reserved onSelect={(n) => alert(`Picked ${n}`)}>
        <p>Held for a partner company</p>
      </SlotBadge>
    </div>
  );
}