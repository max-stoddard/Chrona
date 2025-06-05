import { useEffect, useRef, useState, useCallback } from 'react';

export default function useStopwatch(initialRunning = false) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(initialRunning);
  const intervalRef = useRef<NodeJS.Timeout>(null);

  const tick = () => setSeconds((s) => s + 1);

  const start = useCallback(() => setRunning(true), []);
  const pause = useCallback(() => setRunning(false), []);
  const reset = useCallback(() => setSeconds(0), []);

  useEffect(() => {
    if (running) {
      intervalRef.current = setInterval(tick, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running]);

  const formatted = new Date(seconds * 1000).toISOString().split('T')[0];

  return { seconds, formatted, running, start, pause, reset };
}