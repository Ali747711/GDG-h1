import { useTranslation } from 'react-i18next';
import { AlertTriangle, Clock, Zap } from 'lucide-react';
import { getUrgencyStyle, getUrgencyText } from '../utils/api';
import SunIcon from './SunIcon';
import HealthcareProviders from './HealthcareProviders';

const SectionLabel = ({ children }) => (
  <p className="text-[10px] font-bold tracking-[0.15em] uppercase text-white/30 mb-2.5">
    {children}
  </p>
);

const BulletList = ({ items, color = 'white' }) => (
  <ul className="space-y-1.5">
    {items.map((item, i) => (
      <li key={i} className="flex items-start gap-2 text-xs text-white/50">
        <span className={`mt-1.5 w-1 h-1 rounded-full flex-shrink-0 bg-${color}-400/60`} />
        {item}
      </li>
    ))}
  </ul>
);

const ChatMessage = ({ message, isUser, isLoading = false }) => {
  const { t, i18n } = useTranslation();

  if (isLoading) {
    return (
      <div className="flex items-center gap-3 pl-1">
        <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0">
          <SunIcon className="w-3 h-3" color="#F59E0B" />
        </div>
        <div className="flex gap-1">
          {[0, 0.2, 0.4].map((delay, i) => (
            <div
              key={i}
              className="w-1.5 h-1.5 bg-white/25 rounded-full animate-bounce"
              style={{ animationDelay: `${delay}s` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-sm">
          <div className="bg-slate-800 text-white px-4 py-3 rounded-2xl rounded-tr-sm">
            <p className="text-sm leading-relaxed">{message.content}</p>
          </div>
        </div>
      </div>
    );
  }

  // Error message
  if (message.isError) {
    return (
      <div className="flex items-start gap-3">
        <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
          <SunIcon className="w-3 h-3" color="#F59E0B" />
        </div>
        <div className="bg-slate-900 border border-white/[0.08] rounded-2xl rounded-tl-sm px-4 py-3">
          <p className="text-sm text-white/50 leading-relaxed">{message.content}</p>
        </div>
      </div>
    );
  }

  // AI Response
  const response = message.data;
  const urgencyLevel = response?.urgencyAssessment?.level || response?.urgency;

  const urgencyIcon = {
    monitor_at_home: Clock,
    see_doctor_soon: AlertTriangle,
    emergency_care: Zap
  };
  const UrgencyIcon = urgencyIcon[urgencyLevel] || Clock;

  const urgencyColors = {
    emergency_care: { badge: 'bg-red-500/15 text-red-400 border-red-500/20', dot: 'red' },
    see_doctor_soon: { badge: 'bg-orange-500/15 text-orange-400 border-orange-500/20', dot: 'orange' },
    monitor_at_home: { badge: 'bg-emerald-500/15 text-emerald-400 border-emerald-500/20', dot: 'emerald' },
  };
  const uc = urgencyColors[urgencyLevel] || urgencyColors.monitor_at_home;

  return (
    <div className="flex items-start gap-3">
      <div className="w-5 h-5 rounded-full bg-amber-500/20 flex items-center justify-center flex-shrink-0 mt-1">
        <SunIcon className="w-3 h-3" color="#F59E0B" />
      </div>

      <div className="flex-1 bg-slate-900 border border-white/[0.08] rounded-2xl rounded-tl-sm px-5 py-5 space-y-5">

        {/* Urgency badge */}
        {(response?.urgencyAssessment || response?.urgency) && (
          <div>
            <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${uc.badge}`}>
              <UrgencyIcon className="w-3 h-3" />
              {getUrgencyText(urgencyLevel, i18n.language)}
            </div>
            {response?.urgencyAssessment?.reasoning && (
              <p className="text-xs text-white/40 mt-2 leading-relaxed">
                {response.urgencyAssessment.reasoning}
              </p>
            )}
            {response?.urgencyAssessment?.timeframe && (
              <p className="text-xs text-white/30 mt-1">
                Timeframe: {response.urgencyAssessment.timeframe}
              </p>
            )}
            {response?.urgencyAssessment?.redFlags?.length > 0 && (
              <div className="mt-2">
                <p className="text-xs text-red-400/60 mb-1">Warning signs to watch:</p>
                <ul className="space-y-0.5">
                  {response.urgencyAssessment.redFlags.map((flag, i) => (
                    <li key={i} className="text-xs text-white/30">• {flag}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        {/* Primary Analysis */}
        {response?.primaryAnalysis && (
          <div className="pt-4 border-t border-white/[0.06]">
            <SectionLabel>Assessment</SectionLabel>
            <p className="text-sm text-white/70 leading-relaxed">
              {response.primaryAnalysis.clinicalImpression}
            </p>
            {response.primaryAnalysis.presentingSymptoms?.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3">
                {response.primaryAnalysis.presentingSymptoms.map((symptom, i) => (
                  <span key={i} className="px-2.5 py-1 bg-amber-400/10 text-amber-300/70 text-xs rounded-full">
                    {symptom}
                  </span>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Differential Diagnosis */}
        {response?.differentialDiagnosis?.length > 0 && (
          <div className="pt-4 border-t border-white/[0.06]">
            <SectionLabel>Possible Conditions</SectionLabel>
            <div className="space-y-4">
              {response.differentialDiagnosis.map((cond, i) => (
                <div key={i}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-white/80">{cond.condition}</span>
                    <span className={`text-[10px] px-2 py-0.5 rounded-full ${
                      cond.likelihood === 'high' ? 'bg-red-500/15 text-red-400' :
                      cond.likelihood === 'moderate' ? 'bg-orange-500/15 text-orange-400' :
                      'bg-slate-700 text-white/40'
                    }`}>
                      {cond.likelihood}
                    </span>
                  </div>
                  <p className="text-xs text-white/45 leading-relaxed mb-2">{cond.explanation}</p>
                  {cond.keyFeatures?.length > 0 && (
                    <div className="flex flex-wrap gap-1">
                      {cond.keyFeatures.map((f, j) => (
                        <span key={j} className="text-[10px] text-white/25 bg-white/5 px-1.5 py-0.5 rounded">
                          {f}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recommendations (object format) */}
        {response?.recommendations && !Array.isArray(response.recommendations) && (
          <div className="pt-4 border-t border-white/[0.06]">
            <SectionLabel>Recommendations</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {response.recommendations.immediate?.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-red-400/80 mb-2">Immediate</p>
                  <BulletList items={response.recommendations.immediate} color="red" />
                </div>
              )}
              {response.recommendations.monitoring?.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-orange-400/80 mb-2">Monitor For</p>
                  <BulletList items={response.recommendations.monitoring} color="orange" />
                </div>
              )}
              {response.recommendations.lifestyle?.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-emerald-400/80 mb-2">Self-care</p>
                  <BulletList items={response.recommendations.lifestyle} color="emerald" />
                </div>
              )}
              {response.recommendations.followUp?.length > 0 && (
                <div>
                  <p className="text-xs font-medium text-sky-400/80 mb-2">Follow-up</p>
                  <BulletList items={response.recommendations.followUp} color="sky" />
                </div>
              )}
            </div>
          </div>
        )}

        {/* Specialist Referral */}
        {response?.specialistReferral?.recommended && (
          <div className="pt-4 border-t border-white/[0.06]">
            <SectionLabel>Specialist</SectionLabel>
            <p className="text-sm font-medium text-white/80 mb-1">
              {response.specialistReferral.specialty}
            </p>
            <p className="text-xs text-white/40 leading-relaxed">
              {response.specialistReferral.reasoning}
            </p>
          </div>
        )}

        {/* Educational Content */}
        {response?.educationalContent && (
          <div className="pt-4 border-t border-white/[0.06]">
            <SectionLabel>About Your Condition</SectionLabel>
            <div className="space-y-3">
              {response.educationalContent.overview && (
                <div>
                  <p className="text-xs font-medium text-white/50 mb-1">Overview</p>
                  <p className="text-xs text-white/40 leading-relaxed">
                    {response.educationalContent.overview}
                  </p>
                </div>
              )}
              {response.educationalContent.whatToExpected && (
                <div>
                  <p className="text-xs font-medium text-white/50 mb-1">What to Expect</p>
                  <p className="text-xs text-white/40 leading-relaxed">
                    {response.educationalContent.whatToExpected}
                  </p>
                </div>
              )}
              {response.educationalContent.prevention && (
                <div>
                  <p className="text-xs font-medium text-white/50 mb-1">Prevention</p>
                  <p className="text-xs text-white/40 leading-relaxed">
                    {response.educationalContent.prevention}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Healthcare Providers */}
        {response && (
          <div className="pt-4 border-t border-white/[0.06]">
            <HealthcareProviders
              symptoms={message.content || ''}
              conditions={response.differentialDiagnosis?.map(d => d.condition) || []}
              urgency={response.urgencyAssessment?.level || response.urgency || 'see_doctor_soon'}
            />
          </div>
        )}

        {/* Disclaimer */}
        {response?.disclaimer && (
          <div className="pt-4 border-t border-white/[0.06]">
            <div className="flex items-start gap-2">
              <AlertTriangle className="w-3 h-3 text-amber-400/50 flex-shrink-0 mt-0.5" />
              <p className="text-xs text-white/30 leading-relaxed">{response.disclaimer}</p>
            </div>
          </div>
        )}

        {/* ── Backward compatibility ── */}

        {/* Old format: conditions array */}
        {!response?.primaryAnalysis && response?.conditions?.length > 0 && (
          <div className="pt-4 border-t border-white/[0.06]">
            <SectionLabel>Possible Conditions</SectionLabel>
            <div className="space-y-3">
              {response.conditions.map((cond, i) => (
                <div key={i}>
                  <p className="text-sm font-medium text-white/80 mb-1">{cond.name}</p>
                  <p className="text-xs text-white/45 leading-relaxed">{cond.explanation}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Old format: doctor_type string */}
        {!response?.specialistReferral && response?.doctor_type && (
          <div className="pt-4 border-t border-white/[0.06]">
            <SectionLabel>Recommended Specialist</SectionLabel>
            <p className="text-sm text-white/75">{response.doctor_type}</p>
          </div>
        )}

        {/* Old format: recommendations array */}
        {!response?.recommendations?.immediate && Array.isArray(response?.recommendations) && (
          <div className="pt-4 border-t border-white/[0.06]">
            <SectionLabel>Recommendations</SectionLabel>
            <BulletList items={response.recommendations} color="white" />
          </div>
        )}

        {/* Old format: healthcareProviders */}
        {response?.healthcareProviders?.length > 0 && (
          <HealthcareProviders providers={response.healthcareProviders} />
        )}

      </div>
    </div>
  );
};

export default ChatMessage;
