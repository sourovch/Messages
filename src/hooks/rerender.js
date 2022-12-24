import { useState } from 'react';

export default function useRerender() {
  const [, setV] = useState(0);

  function reRender() {
    setV((v) => (v === 0 ? 1 : 0));
  }

  return {
    init: reRender,
  };
}
