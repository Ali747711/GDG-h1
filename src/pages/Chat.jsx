import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { AlertCircle, Save, X } from 'lucide-react';
import ChatMessage from '../components/ChatMessage';
import { PromptInputBox } from '../components/AiInput';
import SunIcon from '../components/SunIcon';
import { analyzeSymptoms } from '../utils/api';
import { useAuth } from '../contexts/FirebaseAuthContext';

const Chat = () => {
  const { t, i18n } = useTranslation();
  const { isAuthenticated, user, userProfile, saveMedicalEntry } = useAuth();
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSaving, setIsSaving] = useState(false);
  const [currentConversationId] = useState(() => Date.now());
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const saveConversationEntry = async (userMessage, aiResponse = null, language = 'en') => {
    if (!isAuthenticated || !userMessage) return;

    setIsSaving(true);
    try {
      const entry = {
        conversationId: currentConversationId,
        userMessage: userMessage.content,
        aiResponse: aiResponse ? {
          analysis: aiResponse.data,
          timestamp: aiResponse.timestamp
        } : null,
        language: language,
        symptoms: userMessage.content,
        type: 'symptom_analysis'
      };

      const result = await saveMedicalEntry(entry);
      if (!result.success) {
        console.error('Failed to save conversation:', result.error);
      }
    } catch (err) {
      console.error('Error saving conversation:', err);
    } finally {
      setIsSaving(false);
    }
  };

  const handleSendMessage = async (messageContent, language) => {
    if (!messageContent.trim()) return;

    const userMessage = {
      id: Date.now(),
      content: messageContent,
      isUser: true,
      timestamp: new Date().toISOString(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);
    setError(null);

    try {
      const response = await analyzeSymptoms(messageContent, language);

      const aiMessage = {
        id: Date.now() + 1,
        data: response,
        isUser: false,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, aiMessage]);

      if (isAuthenticated) {
        await saveConversationEntry(userMessage, aiMessage, language);
      }
    } catch (err) {
      console.error('Error analyzing symptoms:', err);
      setError(err.message || 'Failed to analyze symptoms. Please try again.');

      const errorMessage = {
        id: Date.now() + 1,
        content: 'I apologize, but I encountered an error while analyzing your symptoms. Please try again in a moment.',
        isUser: false,
        isError: true,
        timestamp: new Date().toISOString()
      };

      setMessages(prev => [...prev, errorMessage]);

      if (isAuthenticated) {
        await saveConversationEntry(userMessage, null, language);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const clearChat = () => {
    setMessages([]);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col">

      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-40 h-14 border-b border-white/[0.06] bg-slate-950/95 backdrop-blur-sm">
        <div className="h-full flex items-center justify-between px-5 max-w-3xl mx-auto">
          {/* Left: Logo */}
          <Link to="/" className="flex items-center gap-2">
            <SunIcon className="w-5 h-5" color="#F59E0B" />
            <span className="text-white font-semibold text-sm">{t('home.title')}</span>
          </Link>

          {/* Right */}
          <div className="flex items-center gap-3">
            {/* Saving indicator */}
            {isSaving && (
              <span className="flex items-center gap-1 text-[11px] text-white/25">
                <Save className="w-3 h-3 animate-pulse" />
                {t('common.saving')}
              </span>
            )}

            {/* Clear chat */}
            {messages.length > 0 && (
              <button
                onClick={clearChat}
                className="flex items-center gap-1 text-[11px] text-white/25 hover:text-white/50 transition-colors"
              >
                <X className="w-3 h-3" />
                {t('common.clearChat')}
              </button>
            )}

            {/* Auth */}
            {isAuthenticated ? (
              <Link
                to="/profile"
                title={userProfile?.name || user?.displayName || 'Profile'}
                className="w-7 h-7 rounded-full bg-amber-400/15 text-amber-300 text-xs font-bold flex items-center justify-center hover:bg-amber-400/25 transition-colors flex-shrink-0"
              >
                {(userProfile?.name || user?.displayName || 'U').charAt(0).toUpperCase()}
              </Link>
            ) : (
              <Link
                to="/auth"
                className="text-[11px] px-3.5 py-1.5 bg-amber-400 text-slate-900 font-bold rounded-full hover:bg-amber-300 transition-colors"
              >
                {t('nav.signIn')}
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Content area */}
      <div className="flex-1 flex flex-col pt-14 pb-44">

        {/* Welcome / empty state */}
        {messages.length === 0 && !isLoading && (
          <div className="flex-1 flex items-center justify-center px-6">
            <div className="max-w-lg w-full">
              <span className="block text-amber-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-5">
                {t('common.aiHealthAssistant')}
              </span>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-white leading-tight mb-3">
                {t('home.howCanIHelp')}
              </h1>
              <p className="text-white/35 text-sm leading-relaxed mb-8">
                {t('home.describeSymptoms')}
              </p>

              {/* Sample prompts */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-6">
                {[
                  t('chat.samples.headacheFever'),
                  t('chat.samples.coughSoreThroat'),
                  t('chat.samples.stomachPain'),
                  t('chat.samples.dizzyTired'),
                ].map(sample => (
                  <button
                    key={sample}
                    onClick={() => handleSendMessage(sample, i18n.language)}
                    className="text-left px-4 py-3 border border-white/10 rounded-xl text-xs text-white/50 hover:text-white/80 hover:border-white/20 transition-colors"
                  >
                    {sample}
                  </button>
                ))}
              </div>

              {!isAuthenticated && (
                <p className="text-xs text-white/25">
                  <Link to="/auth" className="text-white/45 hover:text-white/70 underline underline-offset-2 transition-colors">
                    {t('nav.signIn')}
                  </Link>{' '}
                  {t('home.signInToSave')}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Messages */}
        {(messages.length > 0 || isLoading) && (
          <div className="flex-1 px-5 py-6 overflow-y-auto">
            <div className="max-w-2xl mx-auto space-y-5">
              {messages.map((message) => (
                <div key={message.id} className="animate-slide-in">
                  <ChatMessage message={message} isUser={message.isUser} />
                </div>
              ))}
              {isLoading && (
                <div className="animate-slide-in">
                  <ChatMessage isLoading={true} />
                </div>
              )}
              <div ref={messagesEndRef} className="h-2" />
            </div>
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="px-5 pb-4">
            <div className="max-w-2xl mx-auto">
              <div className="flex items-start gap-3 bg-red-500/10 border border-red-500/20 rounded-xl p-4">
                <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm text-red-300 mb-1">{t('chat.connectionError')}</p>
                  <p className="text-xs text-red-300/60">{error}</p>
                  <button
                    onClick={() => setError(null)}
                    className="mt-2 text-xs text-red-400/60 hover:text-red-300 transition-colors"
                  >
                    {t('common.dismiss')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Fixed input bar */}
      <div className="fixed bottom-0 left-0 right-0 z-40">
        {/* Gradient fade — content scrolls underneath */}
        <div className="h-10 bg-gradient-to-t from-slate-950 to-transparent pointer-events-none" />
        <div className="bg-slate-950 px-5 pb-6">
          <div className="max-w-2xl mx-auto">
            <PromptInputBox
              onSend={(message, language) => handleSendMessage(message, language)}
              isLoading={isLoading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;
