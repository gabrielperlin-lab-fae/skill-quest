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
  { id: "map", label: "Temporada", icon: MapIcon },
  { id: "missions", label: "Treinos", icon: Target },
  { id: "store", label: "Equipamentos", icon: ShoppingBag },
  { id: "profile", label: "Perfil", icon: Star },
];

const trails = [
  {
    name: "Conexão em Equipe",
    subtitle: "Jogue junto. Retrabalhe menos.",
    icon: "🤝",
    color: "blue",
    progress: "2 / 6",
    status: "Em andamento",
  },
  {
    name: "Tecnologia na Prática",
    subtitle: "Use tecnologia para ganhar performance.",
    icon: "✦",
    color: "purple",
    progress: "0 / 6",
    status: "Próxima recomendada",
  },
  {
    name: "Decisão por Dados",
    subtitle: "Transforme dados em movimento.",
    icon: "◔",
    color: "yellow",
    progress: "0 / 6",
    status: "Disponível",
  },
  {
    name: "Aprender a Aprender",
    subtitle: "Evolua no ritmo da sua performance.",
    icon: "◒",
    color: "orange",
    progress: "0 / 5",
    status: "Disponível",
  },
  {
    name: "Turbo Produtividade",
    subtitle: "Acelere o que pesa.",
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

const rewards = [
  { id: "freeze", name: "Protetor de sequência", cost: 80, icon: "❄", color: "blue", desc: "Protege seu ritmo em um dia de pausa.", stock: 8 },
  { id: "double", name: "Boost de XP", cost: 120, icon: "⚡", color: "yellow", desc: "2x XP no seu próximo desafio.", stock: 4 },
  { id: "aurora", name: "Kit Aurora", cost: 180, icon: "✦", color: "purple", desc: "Um visual exclusivo para sua temporada.", stock: 2 },
  { id: "visor", name: "Visor Coral", cost: 220, icon: "◖", color: "coral", desc: "Equipamento raro para quem está na elite.", stock: 0 },
];

const publicAsset = (path: string) => `${import.meta.env.BASE_URL}${path.replace(/^\/+/, "")}`;

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
    <button className={`brand ${compact ? "brand-compact" : ""}`} onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="BRW Sports Group — Skill Quest">
      <img className="brand-logo-img" src={publicAsset("brw-sports-group-official-logo.webp")} alt="BRW Sports Group" />
      <span className="brand-divider" />
      <span className="brand-product">skill<span>quest</span></span>
      <span className="brand-divider brand-fae-divider" />
      <img className="brand-fae-logo" src={publicAsset("fae-business-logo.png")} alt="FAE Business School" />
    </button>
  );
}

function TinyMascot({ size = "medium", className = "" }: { size?: "small" | "medium" | "large"; className?: string }) {
  return <img className={`sports-micro-image sports-micro-${size} ${className}`} src={publicAsset("brw-sports-hero.png")} alt="Atleta em movimento representando esporte e performance" />;
}

function TopBar({
  screen,
  setScreen,
  xp,
  coins,
  streak,
  home,
}: {
  screen: Screen;
  setScreen: (screen: Screen) => void;
  xp: number;
  coins: number;
  streak: number;
  home: () => void;
}) {
  const hasBack = screen !== "onboarding";
  return (
    <header className="topbar">
      <div className="topbar-inner">
        <div className="topbar-left">
          {hasBack ? (
            <button className="icon-button home-button" onClick={home} aria-label="Voltar para a página inicial" title="Voltar para a página inicial"><HomeIcon size={19} /></button>
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
  const [screen, setScreen] = useState<Screen>(() => typeof window !== "undefined" && window.localStorage.getItem("skillquest-onboarding-seen") === "1" ? "home" : "onboarding");
  const [onboardingStep, setOnboardingStep] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
  const [answerCorrect, setAnswerCorrect] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [xp, setXp] = useState(35);
  const [coins, setCoins] = useState(124);
  const [streak] = useState(5);
  const [applicationOpen, setApplicationOpen] = useState(false);
  const [applicationSent, setApplicationSent] = useState(false);
  const [applicationRegistered, setApplicationRegistered] = useState(false);
  const [bossComplete, setBossComplete] = useState(false);
  const [purchased, setPurchased] = useState<string[]>([]);
  const [redeemed, setRedeemed] = useState<string[]>([]);
  const [stockById, setStockById] = useState<Record<string, number>>(() => Object.fromEntries(rewards.map((reward) => [reward.id, reward.stock])));
  const [pendingReward, setPendingReward] = useState<typeof rewards[number] | null>(null);
  const [redeemSuccess, setRedeemSuccess] = useState(false);

  const go = (next: Screen) => {
    setScreen(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };
  const returnToStart = () => {
    setOnboardingStep(0);
    setScreen("onboarding");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const chooseAnswer = (id: string) => {
    setSelectedAnswer(id);
  };

  const checkAnswer = () => {
    const isCorrect = selectedAnswer === "teams";
    setAnswerCorrect(isCorrect);
    setAttempts((current) => current + 1);
    if (isCorrect) {
      setXp((current) => current + 30);
      setCoins((current) => current + 5);
    }
    go("feedback");
  };

  const submitApplication = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setApplicationSent(true);
    setApplicationRegistered(true);
    setXp((current) => current + 80);
    setCoins((current) => current + 25);
  };

  const requestPurchase = (reward: typeof rewards[number]) => {
    if (!purchased.includes(reward.id) && stockById[reward.id] > 0 && coins >= reward.cost) {
      setPendingReward(reward);
      setRedeemSuccess(false);
    }
  };

  const confirmPurchase = () => {
    if (!pendingReward || purchased.includes(pendingReward.id) || stockById[pendingReward.id] <= 0 || coins < pendingReward.cost) return;
    setCoins((current) => current - pendingReward.cost);
    setStockById((current) => ({ ...current, [pendingReward.id]: current[pendingReward.id] - 1 }));
    setPurchased((items) => [...items, pendingReward.id]);
    setRedeemed((items) => [pendingReward.id, ...items]);
    setRedeemSuccess(true);
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
    store: <StoreScreen coins={coins} purchased={purchased} redeemed={redeemed} stockById={stockById} requestPurchase={requestPurchase} />, 
    team: <TeamScreen go={go} />, 
    profile: <ProfileScreen xp={xp} coins={coins} streak={streak} applicationRegistered={applicationRegistered} go={go} openApplication={openApplication} reviewOnboarding={() => { setOnboardingStep(0); go("onboarding"); }} />, 
    admin: <AdminScreen go={go} />, 
  };

  return (
    <main className="app-canvas">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <section className={`app-shell ${screen === "onboarding" ? "onboarding-shell" : ""}`}>
        {screen === "onboarding" ? (
          <Onboarding step={onboardingStep} setStep={setOnboardingStep} onFinish={() => { window.localStorage.setItem("skillquest-onboarding-seen", "1"); go("home"); }} />
        ) : (
          <>
            <TopBar screen={screen} setScreen={go} xp={xp} coins={coins} streak={streak} home={returnToStart} />
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
                  <FeedbackScreen correct={answerCorrect} attempts={attempts} onRetry={() => { setSelectedAnswer(null); go("lesson"); }} onNext={() => go("badge")} />
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
      <RewardModal reward={pendingReward} success={redeemSuccess} coins={coins} close={() => { setPendingReward(null); setRedeemSuccess(false); }} confirm={confirmPurchase} goToStore={() => { setPendingReward(null); setRedeemSuccess(false); go("store"); }} />
    </main>
  );
}

function Onboarding({ step, setStep, onFinish }: { step: number; setStep: (step: number) => void; onFinish: () => void }) {
  const steps = [
    {
      eyebrow: "BEM-VINDA À SKILL QUEST",
      title: <>Eleve sua performance,<br /><em>uma missão por vez.</em></>,
      copy: "Complete desafios rápidos, ganhe ritmo e leve novas habilidades para a sua performance no trabalho.",
      pill: "Seu próximo resultado começa aqui",
    },
    {
      eyebrow: "TREINE E EVOLUA",
      title: <>XP, pontos e sequência:<br /><em>cada um tem um papel.</em></>,
      copy: "XP faz você subir de nível. Pontos viram recompensas. A sequência mostra sua consistência.",
      pill: "⭐ XP  ·  🪙 Pontos  ·  🔥 Sequência",
    },
    {
      eyebrow: "PRONTO PARA COMEÇAR?",
      title: <>Sua primeira missão<br /><em>começa agora.</em></>,
      copy: "Cada missão leva poucos minutos. Você entra em campo, recebe feedback e avança pela sua jornada de performance.",
      pill: "Performance que sai do treino e vira resultado.",
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
          <div className="sports-hero-frame">
            <img
              className="sports-hero-image"
              src={publicAsset("brw-sports-hero.png")}
              alt="Atleta em movimento representando esporte, performance e inovação da BRW Sports Group"
            />
            <div className="sports-hero-overlay" aria-hidden="true" />
          </div>
        </div>
      </div>
      <div className="onboarding-footer">Performance que sai do treino e vira resultado.</div>
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
          <div className="greeting-row"><div className="avatar avatar-marina">M</div><div><span className="eyebrow">CENTRO DE TREINAMENTO • TERÇA, 2 DE SETEMBRO</span><h1>Pronta para treinar, Marina? <span>✦</span></h1></div></div>
          <div className="level-line"><span className="level-dot">4</span><b>Atleta</b><span>•</span><span>faltam 80 pontos para o nível Performance</span></div>
        </div>
        <div className="hero-streak-card" onClick={() => go("missions")} role="button" tabIndex={0}><Flame size={26} fill="currentColor" /><div><strong>{streak} dias</strong><span>em sequência</span></div></div>
      </section>

      <section className="training-command-center">
        <div className="training-copy"><span className="eyebrow">SEU TREINO DE HOJE</span><div className="training-title"><span className="training-target"><Target size={25} /></span><div><h2>Desafio de Comunicação</h2><p>Organize contexto, responsável e prazo para o seu time.</p></div></div><div className="training-meta"><span><Zap size={15} fill="currentColor" /> +30 pontos</span><span><Activity size={15} /> 5 minutos</span><span><Trophy size={15} /> Treino 03 de 06</span></div></div>
        <div className="training-action"><div className="training-score"><span>EVOLUÇÃO DO DIA</span><b>{xp}<small>/ 50</small></b><ProgressBar value={70} /></div><button className="primary-button" onClick={() => go("lesson")}>Começar treino <Play size={17} fill="currentColor" /></button></div>
      </section>

      <section className="evolution-panel"><div><span className="eyebrow">SUA EVOLUÇÃO</span><h2>Nível 04 <span>→</span> 05</h2><p>Atleta <b>→</b> Performance</p></div><div className="evolution-progress"><ProgressBar value={78} /><span>78% • faltam 80 pontos</span></div><div className="medal-count"><Medal size={21} /><div><b>3 medalhas</b><span>na temporada</span></div></div></section>

      <section className="continue-section"><div className="section-heading"><div><span className="eyebrow">TEMPORADA 01 • PERFORMANCE DIGITAL</span><h2>Próximos treinos</h2></div><button onClick={() => go("map")} className="link-button">Ver temporada <ArrowUpRight size={16} /></button></div>
        <div className="mission-hero"><div className="mission-tile-icon"><MessageSquare size={28} /></div><div className="mission-main"><span className="trail-label blue">TREINO 01 • CONEXÃO EM EQUIPE</span><h3>Como escrever mensagens claras</h3><p>Treine uma comunicação que acelera decisões.</p><div className="mission-rewards"><span><Activity size={15} /> 5 min</span><span className="reward-xp"><Zap size={15} fill="currentColor" /> +30 pontos</span><span className="reward-coin"><Coins size={15} fill="currentColor" /> +5 moedas</span></div></div><button className="continue-button" onClick={() => go("lesson")}><Play size={22} fill="currentColor" /><span>Começar treino</span></button><div className="mission-pattern">✦</div></div>
      </section>

      <section className="home-grid"><button className="daily-mission-card" onClick={() => go("missions")}><div className="card-icon lime"><Target size={21} /></div><div><span className="eyebrow">PLANO DIÁRIO</span><h3>Ganhe 50 pontos hoje</h3><p>2 de 3 treinos concluídos</p></div><ChevronRight size={20} /></button><button className="team-card" onClick={() => go("team")}><div className="team-people"><span>J</span><span>A</span><span>R</span></div><div><span className="eyebrow">CLASSIFICAÇÃO DO TIME</span><h3>Você está em #3</h3><p>Faltam 65 pontos para #2.</p></div><ChevronRight size={20} /></button></section>
      <section className="apply-strip"><div className="apply-icon"><BriefcaseBusiness size={20} /></div><div><b>Levou o treino para o jogo?</b><span>Registre a aplicação real e some pontos extras.</span></div><button onClick={openApplication}><Plus size={18} /> Registrar</button></section>
    </div>
  );
}

function MapScreen({ go }: { go: (screen: Screen) => void }) {
  const [expanded, setExpanded] = useState("blue");
  return (
    <div className="map-screen page-width">
      <section className="map-header">
        <div><span className="eyebrow">TEMPORADA 01</span><h1>Arena de evolução</h1><p>Performance Digital • um treino por vez.</p></div>
        <div className="map-total"><span>TEMPORADA</span><b>18%</b><ProgressBar value={18} /></div>
      </section>
      <div className="map-layout">
        <section className="journey-path" aria-label="Arena de treinos da temporada">
          <div className="path-spark spark-a">✦</div><div className="path-spark spark-b">✦</div>
          <div className="world-label blue"><span>01</span><div><b>CONEXÃO EM EQUIPE</b><small>2 de 6 desafios</small></div></div>
          <div className="path-line blue-line" />
          <button className="map-node node-done node-one" onClick={() => go("lesson")} aria-label="Escolha seu canal, concluída"><Check size={22} /></button>
          <button className="map-node node-done node-two" onClick={() => go("lesson")} aria-label="Contexto que resolve, concluída"><Check size={22} /></button>
          <button className="map-node node-current node-three" onClick={() => go("lesson")} aria-label="Como escrever mensagens claras, missão atual"><MessageSquare size={23} /><span className="node-tooltip">Como escrever mensagens claras <ChevronRight size={13} /></span></button>
          <button className="map-node node-lock node-four" disabled aria-label="Próxima missão bloqueada"><Lock size={18} /><span className="node-tooltip">Complete esta missão para desbloquear a próxima</span></button>
          <button className="map-node node-boss node-five" onClick={() => go("boss")} aria-label="Chefão: melhore um processo real"><Crown size={24} /><span>CHEFÃO</span></button>
          <div className="world-banner blue"><div className="world-banner-icon">🤝</div><div><span>TREINO 01 · DESAFIO ATUAL</span><b>Como escrever mensagens claras</b></div><button onClick={() => go("lesson")}>Treinar <Play size={14} fill="currentColor" /></button></div>
        </section>
        <aside className="world-list">
          <span className="eyebrow">TODOS OS TREINOS</span>
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
  const [showHint, setShowHint] = useState(false);
  return (
    <div className="lesson-screen page-width narrow-width">
      <div className="lesson-topline"><button className="icon-button" onClick={() => go("map")} aria-label="Voltar ao mapa"><X size={20} /></button><div className="lesson-progress"><ProgressBar value={42} /><span>2 / 6</span></div><button className="sound-toggle" aria-label="Som ligado">◖))</button></div>
      <section className="lesson-card">
        <div className="lesson-kind"><MessageSquare size={16} /> DECISÃO RÁPIDA <span>•</span> 6 MIN</div>
        <div className="lesson-visual"><div className="visual-ring" /><div className="chat-bubble bubble-one">Pessoal, o pedido 7842 mudou de prioridade.</div><div className="chat-bubble bubble-two">Qual canal garante que ninguém perca essa mudança?</div><div className="visual-avatar avatar-a">R</div><div className="visual-avatar avatar-b">M</div></div>
        <h1>Você precisa avisar Expedição, Estoque e Comercial que o pedido 7842 mudou de prioridade. Qual canal comunica melhor?</h1>
        <p className="lesson-helper">Escolha o canal que deixa contexto, ação esperada e histórico visíveis para as três áreas.</p>
        <button className="hint-button" onClick={() => setShowHint((value) => !value)}><Sparkles size={15} /> {showHint ? "Dica exibida" : "Ver dica"}</button>
        {showHint ? <p className="hint-copy">Pense em alcance e rastreabilidade: a melhor opção permite que todos acompanhem e confirmem a mudança.</p> : null}
        <div className="answer-grid">
          {lessonOptions.map((option) => <button key={option.id} onClick={() => chooseAnswer(option.id)} className={`answer-option ${selectedAnswer === option.id ? "selected" : ""}`}><span className="answer-emoji">{option.icon}</span><span><b>{option.label}</b><small>{option.detail}</small></span><span className="answer-radio" /></button>)}
        </div>
      </section>
      <div className="lesson-footer"><span><Zap size={16} fill="currentColor" /> Vale <b>+30 XP</b></span><button className="primary-button lesson-check" disabled={!selectedAnswer} onClick={checkAnswer}>Conferir <ChevronRight size={19} /></button></div>
    </div>
  );
}

function FeedbackScreen({ correct, attempts, onRetry, onNext }: { correct: boolean; attempts: number; onRetry: () => void; onNext: () => void }) {
  return (
    <div className={`feedback-screen ${correct ? "success" : "retry"}`}>
      {correct ? <div className="confetti" aria-hidden="true"><i /><i /><i /><i /><i /><i /><i /><i /></div> : null}
      <div className="feedback-card">
        <div className="feedback-graphic">{correct ? <><div className="success-burst">✦</div><CircleCheck size={64} strokeWidth={2.2} /></> : <><div className="retry-burst">?</div><Undo2 size={58} strokeWidth={2.1} /></>}</div>
        <span className="eyebrow">{correct ? "RESPOSTA CERTA" : attempts === 1 ? "PRIMEIRO ERRO" : "VAMOS ENTENDER"}</span>
        <h1>{correct ? "Mandou bem!" : attempts === 1 ? "Quase!" : "Vamos entender."}</h1>
        <p>{correct ? "O canal do time deixa o pedido visível, registra o contexto e permite confirmação entre áreas." : attempts === 1 ? "Uma boa mensagem precisa ser vista pelas pessoas certas e manter um histórico do combinado." : "A alternativa B é melhor porque alcança as áreas envolvidas e mantém a mudança disponível para consulta e confirmação."}</p>
        {!correct && attempts === 1 ? <div className="hint-feedback"><Sparkles size={18} /><div><b>Dica</b><span>Procure um canal em que todos consigam ver o contexto e confirmar a mudança.</span></div></div> : null}
        {correct ? <div className="earned-row"><span><Zap size={17} fill="currentColor" /> +30 XP</span><span><Coins size={17} fill="currentColor" /> +5 pontos</span></div> : null}
        <button className="primary-button wide" onClick={correct ? onNext : attempts === 1 ? onRetry : onNext}>{correct ? "Próxima lição" : attempts === 1 ? "Tentar novamente" : "Continuar"} <ChevronRight size={20} /></button>
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
      <section className="mission-group"><div className="group-header"><div className="group-icon lime"><Target size={20} /></div><div><h2>Hoje</h2><p>Complete 2 missões • faltam 15 XP</p></div></div><button className="mission-row completed"><span className="mission-check"><Check size={16} /></span><span><b>Como escrever mensagens claras</b><small>Aprenda contexto, responsável e prazo</small></span><span className="row-xp">+30 XP · +5 pts</span></button><button className="mission-row" onClick={() => go("lesson")}><span className="mission-circle" /><span><b>Como criar um bom prompt</b><small>Aprenda contexto, tarefa e formato</small></span><span className="row-xp">+30 XP · +8 pts</span><ChevronRight size={18} /></button><button className="mission-row"><span className="mission-circle" /><span><b>Aplicar uma skill no trabalho</b><small>Registre uma melhoria real</small></span><span className="row-xp">+80 XP · +25 pts</span><ChevronRight size={18} /></button></section>
      <section className="mission-group weekly"><div className="group-header"><div className="group-icon purple"><Rocket size={20} /></div><div><h2>Esta semana</h2><p>Pequenos passos viram novas rotinas.</p></div></div><button className={`apply-mission ${applicationRegistered ? "completed" : ""}`} onClick={openApplication}><div className="apply-mission-icon"><BriefcaseBusiness size={24} /></div><div><span className="eyebrow">MISSÃO PRÁTICA</span><h3>{applicationRegistered ? "Aplicação registrada!" : "Aplique no trabalho"}</h3><p>{applicationRegistered ? "A Nova já adicionou seu XP extra." : "Registre uma melhoria que você testou."}</p><span className="reward-chip"><Zap size={14} fill="currentColor" /> +80 XP</span></div>{applicationRegistered ? <CircleCheck size={24} /> : <ChevronRight size={22} />}</button><button className="mission-row" onClick={() => go("team")}><span className="mission-circle" /><span><b>Compartilhe uma boa prática</b><small>Ajude alguém do time a avançar</small></span><span className="row-xp">+30 XP</span><ChevronRight size={18} /></button><button className="mission-row"><span className="mission-circle" /><span><b>Mantenha a sequência</b><small>Faça uma sessão amanhã</small></span><span className="row-xp">+20 XP</span><ChevronRight size={18} /></button></section>
    </div>
  );
}

function StoreScreen({ coins, purchased, redeemed, stockById, requestPurchase }: { coins: number; purchased: string[]; redeemed: string[]; stockById: Record<string, number>; requestPurchase: (reward: typeof rewards[number]) => void }) {
  return (
    <div className="store-screen page-width">
      <section className="store-hero"><div><span className="eyebrow">🎽 EQUIPAMENTOS</span><h1>Equipamentos</h1><p>Use suas moedas para ativar boosts que protegem e aceleram seu treino.</p></div><div className="coin-balance"><Coins size={25} fill="currentColor" /><div><span>SEU SALDO EM PONTOS</span><b>{coins}</b></div></div></section>
      <div className="nova-shop-note"><TinyMascot size="small" /><p><b>Como funciona o equipamento:</b> XP faz você subir de nível. <b>Pontos</b> são o saldo usado nesta loja — e não entram em dinheiro real.</p></div>
      <section className="reward-grid">{rewards.map((reward) => { const isPurchased = purchased.includes(reward.id); const affordable = coins >= reward.cost; const stock = stockById[reward.id] ?? 0; const available = stock > 0; return <article className={`reward-card ${reward.color}`} key={reward.id}><div className="reward-card-top"><div className="reward-symbol">{reward.icon}</div><span className="limited-tag">{!available ? "ESGOTADO" : "ATIVO"}</span></div><h2>{reward.name}</h2><p>{reward.desc}</p><small className="reward-stock">{available ? `${stock} disponíveis` : "Estoque encerrado"}</small><button disabled={isPurchased || !available || !affordable} onClick={() => requestPurchase(reward)}>{isPurchased ? <><Check size={16} /> Resgatado</> : !available ? "Esgotado" : !affordable ? <>Faltam {reward.cost - coins} pontos</> : <><Coins size={16} fill="currentColor" /> {reward.cost} pontos · Resgatar</>}</button></article>; })}</section>
      <section className="redemption-history"><div className="section-heading"><div><span className="eyebrow">MEUS RESGATES</span><h2>O que você já trocou</h2></div></div>{redeemed.length === 0 ? <div className="empty-state"><Gift size={25} /><b>Você ainda não resgatou nenhuma recompensa.</b><span>Complete missões para ganhar pontos.</span></div> : <div className="redemption-list">{redeemed.map((id, index) => { const reward = rewards.find((item) => item.id === id); return reward ? <div className="redemption-row" key={`${id}-${index}`}><span>{reward.icon}</span><div><b>{reward.name}</b><small>{reward.cost} pontos · 02/09/2026</small></div><strong>Entregue ✓</strong></div> : null; })}</div>}</section>
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
      <section className="team-hero"><div className="team-orbits"><span>✦</span><span>✦</span><span>✦</span></div><div><span className="eyebrow">CLASSIFICAÇÃO DA EQUIPE • LOGÍSTICA</span><h1>O placar sobe<br /><em>quando o time treina.</em></h1><p>Uma competição saudável: cada ponto aproxima a equipe da meta da temporada.</p></div><div className="team-goal"><div><b>78%</b><span>da meta</span></div><ProgressBar value={78} /><p>Faltam <b>240 pontos</b> para completar o desafio.</p></div></section>
      <section className="team-challenge"><div className="challenge-icon"><UsersRound size={28} /></div><div><span className="eyebrow">DESAFIO DA SEMANA</span><h2>Compartilhe uma melhoria que poupa tempo.</h2><p>Quando 6 pessoas participarem, o time desbloqueia o badge <b>Conexão que Resolve</b>.</p></div><button className="secondary-button" onClick={() => go("missions")}>Ver missões</button></section>
      <section className="team-list"><div className="section-heading"><div><span className="eyebrow">CLASSIFICAÇÃO</span><h2>Placar do time</h2></div><span className="team-list-label">esta semana</span></div>{members.map(([initial, name, score, note], index) => <article className={`member-row ${name === "Marina" ? "you" : ""}`} key={name}><span className="member-place">{index + 1}</span><span className={`member-avatar avatar-${initial.toLowerCase()}`}>{initial}</span><span className="member-copy"><b>{name}</b><small>{note}</small></span><span className="member-score"><Zap size={14} fill="currentColor" /> {score}</span></article>)}</section>
      <p className="team-note"><HeartHandshake size={17} /> Você está a <b>65 pontos</b> de subir uma posição. Ritmo constante vence a temporada.</p>
    </div>
  );
}

function ProfileScreen({ xp, coins, streak, applicationRegistered, go, openApplication, reviewOnboarding }: { xp: number; coins: number; streak: number; applicationRegistered: boolean; go: (screen: Screen) => void; openApplication: () => void; reviewOnboarding: () => void }) {
  const [helpOpen, setHelpOpen] = useState(false);
  const badges = [
    ["🌱", "Primeiro Passo", true], ["🔥", "Em Chamas", true], ["💬", "Comunicador", true], ["🤝", "Conector", true], ["🛠", "Mão na Massa", applicationRegistered], ["🤖", "Mestre da IA", false],
  ];
  return (
    <div className="profile-screen page-width">
      <section className="profile-hero"><div className="profile-person"><div className="avatar avatar-marina large">M</div><div><span className="eyebrow">NÍVEL 04 • ATLETA</span><h1>Marina Alves</h1><p>Em evolução para Performance</p></div></div><button className="profile-settings" onClick={() => go("admin")} aria-label="Ver painel administrativo"><Settings2 size={19} /></button><div className="profile-level-progress"><div><span>Rumo ao nível 05 • Performance</span><b>{xp} / 800 pontos</b></div><ProgressBar value={Math.min(100, xp / 8)} /><small>Complete desafios e aplique 2 skills no trabalho.</small></div></section>
      <section className="profile-stats"><div><Zap size={20} fill="currentColor" /><b>{xp}</b><span>pontos · sobe de nível</span></div><div><Coins size={20} fill="currentColor" /><b>{coins}</b><span>moedas para equipamentos</span></div><div><Flame size={20} fill="currentColor" /><b>{streak}</b><span>dias de ritmo</span></div><div><Medal size={20} fill="currentColor" /><b>{applicationRegistered ? 6 : 5}</b><span>medalhas</span></div></section>
      <section className="profile-section"><div className="section-heading"><div><span className="eyebrow">SUA EVOLUÇÃO</span><h2>Temporada em movimento</h2></div><span className="completion-tag">18% da temporada</span></div><div className="evolution-card"><div className="evolution-line"><span className="initial">3,85</span><i /><span className="future">4,00</span></div><div><span>Maturidade digital</span><b>Seu avanço está ligado a ações práticas.</b><p>Conexão em Equipe: 2 de 6 desafios • IA na Prática está esperando você.</p></div><button onClick={() => go("map")}><MapIcon size={18} /> Temporada</button></div></section>
      <section className="profile-section help-section"><button className="help-toggle" onClick={() => setHelpOpen((value) => !value)}><span className="help-icon">?</span><span><b>Como funciona?</b><small>Veja como XP, pontos e sequência se conectam.</small></span><ChevronRight size={19} className={helpOpen ? "rotated" : ""} /></button>{helpOpen ? <div className="help-copy"><p><b>Treinos → pontos → nível.</b> Use os pontos para acompanhar sua evolução.</p><p><b>DESAFIOS → moedas → equipamentos.</b> Troque moedas em Equipamentos.</p><p><b>Aplicações reais → bônus.</b> Registre o que testou no trabalho.</p><p><b>Sequência → consistência.</b> Mostra quantos dias você manteve o ritmo.</p><button className="link-button" onClick={reviewOnboarding}>Rever explicação inicial <ArrowUpRight size={15} /></button></div> : null}</section>
      <section className="profile-section"><div className="section-heading"><div><span className="eyebrow">MEDALHAS</span><h2>Quadro da temporada</h2></div><button className="link-button">Ver medalhas <ArrowUpRight size={16} /></button></div><div className="badge-grid">{badges.map(([icon, name, unlocked]) => <div key={String(name)} className={`profile-badge ${unlocked ? "unlocked" : "locked"}`}><span>{icon}</span><b>{name}</b>{!unlocked ? <small><Lock size={11} /> em breve</small> : null}</div>)}</div></section>
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

function RewardModal({ reward, success, coins, close, confirm, goToStore }: { reward: typeof rewards[number] | null; success: boolean; coins: number; close: () => void; confirm: () => void; goToStore: () => void }) {
  return <AnimatePresence>{reward ? <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div className="application-modal reward-confirm-modal" initial={{ opacity: 0, y: 18, scale: .97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: .97 }}><button className="modal-close" onClick={close} aria-label="Fechar"><X size={20} /></button>{success ? <div className="application-success"><div className="apply-success-icon"><Gift size={42} /></div><span className="eyebrow">RESGATE REALIZADO!</span><h2>{reward.name} foi adicionado aos seus resgates.</h2><p>Seu novo saldo é <b>{coins} pontos</b>. O status do protótipo é <b>Entregue ✓</b>.</p><button className="primary-button wide" onClick={goToStore}>Ver meus resgates <ArrowUpRight size={18} /></button></div> : <div className="application-success"><div className="apply-success-icon"><Gift size={42} /></div><span className="eyebrow">CONFIRMAR RESGATE</span><h2>Resgatar recompensa?</h2><p><b>{reward.name}</b><br />Custo: <b>{reward.cost} pontos</b><br />Seu saldo: <b>{coins} pontos</b><br />Saldo após resgate: <b>{coins - reward.cost} pontos</b></p><div className="modal-choice-row"><button className="secondary-button" onClick={close}>Cancelar</button><button className="primary-button" onClick={confirm}>Confirmar resgate</button></div></div>}</motion.div></motion.div> : null}</AnimatePresence>;
}

function ApplicationModal({ open, close, success, submit }: { open: boolean; close: () => void; success: boolean; submit: (event: React.FormEvent<HTMLFormElement>) => void }) {
  return <AnimatePresence>{open ? <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}><motion.div className="application-modal" initial={{ opacity: 0, y: 18, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 12, scale: 0.97 }} transition={{ duration: 0.25, ease: [0.23, 1, 0.32, 1] }}>{success ? <div className="application-success"><button className="modal-close" onClick={close} aria-label="Fechar"><X size={20} /></button><div className="apply-success-icon"><CircleCheck size={48} /></div><span className="eyebrow">REGISTRO ENVIADO</span><h2>Aprender virou resultado.</h2><p>Você recebeu <b>+80 pontos</b> e <b>+25 moedas</b> por colocar uma skill em prática. A liderança pode usar seu registro como evidência de evolução.</p><button className="primary-button wide" onClick={close}>Voltar para a jornada <Rocket size={18} /></button></div> : <><button className="modal-close" onClick={close} aria-label="Fechar"><X size={20} /></button><div className="modal-heading"><div className="apply-icon"><BriefcaseBusiness size={21} /></div><div><span className="eyebrow">MISSÃO PRÁTICA</span><h2>Apliquei no trabalho</h2></div></div><p className="modal-subcopy">Leva menos de um minuto. Conte uma pequena melhoria — isso também é evoluir.</p><form onSubmit={submit}><label>O que você aplicou?<textarea required placeholder="Ex.: Criei um canal único para atualizações de pedido." /></label><label>Onde aconteceu?<input required placeholder="Ex.: Expedição e Estoque" /></label><label>Qual resultado você percebeu?<textarea required placeholder="Ex.: Menos dúvidas e confirmações mais rápidas." /></label><div className="modal-footer"><span><Zap size={16} fill="currentColor" /> <b>+80 XP</b> · <Coins size={15} fill="currentColor" /> <b>+25 pontos</b></span><button type="submit" className="primary-button">Registrar aplicação <Send size={17} /></button></div></form></>}</motion.div></motion.div> : null}</AnimatePresence>;
}
