import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { MessageCircle, Globe, Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';
import LanguageSelector from '../components/LanguageSelector';
import SunIcon from '../components/SunIcon';
import heroImage from '../assets/icons/mind-hero.jpg';
import { useAuth } from '../contexts/FirebaseAuthContext';
import { Button } from '@/components/ui/button';

const Home = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user, userProfile, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen">
      {/* Enhanced Glassmorphism Header */}
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
                  className="nav-link active text-white font-medium"
                >
                  {t('nav.home')}
                </Link>
                <Link
                  to="/about"
                  className="nav-link text-white/90 hover:text-white font-medium"
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
                    to="/auth"
                    className="nav-button bg-white/10 backdrop-blur-sm text-white border border-white/20 px-6 py-2.5 rounded-full hover:bg-white/20 hover:border-white/30 font-medium"
                  >
                    {t('nav.signIn')}
                  </Link>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-3 rounded-full hover:bg-white/10 transition-all duration-300 hover:scale-110 active:scale-95 backdrop-blur-sm min-h-[48px] min-w-[48px] flex items-center justify-center touch-manipulation"
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
                <div className="flex flex-col space-y-3">
                  <Link
                    to="/"
                    className="mobile-btn text-white font-medium transition-all duration-300 py-4 px-4 rounded-xl bg-white/10 scale-105 touch-manipulation min-h-[48px] flex items-center"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {t('nav.home')}
                  </Link>
                  <Link
                    to="/about"
                    className="mobile-btn text-white/90 hover:text-white font-medium transition-all duration-300 py-4 px-4 rounded-xl hover:bg-white/10 hover:scale-105 active:scale-95 touch-manipulation min-h-[48px] flex items-center"
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
                        className="mobile-btn bg-white/10 backdrop-blur-sm text-white border border-white/20 px-6 py-4 rounded-full hover:bg-white/20 hover:border-white/30 hover:scale-105 active:scale-95 hover:shadow-lg transition-all duration-300 font-medium text-center min-h-[48px] flex items-center justify-center touch-manipulation"
                        onClick={() => setIsMenuOpen(false)}
                      >
                        {t('common.profile')}
                      </Link>
                      <button
                        onClick={() => {
                          signOut();
                          setIsMenuOpen(false);
                        }}
                        className="mobile-btn bg-white/10 backdrop-blur-sm text-white border border-white/20 px-6 py-4 rounded-full hover:bg-white/20 hover:border-white/30 hover:scale-105 active:scale-95 hover:shadow-lg transition-all duration-300 font-medium text-center min-h-[48px] flex items-center justify-center touch-manipulation"
                      >
                        {t('common.signOut')}
                      </button>
                    </>
                  ) : (
                    <Link
                      to="/auth"
                      className="mobile-btn bg-white/10 backdrop-blur-sm text-white border border-white/20 px-6 py-4 rounded-full hover:bg-white/20 hover:border-white/30 hover:scale-105 active:scale-95 hover:shadow-lg transition-all duration-300 font-medium text-center min-h-[48px] flex items-center justify-center touch-manipulation"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {t('nav.signIn')}
                    </Link>
                  )}
                </div>
              </div>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section - Mobile Optimized */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="AI Healthcare Background"
            className="w-full h-full object-cover"
            loading="eager"
          />
          {/* Mobile-optimized overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-black/60 to-black/50 md:from-black/60 md:via-black/50 md:to-black/40"></div>
          {/* Additional overlay for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/30 md:from-black/30 md:to-black/20"></div>
        </div>

        {/* Centered Hero Content */}
        <div className="relative z-10 text-center px-3 md:px-4 max-w-5xl mx-auto">
          {/* Hero Content */}
          <div className="space-y-4 md:space-y-6 lg:space-y-8 mobile-spacing">
            {/* Headline */}
            <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-display font-bold text-white leading-tight animate-fade-in mobile-text-2xl md:text-5xl">
              {t('home.hero.understandYour')}{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-400 to-accent-600">
                {t('home.hero.symptoms')}
              </span>
              <br className="hidden sm:block" />
              <span className="sm:hidden"> </span>
              {t('home.hero.withTrustedAI')}
            </h1>

            {/* Subtext */}
            <p className="text-sm md:text-lg lg:text-xl text-white/90 leading-relaxed max-w-3xl mx-auto font-medium animate-slide-up delay-200 mobile-text-sm md:text-lg px-2 md:px-0">
              {t('home.hero.multilingualCompanion')}{' '}
              <span className="text-accent-300 font-semibold">{t('home.hero.english')}</span>,{' '}
              <span className="text-accent-300 font-semibold">{t('home.hero.korean')}</span>, and{' '}
              <span className="text-accent-300 font-semibold">{t('home.hero.uzbek')}</span>
              <br className="hidden md:block" />
              <span className="md:hidden"> — </span>
              <span className="hidden md:inline">— </span>{t('home.hero.designedFor')}
            </p>

            {/* CTA Button */}
            <div className="animate-fade-in delay-300 pt-2">
              <Link
                to="/chat"
                className="mobile-btn group inline-flex items-center justify-center px-6 py-4 md:px-8 md:py-4 bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-bold text-base md:text-lg rounded-full shadow-2xl hover:shadow-3xl transform hover:scale-105 active:scale-95 transition-all duration-300 hover:from-yellow-300 hover:to-amber-400 min-h-[52px] touch-manipulation"
              >
                <span>{t('home.cta')}</span>
                <svg className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
                </svg>
              </Link>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center gap-2 md:gap-4 lg:gap-6 text-white/90 animate-fade-in delay-400 px-2">
              <div className="flex items-center space-x-1.5 md:space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-1.5 md:px-3 md:py-2">
                <svg className="w-3 h-3 md:w-4 md:h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-xs md:text-sm font-medium whitespace-nowrap">Free to use</span>
              </div>
              <div className="flex items-center space-x-1.5 md:space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-1.5 md:px-3 md:py-2">
                <svg className="w-3 h-3 md:w-4 md:h-4 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
                <span className="text-xs md:text-sm font-medium whitespace-nowrap">No registration required</span>
              </div>
              <div className="flex items-center space-x-1.5 md:space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-2.5 py-1.5 md:px-3 md:py-2">
                <svg className="w-3 h-3 md:w-4 md:h-4 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-xs md:text-sm font-medium whitespace-nowrap">Privacy protected</span>
              </div>
              {/* <Button>shadcn button</Button> */}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Why Choose Avicenna */}
      <section className="py-24 md:py-32 bg-slate-950">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Split header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 pb-14 border-b border-white/10 mb-14">
            <div>
              <span className="block text-amber-400 text-xs font-bold tracking-[0.2em] uppercase mb-5">
                Why Avicenna
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-white leading-tight max-w-lg">
                {t('home.whyChoose.title')}
              </h2>
            </div>
            <p className="text-white/45 text-base leading-relaxed max-w-sm md:text-right">
              {t('home.whyChoose.subtitle')}
            </p>
          </div>

          {/* Three features separated by dividers */}
          <div className="grid grid-cols-1 md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-white/10">
            <div className="group py-10 md:py-0 md:pr-14">
              <div className="w-10 h-10 rounded-xl bg-amber-400/10 flex items-center justify-center mb-7 group-hover:bg-amber-400/15 transition-colors duration-300">
                <Globe className="w-5 h-5 text-amber-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">
                {t('home.features.multilingual.title')}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed">
                {t('home.features.multilingual.description')}
              </p>
            </div>

            <div className="group py-10 md:py-0 md:px-14">
              <div className="w-10 h-10 rounded-xl bg-teal-400/10 flex items-center justify-center mb-7 group-hover:bg-teal-400/15 transition-colors duration-300">
                <MessageCircle className="w-5 h-5 text-teal-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">
                {t('home.features.ai.title')}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed">
                {t('home.features.ai.description')}
              </p>
            </div>

            <div className="group py-10 md:py-0 md:pl-14">
              <div className="w-10 h-10 rounded-xl bg-emerald-400/10 flex items-center justify-center mb-7 group-hover:bg-emerald-400/15 transition-colors duration-300">
                <Shield className="w-5 h-5 text-emerald-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-3">
                {t('home.features.privacy.title')}
              </h3>
              <p className="text-white/45 text-sm leading-relaxed">
                {t('home.features.privacy.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 md:py-32 bg-white">
        <div className="container mx-auto px-6 max-w-6xl">
          {/* Centered header */}
          <div className="text-center mb-20">
            <span className="block text-teal-600 text-xs font-bold tracking-[0.2em] uppercase mb-5">
              Process
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-slate-900">
              {t('home.howItWorks.title')}
            </h2>
            <p className="mt-5 text-slate-500 text-base leading-relaxed max-w-md mx-auto">
              {t('home.howItWorks.subtitle')}
            </p>
          </div>

          {/* Steps with connector line */}
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6">
            {/* Horizontal connector line (desktop only) */}
            <div
              className="hidden md:block absolute h-px bg-slate-100"
              style={{ top: '32px', left: '16.67%', right: '16.67%' }}
            />

            {/* Step 1 */}
            <div className="flex flex-col items-center text-center relative">
              <div className="relative z-10 w-16 h-16 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-8">
                <span className="text-xl font-bold text-slate-300">01</span>
              </div>
              <h3 className="font-semibold text-slate-900 text-lg mb-3">
                {t('home.howItWorks.step1.title')}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                {t('home.howItWorks.step1.description')}
              </p>
            </div>

            {/* Step 2 */}
            <div className="flex flex-col items-center text-center relative">
              <div className="relative z-10 w-16 h-16 rounded-full bg-teal-600 shadow-md shadow-teal-100 flex items-center justify-center mb-8">
                <span className="text-xl font-bold text-white">02</span>
              </div>
              <h3 className="font-semibold text-slate-900 text-lg mb-3">
                {t('home.howItWorks.step2.title')}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                {t('home.howItWorks.step2.description')}
              </p>
            </div>

            {/* Step 3 */}
            <div className="flex flex-col items-center text-center relative">
              <div className="relative z-10 w-16 h-16 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center mb-8">
                <span className="text-xl font-bold text-slate-300">03</span>
              </div>
              <h3 className="font-semibold text-slate-900 text-lg mb-3">
                {t('home.howItWorks.step3.title')}
              </h3>
              <p className="text-slate-500 text-sm leading-relaxed max-w-xs">
                {t('home.howItWorks.step3.description')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 md:py-32 bg-slate-950 relative overflow-hidden">
        {/* Amber accent line at top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-px bg-gradient-to-r from-transparent via-amber-400/60 to-transparent" />

        <div className="container mx-auto px-6 max-w-3xl text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6 leading-tight">
            {t('home.ctaSection.ready')}
          </h2>
          <p className="text-white/45 text-lg mb-10 leading-relaxed">
            {t('home.ctaSection.joinThousands')}
          </p>
          <Link
            to="/chat"
            className="inline-flex items-center gap-2 px-8 py-4 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold text-base rounded-full transition-colors duration-200"
          >
            {t('home.ctaSection.getStarted')}
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  )
}

export default Home 