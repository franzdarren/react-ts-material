import { useState, type ChangeEvent } from 'react';

export function PinBox() {
  // Lesson 6: "React, remember a value for me. Start at ''.
  //  Give me the current value (pin) and a way to change it (setPin)."
  const [pin, setPin] = useState('');

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const digitsOnly = e.target.value.replace(/\D/g, '').slice(0, 4);
    setPin(digitsOnly); // stores the value AND asks React to call PinBox() again
  }

  console.log('component rerendered, pin:', pin);

  return (
    <div>
      <input value={pin} onChange={handleChange} inputMode="numeric" placeholder="PIN" />
      <p>{pin.length}</p>
    </div>
  );
}