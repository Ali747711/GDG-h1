import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

// Translation files
const resources = {
  en: {
    translation: {
      // Navigation
      nav: {
        home: 'Home',
        about: 'About',
        signIn: 'Sign In',
        chat: 'Chat'
      },
      // Common UI elements
      common: {
        clear: 'Clear',
        profile: 'Profile',
        signOut: 'Sign Out',
        loading: 'Loading...',
        tryAgain: 'Try Again',
        dismiss: 'Dismiss',
        hello: 'Hello',
        save: 'Save',
        saving: 'Saving...',
        backToHome: 'Back to Home',
        clearChat: 'Clear Chat',
        aiHealthAssistant: 'AI Health Assistant',
        tryTheseExamples: 'Try these examples:',
        readyToStart: 'Ready to get started?',
        freeNoRegistration: 'Free • No registration required • Available in 3 languages',
        getStarted: 'Get Started',
        learnMore: 'Learn More',
        tryAvicenna: 'Try Avicenna'
      },
      // Home page
      home: {
        title: 'Avicenna',
        subtitle: 'Symptom Insight AI',
        description: 'Your healthcare companion for symptom analysis in English, Korean, and Uzbek. Designed specifically for foreigners living in South Korea.',
        cta: 'Start Symptom Analysis',
        howCanIHelp: 'How can I help you today?',
        describeSymptoms: 'Describe your symptoms and I\'ll provide personalized health insights in English, Korean, or Uzbek.',
        signInToSave: 'to save your conversations automatically',
        hero: {
          headline: 'Understand your symptoms with trusted AI guidance',
          understandYour: 'Understand your',
          symptoms: 'symptoms',
          withTrustedAI: 'with trusted AI guidance',
          subtitle: 'Your multilingual health companion in English, Korean, and Uzbek — designed for foreigners in South Korea.',
          multilingualCompanion: 'Your multilingual health companion in',
          english: 'English',
          korean: 'Korean',
          uzbek: 'Uzbek',
          designedFor: 'designed for foreigners in South Korea.'
        },
        whyChoose: {
          title: 'Why Choose Avicenna?',
          subtitle: 'Advanced AI technology meets multilingual healthcare support for better health decisions'
        },
        howItWorks: {
          title: 'How Avicenna Works',
          subtitle: 'Simple, secure, and intelligent healthcare guidance in three easy steps',
          step1: {
            title: 'Describe Your Symptoms',
            description: 'Tell us about your health concerns in your preferred language - English, Korean, or Uzbek.'
          },
          step2: {
            title: 'AI Analysis',
            description: 'Our advanced AI analyzes your symptoms and provides personalized health insights.'
          },
          step3: {
            title: 'Get Guidance',
            description: 'Receive clear recommendations and know when to seek professional medical care.'
          }
        },
        features: {
          multilingual: {
            title: 'Multilingual Support',
            description: 'Get help in English, Korean, or Uzbek language with natural conversation'
          },
          ai: {
            title: 'AI-Powered Analysis',
            description: 'Advanced symptom analysis with urgency assessment and clear explanations'
          },
          privacy: {
            title: 'Privacy First',
            description: 'Your health information is secure and private. Optional account creation'
          }
        },
        ctaSection: {
          ready: 'Ready to understand your health better?',
          joinThousands: 'Join thousands of users who trust Avicenna for reliable health guidance. Start your free symptom analysis today.',
          getStarted: 'Get Started Now'
        }
      },
      // About page
      about: {
        title: 'About Avicenna',
        subtitle: 'AI Health Companion',
        description: 'Avicenna helps foreigners in South Korea understand their symptoms — in English, Korean, or Uzbek — without the confusion of a language barrier.',
        mission: {
          label: 'Mission',
          title: 'Healthcare without the language barrier',
          description: 'Getting medical help in a foreign country is hard enough without a language problem on top of it. Avicenna exists so you can understand your symptoms clearly — in the language you actually think in — and know what to do next.'
        },
        values: {
          multilingual: {
            title: 'Three languages, one tool',
            description: 'Describe what you feel in English, Korean, or Uzbek — whichever is most natural to you. No translation needed.'
          },
          aiPowered: {
            title: 'Clinically informed AI',
            description: 'Avicenna uses medical knowledge to assess your symptoms, estimate urgency, and tell you whether to rest, see a doctor, or go to the ER.'
          },
          accessible: {
            title: 'Always available',
            description: 'No appointment. No insurance card. No waiting room. Open your browser and get guidance within minutes.'
          }
        },
        howItWorks: {
          label: 'How It Works',
          title: 'How Avicenna Works',
          description: 'Describe what you\'re feeling — Avicenna maps your words to medical context and tells you what to do next.',
          block1: {
            title: 'Symptom Analysis',
            description: 'Tell Avicenna what you\'re experiencing in plain language. It reads for severity, duration, and context — not just keywords.',
            point1: 'Works in English, Korean, and Uzbek',
            point2: 'Understands vague descriptions, not just medical terms',
            point3: 'Picks up on warning signs automatically'
          },
          block2: {
            title: 'What You Should Do',
            description: 'Get a clear picture of what might be happening and what your next step should be — rest, see a doctor, or go to the ER.',
            point1: 'Likely causes based on your specific symptoms',
            point2: 'Urgency level: home care, doctor visit, or emergency',
            point3: 'What type of specialist to see if needed'
          }
        },
        builtWithCare: {
          label: 'Team',
          title: 'Built with care',
          description: 'Avicenna started as a direct response to a real problem: foreigners struggling to get medical help in a language they understand. It\'s built to be useful — not impressive.',
          ai: {
            title: 'AI at the core',
            description: 'Powered by Google Gemini — one of the most capable language models available — applied to medical reasoning.'
          },
          medical: {
            title: 'Medically grounded',
            description: 'Responses follow clinical reasoning patterns. Avicenna doesn\'t guess — it works from what you describe.'
          },
          community: {
            title: 'Built for expats',
            description: 'Every decision — from language choice to disclaimer wording — is made with foreigners in South Korea in mind.'
          }
        },
        disclaimer: {
          title: 'Important Medical Disclaimer',
          substitute: 'Avicenna is a health information tool — not a replacement for professional medical care. It cannot examine you, order tests, or provide a diagnosis.',
          seekProfessional: 'Always see a doctor if you experience',
          severeSymptoms: 'Severe, persistent, or rapidly worsening symptoms',
          emergencySymptoms: 'Emergency signs — chest pain, difficulty breathing, heavy bleeding',
          chronicConditions: 'Symptoms linked to a known chronic condition',
          medications: 'Anything that may require prescription medication or procedures',
          limitations: 'AI limitations',
          generalInfo: 'Avicenna provides general guidance based on what you describe. Every individual is different — your actual situation may vary significantly from what the AI suggests.',
          emergencySituations: 'In an emergency',
          emergencyContact: 'Call your local emergency number immediately. Do not wait for AI guidance.'
        },
        privacy: {
          title: 'Your data, your control',
          description: 'Avicenna is built with privacy at its core. You decide what gets stored — and you can use it fully without ever creating an account.',
          dataProtection: {
            title: 'How we protect your data',
            noPersonal: 'No personal health data is stored without your permission',
            encrypted: 'All conversations are encrypted in transit',
            noAccount: 'Full functionality available without an account',
            anonymous: 'Anonymous usage by default — no tracking'
          },
          yourControl: {
            title: 'What you control',
            clearHistory: 'Clear your conversation history any time',
            preferredLanguage: 'Set your preferred language independently',
            noAccount: 'Use the app without ever signing up',
            transparent: 'We are transparent about how your data is used'
          }
        },
        cta: {
          title: 'Ready to get started?',
          description: 'Experience personalized health guidance in your preferred language. Start your symptom analysis with Avicenna today.',
          button: 'Start Symptom Analysis',
          ready: 'Understand your symptoms today.',
          personalized: 'Free symptom analysis in English, Korean, or Uzbek. ',
          symptomAnalysis: 'No appointment needed.',
          startSymptomAnalysis: 'Start for free',
          free: 'Free',
          noRegistration: 'No registration',
          languages: '3 languages'
        },
        features: {
          multilingual: 'Multilingual Support',
          healthcare: 'Healthcare Guidance'
        }
      },
      // Chat page
      chat: {
        title: 'Symptom Analysis Chat',
        description: 'Describe your symptoms in your preferred language',
        placeholder: 'Describe your symptoms in detail...',
        send: 'Send',
        analyzing: 'Analyzing your symptoms...',
        connectionError: 'Connection Error',
        samples: {
          headacheFever: 'I have a headache and fever',
          coughSoreThroat: 'I\'m coughing with sore throat',
          stomachPain: 'Stomach pain after eating',
          dizzyTired: 'I feel dizzy and tired lately'
        }
      },
      // Auth page
      auth: {
        title: 'Welcome Back',
        joinTitle: 'Join Avicenna',
        description: 'Sign in to access your health history',
        joinDescription: 'Create your account to get started',
        email: 'Email',
        password: 'Password',
        signIn: 'Sign In',
        signUp: 'Sign Up',
        noAccount: "Don't have an account?",
        haveAccount: 'Already have an account?',
        placeholders: {
          email: 'Enter your email',
          password: 'Enter your password'
        }
      },
      // Medical History
      medicalHistory: {
        title: 'Medical History',
        symptomAnalysis: 'Symptom Analysis',
        noHistory: 'No medical history found',
        startFirst: 'Start your first symptom analysis',
        viewDetails: 'View Details',
        exportPdf: 'Export PDF'
      },
      // Urgency levels
      urgency: {
        monitor_at_home: 'Monitor at Home',
        see_doctor_soon: 'See Doctor Soon',
        emergency_care: 'Emergency Care'
      }
    }
  },
  ko: {
    translation: {
      // Navigation
      nav: {
        home: '홈',
        about: '소개',
        signIn: '로그인',
        chat: '채팅'
      },
      // Common UI elements
      common: {
        clear: '지우기',
        profile: '프로필',
        signOut: '로그아웃',
        loading: '로딩 중...',
        tryAgain: '다시 시도',
        dismiss: '닫기',
        hello: '안녕하세요',
        save: '저장',
        saving: '저장 중...',
        backToHome: '홈으로 돌아가기',
        clearChat: '채팅 지우기',
        aiHealthAssistant: 'AI 건강 도우미',
        tryTheseExamples: '이 예시들을 시도해보세요:',
        readyToStart: '시작할 준비가 되셨나요?',
        freeNoRegistration: '무료 • 회원가입 불필요 • 3개 언어 지원',
        getStarted: '시작하기',
        learnMore: '자세히 알아보기',
        tryAvicenna: '아비세나 체험하기'
      },
      // Home page
      home: {
        title: '아비세나',
        subtitle: '증상 분석 AI',
        description: '영어, 한국어, 우즈베크어로 증상 분석을 제공하는 의료 AI 동반자입니다. 한국에 거주하는 외국인을 위해 특별히 설계되었습니다.',
        cta: '증상 분석 시작하기',
        howCanIHelp: '오늘 어떤 도움이 필요하신가요?',
        describeSymptoms: '증상을 설명해주시면 영어, 한국어, 우즈베크어로 개인 맞춤형 건강 인사이트를 제공해드리겠습니다.',
        signInToSave: '로그인하여 대화를 자동으로 저장하세요',
        hero: {
          headline: '신뢰할 수 있는 AI 가이드로 증상을 이해하세요',
          understandYour: '신뢰할 수 있는 AI 가이드로',
          symptoms: '증상을',
          withTrustedAI: '이해하세요',
          subtitle: '한국에 거주하는 외국인을 위해 설계된 영어, 한국어, 우즈베크어 지원 다국어 건강 동반자입니다.',
          multilingualCompanion: '다국어 건강 동반자',
          english: '영어',
          korean: '한국어',
          uzbek: '우즈베크어',
          designedFor: '한국 거주 외국인을 위해 설계되었습니다.'
        },
        whyChoose: {
          title: '왜 아비세나를 선택해야 할까요?',
          subtitle: '더 나은 건강 결정을 위한 고급 AI 기술과 다국어 의료 지원의 만남'
        },
        howItWorks: {
          title: '아비세나 작동 방법',
          subtitle: '간단하고 안전하며 지능적인 의료 안내 3단계',
          step1: {
            title: '증상 설명하기',
            description: '영어, 한국어, 우즈베크어로 건강 상태에 대해 말씀해주세요.'
          },
          step2: {
            title: 'AI 분석',
            description: '고급 AI가 증상을 분석하고 개인 맞춤형 건강 인사이트를 제공합니다.'
          },
          step3: {
            title: '가이드 받기',
            description: '명확한 권장 사항을 받고 전문 의료 진료가 필요한 시기를 알아보세요.'
          }
        },
        features: {
          multilingual: {
            title: '다국어 지원',
            description: '영어, 한국어, 우즈베크어로 자연스러운 대화를 통해 도움을 받으세요'
          },
          ai: {
            title: 'AI 기반 분석',
            description: '긴급도 평가와 명확한 설명이 포함된 고급 증상 분석'
          },
          privacy: {
            title: '개인정보 보호 우선',
            description: '귀하의 건강 정보는 안전하고 비공개입니다. 선택적 계정 생성'
          }
        },
        ctaSection: {
          ready: '당신의 건강을 더 잘 이해하기 위해 준비되셨나요?',
          joinThousands: '아비세나를 신뢰하는 수천 명의 사용자와 함께하세요. 오늘 무료 증상 분석을 시작하세요.',
          getStarted: '지금 시작하기'
        }
      },
      // About page
      about: {
        title: '아비세나 소개',
        subtitle: 'AI 건강 동반자',
        description: '아비세나는 한국에 거주하는 외국인이 언어 장벽 없이 증상을 이해할 수 있도록 돕습니다.',
        mission: {
          label: '미션',
          title: '언어 장벽 없는 의료 서비스',
          description: '외국에서 의료 도움을 받는 것은 언어 문제까지 더해지면 더욱 어렵습니다. 아비세나는 여러분이 실제로 생각하는 언어로 증상을 명확히 이해하고 다음 단계를 알 수 있도록 만들어졌습니다.'
        },
        values: {
          multilingual: {
            title: '세 가지 언어, 하나의 도구',
            description: '영어, 한국어, 우즈베크어 중 가장 자연스러운 언어로 증상을 설명하세요.'
          },
          aiPowered: {
            title: '임상 기반 AI',
            description: '아비세나는 의학 지식을 활용해 증상을 평가하고, 긴급도를 판단하며, 다음 단계를 안내합니다.'
          },
          accessible: {
            title: '언제나 이용 가능',
            description: '예약도, 보험 카드도 필요 없습니다. 브라우저를 열면 몇 분 안에 안내를 받을 수 있습니다.'
          }
        },
        howItWorks: {
          label: '작동 방법',
          title: '아비세나 작동 방법',
          description: '느끼는 것을 설명하면 — 아비세나가 여러분의 말을 의학적 맥락으로 변환하고 다음 단계를 알려드립니다.',
          block1: {
            title: '증상 분석',
            description: '일상적인 언어로 경험하는 것을 말씀해주세요. 키워드만이 아닌 심각도, 기간, 상황을 파악합니다.',
            point1: '영어, 한국어, 우즈베크어로 작동',
            point2: '의학 용어뿐 아니라 모호한 설명도 이해',
            point3: '경고 신호를 자동으로 감지'
          },
          block2: {
            title: '다음 단계',
            description: '무슨 일이 일어나고 있는지, 다음 단계가 무엇인지 — 휴식, 의사 방문, 또는 응급실 방문 — 명확하게 알려드립니다.',
            point1: '구체적인 증상에 기반한 가능성 있는 원인',
            point2: '긴급도: 자택 요양, 의사 방문, 또는 응급',
            point3: '필요한 경우 어떤 전문의를 찾아야 하는지'
          }
        },
        builtWithCare: {
          label: '팀',
          title: '정성으로 만든 서비스',
          description: '아비세나는 실제 문제에 대한 직접적인 응답으로 시작되었습니다: 자신이 이해하는 언어로 의료 도움을 받는 데 어려움을 겪는 외국인들. 인상적이기 위해서가 아닌 실용적이기 위해 만들어졌습니다.',
          ai: {
            title: 'AI의 핵심',
            description: 'Google Gemini — 가장 뛰어난 언어 모델 중 하나 — 를 의학적 추론에 적용했습니다.'
          },
          medical: {
            title: '의학적 근거',
            description: '응답은 임상 추론 패턴을 따릅니다. 아비세나는 추측하지 않습니다 — 여러분이 설명한 내용을 바탕으로 합니다.'
          },
          community: {
            title: '외국인을 위해 설계',
            description: '언어 선택부터 면책 조항 문구까지 — 모든 결정은 한국에 거주하는 외국인을 염두에 두고 이루어집니다.'
          }
        },
        disclaimer: {
          title: '중요한 의료 면책 조항',
          substitute: '아비세나는 건강 정보 도구로, 전문 의료 서비스를 대체할 수 없습니다. 신체 검사, 검사 주문, 진단을 제공하지 않습니다.',
          seekProfessional: '다음의 경우 반드시 의사를 만나세요',
          severeSymptoms: '심각하거나 지속적으로 악화되는 증상',
          emergencySymptoms: '응급 징후 — 가슴 통증, 호흡 곤란, 심한 출혈',
          chronicConditions: '기존 만성 질환과 관련된 증상',
          medications: '처방약이나 의료 시술이 필요한 상황',
          limitations: 'AI의 한계',
          generalInfo: '아비세나는 여러분이 설명한 내용을 바탕으로 일반적인 안내를 제공합니다. 개인의 실제 상황은 AI의 제안과 크게 다를 수 있습니다.',
          emergencySituations: '응급상황 시',
          emergencyContact: '즉시 응급번호로 전화하세요. AI 안내를 기다리지 마세요.'
        },
        privacy: {
          title: '내 데이터, 내가 통제',
          description: '아비세나는 개인정보 보호를 핵심으로 설계되었습니다. 계정 없이도 모든 기능을 사용할 수 있습니다.',
          dataProtection: {
            title: '데이터 보호 방법',
            noPersonal: '허락 없이 개인 건강 정보를 저장하지 않습니다',
            encrypted: '모든 대화는 전송 중 암호화됩니다',
            noAccount: '계정 없이 모든 기능 이용 가능',
            anonymous: '기본적으로 익명 사용 — 추적 없음'
          },
          yourControl: {
            title: '내가 통제하는 것',
            clearHistory: '언제든지 대화 기록 삭제 가능',
            preferredLanguage: '선호 언어 독립적으로 설정',
            noAccount: '가입 없이 앱 사용 가능',
            transparent: '데이터 사용에 대해 투명하게 공개'
          }
        },
        cta: {
          title: '시작할 준비가 되셨나요?',
          description: '선호하는 언어로 개인 맞춤형 건강 안내를 경험해보세요.',
          button: '증상 분석 시작하기',
          ready: '오늘 증상을 이해하세요.',
          personalized: '영어, 한국어, 우즈베크어로 무료 증상 분석. ',
          symptomAnalysis: '예약 필요 없음.',
          startSymptomAnalysis: '무료로 시작하기',
          free: '무료',
          noRegistration: '회원가입 불필요',
          languages: '3개 언어'
        },
        features: {
          multilingual: '다국어 지원',
          healthcare: '의료 안내'
        }
      },
      // Chat page
      chat: {
        title: '증상 분석 채팅',
        description: '선호하는 언어로 증상을 설명해주세요',
        placeholder: '증상을 자세히 설명해주세요...',
        send: '전송',
        analyzing: '증상을 분석하는 중...',
        connectionError: '연결 오류',
        samples: {
          headacheFever: '머리가 아프고 열이 나요',
          coughSoreThroat: '기침이 나고 목이 아파요',
          stomachPain: '배가 아프고 소화가 안 돼요',
          dizzyTired: '어지럽고 요즘 피곤해요'
        }
      },
      // Auth page
      auth: {
        title: '다시 오신 것을 환영합니다',
        joinTitle: '아비세나 가입하기',
        description: '건강 기록에 액세스하려면 로그인하세요',
        joinDescription: '시작하려면 계정을 만드세요',
        email: '이메일',
        password: '비밀번호',
        signIn: '로그인',
        signUp: '가입하기',
        noAccount: '계정이 없으신가요?',
        haveAccount: '이미 계정이 있으신가요?',
        placeholders: {
          email: '이메일을 입력하세요',
          password: '비밀번호를 입력하세요'
        }
      },
      // Medical History
      medicalHistory: {
        title: '의료 기록',
        symptomAnalysis: '증상 분석',
        noHistory: '의료 기록이 없습니다',
        startFirst: '첫 번째 증상 분석을 시작하세요',
        viewDetails: '세부 정보 보기',
        exportPdf: 'PDF 내보내기'
      },
      // Urgency levels
      urgency: {
        monitor_at_home: '집에서 관찰',
        see_doctor_soon: '곧 의사 방문',
        emergency_care: '응급 치료'
      }
    }
  },
  uz: {
    translation: {
      // Navigation
      nav: {
        home: 'Bosh sahifa',
        about: 'Haqida',
        signIn: 'Kirish',
        chat: 'Suhbat'
      },
      // Common UI elements
      common: {
        clear: 'Tozalash',
        profile: 'Profil',
        signOut: 'Chiqish',
        loading: 'Yuklanmoqda...',
        tryAgain: 'Qayta urining',
        dismiss: 'Yopish',
        hello: 'Salom',
        save: 'Saqlash',
        saving: 'Saqlanmoqda...',
        backToHome: 'Bosh sahifaga qaytish',
        clearChat: 'Suhbatni tozalash',
        aiHealthAssistant: 'AI Salomatlik Yordamchisi',
        tryTheseExamples: 'Ushbu misollarni sinab ko\'ring:',
        readyToStart: 'Boshlashga tayyormisiz?',
        freeNoRegistration: 'Bepul • Ro\'yxatdan o\'tish shart emas • 3 tilda mavjud',
        getStarted: 'Boshlash',
        learnMore: 'Batafsil ma\'lumot',
        tryAvicenna: 'Avicenna\'ni sinab ko\'ring'
      },
      // Home page
      home: {
        title: 'Avicenna',
        subtitle: 'Simptom Tahlil AI',
        description: 'Ingliz, koreys va o\'zbek tillarida simptomlarni tahlil qilish uchun tibbiy AI yordamchisi. Janubiy Koreyada yashovchi chet elliklar uchun maxsus ishlab chiqilgan.',
        cta: 'Simptom tahlilini boshlash',
        howCanIHelp: 'Bugun sizga qanday yordam bera olaman?',
        describeSymptoms: 'Simptomlaringizni tasvirlab bering va men sizga ingliz, koreys yoki o\'zbek tilida shaxsiy salomatlik ma\'lumotlarini taqdim etaman.',
        signInToSave: 'suhbatlaringizni avtomatik saqlash uchun kiring',
        hero: {
          headline: 'Ishonchli AI yo\'riqnomasi bilan simptomlaringizni tushuning',
          understandYour: 'Ishonchli AI yo\'riqnomasi bilan',
          symptoms: 'simptomlaringizni',
          withTrustedAI: 'tushuning',
          subtitle: 'Janubiy Koreyada yashovchi chet elliklar uchun mo\'ljallangan ingliz, koreys va o\'zbek tillarida ko\'p tilli salomatlik yordamchisi.',
          multilingualCompanion: 'Ko\'p tilli salomatlik yordamchisi',
          english: 'Ingliz',
          korean: 'Koreys',
          uzbek: 'O\'zbek',
          designedFor: 'Janubiy Koreyada yashovchi chet elliklar uchun mo\'ljallangan.'
        },
        whyChoose: {
          title: 'Nega Avicenna\'ni tanlash kerak?',
          subtitle: 'Yaxshi salomatlik qarorlari uchun ilg\'or AI texnologiyasi va ko\'p tilli tibbiy yordam'
        },
        howItWorks: {
          title: 'Avicenna qanday ishlaydi',
          subtitle: 'Uchta oson qadamda oddiy, xavfsiz va aqlli tibbiy yo\'riqnoma',
          step1: {
            title: 'Simptomlaringizni tasvirlab bering',
            description: 'O\'zingiz afzal ko\'rgan tilda - ingliz, koreys yoki o\'zbek tilida salomatlik muammolaringiz haqida gapirib bering.'
          },
          step2: {
            title: 'AI tahlili',
            description: 'Bizning ilg\'or AI simptomlaringizni tahlil qiladi va shaxsiy salomatlik ma\'lumotlarini taqdim etadi.'
          },
          step3: {
            title: 'Yo\'riqnoma oling',
            description: 'Aniq tavsiyalar oling va professional tibbiy yordam qachon kerakligini bilib oling.'
          }
        },
        features: {
          multilingual: {
            title: 'Ko\'p tilli qo\'llab-quvvatlash',
            description: 'Ingliz, koreys yoki o\'zbek tilida tabiiy suhbat orqali yordam oling'
          },
          ai: {
            title: 'AI asosidagi tahlil',
            description: 'Shoshilinch darajasini baholash va aniq tushuntirishlar bilan ilg\'or simptom tahlili'
          },
          privacy: {
            title: 'Maxfiylik birinchi o\'rinda',
            description: 'Sizning sog\'liq ma\'lumotlaringiz xavfsiz va maxfiy. Ixtiyoriy hisob yaratish'
          }
        },
        ctaSection: {
          ready: 'Sizning sog\'liqingizni yaxshiroq tushunishga tayyormisiz?',
          joinThousands: 'Avicenna\'ni ishonchli salomatlik yo\'riqnomasi bilan, siz bilan birga, 1000dan ortiq foydalanuvchilar bilan. Bugun sizning bepul simptom tahlilingizni boshlang.',
          getStarted: 'Endi boshlash'
        }
      },
      // About page
      about: {
        title: 'Avicenna haqida',
        subtitle: 'AI Salomatlik Yordamchisi',
        description: 'Avicenna Janubiy Koreyada yashovchi chet elliklarning til to\'sig\'isiz simptomlarini tushunishlariga yordam beradi.',
        mission: {
          label: 'Missiya',
          title: 'Til to\'sig\'isiz tibbiy yordam',
          description: 'Chet mamlakatda tibbiy yordam olish til muammosi bilan birga yanada qiyinlashadi. Avicenna siz haqiqatan ham o\'ylaydigan tilda simptomlaringizni aniq tushunishingiz va keyingi qadamni bilishingiz uchun yaratilgan.'
        },
        values: {
          multilingual: {
            title: 'Uch til, bitta vosita',
            description: 'Ingliz, koreys yoki o\'zbek tilida — qaysi biri tabiiyroq bo\'lsa, o\'sha tilda simptomlaringizni tasvirlang.'
          },
          aiPowered: {
            title: 'Klinik asosli AI',
            description: 'Avicenna tibbiy bilimdan foydalanib simptomlaringizni baholaydi, shoshilinchlik darajasini aniqlaydi va keyingi qadamni ko\'rsatadi.'
          },
          accessible: {
            title: 'Har doim mavjud',
            description: 'Uchrashuv ham, sug\'urta kartasi ham kerak emas. Brauzeringizni oching va bir necha daqiqada yo\'riqnoma oling.'
          }
        },
        howItWorks: {
          label: 'Qanday ishlaydi',
          title: 'Avicenna qanday ishlaydi',
          description: 'His qilayotganingizni tasvirlab bering — Avicenna so\'zlaringizni tibbiy kontekstga aylantiradi va keyingi qadamni ko\'rsatadi.',
          block1: {
            title: 'Simptom tahlili',
            description: 'Boshdan kechirganingizni oddiy tilda Avicennaga aytib bering. U faqat kalit so\'zlar emas, og\'irlik darajasi, davomiyligi va kontekstni o\'qiydi.',
            point1: 'Ingliz, koreys va o\'zbek tillarida ishlaydi',
            point2: 'Noaniq tavsiflarni ham, tibbiy atamalarni ham tushunadi',
            point3: 'Ogohlantirish belgilarini avtomatik aniqlaydi'
          },
          block2: {
            title: 'Keyingi qadam',
            description: 'Nima bo\'lishi mumkinligi va keyingi qadamingiz nima ekanligi — dam olish, shifokorga borish yoki tez yordam — haqida aniq tasavvur oling.',
            point1: 'Aniq simptomlaringizga asoslangan ehtimoliy sabablar',
            point2: 'Shoshilinchlik darajasi: uyda, shifokorga yoki shoshilinch',
            point3: 'Kerak bo\'lsa qaysi mutaxassisga murojaat qilish'
          }
        },
        builtWithCare: {
          label: 'Jamoa',
          title: 'G\'amxo\'rlik bilan yaratilgan',
          description: 'Avicenna haqiqiy muammoga bevosita javob sifatida boshlandi: chet elliklarning o\'zlari tushunadigan tilda tibbiy yordam olishdagi qiyinchiliklar. Bu foydali bo\'lish uchun yaratilgan — ta\'sirchanlik uchun emas.',
          ai: {
            title: 'AI asosida',
            description: 'Google Gemini — mavjud eng qobiliyatli til modellaridan biri — tibbiy mulohazalarga tatbiq etilgan.'
          },
          medical: {
            title: 'Tibbiy asosda',
            description: 'Javoblar klinik mulohaza naqshlarini kuzatadi. Avicenna taxmin qilmaydi — siz tasvirlaganlar asosida ishlaydi.'
          },
          community: {
            title: 'Chet elliklar uchun',
            description: 'Til tanlashdan ogohlantirish matniga qadar — har bir qaror Janubiy Koreyada yashovchi chet elliklarni nazarda tutib qabul qilinadi.'
          }
        },
        disclaimer: {
          title: 'Muhim tibbiy ogohlantirish',
          substitute: 'Avicenna salomatlik ma\'lumotlari vositasi bo\'lib, professional tibbiy xizmatni almashtira olmaydi. Jismoniy tekshirish, tahlil buyurtma qilish yoki tashxis qo\'ya olmaydi.',
          seekProfessional: 'Quyidagi hollarda albatta shifokorga boring',
          severeSymptoms: 'Og\'ir, davomiy yoki tez yomonlashayotgan simptomlar',
          emergencySymptoms: 'Shoshilinch belgilar — ko\'krak og\'rig\'i, nafas olishda qiyinchilik, kuchli qon ketishi',
          chronicConditions: 'Ma\'lum surunkali kasallik bilan bog\'liq simptomlar',
          medications: 'Retsept dori yoki tibbiy muolajalar talab qiluvchi holatlar',
          limitations: 'AI chegaralari',
          generalInfo: 'Avicenna siz tasvirlaganlar asosida umumiy yo\'riqnoma beradi. Shaxsiy vaziyatingiz AI taklif qilganidan sezilarli darajada farq qilishi mumkin.',
          emergencySituations: 'Favqulodda vaziyatda',
          emergencyContact: 'Darhol favqulodda raqamga qo\'ng\'iroq qiling. AI yo\'riqnomasini kutmang.'
        },
        privacy: {
          title: 'Sizning ma\'lumotlaringiz, sizning nazoratdingiz',
          description: 'Avicenna maxfiylik asosida qurilgan. Hisob yaratmasdan ham barcha imkoniyatlardan foydalanishingiz mumkin.',
          dataProtection: {
            title: 'Ma\'lumotlarni qanday himoya qilamiz',
            noPersonal: 'Ruxsatisiz shaxsiy salomatlik ma\'lumotlari saqlanmaydi',
            encrypted: 'Barcha suhbatlar uzatish vaqtida shifrlanadi',
            noAccount: 'Hisob yaratmasdan to\'liq funksionallik mavjud',
            anonymous: 'Standart anonimlik — kuzatish yo\'q'
          },
          yourControl: {
            title: 'Siz nazorat qiladigan narsa',
            clearHistory: 'Suhbat tarixini istalgan vaqtda o\'chirish',
            preferredLanguage: 'Afzal tilni mustaqil sozlash',
            noAccount: 'Ro\'yxatdan o\'tmasdan ilovadan foydalanish',
            transparent: 'Ma\'lumotlaringiz qanday ishlatilishi haqida shaffof'
          }
        },
        cta: {
          title: 'Boshlashga tayyormisiz?',
          description: 'O\'zingiz afzal ko\'rgan tilda shaxsiy salomatlik yo\'riqnomasini boshdan kechiring.',
          button: 'Simptom tahlilini boshlash',
          ready: 'Simptomlaringizni bugun tushuning.',
          personalized: 'Ingliz, koreys yoki o\'zbek tilida bepul simptom tahlili. ',
          symptomAnalysis: 'Uchrashuv kerak emas.',
          startSymptomAnalysis: 'Bepul boshlash',
          free: 'Bepul',
          noRegistration: 'Ro\'yxatdan o\'tish shart emas',
          languages: '3 til'
        },
        features: {
          multilingual: 'Ko\'p tilli qo\'llab-quvvatlash',
          healthcare: 'Tibbiy yordam'
        }
      },
      // Chat page
      chat: {
        title: 'Simptom tahlil suhbati',
        description: 'O\'zingiz afzal ko\'rgan tilda simptomlaringizni tasvirlab bering',
        placeholder: 'Simptomlaringizni batafsil tasvirlab bering...',
        send: 'Yuborish',
        analyzing: 'Simptomlaringiz tahlil qilinmoqda...',
        connectionError: 'Ulanish xatosi',
        samples: {
          headacheFever: 'Boshim og\'riyapti va isitmam bor',
          coughSoreThroat: 'Yo\'talayapman va tomog\'im og\'riyapti',
          stomachPain: 'Qornim og\'riyapti va hazm qilishda muammo',
          dizzyTired: 'Bosh aylanmoqda va charchayapman'
        }
      },
      // Auth page
      auth: {
        title: 'Xush kelibsiz',
        joinTitle: 'Avicenna\'ga qo\'shiling',
        description: 'Salomatlik tarixingizga kirish uchun tizimga kiring',
        joinDescription: 'Boshlash uchun hisobingizni yarating',
        email: 'Elektron pochta',
        password: 'Parol',
        signIn: 'Kirish',
        signUp: 'Ro\'yxatdan o\'tish',
        noAccount: 'Hisobingiz yo\'qmi?',
        haveAccount: 'Allaqachon hisobingiz bormi?',
        placeholders: {
          email: 'Elektron pochtangizni kiriting',
          password: 'Parolingizni kiriting'
        }
      },
      // Medical History
      medicalHistory: {
        title: 'Tibbiy tarix',
        symptomAnalysis: 'Simptom tahlili',
        noHistory: 'Tibbiy tarix topilmadi',
        startFirst: 'Birinchi simptom tahlilini boshlang',
        viewDetails: 'Tafsilotlarni ko\'rish',
        exportPdf: 'PDF eksport qilish'
      },
      // Urgency levels
      urgency: {
        monitor_at_home: 'Uyda kuzatish',
        see_doctor_soon: 'Tez orada shifokorga',
        emergency_care: 'Shoshilinch yordam'
      }
    }
  }
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: process.env.NODE_ENV === 'development',
    
    interpolation: {
      escapeValue: false,
    },
    
    detection: {
      order: ['localStorage', 'navigator', 'htmlTag'],
      caches: ['localStorage'],
    },
  });

export default i18n; 