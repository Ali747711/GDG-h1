import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AlertCircle, CheckCircle, ChevronRight, MessageSquare, History, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/FirebaseAuthContext';
import SunIcon from '../components/SunIcon';

const Profile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, userProfile, updateProfile, signOut, isAuthenticated } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', language: 'en', notifications: true });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ type: '', text: '' });

  useEffect(() => {
    if (!isAuthenticated) navigate('/auth');
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || '',
        email: userProfile.email || '',
        language: userProfile.preferences?.language || 'en',
        notifications: userProfile.preferences?.notifications || true
      });
    }
  }, [userProfile]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ type: '', text: '' });
    try {
      const result = await updateProfile({
        name: formData.name,
        preferences: { language: formData.language, notifications: formData.notifications }
      });
      if (result.success) {
        setMessage({ type: 'success', text: 'Profile updated.' });
        setEditMode(false);
        setTimeout(() => setMessage({ type: '', text: '' }), 3000);
      } else {
        setMessage({ type: 'error', text: result.error || 'Failed to update profile' });
      }
    } catch {
      setMessage({ type: 'error', text: 'An error occurred while updating profile' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = () => { signOut(); navigate('/'); };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  if (!user || !userProfile) return null;

  const inputClass = (disabled) =>
    `w-full bg-slate-950 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400/40 transition-colors ${
      disabled ? 'opacity-40 cursor-not-allowed' : 'placeholder-white/30'
    }`;

  return (
    <div className="min-h-screen bg-slate-950">

      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-40 h-14 border-b border-white/10 bg-slate-950/95 backdrop-blur-sm">
        <div className="h-full flex items-center justify-between px-5 max-w-xl mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <SunIcon className="w-6 h-6" color="#F59E0B" />
            <span className="text-white font-semibold text-sm">{t('home.title')}</span>
          </Link>
          <Link to="/" className="text-white/35 hover:text-white/70 text-xs transition-colors">
            ← {t('nav.home')}
          </Link>
        </div>
      </header>

      <div className="pt-14">
        <div className="max-w-xl mx-auto px-5 py-10">

          {/* Profile header */}
          <div className="mb-8">
            <span className="block text-amber-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
              {t('common.profile')}
            </span>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl font-display font-bold text-white leading-tight">
                  {userProfile.name || 'User'}
                </h1>
                <p className="text-white/35 text-xs mt-1">
                  Member since {formatDate(userProfile.createdAt?.toDate ? userProfile.createdAt.toDate() : userProfile.createdAt)}
                </p>
              </div>
              <button
                onClick={() => { setEditMode(!editMode); setMessage({ type: '', text: '' }); }}
                className="flex-shrink-0 text-xs border border-white/15 text-white/50 hover:text-white hover:border-white/30 px-4 py-2 rounded-full transition-colors"
              >
                {editMode ? 'Cancel' : 'Edit'}
              </button>
            </div>
          </div>

          {/* Status message */}
          {message.text && (
            <div className={`mb-5 flex items-center gap-2.5 rounded-xl px-4 py-3 ${
              message.type === 'success'
                ? 'bg-emerald-500/10 border border-emerald-500/20'
                : 'bg-red-500/10 border border-red-500/20'
            }`}>
              {message.type === 'success'
                ? <CheckCircle className="w-4 h-4 text-emerald-400 flex-shrink-0" />
                : <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0" />}
              <p className={`text-sm ${message.type === 'success' ? 'text-emerald-300' : 'text-red-300'}`}>
                {message.text}
              </p>
            </div>
          )}

          {/* Profile form */}
          <form onSubmit={handleSubmit}>
            <div className="bg-slate-900 border border-white/[0.08] rounded-2xl divide-y divide-white/[0.06] mb-5">

              {/* Name */}
              <div className="px-5 py-4">
                <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-white/30 mb-2">
                  Full Name
                </label>
                {editMode ? (
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={inputClass(false)}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                ) : (
                  <p className="text-sm text-white/70">{formData.name || '—'}</p>
                )}
              </div>

              {/* Email */}
              <div className="px-5 py-4">
                <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-white/30 mb-2">
                  Email
                </label>
                <p className="text-sm text-white/40">{formData.email}</p>
                {editMode && (
                  <p className="text-xs text-white/25 mt-1">Email cannot be changed</p>
                )}
              </div>

              {/* Language */}
              <div className="px-5 py-4">
                <label className="block text-[10px] font-bold tracking-[0.1em] uppercase text-white/30 mb-2">
                  Preferred Language
                </label>
                {editMode ? (
                  <select
                    name="language"
                    value={formData.language}
                    onChange={handleChange}
                    className={inputClass(false)}
                  >
                    <option value="en" className="bg-slate-900">English</option>
                    <option value="ko" className="bg-slate-900">한국어</option>
                    <option value="uz" className="bg-slate-900">O'zbek</option>
                  </select>
                ) : (
                  <p className="text-sm text-white/70">
                    {formData.language === 'ko' ? '한국어' : formData.language === 'uz' ? "O'zbek" : 'English'}
                  </p>
                )}
              </div>

              {/* Notifications */}
              <div className="px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="text-[10px] font-bold tracking-[0.1em] uppercase text-white/30 mb-1">
                    Email Notifications
                  </p>
                  <p className="text-sm text-white/40">Health tips and updates</p>
                </div>
                <label className={`relative inline-flex items-center ${!editMode ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}>
                  <input
                    type="checkbox"
                    name="notifications"
                    checked={formData.notifications}
                    onChange={handleChange}
                    disabled={!editMode}
                    className="sr-only peer"
                  />
                  <div className="w-9 h-5 bg-white/10 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-amber-400" />
                </label>
              </div>
            </div>

            {/* Save/cancel actions */}
            {editMode && (
              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setEditMode(false)}
                  className="flex-1 py-2.5 border border-white/10 text-white/50 hover:text-white text-sm rounded-full transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-sm rounded-full transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <><div className="w-4 h-4 border-2 border-slate-900/30 border-t-slate-900 rounded-full animate-spin" /> Saving…</>
                  ) : (
                    t('common.save')
                  )}
                </button>
              </div>
            )}
          </form>

          {/* Account actions */}
          <div className="bg-slate-900 border border-white/[0.08] rounded-2xl divide-y divide-white/[0.06] mt-5">
            <Link
              to="/medical-history"
              className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.03] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <History className="w-4 h-4 text-white/30" />
                <div>
                  <p className="text-sm text-white/80">{t('medicalHistory.title')}</p>
                  <p className="text-xs text-white/35">View saved conversations</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" />
            </Link>

            <Link
              to="/chat"
              className="flex items-center justify-between px-5 py-4 hover:bg-white/[0.03] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="w-4 h-4 text-white/30" />
                <div>
                  <p className="text-sm text-white/80">Start Health Chat</p>
                  <p className="text-xs text-white/35">Analyze symptoms with AI</p>
                </div>
              </div>
              <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" />
            </Link>

            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-between px-5 py-4 hover:bg-white/[0.03] transition-colors group"
            >
              <div className="flex items-center gap-3">
                <LogOut className="w-4 h-4 text-red-400/60" />
                <p className="text-sm text-red-400/80">{t('common.signOut')}</p>
              </div>
              <ChevronRight className="w-4 h-4 text-white/20 group-hover:text-white/40 transition-colors" />
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;
