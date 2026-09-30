import { useState } from 'react';
import {
  Alert, Box, Button, Checkbox, Chip, FormControlLabel, Paper, Stack, Typography,
} from '@mui/material';
import { SlotPinForm } from './components/SlotPinForm';
import { fakeLookup, formatLocal } from './api';
import { statusLabel } from './labels';
import type { ParkingSession, SlotRequest } from './types';

// Lesson 3: one union decides which screen shows.
// Each screen carries only the data it needs.
type Screen =
  | { name: 'terms' }
  | { name: 'slot'; error?: string }
  | { name: 'status'; session: ParkingSession };

export default function App() {
  // Lesson 6: state. Changing it re-renders App with the new screen.
  const [screen, setScreen] = useState<Screen>({ name: 'terms' });
  const [agreed, setAgreed] = useState(false);

  // Lesson 4: this fits the SubmitHandler shape, so SlotPinForm accepts it.
  function handleLookup(req: SlotRequest) {
    const session = fakeLookup(req);
    if (session === null) {
      setScreen({ name: 'slot', error: `That PIN doesn't match slot ${req.slotNumber}.` });
      return;
    }
    // Lesson 3: after the null check, TypeScript knows session is a ParkingSession.
    setScreen({ name: 'status', session });
  }

  function startOver() {
    setAgreed(false);
    setScreen({ name: 'terms' });
  }

  return (
    <Box sx={{ minHeight: '100dvh', display: 'grid', placeItems: 'center', p: 2 }}>
      <Paper sx={{ p: { xs: 2, sm: 4 }, width: '100%', maxWidth: 420 }}>
        {screen.name === 'terms' && (
          <Stack spacing={2}>
            <Typography variant="h5" component="h1">
              Terms of use
            </Typography>
            <Typography color="text.secondary">
              Parking fees are charged from the time you enter. Payments are final.
            </Typography>
            <FormControlLabel
              control={<Checkbox checked={agreed} onChange={(e) => setAgreed(e.target.checked)} />}
              label="I agree to the terms of use"
            />
            <Button variant="contained" size="large" disabled={!agreed} onClick={() => setScreen({ name: 'slot' })}>
              Continue
            </Button>
          </Stack>
        )}

        {screen.name === 'slot' && (
          <Stack spacing={2}>
            {screen.error && <Alert severity="error">{screen.error}</Alert>}
            <SlotPinForm onSubmit={handleLookup} />
          </Stack>
        )}

        {/* Lesson 3: narrowing. Inside here, screen.session is allowed. */}
        {screen.name === 'status' && (
          <Stack spacing={2}>
            <Typography variant="h5" component="h1">
              Slot {screen.session.slotNumber}
            </Typography>
            <Chip label={statusLabel(screen.session.status)} color="warning" sx={{ alignSelf: 'flex-start' }} />
            <Typography color="text.secondary">
              Parked since {formatLocal(screen.session.enteredAt)}
            </Typography>
            <Typography variant="h4" component="p">
              ₱{screen.session.amountDue.toFixed(2)}
            </Typography>
            <Button variant="outlined" onClick={startOver}>
              Start over
            </Button>
          </Stack>
        )}
      </Paper>
    </Box>
  );
}