import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { useAuth } from '../contexts/FirebaseAuthContext';

const TOAST_ID = 'session-timeout';

const SessionTimeoutNotification = () => {
  const { sessionTimeout, clearError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionTimeout) {
      toast.dismiss(TOAST_ID);
      return;
    }

    toast.error('Session expired', {
      id: TOAST_ID,
      description: 'Your session expired due to inactivity. Please sign in again.',
      duration: Infinity,
      action: {
        label: 'Sign in',
        onClick: () => {
          clearError();
          navigate('/auth');
        },
      },
      onDismiss: () => clearError(),
    });
  }, [sessionTimeout, clearError, navigate]);

  return null;
};

export default SessionTimeoutNotification;
