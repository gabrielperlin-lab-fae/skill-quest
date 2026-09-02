import { AnimatePresence, motion } from "framer-motion";
import {
  Activity,
  ArrowUpRight,
  BarChart3,
  Bot,
  Brain,
  BriefcaseBusiness,
  Check,
  ChevronLeft,
  ChevronRight,
  CircleCheck,
  CircleDollarSign,
  Coins,
  Crown,
  Database,
  Flame,
  Gift,
  HeartHandshake,
  Home as HomeIcon,
  Lock,
  Map as MapIcon,
  Medal,
  MessageSquare,
  Play,
  Plus,
  Rocket,
  Send,
  Settings2,
  ShoppingBag,
  Sparkles,
  Star,
  Target,
  Trophy,
  Undo2,
  UsersRound,
  X,
  Zap,
} from "lucide-react";
import { useState } from "react";

type Screen =
  | "onboarding"
  | "home"
  | "map"
  | "lesson"
  | "feedback"
  | "badge"
  | "boss"
  | "missions"
  | "store"
  | "team"
  | "profile"
  | "admin";

type NavItem = {
  id: Screen;
  label: string;
  icon: typeof HomeIcon;
};

const navItems: NavItem[] = [
  { id: "home", label: "Início", icon: HomeIcon },
  { id: "map", label: "Jornada", icon: MapIcon },
  { id: "missions", label: "Missões", icon: Target },
  { id: "store", label: "Loja", icon: ShoppingBag },
  { id: "profile", label: "Perfil", icon: Star },
];

const trails = [
  {
    name: "Conexão em Equipe",
    subtitle: "Fale melhor. Retrabalhe menos.",
    icon: "🤝",
    color: "blue",
    progress: "2 / 6",
    status: "Em andamento",
  },
  {
    name: "IA na Prática",
    subtitle: "Use IA com critério e segurança.",
    icon: "✦",
    color: "purple",
    progress: "0 / 6",
    status: "Próxima recomendada",
  },
  {
    name: "Decisão por Dados",
    subtitle: "Transforme registros em ação.",
    icon: "◔",
    color: "yellow",
    progress: "0 / 6",
    status: "Disponível",
  },
  {
    name: "Aprender a Aprender",
    subtitle: "Evolua no seu ritmo.",
    icon: "◒",
    color: "orange",
    progress: "0 / 5",
    status: "Disponível",
  },
  {
    name: "Turbo Produtividade",
    subtitle: "Automatize o que pesa.",
    icon: "ϟ",
    color: "coral",
    progress: "0 / 6",
    status: "Em breve",
  },
];

const lessonOptions = [
  { id: "chat", icon: "💬", label: "Chat rápido", detail: "Dúvida simples, resposta ágil" },
  { id: "teams", icon: "👥", label: "Canal do time", detail: "Decisão que todos precisam acompanhar" },
  { id: "email", icon: "✉️", label: "E-mail", detail: "Registro formal com contexto" },
  { id: "call", icon: "☎️", label: "Ligação", detail: "Urgência que precisa de conversa" },
];

function ProgressBar({ value, className = "" }: { value: number; className?: string }) {
  return (
    <div className={`progress-track ${className}`} aria-label={`${value}% concluído`}>
      <motion.div
        className="progress-fill"
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.65, ease: [0.23, 1, 0.32, 1] }}
      />
    </div>
  );
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <button className={`brand ${compact ? "brand-compact" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Skill Quest">
      <span className="brand-mark"><Sparkles size={compact ? 15 : 18} strokeWidth={2.7} /></span>
      <span>skill<span>quest</span></span>
    </button>
  );
}

function TinyMascot({ size = "medium", className = "" }: { size?: "small" | "medium" | "large"; className?: string }) {
  return <img className={`mascot mascot-${size} ${className}`} src="/manus-storage/nova-mascot_445a572d.png" alt="Nova, guia da Skill Quest" />;
}

function TopBar({
  screen,
  setScreen,
  xp,
  coins,
  streak,
}: {
  screen: Screen;
  setScreen: (screen: Screen) => void;
  xp: number;
  coins: number;
  streak: number;
}) {
  const hasBack = !["home", "onboarding"].includes(screen);
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="topbar-left">
          {hasBack ? (
            <button className="icon-button back-button" onClick={() => setScreen("home")} aria-label="Voltar ao início"><ChevronLeft size={20} /></button>
          ) : null}
          <Brand compact />
        </div>
        <div className="top-stats">
          <button className="stat-pill fire" onClick={() => setScreen("missions")}><Flame size={15} fill="currentColor" /> <b>{streak}</b><span> dias</span></button>
          <button className="stat-pill xp" onClick={() => setScreen("profile")}><Zap size={15} fill="currentColor" /> <b>{xp}</b></button>
          <button className="stat-pill coins" onClick={() => setScreen("store")}><Coins size={15} fill="currentColor" /> <b>{coins}</b></button>
        </div>
      </div>
    </header>
  );
}

function BottomNav({ screen, setScreen }: { screen: Screen; setScreen: (screen: Screen) => void }) {
  return (
    <nav className="bottom-nav" aria-label="Navegação principal">
      {navItems.map((item) => {
        const Icon = item.icon;
        const active = screen === item.id;
        return (
          <button key={item.id} className={`bottom-nav-item ${active ? "active" : ""}`} onClick={() => setScreen(item.id)}>
            <Icon size={20} strokeWidth={active ? 2.5 : 2} />
            <span>{item.label}</span>
          </button>
        );
      })}
    </nav>
  );
}

export default function Home() {
  const [screen, setScreen] = useState<Screen>("onboarding");
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [xp, setXp] = useState(35);
  const [coins, setCoins] = useState(124);
  const [streak] = useState(5);
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [applicationSent, setApplicationSent] = useState(false);
  const [applicationRegistered, setApplicationRegistered] = useState(false);
  const [bossComplete, setBossComplete] = useState(false);
  const [purchased, setPurchased] = useState<string[]>([]);

  const go = (next: Screen) => {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const chooseAnswer = (id: string) => {
    setSelectedAnswer(id);
  };

  const checkAnswer = () => {
    const isCorrect = selectedAnswer === "teams";
    setAnswerCorrect(isCorrect);
    if (isCorrect) {
      setXp((current) => current + 30);
      setCoins((current) => current + 8);
    }
    go("feedback");
  };

  const submitApplication = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setApplicationSent(true);
    setApplicationRegistered(true);
    setXp((current) => current + 80);
    setCoins((current) => current + 20);
  };

  const purchase = (name: string) => {
    if (!purchased.includes(name)) setPurchased((items) => [...items, name]);
  };

  const openApplication = () => {
    setApplicationSent(false);
    setApplicationOpen(true);
  };

  const appScreens: Record<Exclude<Screen, "onboarding" | "feedback" | "badge">, React.ReactNode> = {
    home: <HomeScreen go={go} xp={xp} coins={coins} streak={streak} openApplication={openApplication} />, 
    map: <MapScreen go={go} />, 
    lesson: <LessonScreen selectedAnswer={selectedAnswer} chooseAnswer={chooseAnswer} checkAnswer={checkAnswer} go={go} />, 
    boss: <BossScreen complete={bossComplete} onComplete={() => { setBossComplete(true); setXp((current) => current + 100); setCoins((current) => current + 25); }} go={go} />, 
    missions: <MissionsScreen go={go} openApplication={openApplication} applicationRegistered={applicationRegistered} />, 
    store: <StoreScreen coins={coins} purchased={purchased} purchase={purchase} />, 
    team: <TeamScreen go={go} />, 
    profile: <ProfileScreen xp={xp} streak={streak} applicationRegistered={applicationRegistered} go={go} openApplication={openApplication} />, 
    admin: <AdminScreen go={go} />, 
  };

  return (
    <main className="app-canvas">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <section className={`app-shell ${screen === "onboarding" ? "onboarding-shell" : ""}`}>
        {screen === "onboarding" ? (
          <Onboarding step={onboardingStep} setStep={setOnboardingStep} onFinish={() => go("home")} />
        ) : (
          <>
            <TopBar screen={screen} setScreen={go} xp={xp} coins={coins} streak={streak} />
            <AnimatePresence mode="wait">
              <motion.div
                key={screen}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.23, ease: [0.23, 1, 0.32, 1] }}
                className="screen-content"
              >
                {screen === "feedback" ? (
                  <FeedbackScreen correct={answerCorrect} onRetry={() => go("lesson")} onNext={() => go("badge")} />
                ) : screen === "badge" ? (
                  <BadgeScreen onMap={() => go("map")} onBoss={() => go("boss")} />
                ) : appScreens[screen as Exclude<Screen, "onboarding" | "feedback" | "badge">]}
              </motion.div>
            </AnimatePresence>
            <BottomNav screen={screen} setScreen={go} />
          </>
        )}
      </section>

      <ApplicationModal
        open={applicationOpen}
        close={() => setApplicationOpen(false)}
        success={applicationSent}
        submit={submitApplication}
      />
    </main>
  );
}

function Onboarding({ step, setStep, onFinish }: { step: number; setStep: (step: number) => void; onFinish: () => void }) {
  const steps = [
    {
      eyebrow: "BEM-VINDA À SKILL QUEST",
      title: <>Seu trabalho já é um desafio.<br /><em>Vamos deixar o digital mais leve.</em></>,
      copy: "Missões curtas, progresso que aparece e habilidades que funcionam fora da tela.",
      pill: "A sua evolução começa aqui",
    },
    {
      eyebrow: "JORNADA DO SEU JEITO",
      title: <>A gente destaca o que<br /><em>vai fazer diferença na sua área.</em></>,
      copy: "Para a Logística, IA aplicada vem primeiro. Você ainda pode explorar todas as trilhas quando quiser.",
      pill: "Prioridade: IA na Prática ✦",
    },
    {
      eyebrow: "5–10 MINUTOS POR DIA",
      title: <>Uma pequena missão.<br /><em>Um avanço de verdade.</em></>,
      copy: "Ganhe XP, registre o que aplicou e ajude sua equipe a chegar mais longe. Sem pressão, só progresso.",
      pill: "Meta de hoje: 50 XP",
    },
  ];
  const item = steps[step];
  return (
    <div className="onboarding">
      <div className="onboarding-top">
        <Brand />
        <button className="text-button" onClick={onFinish}>Pular</button>
      </div>
      <div className="onboarding-grid">
        <div className="onboarding-copy">
          <div className="stepper" aria-label={`Passo ${step + 1} de 3`}>
            {[0, 1, 2].map((number) => <span key={number} className={number === step ? "current" : number < step ? "done" : ""} />)}
          </div>
          <span className="eyebrow">{item.eyebrow}</span>
          <h1>{item.title}</h1>
          <p>{item.copy}</p>
          <div className="onboarding-pill">{item.pill}</div>
          <div className="onboarding-actions">
            {step > 0 ? <button className="round-button" onClick={() => setStep(step - 1)} aria-label="Tela anterior"><ChevronLeft size={22} /></button> : <span />}
            <button className="primary-button" onClick={() => step === 2 ? onFinish() : setStep(step + 1)}>
              {step === 2 ? "Começar jornada" : "Continuar"} {step === 2 ? <Rocket size={18} /> : <ChevronRight size={20} />}
            </button>
          </div>
        </div>
        <div className="onboarding-art">
          <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" />
          <div className="floating-tag tag-xp"><Zap size={15} fill="currentColor" /> +30 XP</div>
          <div className="floating-tag tag-streak"><Flame size={15} fill="currentColor" /> sequência</div>
          <div className="mascot-halo" />
          <TinyMascot size="large" />
          <div className="mascot-speech">Oi, eu sou a Nova.<br />Bora evoluir?</div>
        </div>
      </div>
      <div className="onboarding-footer">Aprender no trabalho, do seu jeito.</div>
    </div>
  );
}

function HomeScreen({
  go,
  xp,
  coins,
  streak,
  openApplication,
}: {
  go: (screen: Screen) => void;
  xp: number;
  coins: number;
  streak: number;
  openApplication: () => void;
}) {
  return (
    <div className="home-screen page-width">
      <section className="home-hero">
        <div className="hero-copy">
          <div className="greeting-row">
            <div className="avatar avatar-marina">M</div>
            <div><span className="eyebrow">TERÇA, 2 DE SETEMBRO</span><h1>Oi, Marina! <span>✦</span></h1></div>
          </div>
          <div className="level-line"><span className="level-dot">3</span><b>Aplicadora</b><span>•</span><span>faltam 80 XP para o nível 4</span></div>
        </div>
        <div className="hero-streak-card" onClick={() => go("missions")} role="button" tabIndex={0}>
          <Flame size={26} fill="currentColor" /><div><strong>{streak} dias</strong><span>em sequência</span></div>
        </div>
      </section>

      <section className="today-card">
        <div className="today-card-top">
          <div><span className="eyebrow">META DE HOJE</span><h2><b>{xp}</b> <span>/ 50 XP</span></h2></div>
          <div className="goal-orbit"><span>70%</span></div>
        </div>
        <ProgressBar value={70} />
        <p><Sparkles size={16} /> Falta pouco para fechar sua meta. A próxima missão resolve isso.</p>
      </section>

      <section className="continue-section">
        <div className="section-heading"><div><span className="eyebrow">PRÓXIMA MISSÃO</span><h2>Hora de avançar.</h2></div><button onClick={() => go("map")} className="link-button">Ver jornada <ArrowUpRight size={16} /></button></div>
        <div className="mission-hero">
          <div className="mission-tile-icon"><MessageSquare size={28} /></div>
          <div className="mission-main"><span className="trail-label blue">CONEXÃO EM EQUIPE</span><h3>Mensagem que funciona</h3><p>Escolha o canal e reduza o ruído.</p><div className="mission-rewards"><span><Activity size={15} /> 6 min</span><span className="reward-xp"><Zap size={15} fill="currentColor" /> +30 XP</span><span className="reward-coin"><Coins size={15} fill="currentColor" /> +8</span></div></div>
          <button className="continue-button" onClick={() => go("lesson")}><Play size={22} fill="currentColor" /><span>Continuar</span></button>
          <div className="mission-pattern">✦</div>
        </div>
      </section>

      <section className="home-grid">
        <button className="daily-mission-card" onClick={() => go("missions")}>
          <div className="card-icon lime"><Target size={21} /></div>
          <div><span className="eyebrow">MISSÃO DIÁRIA</span><h3>Ganhe 50 XP hoje</h3><p>2 de 3 passos concluídos</p></div>
          <ChevronRight size={20} />
        </button>
        <button className="team-card" onClick={() => go("team")}>
          <div className="team-people"><span>J</span><span>A</span><span>R</span></div>
          <div><span className="eyebrow">DESAFIO COLETIVO</span><h3>Logística está em 78%</h3><p>Faltam 240 XP para a equipe.</p></div>
          <ChevronRight size={20} />
        </button>
      </section>

      <section className="apply-strip">
        <div className="apply-icon"><BriefcaseBusiness size={20} /></div>
        <div><b>Aplicou algo no trabalho?</b><span>Conte rapidinho e ganhe XP extra.</span></div>
        <button onClick={openApplication}><Plus size={18} /> Registrar</button>
      </section>

      <section className="trail-preview">
        <div className="section-heading"><div><span className="eyebrow">SEU PRÓXIMO MUNDO</span><h2>IA na prática</h2></div><button onClick={() => go("map")} className="link-button">Explorar <ArrowUpRight size={16} /></button></div>
        <button className="world-mini purple" onClick={() => go("map")}><div className="world-mini-icon"><Bot size={25} /></div><div><b>Prompts que ajudam de verdade</b><span>Recomendado para Logística</span></div><ChevronRight size={20} /></button>
      </section>
    </div>
  );
}

function MapScreen({ go }: { go: (screen: Screen) => void }) {
  const [expanded, setExpanded] = useState("blue");
  return (
    <div className="map-screen page-width">
      <section className="map-header">
        <div><span className="eyebrow">SUA JORNADA</span><h1>Mapa de evolução</h1><p>Uma missão por vez. O próximo passo está brilhando.</p></div>
        <div className="map-total"><span>JORNADA</span><b>18%</b><ProgressBar value={18} /></div>
      </section>
      <div className="map-layout">
        <section className="journey-path" aria-label="Mapa das trilhas de aprendizagem">
          <div className="path-spark spark-a">✦</div><div className="path-spark spark-b">✦</div>
          <div className="world-label blue"><span>01</span><div><b>CONEXÃO EM EQUIPE</b><small>2 de 6 missões</small></div></div>
          <div className="path-line blue-line" />
          <button className="map-node node-done node-one" onClick={() => go("lesson")} aria-label="Escolha seu canal, concluída"><Check size={22} /></button>
          <button className="map-node node-done node-two" onClick={() => go("lesson")} aria-label="Contexto que resolve, concluída"><Check size={22} /></button>
          <button className="map-node node-current node-three" onClick={() => go("lesson")} aria-label="Mensagem que funciona, missão atual"><MessageSquare size={23} /><span className="node-tooltip">Você está aqui <ChevronRight size={13} /></span></button>
          <button className="map-node node-lock node-four" onClick={() => go("lesson")} aria-label="Missão bloqueada"><Lock size={18} /></button>
          <button className="map-node node-boss node-five" onClick={() => go("boss")} aria-label="Chefão: melhore um processo real"><Crown size={24} /><span>CHEFÃO</span></button>
          <div className="world-banner blue"><div className="world-banner-icon">🤝</div><div><span>MUNDO 1</span><b>Conexão em Equipe</b></div><button onClick={() => go("lesson")}>Continuar <Play size={14} fill="currentColor" /></button></div>
        </section>
        <aside className="world-list">
          <span className="eyebrow">TODOS OS MUNDOS</span>
          {trails.map((trail, index) => (
            <button key={trail.color} onClick={() => setExpanded(trail.color)} className={`world-list-item ${trail.color} ${expanded === trail.color ? "expanded" : ""}`}>
              <span className="world-number">0{index + 1}</span><span className="world-emoji">{trail.icon}</span><span className="world-list-copy"><b>{trail.name}</b><small>{trail.status}</small>{expanded === trail.color ? <span className="tiny-progress"><i style={{ width: trail.color === "blue" ? "33%" : "0%" }} />{trail.progress}</span> : null}</span>{trail.color === "coral" ? <Lock size={16} /> : <ChevronRight size={18} />}
            </button>
          ))}
          <button className="admin-link" onClick={() => go("admin")}><Settings2 size={16} /> Painel da liderança <ArrowUpRight size={15} /></button>
        </aside>
      </div>
    </div>
  );
}

function LessonScreen({ selectedAnswer, chooseAnswer, checkAnswer, go }: { selectedAnswer: string | null; chooseAnswer: (id: string) => void; checkAnswer: () => void; go: (screen: Screen) => void }) {
  return (
    <div className="lesson-screen page-width narrow-width">
      <div className="lesson-topline"><button className="icon-button" onClick={() => go("map")} aria-label="Voltar ao mapa"><X size={20} /></button><div className="lesson-progress"><ProgressBar value={42} /><span>2 / 6</span></div><button className="sound-toggle" aria-label="Som ligado">◖))</button></div>
      <section className="lesson-card">
        <div className="lesson-kind"><MessageSquare size={16} /> DECISÃO RÁPIDA <span>•</span> 6 MIN</div>
        <div className="lesson-visual"><div className="visual-ring" /><div className="chat-bubble bubble-one">Pessoal, o pedido 7842 mudou de prioridade.</div><div className="chat-bubble bubble-two">Qual canal garante que ninguém perca essa mudança?</div><div className="visual-avatar avatar-a">R</div><div className="visual-avatar avatar-b">M</div></div>
        <h1>Qual canal você usaria para comunicar uma mudança que afeta Expedição, Estoque e Comercial?</h1>
        <p className="lesson-helper">Uma decisão por tela. Pense no alcance e no histórico que o time precisa ter.</p>
        <div className="answer-grid">
          {lessonOptions.map((option) => <button key={option.id} onClick={() => chooseAnswer(option.id)} className={`answer-option ${selectedAnswer === option.id ? "selected" : ""}`}><span className="answer-emoji">{option.icon}</span><span><b>{option.label}</b><small>{option.detail}</small></span><span className="answer-radio" /></button>)}
        </div>
      </section>
      <div className="lesson-footer"><span><Zap size={16} fill="currentColor" /> Vale <b>+30 XP</b></span><button className="primary-button lesson-check" disabled={!selectedAnswer} onClick={checkAnswer}>Conferir <ChevronRight size={19} /></button></div>
    </div>
  );
}

function FeedbackScreen({ correct, onRetry, onNext }: { correct: boolean; onRetry: () => void; onNext: () => void }) {
  return (
    <div className={`feedback-screen ${correct ? "success" : "retry"}`}>
      {correct ? <div className="confetti" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div> : null}
      <div className="feedback-card">
        <div className="feedback-graphic">{correct ? <><div className="success-burst">✦</div><CircleCheck size={64} strokeWidth={2.2} /></> : <><div className="retry-burst">?</div><Undo2 size={58} strokeWidth={2.1} /></>}</div>
        <span className="eyebrow">{correct ? "RESPOSTA CERTA" : "SEM PRESSA"}</span>
        <h1>{correct ? "Boa, Marina!" : "Quase!"}</h1>
        <p>{correct ? "Canal do time é o melhor lugar para uma mudança que precisa de visibilidade, histórico e confirmação entre áreas." : "Para mudanças que afetam várias áreas, prefira um canal em que todos possam ver o contexto e confirmar o combinado."}</p>
        {correct ? <div className="earned-row"><span><Zap size={17} fill="currentColor" /> +30 XP</span><span><Coins size={17} fill="currentColor" /> +8 moedas</span></div> : null}
        <button className="primary-button wide" onClick={correct ? onNext : onRetry}>{correct ? "Próxima lição" : "Tentar de novo"} <ChevronRight size={20} /></button>
      </div>
    </div>
  );
}

function BadgeScreen({ onMap, onBoss }: { onMap: () => void; onBoss: () => void }) {
  return (
    <div className="badge-screen">
      <div className="badge-rays" />
      <div className="new-badge medal-communicator"><MessageSquare size={46} fill="currentColor" /><span>✦</span></div>
      <span className="eyebrow">NOVA CONQUISTA</span><h1>Você é uma<br /><em>Comunicadora.</em></h1><p>Você mostrou que sabe fazer uma mensagem chegar — e fazer sentido.</p>
      <div className="badge-xp-row"><Zap size={18} fill="currentColor" /> +30 XP &nbsp;•&nbsp; 1 badge desbloqueado</div>
      <div className="badge-actions"><button className="secondary-button" onClick={onMap}>Ver jornada</button><button className="primary-button" onClick={onBoss}>Conhecer o chefão <Crown size={18} /></button></div>
    </div>
  );
}

function BossScreen({ complete, onComplete, go }: { complete: boolean; onComplete: () => void; go: (screen: Screen) => void }) {
  const [stage, setStage] = useState(0);
  const prompts = [
    { kicker: "CENÁRIO REAL", title: "Pedidos urgentes chegam por canais diferentes.", copy: "Expedição recebe mudanças tarde. Estoque separa o pedido errado. Comercial fica sem retorno.", choices: ["O problema é falta de um canal claro e de contexto.", "O problema é só a quantidade de pedidos.", "O problema é o horário de trabalho."], correct: 0 },
    { kicker: "ESCOLHA O SINAL", title: "O que você acompanharia primeiro?", copy: "Uma boa melhoria precisa deixar um rastro simples de evolução.", choices: ["Tempo entre a mudança e a confirmação das áreas.", "Quantidade de e-mails enviados.", "Quem falou mais mensagens."], correct: 0 },
    { kicker: "FAÇA A MUDANÇA", title: "Qual solução testa primeiro?", copy: "Pense em algo que as áreas consigam usar amanhã, sem complicar.", choices: ["Canal único + template de atualização + confirmação.", "Criar mais uma planilha sem combinar o uso.", "Enviar uma mensagem diferente para cada pessoa."], correct: 0 },
  ];
  const [selection, setSelection] = useState<number | null>(null);
  const prompt = prompts[stage];
  if (complete) return <div className="boss-complete"><div className="boss-crown"><Crown size={60} fill="currentColor" /></div><span className="eyebrow">CHEFÃO SUPERADO</span><h1>Processo mais claro.<br /><em>Time mais leve.</em></h1><p>Você aplicou conexão, dados e melhoria prática em uma situação real.</p><div className="boss-rewards"><span><Zap size={18} fill="currentColor" /> +100 XP</span><span><Coins size={18} fill="currentColor" /> +25 moedas</span></div><button className="primary-button" onClick={() => go("profile")}>Ver minha evolução <ArrowUpRight size={18} /></button></div>;
  return (
    <div className="boss-screen page-width narrow-width">
      <section className="boss-hero"><div className="boss-crown-mini"><Crown size={25} fill="currentColor" /></div><div><span className="eyebrow">CHEFÃO • MUNDO 1</span><h1>Melhore um processo real</h1></div><span className="boss-xp"><Zap size={16} fill="currentColor" /> 100 XP</span></section>
      <div className="boss-progress"><span>ETAPA {stage + 1} DE 3</span><ProgressBar value={(stage + 1) * 33} /></div>
      <section className="boss-card"><div className="boss-card-visual"><div className="process-card red">Pedido mudou</div><div className="process-arrow">→</div><div className="process-card yellow">Quem viu?</div><div className="process-arrow">→</div><div className="process-card blue">Ação certa</div></div><span className="eyebrow">{prompt.kicker}</span><h2>{prompt.title}</h2><p>{prompt.copy}</p><div className="boss-choices">{prompt.choices.map((choice, index) => <button key={choice} onClick={() => setSelection(index)} className={selection === index ? "selected" : ""}><span>{String.fromCharCode(65 + index)}</span>{choice}</button>)}</div></section>
      <div className="lesson-footer"><span className="boss-tip"><Sparkles size={16} /> Não é prova. É prática.</span><button className="primary-button lesson-check" disabled={selection === null} onClick={() => { if (stage === 2) onComplete(); else { setStage(stage + 1); setSelection(null); } }}>{stage === 2 ? "Concluir chefão" : "Avançar"} <ChevronRight size={19} /></button></div>
    </div>
  );
}

function MissionsScreen({ go, openApplication, applicationRegistered }: { go: (screen: Screen) => void; openApplication: () => void; applicationRegistered: boolean }) {
  return (
    <div className="missions-screen page-width">
      <section className="page-title"><div><span className="eyebrow">SESSÕES CURTAS, IMPACTO REAL</span><h1>Missões</h1><p>Vá no seu ritmo. Sua consistência já está fazendo diferença.</p></div><div className="mission-week-score"><span>SEMANA</span><b>4<span>/5</span></b><small>missões</small></div></section>
      <section className="mission-group"><div className="group-header"><div className="group-icon lime"><Target size={20} /></div><div><h2>Hoje</h2><p>Meta: 50 XP • faltam 15 XP</p></div></div><button className="mission-row completed"><span className="mission-check"><Check size={16} /></span><span><b>Faça 1 lição</b><small>Mensagem que funciona</small></span><span className="row-xp">+30 XP</span></button><button className="mission-row" onClick={() => go("lesson")}><span className="mission-circle" /><span><b>Ganhe 50 XP</b><small>Você está a 15 XP de fechar</small></span><span className="row-xp">+20 XP</span><ChevronRight size={18} /></button><button className="mission-row"><span className="mission-circle" /><span><b>Complete sem erro</b><small>Uma atividade perfeita</small></span><span className="row-xp">+15 XP</span><ChevronRight size={18} /></button></section>
      <section className="mission-group weekly"><div className="group-header"><div className="group-icon purple"><Rocket size={20} /></div><div><h2>Esta semana</h2><p>Pequenos passos viram novas rotinas.</p></div></div><button className={`apply-mission ${applicationRegistered ? "completed" : ""}`} onClick={openApplication}><div className="apply-mission-icon"><BriefcaseBusiness size={24} /></div><div><span className="eyebrow">MISSÃO PRÁTICA</span><h3>{applicationRegistered ? "Aplicação registrada!" : "Aplique no trabalho"}</h3><p>{applicationRegistered ? "A Nova já adicionou seu XP extra." : "Registre uma melhoria que você testou."}</p><span className="reward-chip"><Zap size={14} fill="currentColor" /> +80 XP</span></div>{applicationRegistered ? <CircleCheck size={24} /> : <ChevronRight size={22} />}</button><button className="mission-row" onClick={() => go("team")}><span className="mission-circle" /><span><b>Compartilhe uma boa prática</b><small>Ajude alguém do time a avançar</small></span><span className="row-xp">+30 XP</span><ChevronRight size={18} /></button><button className="mission-row"><span className="mission-circle" /><span><b>Mantenha a sequência</b><small>Faça uma sessão amanhã</small></span><span className="row-xp">+20 XP</span><ChevronRight size={18} /></button></section>
    </div>
  );
}

function StoreScreen({ coins, purchased, purchase }: { coins: number; purchased: string[]; purchase: (name: string) => void }) {
  const rewards = [
    { name: "Congelar sequência", cost: 80, icon: "❄", color: "blue", desc: "Um respiro sem perder o ritmo." },
    { name: "Dobro de XP", cost: 120, icon: "⚡", color: "yellow", desc: "Ative em uma missão especial." },
    { name: "Tema Aurora", cost: 180, icon: "✦", color: "purple", desc: "Um visual novo para sua jornada." },
    { name: "Visor Coral", cost: 220, icon: "◖", color: "coral", desc: "Um item raro para a Nova." },
  ];
  return (
    <div className="store-screen page-width">
      <section className="store-hero"><div><span className="eyebrow">RECOMPENSAS VIRTUAIS</span><h1>Loja da jornada</h1><p>Use suas moedas para deixar a experiência ainda mais sua.</p></div><div className="coin-balance"><Coins size={25} fill="currentColor" /><div><span>SEU SALDO</span><b>{coins}</b></div></div></section>
      <div className="nova-shop-note"><TinyMascot size="small" /><p><b>Dica da Nova:</b> suas moedas são conquistadas em missões e aplicações. Aqui não entra dinheiro real.</p></div>
      <section className="reward-grid">{rewards.map((reward) => { const isPurchased = purchased.includes(reward.name); return <article className={`reward-card ${reward.color}`} key={reward.name}><div className="reward-card-top"><div className="reward-symbol">{reward.icon}</div><span className="limited-tag">VIRTUAL</span></div><h2>{reward.name}</h2><p>{reward.desc}</p><button disabled={isPurchased || coins < reward.cost} onClick={() => purchase(reward.name)}>{isPurchased ? <><Check size={16} /> Resgatado</> : <><Coins size={16} fill="currentColor" /> {reward.cost}</>}</button></article>; })}</section>
      <div className="store-footnote"><Gift size={18} /><span>Mais itens aparecem conforme você evolui. Sem punição, sem pressão.</span></div>
    </div>
  );
}

function TeamScreen({ go }: { go: (screen: Screen) => void }) {
  const members = [
    ["A", "Ana", "420 XP", "Fechou 2 missões"],
    ["R", "Ravi", "380 XP", "Compartilhou uma boa prática"],
    ["M", "Marina", "315 XP", "Você está aqui"],
    ["J", "João", "260 XP", "Começou IA na Prática"],
  ];
  return (
    <div className="team-screen page-width">
      <section className="team-hero"><div className="team-orbits"><span>✦</span><span>✦</span><span>✦</span></div><div><span className="eyebrow">DESAFIO COLETIVO • LOGÍSTICA</span><h1>Todo mundo avança<br /><em>quando o time avança.</em></h1><p>O ranking aqui é de parceria: cada XP aproxima a equipe da meta semanal.</p></div><div className="team-goal"><div><b>78%</b><span>concluído</span></div><ProgressBar value={78} /><p>Faltam <b>240 XP</b> para completar o desafio.</p></div></section>
      <section className="team-challenge"><div className="challenge-icon"><UsersRound size={28} /></div><div><span className="eyebrow">DESAFIO DA SEMANA</span><h2>Compartilhe uma melhoria que poupa tempo.</h2><p>Quando 6 pessoas participarem, o time desbloqueia o badge <b>Conexão que Resolve</b>.</p></div><button className="secondary-button" onClick={() => go("missions")}>Ver missões</button></section>
      <section className="team-list"><div className="section-heading"><div><span className="eyebrow">CELEBRE QUEM AVANÇOU</span><h2>Movimento do time</h2></div><span className="team-list-label">esta semana</span></div>{members.map(([initial, name, score, note], index) => <article className={`member-row ${name === "Marina" ? "you" : ""}`} key={name}><span className="member-place">{index + 1}</span><span className={`member-avatar avatar-${initial.toLowerCase()}`}>{initial}</span><span className="member-copy"><b>{name}</b><small>{note}</small></span><span className="member-score"><Zap size={14} fill="currentColor" /> {score}</span></article>)}</section>
      <p className="team-note"><HeartHandshake size={17} /> Comparação saudável: esta tela mostra contribuição e apoio, não competição entre departamentos.</p>
    </div>
  );
}

function ProfileScreen({ xp, streak, applicationRegistered, go, openApplication }: { xp: number; streak: number; applicationRegistered: boolean; go: (screen: Screen) => void; openApplication: () => void }) {
  const badges = [
    ["🌱", "Primeiro Passo", true], ["🔥", "Em Chamas", true], ["💬", "Comunicador", true], ["🤝", "Conector", true], ["🛠", "Mão na Massa", applicationRegistered], ["🤖", "Mestre da IA", false],
  ];
  return (
    <div className="profile-screen page-width">
      <section className="profile-hero"><div className="profile-person"><div className="avatar avatar-marina large">M</div><div><span className="eyebrow">NÍVEL 3</span><h1>Marina Alves</h1><p>Aplicadora Digital</p></div></div><button className="profile-settings" onClick={() => go("admin")} aria-label="Ver painel administrativo"><Settings2 size={19} /></button><div className="profile-level-progress"><div><span>Rumo ao nível 4</span><b>{xp} / 800 XP</b></div><ProgressBar value={Math.min(100, xp / 8)} /><small>Para virar Especialista, aplique 2 skills no trabalho.</small></div></section>
      <section className="profile-stats"><div><Zap size={20} fill="currentColor" /><b>{xp}</b><span>XP total</span></div><div><Flame size={20} fill="currentColor" /><b>{streak}</b><span>dias de sequência</span></div><div><Medal size={20} fill="currentColor" /><b>{applicationRegistered ? 6 : 5}</b><span>badges</span></div><div><BriefcaseBusiness size={20} /><b>{applicationRegistered ? 2 : 1}</b><span>aplicações reais</span></div></section>
      <section className="profile-section"><div className="section-heading"><div><span className="eyebrow">SUA EVOLUÇÃO</span><h2>Jornada em movimento</h2></div><span className="completion-tag">18% concluída</span></div><div className="evolution-card"><div className="evolution-line"><span className="initial">3,85</span><i /><span className="future">4,00</span></div><div><span>Maturidade digital</span><b>Seu avanço está ligado a ações práticas.</b><p>Conexão em Equipe: 2 de 6 missões • IA na Prática está esperando você.</p></div><button onClick={() => go("map")}><MapIcon size={18} /> Jornada</button></div></section>
      <section className="profile-section"><div className="section-heading"><div><span className="eyebrow">CONQUISTAS</span><h2>Seu mural</h2></div><button className="link-button">Ver todas <ArrowUpRight size={16} /></button></div><div className="badge-grid">{badges.map(([icon, name, unlocked]) => <div key={String(name)} className={`profile-badge ${unlocked ? "unlocked" : "locked"}`}><span>{icon}</span><b>{name}</b>{!unlocked ? <small><Lock size={11} /> em breve</small> : null}</div>)}</div></section>
      <section className="profile-section"><div className="apply-profile"><div className="apply-icon"><BriefcaseBusiness size={21} /></div><div><span className="eyebrow">IMPACTO NO TRABALHO</span><h2>{applicationRegistered ? "Sua aplicação foi registrada" : "Transforme prática em XP"}</h2><p>{applicationRegistered ? "Você registrou uma melhoria. Boa! Esse tipo de passo muda a rotina." : "Conte uma mudança que você testou e registre o resultado percebido."}</p></div><button className="primary-button" onClick={openApplication}>{applicationRegistered ? "Registrar outra" : "Apliquei no trabalho"} <Plus size={17} /></button></div></section>
    </div>
  );
}

function AdminScreen({ go }: { go: (screen: Screen) => void }) {
  const metrics: Array<[string, string, typeof UsersRound, string]> = [
    ["82", "pessoas mapeadas", UsersRound, "blue"], ["74%", "usuários ativos", Activity, "lime"], ["438", "lições concluídas", CircleCheck, "purple"], ["37", "aplicações reais", BriefcaseBusiness, "coral"],
  ];
  return (
    <div className="admin-screen page-width">
      <section className="admin-head"><div><button className="back-to-app" onClick={() => go("map")}><ChevronLeft size={18} /> Voltar ao app</button><span className="eyebrow">VISÃO DE LIDERANÇA</span><h1>Progresso que aparece<br /><em>no trabalho.</em></h1><p>Uma leitura simples para acompanhar adesão, prática e evolução de maturidade digital.</p></div><div className="admin-period"><span>PERÍODO</span><b>Setembro 2026</b><ChevronRight size={16} /></div></section>
      <section className="metric-grid">{metrics.map(([value, label, Icon, color]) => { const MetricIcon = Icon as typeof UsersRound; return <article key={String(label)} className={`metric-card ${color}`}><div className="metric-icon"><MetricIcon size={20} /></div><b>{value}</b><span>{label}</span><small><ArrowUpRight size={13} /> vs. última semana</small></article>; })}</section>
      <section className="admin-insights-grid"><article className="maturity-card"><div className="section-heading"><div><span className="eyebrow">INDICADOR PRINCIPAL</span><h2>Maturidade digital</h2></div><span className="up-chip"><ArrowUpRight size={14} /> +0,22</span></div><div className="maturity-score"><div><span>INICIAL</span><b>3,85</b></div><div className="score-arrow">→</div><div><span>NOVA AVALIAÇÃO</span><b>4,07</b></div><div className="maturity-dots"><i /><i /><i /><i /><i /></div></div><p>O avanço vem de prática contínua, não só de conclusão de conteúdo.</p></article><article className="trail-chart-card"><div className="section-heading"><div><span className="eyebrow">CONCLUSÃO POR TRILHA</span><h2>Onde o time evoluiu</h2></div><button className="chart-dots">•••</button></div><div className="horizontal-bars"><div><span>Conexão em Equipe</span><i><b style={{ width: "72%" }} /></i><strong>72%</strong></div><div><span>IA na Prática</span><i><b style={{ width: "58%" }} /></i><strong>58%</strong></div><div><span>Decisão por Dados</span><i><b style={{ width: "44%" }} /></i><strong>44%</strong></div><div><span>Aprender a Aprender</span><i><b style={{ width: "39%" }} /></i><strong>39%</strong></div></div></article></section>
      <section className="admin-insights-grid secondary"><article className="sector-card"><div className="section-heading"><div><span className="eyebrow">FOCO POR ÁREA</span><h2>Onde apoiar agora</h2></div></div><div className="sector-list"><div><span className="sector-dot coral" /><b>Estoque</b><small>Aprendizagem contínua</small><strong>2,00 → 4,00</strong></div><div><span className="sector-dot yellow" /><b>Expedição</b><small>Dados + produtividade</small><strong>2,33 → 4,00</strong></div><div><span className="sector-dot purple" /><b>Logística</b><small>IA aplicada</small><strong>2,23 → 4,00</strong></div></div></article><article className="impact-card"><span className="eyebrow">APRENDIZADO QUE VIRA AÇÃO</span><h2>37 aplicações práticas registradas</h2><p>As melhorias mais recorrentes envolvem padronização de comunicação, qualidade de registros e uso responsável de IA.</p><button className="secondary-button" onClick={() => go("team")}>Ver desafio coletivo <ArrowUpRight size={16} /></button></article></section>
      <section className="admin-note"><Database size={19} /><div><b>Leitura recomendada:</b> combine esta visão com uma nova avaliação de maturidade e com evidências de redução de retrabalho no dia a dia.</div></section>
    </div>
  );
}

function ApplicationModal({ open, close, success, submit }: { open: boolean; close: () => void; success: boolean; submit: (event: React.FormEvent<HTMLFormElement>) => void }) {
  return <AnimatePresence>{open ? <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div className="application-modal" initial={{ opacity: 0, y: 18, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.97 }} transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}>{success ? <div className="application-success"><button className="modal-close" onClick={close} aria-label="Fechar"><X size={20} /></button><div className="apply-success-icon"><CircleCheck size={48} /></div><span className="eyebrow">REGISTRO ENVIADO</span><h2>É assim que a mudança ganha força.</h2><p>Você recebeu <b>+80 XP</b> e <b>+20 moedas</b> por colocar uma skill em prática. A liderança pode usar seu registro como evidência de evolução.</p><button className="primary-button wide" onClick={close}>Voltar para a jornada <Rocket size={18} /></button></div> : <><button className="modal-close" onClick={close} aria-label="Fechar"><X size={20} /></button><div className="modal-heading"><div className="apply-icon"><BriefcaseBusiness size={21} /></div><div><span className="eyebrow">MISSÃO PRÁTICA</span><h2>Apliquei no trabalho</h2></div></div><p className="modal-subcopy">Leva menos de um minuto. Conte uma pequena melhoria — isso também é evoluir.</p><form onSubmit={submit}><label>O que você aplicou?<textarea required placeholder="Ex.: Criei um canal único para atualizações de pedido." /></label><label>Onde aconteceu?<input required placeholder="Ex.: Expedição e Estoque" /></label><label>Qual resultado você percebeu?<textarea required placeholder="Ex.: Menos dúvidas e confirmações mais rápidas." /></label><div className="modal-footer"><span><Zap size={16} fill="currentColor" /> Vale <b>+80 XP</b></span><button type="submit" className="primary-button">Registrar aplicação <Send size={17} /></button></div></form></>}</motion.div></motion.div> : null}</AnimatePresence>;
}
