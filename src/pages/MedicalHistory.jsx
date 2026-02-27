import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ChevronDown, ChevronRight, RotateCcw, FileText, Download, Trash2, MessageSquare } from 'lucide-react';
import { useAuth } from '../contexts/FirebaseAuthContext';
import SunIcon from '../components/SunIcon';
import { exportMedicalHistoryToPDF, exportSingleConversationToPDF } from '../utils/pdfExport';

const MedicalHistory = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { user, userProfile, getMedicalHistory, deleteMedicalEntry, isAuthenticated } = useAuth();

  const [medicalHistory, setMedicalHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [selectedEntry, setSelectedEntry] = useState(null);
  const [filter, setFilter] = useState('all');
  const [lastDocument, setLastDocument] = useState(null);
  const [hasMore, setHasMore] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    if (!isAuthenticated) navigate('/auth');
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    loadMedicalHistory(true);
  }, []);

  const loadMedicalHistory = async (isInitial = false) => {
    if (!isAuthenticated) return;
    if (isInitial) {
      setIsLoading(true);
      setMedicalHistory([]);
      setLastDocument(null);
      setHasMore(true);
    } else {
      setIsLoadingMore(true);
    }
    try {
      const result = await getMedicalHistory(20, isInitial ? null : lastDocument);
      if (result.success) {
        if (isInitial) setMedicalHistory(result.entries);
        else setMedicalHistory(prev => [...prev, ...result.entries]);
        setLastDocument(result.lastDocument);
        setHasMore(result.hasMore);
        setTotalCount(prev => isInitial ? result.entries.length : prev + result.entries.length);
      }
    } catch (err) {
      console.error('Error loading medical history:', err);
    } finally {
      setIsLoading(false);
      setIsLoadingMore(false);
    }
  };

  const handleDeleteEntry = async (entryId) => {
    if (!confirm('Delete this conversation?')) return;
    try {
      const result = await deleteMedicalEntry(entryId);
      if (result.success) {
        setMedicalHistory(prev => prev.filter(e => e.id !== entryId));
        setTotalCount(prev => prev - 1);
      } else {
        alert('Failed to delete conversation');
      }
    } catch (err) {
      console.error('Error deleting entry:', err);
    }
  };

  const filteredHistory = medicalHistory.filter(entry => {
    if (filter === 'recent') {
      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const d = entry.timestamp?.toDate ? entry.timestamp.toDate()
        : entry.timestamp instanceof Date ? entry.timestamp
        : new Date(entry.timestamp);
      return d >= oneWeekAgo;
    }
    if (filter === 'urgent') {
      const u = entry.aiResponse?.analysis?.urgency;
      return u === 'emergency_care' || u === 'see_doctor_soon';
    }
    return true;
  });

  const formatDate = (timestamp) => {
    const date = timestamp?.toDate ? timestamp.toDate()
      : timestamp instanceof Date ? timestamp
      : new Date(timestamp);
    return date.toLocaleDateString('en-US', {
      year: 'numeric', month: 'short', day: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  const urgencyStyle = (urgency) => ({
    emergency_care: 'bg-red-500/15 text-red-400 border border-red-500/20',
    see_doctor_soon: 'bg-orange-500/15 text-orange-400 border border-orange-500/20',
    monitor_at_home: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/20',
  }[urgency] || 'bg-slate-700 text-white/40');

  const urgencyLabel = (urgency) => ({
    emergency_care: 'Emergency',
    see_doctor_soon: 'See Doctor',
    monitor_at_home: 'Monitor',
  }[urgency] || '—');

  if (!user) return null;

  return (
    <div className="min-h-screen bg-slate-950">

      {/* Top bar */}
      <header className="fixed top-0 left-0 right-0 z-40 h-14 border-b border-white/10 bg-slate-950/95 backdrop-blur-sm">
        <div className="h-full flex items-center justify-between px-5 max-w-3xl mx-auto">
          <Link to="/" className="flex items-center gap-2">
            <SunIcon className="w-6 h-6" color="#F59E0B" />
            <span className="text-white font-semibold text-sm">{t('home.title')}</span>
          </Link>
          <Link to="/profile" className="text-white/35 hover:text-white/70 text-xs transition-colors">
            ← {t('common.profile')}
          </Link>
        </div>
      </header>

      <div className="pt-14">
        <div className="max-w-3xl mx-auto px-5 py-10">

          {/* Page header */}
          <div className="mb-8">
            <span className="block text-amber-400 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">
              {t('medicalHistory.title')}
            </span>
            <div className="flex items-end justify-between gap-4 flex-wrap">
              <div>
                <h1 className="text-2xl font-display font-bold text-white leading-tight">
                  Your Medical History
                </h1>
                <p className="text-white/35 text-xs mt-1">
                  {totalCount} saved {totalCount === 1 ? 'conversation' : 'conversations'}
                  {filteredHistory.length !== totalCount && ` · showing ${filteredHistory.length}`}
                </p>
              </div>

              {/* Controls */}
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  onClick={() => loadMedicalHistory(true)}
                  disabled={isLoading}
                  className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 border border-white/10 px-3 py-2 rounded-full transition-colors disabled:opacity-30"
                >
                  <RotateCcw className={`w-3 h-3 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </button>

                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="text-xs text-white/60 bg-slate-900 border border-white/10 rounded-full px-3 py-2 focus:outline-none focus:border-amber-400/30"
                >
                  <option value="all" className="bg-slate-900">All</option>
                  <option value="recent" className="bg-slate-900">Last Week</option>
                  <option value="urgent" className="bg-slate-900">Urgent</option>
                </select>

                {filteredHistory.length > 0 && (
                  <>
                    <button
                      onClick={() => exportMedicalHistoryToPDF(filteredHistory, userProfile)}
                      className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 border border-white/10 px-3 py-2 rounded-full transition-colors"
                      title="Export as PDF"
                    >
                      <FileText className="w-3 h-3" />
                      PDF
                    </button>
                    <button
                      onClick={() => {
                        const blob = new Blob([JSON.stringify(filteredHistory, null, 2)], { type: 'application/json' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `avicenna-history-${new Date().toISOString().split('T')[0]}.json`;
                        a.click();
                      }}
                      className="flex items-center gap-1.5 text-xs text-white/40 hover:text-white/70 border border-white/10 px-3 py-2 rounded-full transition-colors"
                      title="Export as JSON"
                    >
                      <Download className="w-3 h-3" />
                      JSON
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* States */}
          {isLoading ? (
            <div className="flex items-center justify-center py-20">
              <div className="flex flex-col items-center gap-3">
                <div className="w-6 h-6 border-2 border-white/10 border-t-white/50 rounded-full animate-spin" />
                <p className="text-xs text-white/30">Loading…</p>
              </div>
            </div>
          ) : filteredHistory.length === 0 ? (
            <div className="flex flex-col items-center py-20 text-center">
              <MessageSquare className="w-10 h-10 text-white/10 mb-4" />
              <p className="text-white/50 text-sm mb-1">
                {filter === 'all' ? 'No conversations yet' : 'No entries match this filter'}
              </p>
              <p className="text-white/25 text-xs mb-6">
                {filter === 'all'
                  ? 'Your chat history will appear here automatically'
                  : 'Try a different filter'}
              </p>
              {filter === 'all' && (
                <Link
                  to="/chat"
                  className="text-xs px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-900 font-bold rounded-full transition-colors"
                >
                  Start a Conversation
                </Link>
              )}
            </div>
          ) : (
            <div className="bg-slate-900 border border-white/[0.08] rounded-2xl divide-y divide-white/[0.06]">
              {filteredHistory.map((entry, index) => (
                <div key={entry.id || index}>
                  {/* Entry row */}
                  <div className="px-5 py-4">
                    <div className="flex items-start justify-between gap-4">
                      {/* Left */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs text-white/30">
                            {formatDate(entry.timestamp)}
                          </span>
                          {entry.language && (
                            <span className="text-[10px] text-white/20 uppercase">{entry.language}</span>
                          )}
                        </div>
                        <p className="text-sm text-white/70 leading-relaxed line-clamp-2">
                          {entry.userMessage || entry.symptoms}
                        </p>
                      </div>

                      {/* Right */}
                      <div className="flex flex-col items-end gap-2 flex-shrink-0">
                        {entry.aiResponse?.analysis?.urgency && (
                          <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${urgencyStyle(entry.aiResponse.analysis.urgency)}`}>
                            {urgencyLabel(entry.aiResponse.analysis.urgency)}
                          </span>
                        )}
                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => exportSingleConversationToPDF(entry, userProfile)}
                            className="p-1.5 text-white/20 hover:text-white/60 transition-colors"
                            title="Export as PDF"
                          >
                            <FileText className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setSelectedEntry(selectedEntry === entry ? null : entry)}
                            className="p-1.5 text-white/20 hover:text-white/60 transition-colors"
                            title="Expand details"
                          >
                            <ChevronDown className={`w-3.5 h-3.5 transition-transform ${selectedEntry === entry ? 'rotate-180' : ''}`} />
                          </button>
                          <button
                            onClick={() => handleDeleteEntry(entry.id)}
                            className="p-1.5 text-red-400/30 hover:text-red-400/70 transition-colors"
                            title="Delete"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Expanded detail */}
                    {selectedEntry === entry && entry.aiResponse?.analysis && (
                      <div className="mt-4 pt-4 border-t border-white/[0.06] space-y-4">

                        {/* Symptoms */}
                        <div>
                          <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/25 mb-2">Your Symptoms</p>
                          <p className="text-sm text-white/55 leading-relaxed">
                            {entry.userMessage || entry.symptoms}
                          </p>
                        </div>

                        {/* Conditions */}
                        {entry.aiResponse.analysis.conditions?.length > 0 && (
                          <div>
                            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/25 mb-2">Possible Conditions</p>
                            <div className="space-y-2">
                              {entry.aiResponse.analysis.conditions.map((condition, idx) => (
                                <div key={idx}>
                                  <p className="text-sm font-medium text-white/70 mb-0.5">{condition.name}</p>
                                  <p className="text-xs text-white/40 leading-relaxed">{condition.explanation}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {/* Doctor recommendation */}
                        {entry.aiResponse.analysis.doctor_type && (
                          <div>
                            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/25 mb-2">Recommended Specialist</p>
                            <p className="text-sm text-white/60">{entry.aiResponse.analysis.doctor_type}</p>
                          </div>
                        )}

                        {/* Recommendations */}
                        {entry.aiResponse.analysis.recommendations?.length > 0 && (
                          <div>
                            <p className="text-[10px] font-bold tracking-[0.12em] uppercase text-white/25 mb-2">Recommendations</p>
                            <ul className="space-y-1.5">
                              {entry.aiResponse.analysis.recommendations.map((rec, idx) => (
                                <li key={idx} className="flex items-start gap-2 text-xs text-white/45">
                                  <span className="mt-1.5 w-1 h-1 rounded-full bg-white/20 flex-shrink-0" />
                                  {rec}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Load more */}
              {hasMore && (
                <div className="px-5 py-4">
                  <button
                    onClick={() => !isLoadingMore && hasMore && loadMedicalHistory(false)}
                    disabled={isLoadingMore}
                    className="w-full flex items-center justify-center gap-2 text-xs text-white/35 hover:text-white/60 transition-colors py-1 disabled:opacity-30"
                  >
                    {isLoadingMore ? (
                      <><div className="w-3 h-3 border-2 border-white/20 border-t-white/50 rounded-full animate-spin" /> Loading…</>
                    ) : (
                      <><ChevronDown className="w-3.5 h-3.5" /> Load more</>
                    )}
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MedicalHistory;
