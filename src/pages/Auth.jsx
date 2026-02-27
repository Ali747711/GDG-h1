import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Eye, EyeOff, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/FirebaseAuthContext';
import SunIcon from '../components/SunIcon';

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
    confirmPassword: ''
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
    setFormData(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) setFormErrors(prev => ({ ...prev, [name]: '' }));
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
    if (Object.keys(errors).length > 0) { setFormErrors(errors); return; }
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

  const inputClass = (hasError) =>
    `w-full bg-slate-950 border rounded-xl px-4 py-3 text-sm text-white placeholder-white/25 focus:outline-none transition-colors ${
      hasError ? 'border-red-500/60' : 'border-white/10 focus:border-amber-400/40'
    }`;

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">

      {/* Top bar */}
      <header className="h-14 border-b border-white/10 bg-slate-950/95 backdrop-blur-sm flex items-center px-5">
        <div className="flex items-center justify-between w-full max-w-sm mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <SunIcon className="w-6 h-6" color="#F59E0B" />
            <span className="text-white font-semibold text-sm">{t('home.title')}</span>
          </Link>
          <Link to="/" className="text-white/35 hover:text-white/70 text-xs transition-colors">
            ← {t('nav.home')}
          </Link>
        </div>
      </header>

      {/* Form */}
      <div className="flex-1 flex items-center justify-center px-5 py-12">
        <div className="w-full max-w-sm">

          {/* Mode tabs */}
          <div className="flex border-b border-white/10 mb-8">
            {['signin', 'signup'].map((m) => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 pb-3 text-sm font-medium transition-colors border-b-2 -mb-px ${
                  mode === m
                    ? 'text-white border-amber-400'
                    : 'text-white/30 border-transparent hover:text-white/55'
                }`}
              >
                {m === 'signin' ? t('auth.signIn') : t('auth.signUp')}
              </button>
            ))}
          </div>

          {/* Heading */}
          <div className="mb-7">
            <h1 className="text-2xl font-display font-bold text-white mb-1">
              {mode === 'signin' ? t('auth.title') : t('auth.joinTitle')}
            </h1>
            <p className="text-white/40 text-sm">
              {mode === 'signin' ? t('auth.description') : t('auth.joinDescription')}
            </p>
          </div>

          {/* Auth error */}
          {error && (
            <div className="mb-5 flex items-start gap-2.5 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">
              <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
              <p className="text-red-300 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* Name (sign up only) */}
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5">Full Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={inputClass(formErrors.name)}
                  placeholder="Your name"
                  autoComplete="name"
                  autoCorrect="off"
                />
                {formErrors.name && <p className="mt-1 text-xs text-red-400">{formErrors.name}</p>}
              </div>
            )}

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={inputClass(formErrors.email)}
                placeholder="you@example.com"
                autoComplete="email"
                autoCorrect="off"
                autoCapitalize="off"
              />
              {formErrors.email && <p className="mt-1 text-xs text-red-400">{formErrors.email}</p>}
            </div>

            {/* Password */}
            <div>
              <label className="block text-xs font-medium text-white/50 mb-1.5">Password</label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className={`${inputClass(formErrors.password)} pr-10`}
                  placeholder="Min. 6 characters"
                  autoComplete={mode === 'signup' ? 'new-password' : 'current-password'}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-3 flex items-center text-white/30 hover:text-white/60 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {formErrors.password && <p className="mt-1 text-xs text-red-400">{formErrors.password}</p>}
            </div>

            {/* Confirm password (sign up only) */}
            {mode === 'signup' && (
              <div>
                <label className="block text-xs font-medium text-white/50 mb-1.5">Confirm Password</label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`${inputClass(formErrors.confirmPassword)} pr-10`}
                    placeholder="Repeat your password"
                    autoComplete="new-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-3 flex items-center text-white/30 hover:text-white/60 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {formErrors.confirmPassword && <p className="mt-1 text-xs text-red-400">{formErrors.confirmPassword}</p>}
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={isLoading || isSubmitting}
              className="w-full mt-2 py-3 px-6 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isLoading || isSubmitting ? (
                <>
                  <div className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" />
                  {mode === 'signin' ? 'Signing in…' : 'Creating account…'}
                </>
              ) : (
                mode === 'signin' ? t('auth.signIn') : 'Create Account'
              )}
            </button>
          </form>

          {/* Switch mode */}
          <p className="mt-6 text-center text-xs text-white/30">
            {mode === 'signin' ? (
              <>
                {t('auth.noAccount')}{' '}
                <button onClick={() => setMode('signup')} className="text-white/60 hover:text-white underline underline-offset-2 transition-colors">
                  {t('auth.signUp')}
                </button>
              </>
            ) : (
              <>
                {t('auth.haveAccount')}{' '}
                <button onClick={() => setMode('signin')} className="text-white/60 hover:text-white underline underline-offset-2 transition-colors">
                  {t('auth.signIn')}
                </button>
              </>
            )}
          </p>

          {/* Privacy note */}
          <p className="mt-8 text-center text-xs text-white/20">
            Your data is protected.{' '}
            <Link to="/about" className="text-white/35 hover:text-white/60 underline underline-offset-2 transition-colors">
              Learn how
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Auth;
