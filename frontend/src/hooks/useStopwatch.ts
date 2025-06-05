import { useEffect, useRef, useState, useCallback } from 'react';

export default function useStopwatch(initialRunning = false) {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(initialRunning);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

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

  // Format as HH:mm:ss
  const hours = Math.floor(seconds / 3600);
  const minutes = Math.floor((seconds % 3600) / 60);
  const secs = seconds % 60;
  const pad = (n: number) => n.toString().padStart(2, '0');
  const formatted = `${pad(hours)}:${pad(minutes)}:${pad(secs)}`;

  return { seconds, formatted, running, start, pause, reset };
}