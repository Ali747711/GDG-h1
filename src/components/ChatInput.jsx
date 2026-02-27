import { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Send } from 'lucide-react';

const ChatInput = ({ onSendMessage, isLoading, disabled }) => {
  const { t, i18n } = useTranslation();
  const [message, setMessage] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language || 'en');

  useEffect(() => {
    setSelectedLanguage(i18n.language || 'en');
  }, [i18n.language]);

  const languages = [
    { code: 'en', label: 'EN' },
    { code: 'ko', label: '한국어' },
    { code: 'uz', label: "O'zbek" }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading && !disabled) {
      onSendMessage(message.trim(), selectedLanguage);
      setMessage('');
    }
  };

  const handleLanguageChange = (langCode) => {
    setSelectedLanguage(langCode);
    i18n.changeLanguage(langCode);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const canSend = message.trim() && !isLoading && !disabled;

  return (
    <form onSubmit={handleSubmit}>
      {/* Composer card */}
      <div className="bg-slate-900 border border-white/[0.08] rounded-2xl px-4 pt-4 pb-3 focus-within:border-white/[0.14] transition-colors">

        {/* Textarea */}
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={t('chat.placeholder')}
          className="w-full bg-transparent text-white placeholder-white/25 resize-none focus:outline-none text-sm leading-relaxed min-h-[28px] max-h-[160px]"
          disabled={isLoading || disabled}
          maxLength={1000}
          rows={1}
          style={{ height: 'auto', minHeight: '28px' }}
          onInput={(e) => {
            e.target.style.height = 'auto';
            e.target.style.height = Math.min(e.target.scrollHeight, 160) + 'px';
          }}
        />

        {/* Bottom row */}
        <div className="flex items-center justify-between mt-3 pt-2.5 border-t border-white/[0.06]">

          {/* Language pills */}
          <div className="flex items-center gap-0.5">
            {languages.map((lang) => (
              <button
                key={lang.code}
                type="button"
                onClick={() => handleLanguageChange(lang.code)}
                className={`px-2.5 py-1 rounded-full text-[11px] font-medium transition-colors ${
                  selectedLanguage === lang.code
                    ? 'bg-white/10 text-white/80'
                    : 'text-white/25 hover:text-white/50 hover:bg-white/5'
                }`}
              >
                {lang.label}
              </button>
            ))}
          </div>

          {/* Char count + Send */}
          <div className="flex items-center gap-3">
            {message.length > 0 && (
              <span className="text-[10px] text-white/20">{message.length}/1000</span>
            )}
            <button
              type="submit"
              disabled={!canSend}
              className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                canSend
                  ? 'bg-amber-400 text-slate-900 hover:bg-amber-300 active:scale-95'
                  : 'bg-white/5 text-white/15 cursor-not-allowed'
              }`}
            >
              {isLoading ? (
                <div className="w-3.5 h-3.5 border-2 border-white/20 border-t-white/50 rounded-full animate-spin" />
              ) : (
                <Send className="w-3.5 h-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default ChatInput;
