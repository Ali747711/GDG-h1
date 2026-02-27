import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Shield, Globe, Brain, Users, Heart, AlertTriangle, Menu, X } from 'lucide-react';
import { useState } from 'react';
import SunIcon from '../components/SunIcon';
import LanguageSelector from '../components/LanguageSelector';
import { useAuth } from '../contexts/FirebaseAuthContext';

const About = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user, userProfile, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-950">

      {/* Navbar - unchanged */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 px-6">
        <div className="container mx-auto max-w-6xl">
          <nav className="navbar-glass rounded-full px-8 py-4 shadow-2xl border border-white/20">
            <div className="flex items-center justify-between">
              {/* Logo */}
              <div className="flex items-center space-x-3 hover:scale-105 transition-transform duration-300">
                <SunIcon className="w-8 h-8 drop-shadow-sm" color="#F59E0B" />
                <span className="text-xl font-display font-bold text-white drop-shadow-sm">
                  {t('home.title')}
                </span>
              </div>

              {/* Desktop Navigation */}
              <div className="hidden md:flex items-center space-x-8">
                <Link
                  to="/"
                  className="nav-link text-white/90 hover:text-white font-medium"
                >
                  {t('nav.home')}
                </Link>
                <Link
                  to="/about"
                  className="nav-link active text-white font-medium"
                >
                  {t('nav.about')}
                </Link>
                <div className="nav-item-wrapper">
                  <LanguageSelector />
                </div>
                {isAuthenticated ? (
                  <div className="flex items-center space-x-4">
                    <div className="text-white/90 text-sm">
                      {t('common.hello')}, {userProfile?.name || user?.displayName || 'User'}
                    </div>
                    <Link
                      to="/profile"
                      className="nav-button bg-white/10 backdrop-blur-sm text-white border border-white/20 px-4 py-2 rounded-full hover:bg-white/20 hover:border-white/30 font-medium text-sm"
                    >
                      {t('common.profile')}
                    </Link>
                    <button
                      onClick={signOut}
                      className="nav-button bg-white/10 backdrop-blur-sm text-white border border-white/20 px-4 py-2 rounded-full hover:bg-white/20 hover:border-white/30 font-medium text-sm"
                    >
                      {t('common.signOut')}
                    </button>
                  </div>
                ) : (
                  <Link
                    to="/chat"
                    className="nav-button bg-gradient-to-r from-accent-500 to-accent-600 text-white px-6 py-2.5 rounded-full font-medium"
                  >
                    {t('common.tryAvicenna')}
                  </Link>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-3 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110 backdrop-blur-sm"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
              >
                {isMenuOpen ? (
                  <X className="w-6 h-6 text-white drop-shadow-sm" />
                ) : (
                  <Menu className="w-6 h-6 text-white drop-shadow-sm" />
                )}
              </button>
            </div>

            {/* Mobile Navigation */}
            {isMenuOpen && (
              <div className="md:hidden mt-6 pt-6 border-t border-white/20">
                <div className="flex flex-col space-y-4">
                  <Link
                    to="/"
                    className="text-white/90 hover:text-white font-medium transition-all duration-300 py-3 px-4 rounded-xl hover:bg-white/10 hover:scale-105"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.home')}
                  </Link>
                  <Link
                    to="/about"
                    className="text-white font-medium transition-all duration-300 py-3 px-4 rounded-xl bg-white/10 scale-105"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.about')}
                  </Link>
                  <div className="py-2 px-4">
                    <LanguageSelector />
                  </div>
                  {isAuthenticated ? (
                    <>
                      <div className="px-4 py-2 text-white/90 text-sm">
                        {t('common.hello')}, {userProfile?.name || user?.displayName || 'User'}
                      </div>
                      <Link
                        to="/profile"
                        className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-6 py-3 rounded-full hover:bg-white/20 hover:border-white/30 hover:scale-105 hover:shadow-lg transition-all duration-300 font-medium text-center"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {t('common.profile')}
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          setIsMenuOpen(false);
                        }}
                        className="bg-white/10 backdrop-blur-sm text-white border border-white/20 px-6 py-3 rounded-full hover:bg-white/20 hover:border-white/30 hover:scale-105 hover:shadow-lg transition-all duration-300 font-medium text-center"
                      >
                        {t('common.signOut')}
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/chat"
                      className="bg-gradient-to-r from-accent-500 to-accent-600 text-white px-6 py-3 rounded-full hover:scale-105 hover:shadow-lg transition-all duration-300 font-medium text-center"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('common.tryAvicenna')}
                    </Link>
                  )}
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="pt-36 pb-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <span className="block text-amber-400 text-xs font-bold tracking-[0.2em] uppercase mb-6">
            {t('about.title')}
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white leading-tight max-w-2xl">
              {t('about.title')}
            </h1>
            <p className="text-white/50 text-base leading-relaxed max-w-sm md:text-right">
              {t('about.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          {/* Section label + description */}
          <div className="flex flex-col md:flex-row gap-16 mb-16">
            <div className="md:w-1/2">
              <span className="block text-amber-400 text-xs font-bold tracking-[0.2em] uppercase mb-5">
                {t('about.mission.label')}
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">
                {t('about.mission.title')}
              </h2>
            </div>
            <div className="md:w-1/2 flex items-center">
              <p className="text-white/50 text-base leading-relaxed">
                {t('about.mission.description')}
              </p>
            </div>
          </div>

          {/* Three values */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 pt-10 border-t border-white/10">
            <div className="py-10 md:py-0 md:pr-14">
              <div className="w-10 h-10 rounded-xl bg-sky-400/10 flex items-center justify-center mb-6">
                <Globe className="w-5 h-5 text-sky-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">
                {t('about.values.multilingual.title')}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed">
                {t('about.values.multilingual.description')}
              </p>
            </div>

            <div className="py-10 md:py-0 md:px-14">
              <div className="w-10 h-10 rounded-xl bg-violet-400/10 flex items-center justify-center mb-6">
                <Brain className="w-5 h-5 text-violet-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">
                {t('about.values.aiPowered.title')}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed">
                {t('about.values.aiPowered.description')}
              </p>
            </div>

            <div className="py-10 md:py-0 md:pl-14">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center mb-6">
                <Users className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">
                {t('about.values.accessible.title')}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed">
                {t('about.values.accessible.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works — light section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-16">
            {/* Left: label + headline */}
            <div className="md:w-2/5">
              <span className="block text-teal-600 text-xs font-bold tracking-[0.2em] uppercase mb-5">
                {t('about.howItWorks.label')}
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 leading-tight mb-6">
                {t('about.howItWorks.title')}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t('about.howItWorks.description')}
              </p>
            </div>

            {/* Right: two capability blocks */}
            <div className="md:w-3/5 space-y-0 divide-y divide-slate-100">
              <div className="pb-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-slate-300 tracking-widest">01</span>
                  <h3 className="font-semibold text-slate-900 text-lg">{t('about.howItWorks.block1.title')}</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  {t('about.howItWorks.block1.description')}
                </p>
                <ul className="space-y-2">
                  {[
                    t('about.howItWorks.block1.point1'),
                    t('about.howItWorks.block1.point2'),
                    t('about.howItWorks.block1.point3'),
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-500">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-teal-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="pt-8">
                <div className="flex items-center gap-3 mb-4">
                  <span className="text-xs font-bold text-slate-300 tracking-widest">02</span>
                  <h3 className="font-semibold text-slate-900 text-lg">{t('about.howItWorks.block2.title')}</h3>
                </div>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  {t('about.howItWorks.block2.description')}
                </p>
                <ul className="space-y-2">
                  {[
                    t('about.howItWorks.block2.point1'),
                    t('about.howItWorks.block2.point2'),
                    t('about.howItWorks.block2.point3'),
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-500">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-teal-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Built with Care — dark */}
      <section className="py-20 px-6 border-t border-white/10">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-16 mb-14">
            <div className="md:w-1/2">
              <span className="block text-amber-400 text-xs font-bold tracking-[0.2em] uppercase mb-5">
                {t('about.builtWithCare.label')}
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight">
                {t('about.builtWithCare.title')}
              </h2>
            </div>
            <div className="md:w-1/2 flex items-center">
              <p className="text-white/50 text-sm leading-relaxed">
                {t('about.builtWithCare.description')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10 border-t border-white/10">
            <div className="py-10 md:py-0 md:pr-14">
              <h3 className="text-white font-semibold text-base mb-3">{t('about.builtWithCare.ai.title')}</h3>
              <p className="text-white/45 text-sm leading-relaxed">
                {t('about.builtWithCare.ai.description')}
              </p>
            </div>
            <div className="py-10 md:py-0 md:px-14">
              <h3 className="text-white font-semibold text-base mb-3">{t('about.builtWithCare.medical.title')}</h3>
              <p className="text-white/45 text-sm leading-relaxed">
                {t('about.builtWithCare.medical.description')}
              </p>
            </div>
            <div className="py-10 md:py-0 md:pl-14">
              <h3 className="text-white font-semibold text-base mb-3">{t('about.builtWithCare.community.title')}</h3>
              <p className="text-white/45 text-sm leading-relaxed">
                {t('about.builtWithCare.community.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Disclaimer — amber tinted, clean */}
      <section className="py-20 px-6 bg-amber-950/40 border-t border-amber-500/20">
        <div className="container mx-auto max-w-6xl">
          <div className="flex gap-5">
            <AlertTriangle className="w-5 h-5 text-amber-400 flex-shrink-0 mt-1" />
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-amber-200 mb-5">
                {t('about.disclaimer.title')}
              </h2>
              <p className="text-amber-200/70 text-sm leading-relaxed mb-6">
                {t('about.disclaimer.substitute')}
              </p>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <p className="text-amber-200/90 text-xs font-bold tracking-widest uppercase mb-3">
                    {t('about.disclaimer.seekProfessional')}
                  </p>
                  <ul className="space-y-2">
                    {[
                      t('about.disclaimer.severeSymptoms'),
                      t('about.disclaimer.emergencySymptoms'),
                      t('about.disclaimer.chronicConditions'),
                      t('about.disclaimer.medications'),
                    ].map(item => (
                      <li key={item} className="flex items-start gap-2 text-sm text-amber-200/60">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-amber-400/60 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="space-y-4">
                  <p className="text-amber-200/60 text-sm leading-relaxed">
                    <span className="text-amber-200/90 font-medium">{t('about.disclaimer.limitations')}: </span>
                    {t('about.disclaimer.generalInfo')}
                  </p>
                  <p className="text-amber-200/60 text-sm leading-relaxed">
                    <span className="text-amber-200/90 font-medium">{t('about.disclaimer.emergencySituations')}: </span>
                    {t('about.disclaimer.emergencyContact')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Privacy — light */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-16">
            <div className="md:w-2/5">
              <span className="block text-emerald-600 text-xs font-bold tracking-[0.2em] uppercase mb-5">
                Privacy
              </span>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-slate-900 leading-tight mb-4">
                {t('about.privacy.title')}
              </h2>
              <p className="text-slate-500 text-sm leading-relaxed">
                {t('about.privacy.description')}
              </p>
            </div>

            <div className="md:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-10">
              <div>
                <h3 className="text-slate-900 font-semibold text-base mb-4">
                  {t('about.privacy.dataProtection.title')}
                </h3>
                <ul className="space-y-3">
                  {[
                    t('about.privacy.dataProtection.noPersonal'),
                    t('about.privacy.dataProtection.encrypted'),
                    t('about.privacy.dataProtection.noAccount'),
                    t('about.privacy.dataProtection.anonymous'),
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-500">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-emerald-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-slate-900 font-semibold text-base mb-4">
                  {t('about.privacy.yourControl.title')}
                </h3>
                <ul className="space-y-3">
                  {[
                    t('about.privacy.yourControl.clearHistory'),
                    t('about.privacy.yourControl.preferredLanguage'),
                    t('about.privacy.yourControl.noAccount'),
                    t('about.privacy.yourControl.transparent'),
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2 text-sm text-slate-500">
                      <span className="mt-1.5 w-1 h-1 rounded-full bg-sky-500 flex-shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA — dark, matching Home */}
      <section className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />
        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold text-white mb-6 leading-tight">
            {t('about.cta.ready')}
          </h2>
          <p className="text-white/45 text-lg mb-10 leading-relaxed">
            {t('about.cta.personalized')}{t('about.cta.symptomAnalysis')}
          </p>
          <Link
            to="/chat"
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-base rounded-full transition-colors duration-200 mb-6"
          >
            {t('about.cta.startSymptomAnalysis')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
          <p className="text-white/25 text-sm">
            {t('about.cta.free')} · {t('about.cta.noRegistration')} · {t('about.cta.languages')}
          </p>
        </div>
      </section>

    </div>
  )
}

export default About
