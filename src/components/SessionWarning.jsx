import { useEffect, useRef } from 'react';
import { toast } from 'sonner';
import { useAuth } from '../contexts/FirebaseAuthContext';

const TOAST_ID = 'session-warning';
const COUNTDOWN_SECONDS = 300;

const formatTime = (seconds) => {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, '0')}`;
};

const SessionWarning = () => {
  const { sessionWarning, extendSession } = useAuth();
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!sessionWarning) {
      toast.dismiss(TOAST_ID);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    let remaining = COUNTDOWN_SECONDS;

    const render = () =>
      toast.warning('Session expiring soon', {
        id: TOAST_ID,
        description: `Your session will expire in ${formatTime(remaining)} due to inactivity.`,
        duration: Infinity,
        action: {
          label: 'Stay logged in',
          onClick: () => {
            extendSession();
            toast.dismiss(TOAST_ID);
          },
        },
      });

    render();
    intervalRef.current = setInterval(() => {
      remaining -= 1;
      if (remaining <= 0) {
        clearInterval(intervalRef.current);
        toast.dismiss(TOAST_ID);
        return;
      }
      render();
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [sessionWarning, extendSession]);

  return null;
};

export default SessionWarning;
