import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronRight, MessageSquare, History, LogOut, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useAuth } from '../contexts/FirebaseAuthContext';
import SunIcon from '../components/SunIcon';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Field, FieldGroup, FieldLabel, FieldDescription } from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { Switch } from '@/components/ui/switch';
import { Separator } from '@/components/ui/separator';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

const LANGUAGE_LABELS = { en: 'English', ko: '한국어', uz: "O'zbek" };

const Profile = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, userProfile, updateProfile, signOut, isAuthenticated } = useAuth();

  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', language: 'en', notifications: true });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated) navigate('/auth');
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (userProfile) {
      setFormData({
        name: userProfile.name || '',
        email: userProfile.email || '',
        language: userProfile.preferences?.language || 'en',
        notifications: userProfile.preferences?.notifications ?? true,
      });
    }
  }, [userProfile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const result = await updateProfile({
        name: formData.name,
        preferences: { language: formData.language, notifications: formData.notifications },
      });
      if (result.success) {
        toast.success('Profile updated.');
        setEditMode(false);
      } else {
        toast.error(result.error || 'Failed to update profile');
      }
    } catch {
      toast.error('An error occurred while updating profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSignOut = () => {
    signOut();
    navigate('/');
  };

  const formatDate = (dateString) =>
    new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  if (!user || !userProfile) return null;

  return (
    <div className="min-h-screen bg-background">
      <header className="fixed top-0 left-0 right-0 z-40 h-14 border-b bg-background/95 backdrop-blur-sm">
        <div className="h-full flex items-center justify-between px-5 max-w-xl mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <SunIcon className="w-6 h-6" color="currentColor" />
            <span className="font-semibold text-sm">{t('home.title')}</span>
          </Link>
          <Link to="/" className="text-muted-foreground hover:text-foreground text-xs transition-colors">
            ← {t('nav.home')}
          </Link>
        </div>
      </header>

      <div className="pt-14">
        <div className="max-w-xl mx-auto px-5 py-10">
          <div className="mb-8">
            <span className="block text-primary text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
              {t('common.profile')}
            </span>
            <div className="flex items-end justify-between gap-4">
              <div>
                <h1 className="text-2xl font-semibold tracking-tight leading-tight">
                  {userProfile.name || 'User'}
                </h1>
                <p className="text-muted-foreground text-xs mt-1">
                  Member since {formatDate(userProfile.createdAt?.toDate ? userProfile.createdAt.toDate() : userProfile.createdAt)}
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setEditMode((v) => !v)}
              >
                {editMode ? 'Cancel' : 'Edit'}
              </Button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <Card className="mb-5">
              <CardContent>
                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="name">Full name</FieldLabel>
                    {editMode ? (
                      <Input
                        id="name"
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                        placeholder="Your name"
                        autoComplete="name"
                      />
                    ) : (
                      <p className="text-sm">{formData.name || '—'}</p>
                    )}
                  </Field>

                  <Separator />

                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <p className="text-sm text-muted-foreground">{formData.email}</p>
                    {editMode && <FieldDescription>Email cannot be changed.</FieldDescription>}
                  </Field>

                  <Separator />

                  <Field>
                    <FieldLabel htmlFor="language">Preferred language</FieldLabel>
                    {editMode ? (
                      <Select
                        value={formData.language}
                        onValueChange={(value) => setFormData((p) => ({ ...p, language: value }))}
                      >
                        <SelectTrigger id="language" className="w-full">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectItem value="en">English</SelectItem>
                            <SelectItem value="ko">한국어</SelectItem>
                            <SelectItem value="uz">O'zbek</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    ) : (
                      <p className="text-sm">{LANGUAGE_LABELS[formData.language] || 'English'}</p>
                    )}
                  </Field>

                  <Separator />

                  <Field orientation="horizontal">
                    <FieldLabel htmlFor="notifications" className="flex-1">
                      <span className="font-medium">Email notifications</span>
                      <FieldDescription>Health tips and updates</FieldDescription>
                    </FieldLabel>
                    <Switch
                      id="notifications"
                      checked={formData.notifications}
                      onCheckedChange={(checked) => setFormData((p) => ({ ...p, notifications: checked }))}
                      disabled={!editMode}
                    />
                  </Field>
                </FieldGroup>
              </CardContent>
            </Card>

            {editMode && (
              <div className="flex gap-3">
                <Button
                  type="button"
                  variant="outline"
                  className="flex-1"
                  onClick={() => setEditMode(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isSubmitting} className="flex-1">
                  {isSubmitting && <Loader2 data-icon="inline-start" className="animate-spin" />}
                  {isSubmitting ? 'Saving…' : t('common.save')}
                </Button>
              </div>
            )}
          </form>

          <Card className="mt-5">
            <CardContent className="p-0">
              <Link
                to="/medical-history"
                className="flex items-center justify-between px-5 py-4 hover:bg-muted/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <History className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm">{t('medicalHistory.title')}</p>
                    <p className="text-xs text-muted-foreground">View saved conversations</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
              </Link>

              <Separator />

              <Link
                to="/chat"
                className="flex items-center justify-between px-5 py-4 hover:bg-muted/50 transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-4 h-4 text-muted-foreground" />
                  <div>
                    <p className="text-sm">Start health chat</p>
                    <p className="text-xs text-muted-foreground">Analyze symptoms with AI</p>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
              </Link>

              <Separator />

              <button
                onClick={handleSignOut}
                className="w-full flex items-center justify-between px-5 py-4 hover:bg-muted/50 transition-colors group text-left"
              >
                <div className="flex items-center gap-3">
                  <LogOut className="w-4 h-4 text-destructive" />
                  <p className="text-sm text-destructive">{t('common.signOut')}</p>
                </div>
                <ChevronRight className="w-4 h-4 text-muted-foreground/50 group-hover:text-muted-foreground transition-colors" />
              </button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Profile;
