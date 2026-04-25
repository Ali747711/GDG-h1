import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Globe, Brain, Users, AlertTriangle, ArrowRight, Menu, X } from 'lucide-react';
import { useState } from 'react';
import SunIcon from '../components/SunIcon';
import LanguageSelector from '../components/LanguageSelector';
import { useAuth } from '../contexts/FirebaseAuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertTitle, AlertDescription } from '@/components/ui/alert';
import { Separator } from '@/components/ui/separator';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';

const About = () => {
  const { t } = useTranslation();
  const { isAuthenticated, user, userProfile, signOut } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b bg-background/80 backdrop-blur">
        <div className="container mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <SunIcon className="w-7 h-7" color="currentColor" />
            <span className="text-base font-semibold">{t('home.title')}</span>
          </Link>

          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t('nav.home')}
            </Link>
            <Link to="/about" className="text-sm font-medium text-foreground">
              {t('nav.about')}
            </Link>
            <LanguageSelector />
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  {t('common.hello')}, {userProfile?.name || user?.displayName || 'User'}
                </span>
                <Button asChild variant="outline" size="sm">
                  <Link to="/profile">{t('common.profile')}</Link>
                </Button>
                <Button variant="ghost" size="sm" onClick={signOut}>
                  {t('common.signOut')}
                </Button>
              </div>
            ) : (
              <Button asChild size="sm">
                <Link to="/chat">{t('common.tryAvicenna')}</Link>
              </Button>
            )}
          </nav>

          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon" aria-label="Open menu">
                {isMenuOpen ? <X /> : <Menu />}
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72">
              <SheetHeader>
                <SheetTitle>Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-3 px-4">
                <Button asChild variant="ghost" className="justify-start" onClick={() => setIsMenuOpen(false)}>
                  <Link to="/">{t('nav.home')}</Link>
                </Button>
                <Button asChild variant="secondary" className="justify-start" onClick={() => setIsMenuOpen(false)}>
                  <Link to="/about">{t('nav.about')}</Link>
                </Button>
                <div className="px-3 py-2">
                  <LanguageSelector />
                </div>
                <Separator />
                {isAuthenticated ? (
                  <>
                    <p className="px-3 text-sm text-muted-foreground">
                      {t('common.hello')}, {userProfile?.name || user?.displayName || 'User'}
                    </p>
                    <Button asChild variant="outline" onClick={() => setIsMenuOpen(false)}>
                      <Link to="/profile">{t('common.profile')}</Link>
                    </Button>
                    <Button
                      variant="ghost"
                      onClick={() => {
                        signOut();
                        setIsMenuOpen(false);
                      }}
                    >
                      {t('common.signOut')}
                    </Button>
                  </>
                ) : (
                  <Button asChild onClick={() => setIsMenuOpen(false)}>
                    <Link to="/chat">{t('common.tryAvicenna')}</Link>
                  </Button>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>

      <section className="py-20 md:py-28 px-6">
        <div className="container mx-auto max-w-6xl">
          <span className="block text-primary text-xs font-bold tracking-[0.2em] uppercase mb-6">
            {t('about.title')}
          </span>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <h1 className="text-4xl md:text-6xl font-semibold tracking-tight leading-tight max-w-2xl">
              {t('about.title')}
            </h1>
            <p className="text-muted-foreground text-base leading-relaxed max-w-sm md:text-right">
              {t('about.description')}
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 border-t">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12 mb-12">
            <div className="md:w-1/2">
              <span className="block text-primary text-xs font-bold tracking-[0.2em] uppercase mb-5">
                {t('about.mission.label')}
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
                {t('about.mission.title')}
              </h2>
            </div>
            <div className="md:w-1/2 flex items-center">
              <p className="text-muted-foreground text-base leading-relaxed">
                {t('about.mission.description')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: <Globe className="size-5" />, key: 'multilingual' },
              { icon: <Brain className="size-5" />, key: 'aiPowered' },
              { icon: <Users className="size-5" />, key: 'accessible' },
            ].map(({ icon, key }) => (
              <Card key={key}>
                <CardHeader>
                  <div className="size-10 rounded-lg bg-muted flex items-center justify-center mb-2">
                    {icon}
                  </div>
                  <CardTitle>{t(`about.values.${key}.title`)}</CardTitle>
                  <CardDescription>{t(`about.values.${key}.description`)}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 border-t">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-2/5">
              <span className="block text-primary text-xs font-bold tracking-[0.2em] uppercase mb-5">
                {t('about.howItWorks.label')}
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-6">
                {t('about.howItWorks.title')}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('about.howItWorks.description')}
              </p>
            </div>
            <div className="md:w-3/5 flex flex-col gap-6">
              {[1, 2].map((n) => (
                <Card key={n}>
                  <CardHeader>
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-bold text-muted-foreground tracking-widest">
                        0{n}
                      </span>
                      <CardTitle>{t(`about.howItWorks.block${n}.title`)}</CardTitle>
                    </div>
                    <CardDescription>{t(`about.howItWorks.block${n}.description`)}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="flex flex-col gap-2">
                      {[1, 2, 3].map((p) => (
                        <li
                          key={p}
                          className="flex items-start gap-2 text-sm text-muted-foreground"
                        >
                          <span className="mt-1.5 size-1 rounded-full bg-foreground/40 shrink-0" />
                          {t(`about.howItWorks.block${n}.point${p}`)}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 border-t">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12 mb-10">
            <div className="md:w-1/2">
              <span className="block text-primary text-xs font-bold tracking-[0.2em] uppercase mb-5">
                {t('about.builtWithCare.label')}
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight">
                {t('about.builtWithCare.title')}
              </h2>
            </div>
            <div className="md:w-1/2 flex items-center">
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('about.builtWithCare.description')}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {['ai', 'medical', 'community'].map((key) => (
              <Card key={key}>
                <CardHeader>
                  <CardTitle>{t(`about.builtWithCare.${key}.title`)}</CardTitle>
                  <CardDescription>{t(`about.builtWithCare.${key}.description`)}</CardDescription>
                </CardHeader>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 px-6 border-t">
        <div className="container mx-auto max-w-6xl">
          <Alert variant="destructive">
            <AlertTriangle data-icon="inline-start" />
            <AlertTitle>{t('about.disclaimer.title')}</AlertTitle>
            <AlertDescription>
              <p className="mb-4">{t('about.disclaimer.substitute')}</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-xs font-bold tracking-widest uppercase mb-3">
                    {t('about.disclaimer.seekProfessional')}
                  </p>
                  <ul className="flex flex-col gap-2">
                    {[
                      t('about.disclaimer.severeSymptoms'),
                      t('about.disclaimer.emergencySymptoms'),
                      t('about.disclaimer.chronicConditions'),
                      t('about.disclaimer.medications'),
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm">
                        <span className="mt-1.5 size-1 rounded-full bg-current shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="flex flex-col gap-3 text-sm">
                  <p>
                    <span className="font-medium">{t('about.disclaimer.limitations')}: </span>
                    {t('about.disclaimer.generalInfo')}
                  </p>
                  <p>
                    <span className="font-medium">{t('about.disclaimer.emergencySituations')}: </span>
                    {t('about.disclaimer.emergencyContact')}
                  </p>
                </div>
              </div>
            </AlertDescription>
          </Alert>
        </div>
      </section>

      <section className="py-16 px-6 border-t">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row gap-12">
            <div className="md:w-2/5">
              <span className="block text-primary text-xs font-bold tracking-[0.2em] uppercase mb-5">
                Privacy
              </span>
              <h2 className="text-3xl md:text-4xl font-semibold tracking-tight leading-tight mb-4">
                {t('about.privacy.title')}
              </h2>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {t('about.privacy.description')}
              </p>
            </div>

            <div className="md:w-3/5 grid grid-cols-1 sm:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>{t('about.privacy.dataProtection.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-col gap-3">
                    {[
                      t('about.privacy.dataProtection.noPersonal'),
                      t('about.privacy.dataProtection.encrypted'),
                      t('about.privacy.dataProtection.noAccount'),
                      t('about.privacy.dataProtection.anonymous'),
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 size-1 rounded-full bg-foreground/40 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>{t('about.privacy.yourControl.title')}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="flex flex-col gap-3">
                    {[
                      t('about.privacy.yourControl.clearHistory'),
                      t('about.privacy.yourControl.preferredLanguage'),
                      t('about.privacy.yourControl.noAccount'),
                      t('about.privacy.yourControl.transparent'),
                    ].map((item) => (
                      <li key={item} className="flex items-start gap-2 text-sm text-muted-foreground">
                        <span className="mt-1.5 size-1 rounded-full bg-foreground/40 shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 md:py-32 px-6 border-t bg-muted/30">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-4xl md:text-5xl font-semibold tracking-tight mb-6 leading-tight">
            {t('about.cta.ready')}
          </h2>
          <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
            {t('about.cta.personalized')}{t('about.cta.symptomAnalysis')}
          </p>
          <Button asChild size="lg" className="mb-6">
            <Link to="/chat">
              {t('about.cta.startSymptomAnalysis')}
              <ArrowRight data-icon="inline-end" />
            </Link>
          </Button>
          <p className="text-muted-foreground text-sm">
            {t('about.cta.free')} · {t('about.cta.noRegistration')} · {t('about.cta.languages')}
          </p>
        </div>
      </section>
    </div>
  );
};

export default About;
