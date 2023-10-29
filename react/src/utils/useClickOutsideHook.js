import { useState, useEffect } from 'react';

export function useClickOutside(ref) {
  const [clickIsOutside, setClickIsOutside] = useState(false);
  const checkIfClickedOutside = e => {
    if (ref.current && ref.current.contains(e.target)) {
      setClickIsOutside(false);
    } else {
      setClickIsOutside(true);
    }
  };
  useEffect(() => {
    window.addEventListener('mousedown', checkIfClickedOutside);
    return () => {
      window.removeEventListener('mousedown', checkIfClickedOutside);
    };
  }, []);
  return clickIsOutside;
}
