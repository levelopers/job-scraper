import React, { useState } from 'react'

export default function useInput(defaultValue) {
  const [value, setValue] = useState(defaultValue);
  const input = <input
    value={value}
    onChange={e => setValue(e.target.value)}
  />;
  return [value, input];
}