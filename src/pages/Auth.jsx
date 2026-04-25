import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, AlertCircle, Loader2 } from 'lucide-react';
import { useAuth } from '../contexts/FirebaseAuthContext';
import SunIcon from '../components/SunIcon';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Field, FieldGroup, FieldLabel, FieldError } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { InputGroup, InputGroupInput, InputGroupAddon, InputGroupButton } from '@/components/ui/input-group';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';

const Auth = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { signIn, signUp, isLoading, error, clearError, isAuthenticated } = useAuth();

  const [mode, setMode] = useState('signin');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) navigate('/chat');
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    clearError();
    setFormErrors({});
  }, [mode, clearError]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors((prev) => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const errors = {};
    if (mode === 'signup') {
      if (!formData.name.trim()) errors.name = 'Name is required';
      else if (formData.name.trim().length < 2) errors.name = 'Name must be at least 2 characters';
    }
    if (!formData.email.trim()) errors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) errors.email = 'Please enter a valid email';
    if (!formData.password) errors.password = 'Password is required';
    else if (formData.password.length < 6) errors.password = 'Password must be at least 6 characters';
    if (mode === 'signup') {
      if (!formData.confirmPassword) errors.confirmPassword = 'Please confirm your password';
      else if (formData.password !== formData.confirmPassword) errors.confirmPassword = 'Passwords do not match';
    }
    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }
    setIsSubmitting(true);
    try {
      const result = mode === 'signup'
        ? await signUp(formData.email, formData.password, formData.name)
        : await signIn(formData.email, formData.password);
      if (result.success) navigate('/chat');
    } catch (err) {
      console.error('Auth error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const submitting = isLoading || isSubmitting;

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="h-14 border-b flex items-center px-5">
        <div className="flex items-center justify-between w-full max-w-sm mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <SunIcon className="w-6 h-6" color="currentColor" />
            <span className="font-semibold text-sm">{t('home.title')}</span>
          </Link>
          <Link to="/" className="text-muted-foreground hover:text-foreground text-xs transition-colors">
            ← {t('nav.home')}
          </Link>
        </div>
      </header>

      <div className="flex-1 flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-sm">
          <Tabs value={mode} onValueChange={setMode} className="mb-7">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="signin">{t('auth.signIn')}</TabsTrigger>
              <TabsTrigger value="signup">{t('auth.signUp')}</TabsTrigger>
            </TabsList>
          </Tabs>

          <div className="mb-6">
            <h1 className="text-2xl font-semibold tracking-tight mb-1">
              {mode === 'signin' ? t('auth.title') : t('auth.joinTitle')}
            </h1>
            <p className="text-muted-foreground text-sm">
              {mode === 'signin' ? t('auth.description') : t('auth.joinDescription')}
            </p>
          </div>

          {error && (
            <Alert variant="destructive" className="mb-5">
              <AlertCircle data-icon="inline-start" />
              <AlertTitle>Authentication failed</AlertTitle>
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit}>
            <FieldGroup>
              {mode === 'signup' && (
                <Field data-invalid={!!formErrors.name || undefined}>
                  <FieldLabel htmlFor="name">Full name</FieldLabel>
                  <Input
                    id="name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    autoComplete="name"
                    aria-invalid={!!formErrors.name || undefined}
                  />
                  {formErrors.name && <FieldError>{formErrors.name}</FieldError>}
                </Field>
              )}

              <Field data-invalid={!!formErrors.email || undefined}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  autoComplete="email"
                  autoCapitalize="off"
                  aria-invalid={!!formErrors.email || undefined}
                />
                {formErrors.email && <FieldError>{formErrors.email}</FieldError>}
              </Field>

              <Field data-invalid={!!formErrors.password || undefined}>
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <InputGroup>
                  <InputGroupInput
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Min. 6 characters"
                    autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                    aria-invalid={!!formErrors.password || undefined}
                  />
                  <InputGroupAddon align="inline-end">
                    <InputGroupButton
                      type="button"
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => setShowPassword((v) => !v)}
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                    >
                      {showPassword ? <EyeOff /> : <Eye />}
                    </InputGroupButton>
                  </InputGroupAddon>
                </InputGroup>
                {formErrors.password && <FieldError>{formErrors.password}</FieldError>}
              </Field>

              {mode === 'signup' && (
                <Field data-invalid={!!formErrors.confirmPassword || undefined}>
                  <FieldLabel htmlFor="confirmPassword">Confirm password</FieldLabel>
                  <InputGroup>
                    <InputGroupInput
                      id="confirmPassword"
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      placeholder="Repeat your password"
                      autoComplete="new-password"
                      aria-invalid={!!formErrors.confirmPassword || undefined}
                    />
                    <InputGroupAddon align="inline-end">
                      <InputGroupButton
                        type="button"
                        variant="ghost"
                        size="icon-xs"
                        onClick={() => setShowConfirmPassword((v) => !v)}
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showConfirmPassword ? <EyeOff /> : <Eye />}
                      </InputGroupButton>
                    </InputGroupAddon>
                  </InputGroup>
                  {formErrors.confirmPassword && <FieldError>{formErrors.confirmPassword}</FieldError>}
                </Field>
              )}

              <Button type="submit" disabled={submitting} className="w-full mt-2">
                {submitting && <Loader2 data-icon="inline-start" className="animate-spin" />}
                {submitting
                  ? mode === 'signin' ? 'Signing in…' : 'Creating account…'
                  : mode === 'signin' ? t('auth.signIn') : 'Create account'}
              </Button>
            </FieldGroup>
          </form>

          <p className="mt-6 text-center text-xs text-muted-foreground">
            {mode === 'signin' ? (
              <>
                {t('auth.noAccount')}{' '}
                <button onClick={() => setMode('signup')} className="text-foreground hover:underline underline-offset-2">
                  {t('auth.signUp')}
                </button>
              </>
            ) : (
              <>
                {t('auth.haveAccount')}{' '}
                <button onClick={() => setMode('signin')} className="text-foreground hover:underline underline-offset-2">
                  {t('auth.signIn')}
                </button>
              </>
            )}
          </p>

          <p className="mt-8 text-center text-xs text-muted-foreground">
            Your data is protected.{' '}
            <Link to="/about" className="text-foreground hover:underline underline-offset-2">
              Learn how
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
