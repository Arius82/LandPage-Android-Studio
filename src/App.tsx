/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  BookOpen, 
  LayoutDashboard, 
  MessageSquareQuote, 
  ShieldCheck, 
  Zap, 
  TrendingUp, 
  Clock, 
  CreditCard, 
  ChevronDown,
  Lock,
  Star,
  Gift,
  AlertCircle,
  Award,
  Users,
  Info,
  MessageCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import ebookCover from './assets/ebook-cover.png';
import eduardoImage from './assets/eduardo.jpeg';

const COLORS = {
  primary: '#166534', // Green 800
  secondary: '#15803d', // Green 700
  accent: '#f97316', // Orange 500 (for CTAs)
  danger: '#991b1b', // Red 800
  bg: '#f8fafc',
  text: '#0f172a'
};

const ANIMATION_PROPS = {
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-50px" },
  transition: { duration: 0.8, ease: [0.21, 0.47, 0.32, 0.98] }
};

const BonusItem = ({ title, value, desc, icon: Icon, isBonus = true }: { title: string, value: string, desc: string, icon: any, isBonus?: boolean }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <li 
      className="flex items-start gap-3 text-slate-800 text-sm font-semibold relative group cursor-help"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsHovered(!isHovered)}
    >
      <Icon className={`w-5 h-5 shrink-0 ${isBonus ? 'text-orange-500' : 'text-green-600'}`} />
      <div className="flex-grow">
        <div className="flex items-center gap-1">
          <span className={isBonus ? 'text-orange-600' : ''}>{isBonus ? 'BÔNUS: ' : ''}{title}</span>
          <Info className="w-3 h-3 text-slate-300 group-hover:text-slate-400 transition-colors" />
        </div>
        <span className="block text-[10px] text-slate-400 font-normal">Valor: {value}</span>
      </div>

      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            className="absolute bottom-full left-0 mb-2 w-48 p-3 bg-slate-900 text-white rounded-xl shadow-xl z-50 pointer-events-none"
          >
            <div className="relative">
              <p className="text-[10px] font-bold text-orange-400 uppercase mb-1">Economia Real</p>
              <p className="text-xs font-medium leading-tight">{desc}</p>
              <p className="text-[10px] mt-2 text-slate-400">Valor original: <span className="text-white font-bold">{value}</span></p>
              {/* Arrow */}
              <div className="absolute top-full left-4 -mt-1 w-2 h-2 bg-slate-900 rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
};

export default function App() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeModal, setActiveModal] = useState<'terms' | 'privacy' | 'support' | null>(null);
  const [showExitPopup, setShowExitPopup] = useState(false);
  const [hasShownExitPopup, setHasShownExitPopup] = useState(false);
  const [timeLeft, setTimeLeft] = useState(15 * 60); // 15 minutes in seconds
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [showInstallBtn, setShowInstallBtn] = useState(false);

  useEffect(() => {
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setShowInstallBtn(true);
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setShowInstallBtn(false);
    }
    setDeferredPrompt(null);
  };

  useEffect(() => {
    if (activeModal || showExitPopup) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeModal, showExitPopup]);

  useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0 && !hasShownExitPopup) {
        setShowExitPopup(true);
        setHasShownExitPopup(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [hasShownExitPopup]);

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => prev - 1);
    }, 1000);
    return () => clearInterval(timer);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const scrollToOffer = () => {
    document.getElementById('pricing')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen font-sans text-slate-900 bg-slate-50 selection:bg-green-100 overflow-x-hidden">
      {/* Sticky Header */}
      <header className="fixed top-0 w-full z-50 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between gap-2">
          <div className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-green-700 rounded-lg flex items-center justify-center">
              <TrendingUp className="text-white w-5 h-5" />
            </div>
            <span className="font-bold text-base sm:text-xl tracking-tight text-slate-800 whitespace-nowrap">Do Vermelho ao Verde</span>
          </div>
          <button 
            onClick={scrollToOffer}
            className="bg-green-700 hover:bg-green-800 text-white px-3 sm:px-5 py-2 rounded-full font-semibold text-xs sm:text-sm transition-all shadow-lg shadow-green-900/10 whitespace-nowrap"
          >
            Começar Agora
          </button>
        </div>
      </header>

      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden pt-12 pb-20 lg:pt-32 lg:pb-40">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <motion.div 
                {...ANIMATION_PROPS}
                transition={{ ...ANIMATION_PROPS.transition, delay: 0.1 }}
              >
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-bold mb-6">
                  <Star className="w-4 h-4 fill-current" />
                  <span>MÉTODO TESTADO E COMPROVADO</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-7xl font-extrabold text-slate-900 leading-[1.1] mb-6 tracking-tight">
                  Pare de Trabalhar para <span className="text-red-600">Pagar Juros</span> e Recupere sua Liberdade em <span className="text-green-700">30 Dias</span>.
                </h1>
                <p className="text-lg sm:text-xl text-slate-600 mb-10 leading-relaxed max-w-xl">
                  O método definitivo para brasileiros que querem sair do sufoco, organizar cada centavo e finalmente ver o saldo no azul — mesmo que você ache que ganha pouco.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button 
                    onClick={scrollToOffer}
                    className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all shadow-xl shadow-orange-500/20 flex items-center justify-center gap-2 group"
                  >
                    COMEÇAR MINHA TRANSFORMAÇÃO
                    <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </button>
                  <div className="flex items-center gap-3 px-4 py-2">
                    <ShieldCheck className="w-5 h-5 text-green-600" />
                    <span className="text-sm text-slate-500 font-medium text-center sm:text-left">Satisfação Garantida ou seu dinheiro de volta</span>
                  </div>
                </div>
              </motion.div>

              <motion.div 
                {...ANIMATION_PROPS}
                transition={{ ...ANIMATION_PROPS.transition, delay: 0.3 }}
                className="relative"
              >
                <div className="relative z-10 rounded-3xl overflow-hidden shadow-2xl shadow-green-900/20 border-4 sm:border-8 border-white">
                  <img 
                    src={ebookCover} 
                    alt="Capa do Ebook Do Vermelho ao Verde" 
                    className="w-full h-auto object-cover"
                    referrerPolicy="no-referrer"
                    decoding="async"
                  />
                </div>
                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 sm:-top-6 sm:-right-6 bg-white p-3 sm:p-4 rounded-2xl shadow-xl z-20 animate-bounce">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 bg-green-100 rounded-full flex items-center justify-center">
                      <Zap className="text-green-700 w-5 h-5 sm:w-6 sm:h-6" />
                    </div>
                    <div>
                      <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Resultado Rápido</p>
                      <p className="font-bold text-slate-800 text-sm sm:text-base">30 Dias de Desafio</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
          
          {/* Background Decor */}
          <div className="absolute top-0 right-0 w-1/2 h-full bg-green-50/50 -z-0 skew-x-12 translate-x-1/4" />
        </section>

        {/* The Pain Section - Hero's Journey: The Call to Adventure */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-4xl mx-auto px-4 text-center">
            <motion.div {...ANIMATION_PROPS}>
              <span className="text-red-600 font-bold text-sm uppercase tracking-widest mb-4 block">A Realidade Dói</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-12">Você sente que está correndo em uma esteira financeira?</h2>
            </motion.div>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Clock, text: "As noites são longas quando o pensamento é: 'como vou pagar o aluguel e o cartão?'" },
                { icon: AlertCircle, text: "O coração dispara só de ouvir a notificação do banco. Você vive fugindo da realidade." },
                { icon: CreditCard, text: "O salário cai na conta e, em 2 dias, ele some em juros, taxas e boletos atrasados." }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  {...ANIMATION_PROPS}
                  transition={{ ...ANIMATION_PROPS.transition, delay: i * 0.1 }}
                  className="p-6 sm:p-8 rounded-3xl bg-slate-50 border border-slate-100 text-left hover:shadow-lg transition-shadow"
                >
                  <item.icon className="w-10 h-10 sm:w-12 sm:h-12 text-red-600 mb-6" />
                  <p className="text-slate-700 font-semibold leading-relaxed">{item.text}</p>
                </motion.div>
              ))}
            </div>
            <motion.div 
              {...ANIMATION_PROPS}
              transition={{ ...ANIMATION_PROPS.transition, delay: 0.4 }}
              className="mt-12 p-6 sm:p-10 rounded-[2rem] sm:rounded-[2.5rem] bg-gradient-to-br from-red-50 to-white border border-red-100 shadow-inner"
            >
              <p className="text-xl sm:text-2xl text-red-900 font-black leading-tight">
                "O sistema foi feito para te manter devedor. Se você não aprender as regras do jogo, o banco sempre será o dono do seu suor."
              </p>
              <p className="mt-4 text-red-700 font-bold">— Eduardo César</p>
            </motion.div>
          </div>
        </section>

        {/* The Method Section */}
        <section className="py-16 sm:py-24 bg-slate-50">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">As 3 Fases do Método Do Vermelho ao Verde</h2>
              <p className="text-slate-600 max-w-2xl mx-auto">Um roteiro claro para você seguir e ver os resultados acontecerem semana após semana.</p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {[
                {
                  phase: "Fase 01",
                  title: "Desvendando o Caos",
                  days: "Dias 1 a 10",
                  desc: "Clareza total sobre para onde seu dinheiro está indo e o corte imediato da 'sangria' financeira.",
                  items: ["Raio-X Financeiro", "Corte de Gastos Invisíveis", "Mindset de Abundância"]
                },
                {
                  phase: "Fase 02",
                  title: "Saindo do Vermelho",
                  days: "Dias 11 a 20",
                  desc: "Estratégias de negociação com bancos e o plano de ataque para quitar dívidas com inteligência.",
                  items: ["Método Bola de Neve", "Roteiro de Negociação", "Fundo Anti-Recaída"]
                },
                {
                  phase: "Fase 03",
                  title: "Rumo à Prosperidade",
                  days: "Dias 21 a 30",
                  desc: "A transição de devedor para investidor. Como fazer o dinheiro trabalhar para você.",
                  items: ["Básico dos Investimentos", "Criação de Renda Passiva", "Metas SMART"]
                }
              ].map((phase, i) => (
                <motion.div 
                  key={i}
                  {...ANIMATION_PROPS}
                  transition={{ ...ANIMATION_PROPS.transition, delay: i * 0.1 }}
                  whileHover={{ y: -5 }}
                  className="bg-white p-8 rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100"
                >
                  <span className="text-green-700 font-bold text-sm uppercase tracking-widest">{phase.phase}</span>
                  <h3 className="text-2xl font-bold text-slate-900 mt-2 mb-1">{phase.title}</h3>
                  <p className="text-green-600 font-bold text-sm mb-4">{phase.days}</p>
                  <p className="text-slate-600 mb-6 leading-relaxed">{phase.desc}</p>
                  <ul className="space-y-3">
                    {phase.items.map((item, j) => (
                      <li key={j} className="flex items-center gap-2 text-slate-700 font-medium">
                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Bonus Section */}
        <section className="py-16 sm:py-24 bg-green-900 text-white overflow-hidden relative">
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div {...ANIMATION_PROPS}>
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-6">E você não vai levar apenas o Ebook...</h2>
                <p className="text-green-100 text-lg mb-10">Preparei bônus exclusivos para acelerar sua jornada e garantir que você nunca mais volte para o vermelho.</p>
                
                <div className="space-y-6">
                  {[
                    { title: "Guia Desafio 30 Dias", desc: "O plano de ação diário para você sair do caos e ver resultados reais em 4 semanas.", value: "R$ 47,00" },
                    { title: "Planilha de Controle de Gastos", desc: "Uma ferramenta intuitiva para dominar seu dinheiro sem complicação.", value: "R$ 37,00" },
                    { title: "Biblioteca da Prosperidade", desc: "Curadoria exclusiva dos melhores livros, vídeos e apps para acelerar sua evolução.", value: "R$ 27,00" },
                    { title: "Cards de Mentalidade Blindada", desc: "Mensagens de incentivo para imprimir e manter o foco total na sua meta.", value: "R$ 19,00" },
                    { title: "App Dívida Zero", desc: "Acesso ao aplicativo exclusivo para gestão financeira e controle de dívidas na palma da mão.", value: "R$ 59,00" }
                  ].map((bonus, i) => (
                    <motion.div 
                      key={i} 
                      {...ANIMATION_PROPS}
                      transition={{ ...ANIMATION_PROPS.transition, delay: i * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/10"
                    >
                      <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center shrink-0">
                        <Gift className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-lg">{bonus.title}</h4>
                        <p className="text-green-200 text-sm">{bonus.desc}</p>
                        <span className="inline-block mt-2 text-[10px] font-bold bg-white/20 px-2 py-0.5 rounded uppercase">Valor: {bonus.value}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div 
                {...ANIMATION_PROPS}
                transition={{ ...ANIMATION_PROPS.transition, delay: 0.3 }}
                className="relative"
              >
                <div className="aspect-square bg-green-800 rounded-full absolute -top-20 -right-20 blur-3xl opacity-50" />
                <div className="relative z-10 bg-white text-slate-900 p-8 rounded-3xl shadow-2xl rotate-3">
                  <h3 className="text-2xl font-bold mb-4 flex items-center gap-2">
                    <Zap className="text-orange-500 fill-current" />
                    OFERTA ESPECIAL
                  </h3>
                  <p className="text-slate-600 mb-6">Ao garantir o seu acesso hoje, você leva todos os bônus gratuitamente.</p>
                  <div className="space-y-2 mb-8">
                  <div className="flex justify-between text-sm">
                    <span>Ebook Do Vermelho ao Verde</span>
                    <span className="line-through">R$ 97,00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Pacote de 5 Bônus Exclusivos</span>
                    <span className="line-through">R$ 189,00</span>
                  </div>
                  <div className="flex justify-between font-bold text-lg pt-2 border-t border-slate-100">
                    <span>Valor Total</span>
                    <span className="text-green-700">R$ 286,00</span>
                  </div>
                  </div>
                  <button 
                    onClick={scrollToOffer}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 rounded-2xl font-bold text-xl transition-all shadow-lg shadow-orange-500/30"
                  >
                    APROVEITAR AGORA
                  </button>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Pricing Section */}
        <section id="pricing" className="py-16 sm:py-24 bg-white">
          <div className="max-w-5xl mx-auto px-4">
            <motion.div 
              {...ANIMATION_PROPS}
              className="text-center mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-4">Escolha o seu plano</h2>
              <p className="text-slate-600">O investimento que se paga na primeira economia que você fizer.</p>
            </motion.div>

            <div className="grid md:grid-cols-2 gap-8 items-stretch">
              {/* Basic Option */}
              <motion.div 
                {...ANIMATION_PROPS}
                transition={{ ...ANIMATION_PROPS.transition, delay: 0.1 }}
                className="p-6 sm:p-8 rounded-3xl border-2 border-slate-100 flex flex-col"
              >
                <h3 className="text-xl font-bold mb-2">Apenas o Ebook</h3>
                <p className="text-slate-500 text-sm mb-6">Ideal para quem quer apenas o conteúdo teórico do método.</p>
                <div className="mb-8">
                  <span className="text-4xl font-extrabold text-slate-900">R$ 27,90</span>
                  <span className="text-slate-400 text-sm ml-2">Pagamento único</span>
                </div>
                <ul className="space-y-4 mb-10 flex-grow">
                  <li className="flex items-center gap-3 text-slate-600">
                    <CheckCircle2 className="w-5 h-5 text-green-600" />
                    Ebook Completo (PDF)
                  </li>
                  <li className="flex items-center gap-3 text-slate-300 line-through">
                    Guia Desafio 30 Dias
                  </li>
                  <li className="flex items-center gap-3 text-slate-300 line-through">
                    App Dívida Zero
                  </li>
                  <li className="flex items-center gap-3 text-slate-300 line-through">
                    Planilha de Controle
                  </li>
                  <li className="flex items-center gap-3 text-slate-300 line-through">
                    Recursos Extras
                  </li>
                  <li className="flex items-center gap-3 text-slate-300 line-through">
                    Cards de Incentivo
                  </li>
                </ul>
                <a 
                  href="https://pay.hotmart.com/F102965388G?off=frag2i92&hotfeature=51&_hi=eyJjaWQiOiIxNzYzMjUyNTQ2ODMxODAyNzgzODg1MzY1Njg0MjAwIiwiYmlkIjoiMTc2MzI1MjU0NjgzMTgwMjc4Mzg4NTM2NTY4NDIwMCIsInNpZCI6ImU2OTBlMjIxYjA2NDRiZTViMTVjY2U3NTFhMWQxZWZmIn0=.1773532380951"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-4 rounded-2xl border-2 border-slate-200 font-bold hover:bg-slate-50 transition-colors text-center block"
                >
                  Comprar Ebook
                </a>
              </motion.div>

              {/* Premium Option */}
              <motion.div 
                {...ANIMATION_PROPS}
                transition={{ ...ANIMATION_PROPS.transition, delay: 0.3 }}
                className="p-6 sm:p-8 rounded-3xl border-4 border-green-600 bg-green-50 relative flex flex-col md:scale-105 shadow-2xl shadow-green-900/10"
              >
                <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-green-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest whitespace-nowrap">
                  🔥 OFERTA POR TEMPO LIMITADO
                </div>
                <h3 className="text-2xl font-black mb-1 text-green-900">Combo Prosperidade</h3>
                <p className="text-green-700/70 text-sm mb-4 font-medium">O caminho mais rápido para a liberdade financeira.</p>
                
                {/* Countdown Timer */}
                <div className="mb-6 flex items-center justify-between bg-orange-100 border border-orange-200 rounded-2xl p-2 sm:p-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center animate-pulse">
                      <Clock className="text-white w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[10px] font-bold text-orange-800 uppercase leading-none">A oferta expira em:</p>
                      <p className="text-lg font-black text-orange-600 leading-none mt-1 font-mono">{formatTime(timeLeft)}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-[9px] font-bold text-orange-700 uppercase leading-tight">Vagas com bônus<br/>quase esgotadas!</p>
                  </div>
                </div>
                
                <div className="mb-6 p-4 bg-white rounded-2xl border border-green-100 shadow-sm">
                  <div className="flex justify-between text-xs text-slate-400 mb-1">
                    <span>Valor Total (Ebook + 5 Bônus)</span>
                    <span className="line-through">R$ 286,00</span>
                  </div>
                  <div className="flex items-baseline gap-2">
                    <span className="text-5xl font-black text-slate-900 tracking-tighter">R$ 49,90</span>
                    <span className="text-green-600 font-bold text-sm bg-green-100 px-2 py-0.5 rounded">82% OFF</span>
                  </div>
                  <p className="text-[10px] text-slate-400 mt-2 uppercase font-bold tracking-wider">Pagamento único • Acesso Vitalício</p>
                </div>

                <ul className="space-y-3 mb-8 flex-grow">
                  <BonusItem 
                    title="Ebook Do Vermelho ao Verde" 
                    value="R$ 97,00" 
                    desc="O guia completo com o passo a passo para sair das dívidas." 
                    icon={CheckCircle2} 
                    isBonus={false} 
                  />
                  <BonusItem 
                    title="Guia Desafio 30 Dias" 
                    value="R$ 47,00" 
                    desc="O roteiro diário para transformar suas finanças em um mês." 
                    icon={Zap} 
                  />
                  <BonusItem 
                    title="App Dívida Zero" 
                    value="R$ 59,00" 
                    desc="Controle financeiro inteligente na palma da sua mão." 
                    icon={LayoutDashboard} 
                  />
                  <BonusItem 
                    title="Planilha de Controle" 
                    value="R$ 37,00" 
                    desc="Ferramenta prática para gerir seus gastos sem complicação." 
                    icon={Gift} 
                  />
                  <BonusItem 
                    title="Recursos Extras" 
                    value="R$ 27,00" 
                    desc="Indicações de livros, vídeos e apps para acelerar seu aprendizado." 
                    icon={BookOpen} 
                  />
                  <BonusItem 
                    title="Cards de Incentivo" 
                    value="R$ 19,00" 
                    desc="Mensagens motivacionais para manter o foco na sua meta." 
                    icon={MessageSquareQuote} 
                  />
                </ul>

                <div className="space-y-4">
                  <button className="w-full bg-green-700 hover:bg-green-800 text-white py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-green-900/30 flex flex-col items-center leading-none relative overflow-hidden group">
                    <motion.div 
                      animate={{ 
                        x: ['-100%', '200%'],
                      }}
                      transition={{ 
                        duration: 2,
                        repeat: Infinity,
                        ease: "linear",
                        repeatDelay: 3
                      }}
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -skew-x-12"
                    />
                    QUERO O COMBO COMPLETO
                    <span className="text-[10px] font-bold opacity-70 mt-1 uppercase tracking-widest">Acesso imediato após o pagamento</span>
                  </button>
                  
                  <div className="pt-4 border-t border-green-100">
                    <div className="flex items-center justify-center mb-4">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        <ShieldCheck className="w-3.5 h-3.5 text-green-600" />
                        Ambiente 100% Seguro
                      </div>
                    </div>
                    
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.95 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      className="bg-white rounded-2xl p-3 border border-green-200 flex items-center gap-4 shadow-sm"
                    >
                      <motion.div
                        animate={{ 
                          rotateY: [0, 360],
                        }}
                        transition={{ 
                          duration: 4,
                          repeat: Infinity,
                          ease: "linear",
                          repeatDelay: 2
                        }}
                        className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center shrink-0 shadow-lg shadow-green-600/20"
                      >
                        <Award className="text-white w-7 h-7" />
                      </motion.div>
                      <div className="flex-grow">
                        <p className="text-xs font-black text-slate-900 leading-tight uppercase tracking-tighter">Risco Zero: 7 Dias de Garantia</p>
                        <p className="text-[10px] text-slate-500 font-medium leading-tight mt-0.5">Satisfação total ou devolvemos cada centavo do seu investimento.</p>
                      </div>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            </div>
            
            <div className="mt-16 flex flex-wrap justify-center gap-x-12 gap-y-6">
              <div className="flex items-center gap-3 text-slate-400">
                <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <span className="font-bold text-xs uppercase tracking-widest">Compra Segura</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center">
                  <Lock className="w-5 h-5" />
                </div>
                <span className="font-bold text-xs uppercase tracking-widest">Acesso Imediato</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center">
                  <Award className="w-5 h-5" />
                </div>
                <span className="font-bold text-xs uppercase tracking-widest">7 Dias de Garantia</span>
              </div>
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-16 sm:py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
              <span className="text-green-600 font-bold text-sm uppercase tracking-widest mb-4 block">O Caminho para a Liberdade</span>
              <h2 className="text-3xl sm:text-4xl font-black text-slate-900 mb-4">O que você vai dominar com este método</h2>
              <p className="text-slate-600 max-w-2xl mx-auto text-lg">Esqueça fórmulas mágicas. Aqui você recebe as ferramentas reais que os bancos não querem que você use.</p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Blindagem de Salário", desc: "Como impedir que o banco 'sequestre' seu dinheiro assim que ele cai na conta.", icon: ShieldCheck },
                { title: "Negociação de Elite", desc: "O roteiro exato para reduzir juros abusivos em até 80% sem brigar com ninguém.", icon: MessageSquareQuote },
                { title: "Organização Sem Sofrimento", desc: "Um sistema que leva apenas 15 minutos por semana para manter tudo sob controle.", icon: LayoutDashboard },
                { title: "Renda Extra Acelerada", desc: "Estratégias para gerar dinheiro rápido e quitar as dívidas menores primeiro.", icon: TrendingUp },
                { title: "Mindset de Prosperidade", desc: "Como reprogramar seu cérebro para parar de gastar por impulso e começar a poupar.", icon: Zap },
                { title: "Futuro Investidor", desc: "O passo a passo para sair do zero e fazer seu primeiro investimento seguro.", icon: Award }
              ].map((benefit, i) => (
                <motion.div 
                  key={i} 
                  {...ANIMATION_PROPS}
                  transition={{ ...ANIMATION_PROPS.transition, delay: i * 0.1 }}
                  className="p-8 rounded-3xl border border-slate-100 bg-slate-50/50 hover:bg-white hover:shadow-xl hover:border-green-100 transition-all group"
                >
                  <div className="w-14 h-14 bg-white rounded-2xl shadow-sm flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                    <benefit.icon className="w-8 h-8 text-green-700" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-3">{benefit.title}</h4>
                  <p className="text-slate-600 leading-relaxed">{benefit.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Guarantee Section */}
        <section className="py-16 sm:py-24 bg-slate-900 text-white relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-0 left-0 w-96 h-96 bg-green-500 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-orange-500 rounded-full blur-[120px] translate-x-1/2 translate-y-1/2" />
          </div>
          
          <div className="max-w-5xl mx-auto px-4 relative z-10">
            <motion.div 
              {...ANIMATION_PROPS}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-16 text-center"
            >
              <div className="w-20 h-20 sm:w-24 sm:h-24 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl shadow-green-600/40">
                <Award className="w-10 h-10 sm:w-12 sm:h-12 text-white" />
              </div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-black mb-6">Garantia Blindada de 7 Dias</h2>
              <p className="text-lg sm:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
                Eu confio tanto no meu método que o risco é todo meu. Se em até 7 dias você achar que o conteúdo não é para você, basta enviar um único e-mail e devolvemos 100% do seu dinheiro. Sem perguntas, sem burocracia e continuamos amigos.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-8 pt-8 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-green-500" />
                  <span className="font-bold uppercase tracking-widest text-xs">Compra 100% Segura</span>
                </div>
                <div className="flex items-center gap-3">
                  <Lock className="w-6 h-6 text-green-500" />
                  <span className="font-bold uppercase tracking-widest text-xs">Acesso Imediato</span>
                </div>
                <div className="flex items-center gap-3">
                  <Star className="w-6 h-6 text-green-500" />
                  <span className="font-bold uppercase tracking-widest text-xs">Satisfação Garantida</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* EC Finanças Section - RACE Optimized */}
        <section className="py-16 sm:py-24 bg-white relative overflow-hidden">
          {/* Decorative background element */}
          <div className="absolute top-0 right-0 w-1/3 h-full bg-slate-50 -skew-x-12 translate-x-1/2 z-0" />
          
          <div className="max-w-7xl mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <motion.div 
                {...ANIMATION_PROPS}
                className="relative"
              >
                {/* Visual "Reach" - Striking Image Layout */}
                <div className="relative z-10">
                  <div className="aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl border-[8px] sm:border-[12px] border-white">
                    <img 
                      src={eduardoImage} 
                      alt="EC Finanças - Especialista em Finanças" 
                      className="w-full h-full object-cover"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                      decoding="async"
                    />
                  </div>
                  
                  {/* Authority Badge */}
                  <div className="absolute -bottom-4 -left-4 sm:-bottom-8 sm:-left-8 bg-white p-4 sm:p-6 rounded-3xl shadow-2xl border border-slate-100 flex items-center gap-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                      <ShieldCheck className="w-6 h-6 sm:w-8 sm:h-8 text-green-700" />
                    </div>
                    <div>
                      <p className="text-2xl sm:text-3xl font-black text-slate-900 leading-none">20+</p>
                      <p className="text-[10px] sm:text-xs font-bold text-slate-500 uppercase tracking-tighter">Anos de Mercado</p>
                    </div>
                  </div>
                </div>

                {/* Decorative dots */}
                <div className="absolute -top-10 -right-10 w-32 h-32 opacity-20">
                  <div className="grid grid-cols-4 gap-4">
                    {[...Array(16)].map((_, i) => (
                      <div key={i} className="w-2 h-2 bg-green-600 rounded-full" />
                    ))}
                  </div>
                </div>
              </motion.div>

              <motion.div
                {...ANIMATION_PROPS}
                transition={{ ...ANIMATION_PROPS.transition, delay: 0.2 }}
              >
                {/* Relevance & Authority */}
                <span className="inline-block px-4 py-1 rounded-full bg-green-100 text-green-800 font-bold text-xs uppercase tracking-widest mb-4">
                  Autoridade em Finanças
                </span>
                <h2 className="text-3xl sm:text-5xl font-black text-black leading-tight mb-8">
                  A mente por trás do método <span className="italic">"Do <span className="text-red-600">Vermelho</span> ao <span className="text-green-600">Verde</span>"</span>
                </h2>
                
                <div className="space-y-8 text-lg text-slate-600 leading-relaxed">
                  <p className="font-medium text-slate-800">
                    Eduardo César não é apenas um autor; ele é um sobrevivente e estrategista do sistema financeiro nacional.
                  </p>
                  
                  <p>
                    Com duas décadas de atuação direta em grandes instituições bancárias, ele decodificou a linguagem complexa dos bancos para criar um sistema que **protege o seu patrimônio** e ensina você a **virar o jogo do banco a seu favor**.
                  </p>

                  {/* Confidence Elements */}
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-green-200 transition-colors">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4">
                        <Award className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-1">CEA ANBIMA</h4>
                      <p className="text-sm leading-snug">Especialista certificado para recomendar os melhores investimentos.</p>
                    </div>
                    
                    <div className="p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-green-200 transition-colors">
                      <div className="w-10 h-10 bg-white rounded-xl shadow-sm flex items-center justify-center mb-4">
                        <Zap className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="font-bold text-slate-900 mb-1">Método Prático</h4>
                      <p className="text-sm leading-snug">Estratégias validadas por quem conhece o sistema financeiro por dentro.</p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-slate-100">
                    <p className="italic text-slate-500 text-base mb-4">
                      "Minha missão é simples: tirar o poder das mãos dos bancos e devolvê-lo para você. Sem letras miúdas, sem promessas vazias."
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-px bg-slate-300" />
                      <span className="font-serif text-2xl text-slate-800">Eduardo César</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-24 bg-slate-50">
          <div className="max-w-3xl mx-auto px-4">
            <motion.h2 
              {...ANIMATION_PROPS}
              className="text-3xl font-bold text-center mb-12"
            >
              Perguntas Frequentes
            </motion.h2>
            <div className="space-y-4">
              {[
                { q: "O conteúdo é para iniciantes?", a: "Sim! O método foi desenhado para quem não entende nada de finanças e quer um passo a passo simples, sem termos técnicos complicados." },
                { q: "Como recebo o material?", a: "Imediatamente após a confirmação do pagamento, você receberá um e-mail com o link para download de todos os arquivos em PDF e Excel." },
                { q: "E se eu não gostar do conteúdo?", a: "Você tem 7 dias de garantia incondicional. Se achar que o material não é para você, devolvemos 100% do seu dinheiro sem perguntas." },
                { q: "Preciso de muito dinheiro para começar a investir?", a: "De forma alguma. No Desafio de 30 dias, mostramos como você pode começar com apenas R$ 10,00 ou R$ 50,00." }
              ].map((faq, i) => (
                <motion.div 
                  key={i} 
                  {...ANIMATION_PROPS}
                  transition={{ ...ANIMATION_PROPS.transition, delay: i * 0.1 }}
                  className="bg-white rounded-2xl border border-slate-200 overflow-hidden"
                >
                  <button 
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full p-6 text-left flex items-center justify-between font-bold text-slate-800"
                  >
                    {faq.q}
                    <ChevronDown className={`w-5 h-5 transition-transform ${activeFaq === i ? 'rotate-180' : ''}`} />
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="px-6 pb-6 text-slate-600 leading-relaxed"
                      >
                        {faq.a}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="py-16 sm:py-24 bg-white">
          <motion.div 
            {...ANIMATION_PROPS}
            className="max-w-4xl mx-auto px-4 text-center"
          >
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <TrendingUp className="text-green-700 w-8 h-8 sm:w-10 sm:h-10" />
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mb-6">Pronto para virar o jogo contra os bancos?</h2>
            <p className="text-lg sm:text-xl text-slate-600 mb-10">Não deixe para amanhã a tranquilidade que você pode começar a construir hoje. O risco é todo meu.</p>
            <button 
              onClick={scrollToOffer}
              className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white px-8 sm:px-12 py-4 sm:py-5 rounded-2xl font-bold text-lg sm:text-xl transition-all shadow-2xl shadow-orange-500/30 inline-flex items-center justify-center gap-3 group"
            >
              SAIR DO VERMELHO AGORA
              <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
            </button>
            <p className="mt-6 text-slate-400 text-sm">Acesso vitalício e atualizações gratuitas.</p>
          </motion.div>
        </section>
      </main>

      <footer className="py-12 bg-slate-900 text-slate-400 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-2">
              <TrendingUp className="text-green-500 w-6 h-6" />
              <span className="font-bold text-lg text-white">Do Vermelho ao Verde</span>
            </div>
            <div className="flex gap-8 text-sm">
              <button onClick={() => setActiveModal('terms')} className="hover:text-white transition-colors">Termos de Uso</button>
              <button onClick={() => setActiveModal('privacy')} className="hover:text-white transition-colors">Privacidade</button>
              <button onClick={() => setActiveModal('support')} className="hover:text-white transition-colors">Suporte</button>
              {showInstallBtn && (
                <button 
                  onClick={handleInstallClick}
                  className="bg-green-700 text-white px-3 py-1 rounded-lg hover:bg-green-600 transition-colors font-bold flex items-center gap-1"
                >
                  <Zap className="w-3 h-3" />
                  Instalar App
                </button>
              )}
            </div>
            <p className="text-sm">© 2026 EC Finanças. Todos os direitos reservados.</p>
          </div>
        </div>
      </footer>

      {/* Legal Modals */}
      <AnimatePresence>
        {activeModal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setActiveModal(null)}
              className="absolute inset-0 bg-slate-950/80 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl max-h-[80vh] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col"
            >
              <div className="p-6 border-b border-slate-100 flex items-center justify-between">
                <h3 className="text-xl font-bold text-slate-900">
                  {activeModal === 'terms' && 'Termos de Uso'}
                  {activeModal === 'privacy' && 'Política de Privacidade'}
                  {activeModal === 'support' && 'Suporte ao Cliente'}
                </h3>
                <button 
                  onClick={() => setActiveModal(null)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                >
                  <Zap className="w-4 h-4 rotate-45 text-slate-500" />
                </button>
              </div>
              <div className="p-8 overflow-y-auto text-slate-600 leading-relaxed space-y-4">
                {activeModal === 'terms' && (
                  <>
                    <p className="font-bold text-slate-900">1. Aceitação dos Termos</p>
                    <p>Ao adquirir o Ebook "Do Vermelho ao Verde", você concorda em cumprir estes termos de serviço, todas as leis e regulamentos aplicáveis.</p>
                    <p className="font-bold text-slate-900">2. Isenção de Responsabilidade Financeira</p>
                    <p>O conteúdo deste material é estritamente educacional. EC Finanças e a equipe "Do Vermelho ao Verde" não garantem resultados financeiros específicos. O sucesso depende da implementação individual e das condições de mercado. Este material não substitui o aconselhamento de um profissional financeiro personalizado.</p>
                    <p className="font-bold text-slate-900">3. Propriedade Intelectual</p>
                    <p>Todo o conteúdo (ebook, planilhas, vídeos, app) é protegido por direitos autorais. O acesso é pessoal e intransferível. A pirataria ou distribuição não autorizada resultará em medidas judiciais.</p>
                    <p className="font-bold text-slate-900">4. Reembolsos</p>
                    <p>Oferecemos uma garantia de satisfação de 7 dias. Após este período, não serão efetuados reembolsos devido à natureza digital do produto.</p>
                  </>
                )}
                {activeModal === 'privacy' && (
                  <>
                    <p className="font-bold text-slate-900">1. Coleta de Dados</p>
                    <p>Coletamos informações básicas como nome e e-mail no momento da compra para processar seu acesso e enviar atualizações do material.</p>
                    <p className="font-bold text-slate-900">2. Uso das Informações</p>
                    <p>Seus dados nunca serão vendidos a terceiros. Utilizamos seu e-mail apenas para comunicações relacionadas ao produto adquirido e ofertas exclusivas de educação financeira.</p>
                    <p className="font-bold text-slate-900">3. Segurança</p>
                    <p>Utilizamos protocolos de segurança avançados e processadores de pagamento líderes de mercado (como Hotmart) para garantir que suas informações financeiras estejam protegidas.</p>
                    <p className="font-bold text-slate-900">4. Seus Direitos</p>
                    <p>Você pode solicitar a exclusão de seus dados de nossa lista de e-mails a qualquer momento através do link de descadastro em nossas mensagens.</p>
                  </>
                )}
                {activeModal === 'support' && (
                  <div className="text-center py-8">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <MessageSquareQuote className="text-green-700 w-8 h-8" />
                    </div>
                    <h4 className="text-2xl font-bold text-slate-900 mb-2">Como podemos ajudar?</h4>
                    <p className="mb-8">Nossa equipe está pronta para tirar suas dúvidas sobre acesso, downloads ou conteúdo.</p>
                    <div className="bg-slate-50 p-6 rounded-2xl border border-slate-100">
                      <p className="text-sm uppercase font-bold text-slate-400 mb-1">E-mail de Suporte</p>
                      <a href="mailto:ecfinancasoficial@gmail.com" className="text-xl font-bold text-green-700 hover:underline">
                        ecfinancasoficial@gmail.com
                      </a>
                    </div>
                    <p className="mt-8 text-sm text-slate-400">
                      Tempo médio de resposta: 24 a 48 horas úteis.
                    </p>
                  </div>
                )}
              </div>
              <div className="p-6 border-t border-slate-100 bg-slate-50 flex justify-end">
                <button 
                  onClick={() => setActiveModal(null)}
                  className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-slate-800 transition-colors"
                >
                  Fechar
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Exit Intent Popup */}
      <AnimatePresence>
        {showExitPopup && (
          <div className="fixed inset-0 z-[150] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowExitPopup(false)}
              className="absolute inset-0 bg-slate-950/90 backdrop-blur-md"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 40 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 40 }}
              className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl overflow-hidden"
            >
              <div className="absolute top-4 right-4 z-10">
                <button 
                  onClick={() => setShowExitPopup(false)}
                  className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors"
                >
                  <Zap className="w-5 h-5 rotate-45 text-slate-500" />
                </button>
              </div>

              <div className="p-8 sm:p-12 text-center">
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-100 text-green-600 text-xs font-black uppercase tracking-widest mb-6">
                  <Star className="w-4 h-4 fill-current" />
                  <span>NÃO PERCA ESTA OPORTUNIDADE</span>
                </div>
                
                <h3 className="text-3xl sm:text-4xl font-black text-slate-900 leading-tight mb-4">
                  O <span className="text-green-600">Combo Prosperidade</span> Completo
                </h3>
                
                <p className="text-slate-600 mb-8 text-lg">
                  Garanta seu acesso ao método completo e todos os bônus exclusivos antes de sair. Sua liberdade financeira não pode esperar!
                </p>

                <div className="bg-slate-50 rounded-3xl p-6 border-2 border-slate-100 mb-8">
                  <p className="text-sm text-slate-500 font-bold uppercase tracking-wider mb-1">Valor do Investimento</p>
                  <div className="flex items-center justify-center gap-2">
                    <span className="text-4xl font-black text-slate-900">R$ 49,90</span>
                  </div>
                  <p className="text-[10px] text-slate-400 font-bold mt-2 uppercase">Acesso Vitalício + Todos os Bônus</p>
                </div>

                <a 
                  href="https://pay.hotmart.com/F102965388G?off=frag2i92&hotfeature=51"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full bg-green-700 hover:bg-green-800 text-white py-5 rounded-2xl font-black text-xl transition-all shadow-xl shadow-green-900/30 flex items-center justify-center gap-3 group"
                >
                  GARANTIR MEU ACESSO AGORA
                  <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                </a>
                
                <button 
                  onClick={() => setShowExitPopup(false)}
                  className="mt-6 text-slate-400 text-sm font-bold hover:text-slate-600 transition-colors"
                >
                  Continuar navegando na página
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <motion.a
        href="https://wa.me/5581986775689?text=Olá! Gostaria de saber mais sobre o método Do Vermelho ao Verde."
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-6 right-6 z-[90] bg-green-500 text-white p-4 rounded-full shadow-2xl shadow-green-500/40 flex items-center justify-center group"
      >
        <MessageCircle className="w-7 h-7" />
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs group-hover:ml-2 transition-all duration-300 font-bold whitespace-nowrap">
          Falar no WhatsApp
        </span>
      </motion.a>
    </div>
  );
}
