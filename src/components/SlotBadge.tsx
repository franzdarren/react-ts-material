import type { ReactNode } from 'react';
import { Box, Card, CardActionArea, CardContent, Chip, Typography } from '@mui/material';

interface SlotBadgeProps {
  slotNumber: number;
  reserved?: boolean;          // optional
  children?: ReactNode;        // anything React can render
  onSelect?: (slotNumber: number) => void; // a callback prop
}

export function SlotBadge({ slotNumber, reserved = false, children, onSelect }: SlotBadgeProps) {
  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <CardActionArea onClick={() => onSelect?.(slotNumber)}>
        <CardContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
              Slot {slotNumber}
            </Typography>
            {reserved && <Chip label="Reserved" size="small" color="warning" />}
          </Box>
          {children}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}