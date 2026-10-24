import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Send, X, Bot, User, Loader2, RotateCcw, AlertCircle, ShieldCheck, Cpu } from 'lucide-react';
import type { ChatMessage } from '../../types';
import { buildApiUrl } from '../../lib/api';
import { MarkdownRenderer } from '../ui/MarkdownRenderer';

interface AskAdityaAIProps {
  isOpen: boolean;
  onClose: () => void;
  onToggle: () => void;
}

export const AskAdityaAI: React.FC<AskAdityaAIProps> = ({ isOpen, onClose, onToggle }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      sender: 'assistant',
      content: "Hello! I am **Ask Aditya AI**, grounded strictly in Aditya Gupta's verified portfolio facts, real codebases, and academic background. What would you like to know?",
      timestamp: 'Just now',
      sources: ['Verified Portfolio Knowledge Base'],
      isFallback: true,
      providerUsed: 'portfolio-grounded-fallback',
      modelUsed: 'rule-based-retrieval-engine'
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorNotice, setErrorNotice] = useState<string | null>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const suggestedQuestions = [
    "Tell me about Aditya.",
    "What projects has he built?",
    "Explain OmniPredict AI.",
    "What did he build in NutriAI?",
    "What technologies does he use?",
    "What is his educational background?",
    "How can I contact him?"
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
      setTimeout(() => inputRef.current?.focus(), 200);
    }
  }, [isOpen, messages]);

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    setErrorNotice(null);
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      sender: 'user',
      content: query,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Build strictly validated conversation history (only 'user' and 'assistant')
      const historyPayload = messages
        .filter((m) => m.id !== 'welcome' && (m.sender === 'user' || m.sender === 'assistant'))
        .slice(-4)
        .map((m) => ({
          role: m.sender,
          content: m.content.slice(0, 1000)
        }));

      const res = await fetch(buildApiUrl('/api/chat'), {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: query.slice(0, 1000),
          history: historyPayload
        })
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.detail || 'Assistant service is currently unreachable.');
      }

      const data = await res.json();
      const assistantMsg: ChatMessage = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        content: data.answer,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        sources: data.sources || ['Portfolio Records'],
        isFallback: data.is_fallback,
        providerUsed: data.provider_used,
        modelUsed: data.model_used,
        fallbackReason: data.fallback_reason
      };

      setMessages((prev) => [...prev, assistantMsg]);
    } catch (err: any) {
      setErrorNotice(err.message || 'Network error communicating with Ask Aditya AI.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Floating Launcher Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onToggle}
          className="relative flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-electric-blue via-electric-cyan to-cyber-violet text-cosmos-950 font-semibold shadow-glow-cyan hover:shadow-glow-violet transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-electric-cyan"
          aria-label="Open Ask Aditya AI chat"
        >
          {/* Pulsing Aura */}
          <span className="absolute -inset-1 rounded-full bg-electric-cyan/30 blur-md animate-pulse pointer-events-none" />
          
          <Sparkles className="w-5 h-5 text-cosmos-950 animate-spin-slow" />
          <span className="font-display tracking-tight text-sm text-cosmos-950 font-bold">
            Ask Aditya AI
          </span>
          <span className="w-2 h-2 rounded-full bg-matrix-emerald animate-ping" />
        </motion.button>
      </div>

      {/* Floating Chat Modal / Drawer */}
      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-6 sm:w-[420px] sm:h-[600px] z-50 flex flex-col">
            
            {/* Mobile Backdrop */}
            <div
              className="fixed inset-0 bg-cosmos-950/80 backdrop-blur-sm sm:hidden"
              onClick={onClose}
            />

            {/* Chat Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              transition={{ type: "spring", damping: 25, stiffness: 350 }}
              className="relative w-full h-full sm:rounded-3xl bg-cosmos-900/95 border border-electric-cyan/30 shadow-2xl shadow-cosmos-950 flex flex-col overflow-hidden backdrop-blur-xl"
            >
              {/* Header */}
              <div className="p-4 border-b border-cosmos-700/60 bg-cosmos-850/80 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-electric-cyan/15 border border-electric-cyan/40 flex items-center justify-center text-electric-cyan">
                    <Bot className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white font-display flex items-center gap-1.5">
                      Ask Aditya AI
                      <span className="text-[10px] font-mono font-normal text-matrix-mint bg-matrix-emerald/10 border border-matrix-emerald/30 px-1.5 py-0.2 rounded-full">
                        Grounded
                      </span>
                    </h3>
                    <p className="text-[11px] text-slate-400">
                      Grounded strictly in verified portfolio facts
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  <button
                    onClick={onClose}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-cosmos-700 transition-colors"
                    aria-label="Close chat"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {/* Messages Body */}
              <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs sm:text-sm">
                {messages.map((m) => (
                  <div
                    key={m.id}
                    className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    {m.sender === 'assistant' && (
                      <div className="w-6 h-6 rounded-lg bg-electric-cyan/20 text-electric-cyan flex items-center justify-center flex-shrink-0 mt-0.5">
                        <Bot className="w-3.5 h-3.5" />
                      </div>
                    )}

                    <div
                      className={`max-w-[85%] rounded-2xl p-3.5 leading-relaxed ${
                        m.sender === 'user'
                          ? 'bg-electric-blue text-white rounded-tr-none'
                          : 'bg-cosmos-800/90 text-slate-200 border border-cosmos-700/70 rounded-tl-none space-y-2'
                      }`}
                    >
                      {m.sender === 'assistant' ? (
                        <MarkdownRenderer content={m.content} />
                      ) : (
                        <div className="whitespace-pre-wrap font-sans">
                          {m.content}
                        </div>
                      )}

                      {/* Provider & Source Attribution */}
                      {m.sender === 'assistant' && (
                        <div className="pt-2 mt-2 border-t border-cosmos-700/40 text-[10px] font-mono space-y-1">
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Cpu className="w-3 h-3 text-electric-cyan" />
                            {m.isFallback ? (
                              <span className="text-slate-400">Grounded Rule-Based Retrieval</span>
                            ) : (
                              <span className="text-matrix-mint">Live LLM: {m.providerUsed} ({m.modelUsed})</span>
                            )}
                          </div>

                          {m.sources && m.sources.length > 0 && (
                            <div className="flex flex-wrap items-center gap-1 text-slate-400">
                              <ShieldCheck className="w-3 h-3 text-matrix-mint" />
                              <span>Sources:</span>
                              {m.sources.map((s, idx) => (
                                <span key={idx} className="bg-cosmos-900 px-1.5 py-0.5 rounded text-electric-cyan">
                                  {s}
                                </span>
                              ))}
                            </div>
                          )}

                          {m.fallbackReason && (
                            <p className="text-[9px] text-slate-500 italic pt-0.5">
                              {m.fallbackReason}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {m.sender === 'user' && (
                      <div className="w-6 h-6 rounded-lg bg-slate-700 text-slate-300 flex items-center justify-center flex-shrink-0 mt-0.5">
                        <User className="w-3.5 h-3.5" />
                      </div>
                    )}
                  </div>
                ))}

                {/* Loading typing indicator */}
                {loading && (
                  <div className="flex gap-2.5 justify-start">
                    <div className="w-6 h-6 rounded-lg bg-electric-cyan/20 text-electric-cyan flex items-center justify-center flex-shrink-0">
                      <Bot className="w-3.5 h-3.5" />
                    </div>
                    <div className="bg-cosmos-800/90 text-slate-300 border border-cosmos-700/70 rounded-2xl rounded-tl-none p-3 flex items-center gap-2">
                      <Loader2 className="w-3.5 h-3.5 animate-spin text-electric-cyan" />
                      <span className="text-xs text-slate-400 font-mono">Retrieving verified facts...</span>
                    </div>
                  </div>
                )}

                {/* Error Notice */}
                {errorNotice && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/30 flex items-start gap-2 text-xs text-red-300">
                    <AlertCircle className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                    <div className="flex-1">
                      <span>{errorNotice}</span>
                      <button
                        onClick={() => handleSend(messages[messages.length - 1]?.content)}
                        className="block mt-1 font-semibold text-electric-cyan underline flex items-center gap-1"
                      >
                        <RotateCcw className="w-3 h-3" /> Retry query
                      </button>
                    </div>
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Suggested Questions Chips */}
              <div className="px-3 py-2 bg-cosmos-850/60 border-t border-cosmos-700/40 flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[11px]">
                <span className="text-[10px] text-slate-500 font-mono flex-shrink-0">Prompt:</span>
                {suggestedQuestions.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    disabled={loading}
                    className="flex-shrink-0 px-2.5 py-1 rounded-lg bg-cosmos-800 hover:bg-cosmos-700 hover:text-electric-cyan border border-cosmos-700/60 text-slate-300 transition-colors whitespace-nowrap"
                  >
                    {q}
                  </button>
                ))}
              </div>

              {/* Chat Input Field */}
              <div className="p-3 bg-cosmos-900 border-t border-cosmos-700/60">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSend();
                  }}
                  className="flex items-center gap-2"
                >
                  <input
                    ref={inputRef}
                    type="text"
                    maxLength={1000}
                    placeholder="Ask about OmniPredict, NutriAI, BCA, skills..."
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    disabled={loading}
                    className="flex-1 px-3.5 py-2.5 rounded-xl bg-cosmos-800 border border-cosmos-700 text-xs sm:text-sm text-white placeholder-slate-400 focus:outline-none focus:border-electric-cyan transition-all"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="p-2.5 rounded-xl bg-electric-cyan text-cosmos-950 font-bold hover:bg-white disabled:opacity-40 disabled:cursor-not-allowed transition-all focus:outline-none focus:ring-2 focus:ring-electric-cyan"
                    aria-label="Send message"
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </form>
              </div>

            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
};
