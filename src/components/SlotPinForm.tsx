import { useState, type FormEvent } from 'react';
import { Button, Stack, TextField, Typography } from '@mui/material';
import type { SubmitHandler } from '../types';

// Lesson 5: the props shape. onSubmit uses the function shape from lesson 4.
interface SlotPinFormProps {
  onSubmit: SubmitHandler;
  submitting?: boolean;
}

const MAX_SLOT = 20;

export function SlotPinForm({ onSubmit, submitting = false }: SlotPinFormProps) {
  // Lesson 6: state. Input values are always text, even for numbers.
  const [slot, setSlot] = useState('');
  const [pin, setPin] = useState('');
  const [tried, setTried] = useState(false); // only show errors after the first submit

  // Plain variables are fine here: they're recalculated from state on every render.
  const slotNum = Number(slot);
  const slotBad = slot === '' || slotNum < 1 || slotNum > MAX_SLOT;
  const pinBad = !/^\d{4}$/.test(pin);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // stop the browser from reloading the page
    setTried(true);
    if (slotBad || pinBad) return;
    onSubmit({ slotNumber: slotNum, pin }); // this object must fit SlotRequest
  }

  // Lesson 7: every attribute below is one field of TextFieldProps.
  return (
    <form onSubmit={handleSubmit} noValidate>
      <Stack spacing={2}>
        <Typography variant="h5" component="h1">
          Enter your slot
        </Typography>
        <TextField
          label="Slot number"
          value={slot}
          onChange={(e) => setSlot(e.target.value.replace(/\D/g, '').slice(0, 2))}
          error={tried && slotBad}
          helperText={tried && slotBad ? `Enter a slot from 1 to ${MAX_SLOT}.` : ' '}
          slotProps={{ htmlInput: { inputMode: 'numeric' } }}
          fullWidth
        />
        <TextField
          label="PIN"
          type="password"
          value={pin}
          onChange={(e) => setPin(e.target.value.replace(/\D/g, '').slice(0, 4))}
          error={tried && pinBad}
          helperText={tried && pinBad ? 'Enter the 4-digit PIN from your ticket.' : ' '}
          slotProps={{ htmlInput: { inputMode: 'numeric', autoComplete: 'off' } }}
          fullWidth
        />
        <Button type="submit" variant="contained" size="large" disabled={submitting}>
          {submitting ? 'Checking…' : 'Check slot'}
        </Button>
      </Stack>
    </form>
  );
}