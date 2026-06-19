import React, { useState, useEffect, useRef } from "react";
import { Flame, Heart, Sparkles, Users, BookOpen, Mic, Camera, ChevronRight, ChevronLeft, X, Send, Plus, Play, Pause, RotateCcw, ShieldAlert, Lock, Check, ArrowRight, Home, Compass, MessageCircle, Clock } from "lucide-react";

const MERCADO_PAGO_SUBSCRIPTION_LINK = "https://mpago.la/1KbVYzu";

const WEEKDAYS = [
  { id: "dom", label: "D" }, { id: "seg", label: "S" }, { id: "ter", label: "T" }, { id: "qua", label: "Q" },
  { id: "qui", label: "Q" }, { id: "sex", label: "S" }, { id: "sab", label: "S" },
];

const INITIAL_CUSTOM_AFFIRMATIONS = [
  { id: 1, text: "Eu sou capaz de construir a vida que eu imagino, um dia de cada vez.", days: ["seg", "ter", "qua", "qui", "sex"], timesPerDay: 2, active: true },
];

const INITIAL_GOALS = [
  { id: 1, text: "Praticar uma técnica de manifestação", frequency: "daily", done: false },
  { id: 2, text: "Escrever no cofre de manifestações", frequency: "weekly", target: 3, progress: 1 },
  { id: 3, text: "Participar da comunidade", frequency: "weekly", target: 2, progress: 2 },
];

const MOODS = [
  { id: "ansioso", label: "Ansioso(a)", emoji: "🌪️" },
  { id: "esperancoso", label: "Esperançoso(a)", emoji: "🌱" },
  { id: "cansado", label: "Cansado(a)", emoji: "🌙" },
  { id: "grato", label: "Grato(a)", emoji: "🌻" },
  { id: "perdido", label: "Perdido(a)", emoji: "🌫️" },
  { id: "motivado", label: "Motivado(a)", emoji: "🔥" },
];

const INTENTIONS = [
  "Prosperidade financeira", "Amor e relacionamentos", "Cura emocional", "Propósito e carreira", "Saúde e corpo", "Paz interior"
];

const AFFIRMATION_BANK = {
  ansioso: ["Eu não preciso controlar o que ainda não chegou. Minha mente pode descansar no que está sob meus pés agora."],
  esperancoso: ["Eu já carrego, agora, o sentimento de quem está a caminho de algo bom — e isso muda como eu vivo hoje."],
  cansado: ["Descansar não é desistir do meu propósito — é dar à minha mente o silêncio que ela precisa pra continuar criando."],
  grato: ["A gratidão que sinto agora, mesmo pelo pequeno, é o que abre espaço para o que ainda está por vir."],
  perdido: ["Eu não preciso ver o caminho inteiro — preciso apenas confiar no próximo passo que está claro agora."],
  motivado: ["Essa energia que sinto hoje não é acaso — é o resultado de pensamentos que venho escolhendo cultivar."],
};

const REFLECTIONS = {
  ansioso: "Ansiedade muitas vezes é sua mente tentando te proteger de algo que ainda não aconteceu. Hoje, experimente apenas observar esse sentimento sem julgá-lo.",
  esperancoso: "Esperança é combustível — mas ela rende mais quando combinada com uma ação pequena e concreta. O que seria um passo de 5 minutos hoje?",
  cansado: "Cansaço é informação, não fraqueza. Hoje, experimente reduzir uma única tarefa da sua lista e ver como se sente.",
  grato: "Gratidão genuína é uma das práticas com mais evidência de impacto no bem-estar. Hoje, tente notar 1 coisa pequena que passaria despercebida.",
  perdido: "Sentir-se perdido às vezes é só o espaço entre quem você era e quem está se tornando. Hoje, experimente não decidir nada — só observar.",
  motivado: "Motivação é uma onda, não um estado permanente. Hoje é um bom dia para criar um hábito que sustente você quando ela passar.",
};
const COMMUNITY_SEED = [
  {
    id: 1, name: "Marina Souza", initials: "MS", intention: "Prosperidade financeira", days: 21, technique: "Técnica 369",
    text: "Gente, sendo bem sincera: nos primeiros dias eu até esqueci de escrever de manhã umas duas vezes. Mas continuei. No dia 18 recebi uma proposta de freela que nem tava esperando. Não vou dizer que foi 'mágica', mas com certeza eu tava mais atenta às oportunidades, mais confiante pra responder. Vale o hábito.",
    likes: 84, comments: 12, timeAgo: "2 dias atrás",
  },
  {
    id: 2, name: "Diego Almeida", initials: "DA", intention: "Cura emocional", days: 7, technique: "Técnica da Escada",
    text: "Eu tenho insônia desde a separação. Comecei a fazer a visualização da escada antes de dormir só pra tentar qualquer coisa. Primeira semana e já durmo bem mais rápido. Não resolveu o resto da minha vida, óbvio, mas dormir melhor já tá fazendo diferença em como eu encaro o dia.",
    likes: 41, comments: 6, timeAgo: "5 dias atrás",
  },
  {
    id: 3, name: "Carla Mendes", initials: "CM", intention: "Amor e relacionamentos", days: 33, technique: "Scripting",
    text: "Terminei meus 33 dias de scripting hoje. Reli a primeira página que escrevi e quase chorei — não porque tudo aconteceu igualzinho, mas porque a pessoa que escreveu aquilo tava bem mais perdida do que eu hoje. Acho que foi isso que mudou mais: como eu falo comigo mesma.",
    likes: 129, comments: 24, timeAgo: "1 semana atrás",
  },
  {
    id: 4, name: "Rafael Costa", initials: "RC", intention: "Propósito e carreira", days: 14, technique: "Técnica 369",
    text: "Confesso que entrei meio descrente nisso. Sou bem cético com esse tipo de coisa. Mas resolvi tratar como um exercício de foco mesmo, sem esperar mágica. 14 dias depois, pedi demissão de um emprego que me fazia mal há 2 anos. Não sei se foi a técnica, mas o hábito diário me deu clareza pra tomar a decisão.",
    likes: 67, comments: 9, timeAgo: "3 dias atrás",
  },
  {
    id: 5, name: "Júlia Ramos", initials: "JR", intention: "Saúde e corpo", days: 9, technique: "Copo de Água",
    text: "Uso a técnica do copo antes de dormir junto com um diário de gratidão. Simples, leva 3 minutos, mas virou meu ritual favorito do dia. Ainda não vi 'resultado grande', mas já é o momento mais calmo da minha noite — e isso já vale.",
    likes: 38, comments: 4, timeAgo: "1 dia atrás",
  },
];
const TECHNIQUES = [
  {
    id: "369", name: "Técnica 369", subtitle: "Inspirada em Nikola Tesla", duration: "5 min/dia", color: "#C9923F", bg: "#FBF1DE",
    steps: [
      "Escolha uma frase de intenção no presente, como se já fosse real. Ex: 'Eu sou próspera e minha renda cresce todos os dias.'",
      "Escreva essa frase 3 vezes ao acordar, ainda na cama, antes de pegar o celular.",
      "Escreva a mesma frase 6 vezes em algum momento do meio do dia.",
      "Escreva a mesma frase 9 vezes antes de dormir, sentindo cada palavra.",
      "Repita esse ciclo por 21 dias seguidos, sem pular nenhum.",
    ],
    science: "Repetição escrita reforça vias neurais associadas à crença e intenção — é uma prática de autosugestão estruturada.",
  },
  {
    id: "escada", name: "Técnica da Escada", subtitle: "Baseada em Neville Goddard", duration: "10 min, antes de dormir", color: "#B0703F", bg: "#F6E9DD",
    steps: [
      "Escreva em um papel: 'Eu não vou subir a escada.' Deixe visível perto da cama.",
      "Deite-se e respire profundamente até sentir o corpo relaxar por completo.",
      "Imagine-se diante de uma escada. Observe a textura: é de madeira? Metal? Fria ou quente?",
      "Visualize sua mão segurando o corrimão. Sinta o peso do primeiro passo.",
      "Suba devagar, ouvindo o som de cada passo, sentindo cada degrau sob seus pés.",
      "Repita essa visualização por pelo menos 3 noites seguidas, antes de dormir.",
    ],
    science: "Trabalha com o estado de relaxamento profundo, quando a mente fica mais aberta a sugestões.",
  },
  {
    id: "scripting", name: "Scripting", subtitle: "Diário do futuro", duration: "15 min", color: "#6E8C5E", bg: "#EAF0E3",
    steps: [
      "Escolha um desejo específico para narrar — uma viagem, uma conquista, um relacionamento.",
      "Escreva em primeira pessoa, no passado, como se já tivesse vivido aquele dia.",
      "Inclua detalhes sensoriais: que horas você acordou, o que vestiu, com quem falou, o que sentiu.",
      "Escreva sem se preocupar com 'como' isso vai acontecer — só descreva como foi.",
      "Releia em voz alta depois de terminar, sentindo a cena como memória.",
    ],
    science: "Narrar em detalhe ativa os mesmos circuitos cerebrais usados para lembrar experiências reais.",
  },
  {
    id: "copo", name: "Técnica do Copo de Água", subtitle: "Ritual simples antes de dormir", duration: "3 min", color: "#5A88A3", bg: "#E6EFF3",
    steps: [
      "Encha um copo de água antes de dormir.",
      "Segure o copo com as duas mãos e feche os olhos.",
      "Diga em voz baixa o que deseja manifestar, como se estivesse contando um segredo à água.",
      "Beba metade da água, sentindo que está absorvendo essa intenção.",
      "Deixe a outra metade ao lado da cama. Pela manhã, beba o restante e repita a intenção em voz alta.",
    ],
    science: "Ritual de ancoragem: associar uma ação física simples e repetível a uma intenção ajuda a criar consistência.",
  },
  {
    id: "sats", name: "SATS", subtitle: "Estado Similar ao Sono", duration: "8 min", color: "#A06B98", bg: "#F1E7EF",
    steps: [
      "Escolha o momento logo antes de dormir ou logo ao acordar — quando a mente está mais leve.",
      "Relaxe cada parte do corpo, dos pés até a cabeça, soltando a tensão.",
      "Quando sentir que está quase dormindo, mas ainda consciente, traga à mente a cena do desejo já realizado.",
      "Não pense em 'como', apenas sinta a emoção de já ter conquistado.",
      "Deixe essa sensação te acompanhar até adormecer, sem forçar.",
    ],
    science: "O estado entre vigília e sono reduz a atividade crítica da mente racional.",
  },
];
const WISDOM_AUTHORS = [
  {
    id: "hill", author: "Napoleon Hill", work: "Conceito de 'Desejo Ardente'",
    idea: "Hill defendia que todo grande feito começa com um desejo que deixou de ser um simples desejo e se tornou uma decisão ardente — um ponto de partida claro, sem ambiguidade, do qual a pessoa não recua.",
    technique: { name: "Os 6 passos do desejo definido", steps: ["Defina exatamente o valor ou objetivo que você deseja — seja específico, não genérico.", "Determine o que você está dispondo a dar em troca para alcançá-lo.", "Estabeleça uma data definida para quando pretende conquistá-lo.", "Crie um plano claro de ação e comece imediatamente, esteja você pronto ou não.", "Escreva tudo isso em uma frase clara e objetiva.", "Leia essa frase em voz alta, duas vezes ao dia, vendo-se já em posse do que deseja."] },
    affirmation: "Eu sei exatamente o que eu quero, e isso me dá clareza para agir hoje.",
    readerNote: "Um leitor poderia descrever algo assim: 'O que mudou pra mim não foi o desejo em si, mas escrever a data. De repente parou de ser um sonho vago e virou um prazo real.'",
    color: "#C9923F", bg: "#FBF1DE",
  },
  {
    id: "goddard", author: "Neville Goddard", work: "Conceito de 'Viver no Final'",
    idea: "Goddard ensinava que a mente humana tende a manifestar aquilo que assume como verdade — não o que deseja, mas o que já aceita internamente como real, mesmo antes de ver provas externas.",
    technique: { name: "Técnica da Escada", steps: ["Antes de dormir, relaxe o corpo por completo, em estado de quase sono.", "Imagine-se diante de uma escada comum, com detalhes sensoriais — textura, cor, som.", "Visualize sua mão no corrimão e o peso do primeiro passo ao subir.", "Suba devagar, sentindo cada degrau, por pelo menos três noites seguidas."] },
    affirmation: "Eu já carrego dentro de mim o sentimento de quem alcançou o que busca.",
    readerNote: "Um leitor poderia descrever algo assim: 'Achei estranho no início, imaginar uma escada antes de dormir. Mas o que ficou foi a sensação de calma.'",
    color: "#A06B98", bg: "#F1E7EF",
  },
  {
    id: "proctor", author: "Bob Proctor", work: "Conceito de 'Paradigmas'",
    idea: "Proctor ensinava que a maioria das pessoas tenta mudar resultados sem mudar as crenças que os geram — e que resultados duradouros só vêm quando o paradigma interno é atualizado primeiro.",
    technique: { name: "Reescrita de paradigma", steps: ["Identifique uma crença antiga que te limita.", "Escreva a crença nova que você quer instalar no lugar, no tempo presente.", "Escreva essa nova crença à mão, todos os dias, por pelo menos 30 dias.", "Observe ao longo do dia os momentos em que a crença antiga tenta reaparecer."] },
    affirmation: "Eu estou disposta(o) a soltar crenças antigas que não me servem mais.",
    readerNote: "Um leitor poderia descrever algo assim: 'Levei tempo pra perceber que eu repetia a mesma frase negativa sobre dinheiro desde criança.'",
    color: "#5A88A3", bg: "#E6EFF3",
  },
  {
    id: "byrne", author: "Rhonda Byrne", work: "Conceito de 'Gratidão como ímã'",
    idea: "Byrne popularizou a ideia de que sentir gratidão genuína por algo, antes mesmo de ele se concretizar, muda o estado emocional da pessoa — e esse estado é o que atrai novas oportunidades.",
    technique: { name: "Diário da gratidão antecipada", steps: ["Escolha algo que você deseja, ainda não realizado.", "Escreva 3 frases de agradecimento por esse desejo como se já tivesse se realizado.", "Sinta a emoção da gratidão genuinamente, não apenas as palavras.", "Repita esse ritual todas as manhãs, antes de checar o celular."] },
    affirmation: "Eu escolho sentir gratidão agora, sem esperar que tudo se resolva primeiro.",
    readerNote: "Um leitor poderia descrever algo assim: 'No começo parecia bobo agradecer por algo que ainda não tinha. Mas comecei a notar mais coisas boas no meio do caos do dia.'",
    color: "#6E8C5E", bg: "#EAF0E3",
  },
  {
    id: "tesla", author: "Nikola Tesla", work: "Técnica 369",
    idea: "Tesla tinha fascínio pelos números 3, 6 e 9, e por rotinas mentais repetitivas e estruturadas — isso inspirou a prática moderna que usa esses números como base de repetição para fixar uma intenção.",
    technique: { name: "Técnica 369", steps: ["Escreva sua intenção no presente, como se já fosse real.", "Escreva-a 3 vezes pela manhã, ao acordar.", "Escreva-a 6 vezes durante o meio do dia.", "Escreva-a 9 vezes antes de dormir.", "Repita esse ciclo por 21 dias seguidos."] },
    affirmation: "Cada repetição de hoje fortalece a clareza do que estou construindo.",
    readerNote: "Um leitor poderia descrever algo assim: 'O que me fisgou foi a estrutura — 3, 6, 9 dá pra seguir sem pensar demais.'",
    color: "#3461C7", bg: "#E8EEFB",
  },
  {
    id: "hay", author: "Louise Hay", work: "Conceito de 'Cura através do espelho'",
    idea: "Hay defendia que a maneira como falamos conosco mesmos no dia a dia constrói, lentamente, a nossa realidade emocional — e que repetir afirmações de autoaceitação olhando nos próprios olhos tem um efeito mais profundo.",
    technique: { name: "Trabalho com o espelho", steps: ["Fique diante de um espelho, olhando nos próprios olhos.", "Diga em voz alta: 'Eu me amo e me aceito exatamente como sou agora.'", "Repita por 1 a 2 minutos, mesmo que pareça estranho no início.", "Pratique isso todas as manhãs, antes de sair de casa."] },
    affirmation: "Eu me trato com a mesma gentileza que ofereço às pessoas que amo.",
    readerNote: "Um leitor poderia descrever algo assim: 'Achei ridículo no primeiro dia. No quinto dia, percebi que era a primeira vez em anos que eu dizia algo bom pra mim mesma sem ironia.'",
    color: "#C17F9C", bg: "#FBE9F0",
  },
  {
    id: "hicks", author: "Esther Hicks", work: "Conceito de 'Ponto de Atração'",
    idea: "Hicks ensinava que o estado emocional presente é o que define o que uma pessoa tende a atrair. Por isso o foco está em elevar o humor momento a momento.",
    technique: { name: "Escada da emoção", steps: ["Identifique a emoção que você sente agora, sem julgar.", "Busque a próxima emoção um pouco melhor (ex: de desespero para frustração, de frustração para aceitação).", "Repita esse pequeno movimento de subida várias vezes ao dia.", "Celebre cada pequena subida, não só o topo da escada."] },
    affirmation: "Eu não preciso saltar para a alegria de uma vez — um passo emocional melhor já é progresso real.",
    readerNote: "Um leitor poderia descrever algo assim: 'Parar de tentar ser positivo direto e só buscar um sentimento um pouco menos pesado mudou minha relação com dias difíceis.'",
    color: "#8C9E6E", bg: "#EFF3E6",
  },
  {
    id: "murphy", author: "Joseph Murphy", work: "Conceito do 'Poder da Mente Subconsciente'",
    idea: "Murphy ensinava que o subconsciente aceita como verdade aquilo que é repetido com convicção emocional, especialmente nos minutos antes de dormir.",
    technique: { name: "Sugestão antes de dormir", steps: ["Nos minutos finais antes de dormir, relaxe o corpo completamente.", "Repita mentalmente uma frase curta e específica sobre o que deseja.", "Não analise 'como' vai acontecer — apenas repouse na sensação da frase.", "Pratique todas as noites, na mesma janela de tempo."] },
    affirmation: "Antes de dormir, eu entrego à minha mente as palavras que quero que ela trabalhe esta noite.",
    readerNote: "Um leitor poderia descrever algo assim: 'Eu sempre dormia pensando nos problemas do dia. Trocar isso por uma frase curta e calma mudou até a qualidade do meu sono.'",
    color: "#6B8CAE", bg: "#E9EFF5",
  },
];
function SkyBackdrop() {
  return (
    <div style={{ position: "absolute", inset: 0, zIndex: 0, overflow: "hidden", background: "linear-gradient(165deg, #EAF2F6 0%, #F3EFE3 35%, #FBEEDD 60%, #F7E9EC 100%)" }}>
      <div style={{ position: "absolute", top: "-10%", right: "-20%", width: "70%", height: "40%", background: "radial-gradient(circle, rgba(255,255,255,0.7), transparent 70%)", filter: "blur(10px)" }} />
      <svg style={{ position: "absolute", bottom: 0, left: 0, width: "100%", height: "42%" }} viewBox="0 0 600 220" preserveAspectRatio="none">
        <path className="wave-back" d="M0,90 C100,40 200,140 300,90 C400,40 500,140 600,90 L600,220 L0,220 Z" fill="#A8C5D6" opacity="0.22" />
        <path className="wave-mid" d="M0,120 C120,70 220,160 340,110 C440,70 520,150 600,110 L600,220 L0,220 Z" fill="#9FC2BB" opacity="0.20" />
        <path className="wave-front" d="M0,150 C140,110 260,180 380,140 C460,115 540,170 600,140 L600,220 L0,220 Z" fill="#D9C9A8" opacity="0.28" />
      </svg>
      <style>{`.wave-back{animation:waveDrift1 11s ease-in-out infinite;transform-origin:center}.wave-mid{animation:waveDrift2 8s ease-in-out infinite;transform-origin:center}.wave-front{animation:waveDrift3 6.5s ease-in-out infinite;transform-origin:center}@keyframes waveDrift1{0%,100%{transform:translateX(0)}50%{transform:translateX(-3%)}}@keyframes waveDrift2{0%,100%{transform:translateX(0)}50%{transform:translateX(3%)}}@keyframes waveDrift3{0%,100%{transform:translateX(0)}50%{transform:translateX(-2%)}}`}</style>
    </div>
  );
}

function ScreenShell({ children, footer }) {
  return (
    <div style={{ width: "100%", maxWidth: 430, height: 860, margin: "0 auto", background: "#FAF7F2", borderRadius: 36, overflow: "hidden", display: "flex", flexDirection: "column", position: "relative", boxShadow: "0 30px 80px -20px rgba(120,100,70,0.25)", fontFamily: "'Inter', -apple-system, sans-serif" }}>
      <SkyBackdrop />
      <div style={{ flex: 1, overflowY: "auto", WebkitOverflowScrolling: "touch", position: "relative", zIndex: 1 }}>{children}</div>
      {footer}
    </div>
  );
}

function TopBar({ title, onBack, right }) {
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 20px 12px", position: "sticky", top: 0, zIndex: 5 }}>
      <div style={{ width: 36 }}>{onBack && <button onClick={onBack} style={{ background: "rgba(255,255,255,0.8)", border: "none", borderRadius: 12, width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", boxShadow: "0 2px 8px rgba(120,100,70,0.1)" }}><ChevronLeft size={18} color="#3D352C" /></button>}</div>
      <div style={{ fontFamily: "'Fraunces', serif", fontSize: 17, color: "#3D352C" }}>{title}</div>
      <div style={{ width: 36, display: "flex", justifyContent: "flex-end" }}>{right}</div>
    </div>
  );
}

function NavBar({ active, setScreen }) {
  const items = [{ id: "home", icon: Home, label: "Hoje" }, { id: "techniques", icon: Compass, label: "Técnicas" }, { id: "vault", icon: Sparkles, label: "Cofre" }, { id: "community", icon: Users, label: "Comunidade" }];
  return (
    <div style={{ display: "flex", justifyContent: "space-around", alignItems: "center", padding: "10px 8px 18px", borderTop: "1px solid rgba(180,160,130,0.18)", background: "rgba(255,255,255,0.85)", position: "relative", zIndex: 2 }}>
      {items.map(it => { const isActive = active === it.id; const Icon = it.icon; return <button key={it.id} onClick={() => setScreen(it.id)} style={{ background: "none", border: "none", display: "flex", flexDirection: "column", alignItems: "center", gap: 4, cursor: "pointer", padding: "6px 10px" }}><Icon size={20} color={isActive ? "#C9923F" : "#A89A87"} strokeWidth={isActive ? 2.2 : 1.8} /><span style={{ fontSize: 10.5, color: isActive ? "#C9923F" : "#A89A87", fontWeight: isActive ? 600 : 400 }}>{it.label}</span></button>; })}
    </div>
  );
}

function Pill({ children, color = "#C9923F", bg = "rgba(201,146,63,0.13)" }) {
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11.5, color, background: bg, borderRadius: 20, padding: "4px 10px", fontWeight: 600 }}>{children}</span>;
}

function PrimaryButton({ children, onClick, disabled, style }) {
  return <button onClick={onClick} disabled={disabled} style={{ width: "100%", padding: "15px 20px", borderRadius: 16, border: "none", background: disabled ? "rgba(201,146,63,0.3)" : "linear-gradient(135deg, #D9A957, #C9923F)", color: "#FFFFFF", fontWeight: 700, fontSize: 15, cursor: disabled ? "default" : "pointer", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, boxShadow: disabled ? "none" : "0 8px 24px -8px rgba(201,146,63,0.45)", ...style }}>{children}</button>;
}

function Card({ children, style }) {
  return <div style={{ background: "#FFFFFF", borderRadius: 20, boxShadow: "0 4px 20px rgba(120,100,70,0.08)", border: "1px solid rgba(180,160,130,0.12)", ...style }}>{children}</div>;
}

function OnboardingMood({ onSelect }) {
  const [selected, setSelected] = useState(null);
  return (
    <div style={{ padding: "60px 24px 24px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Pill>Check-in diário</Pill>
      <h1 style={{ fontFamily: "'Fraunces', serif", color: "#3D352C", fontSize: 28, lineHeight: 1.25, margin: "14px 0 8px", fontWeight: 500 }}>Como você está<br/>se sentindo hoje?</h1>
      <p style={{ color: "#8A7D6B", fontSize: 14, lineHeight: 1.5, marginBottom: 28 }}>Sua resposta molda a afirmação que você vai receber agora.</p>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, flex: 1 }}>
        {MOODS.map(m => <button key={m.id} onClick={() => setSelected(m.id)} style={{ background: selected === m.id ? "rgba(201,146,63,0.12)" : "#FFFFFF", border: selected === m.id ? "1.5px solid #C9923F" : "1px solid rgba(180,160,130,0.2)", borderRadius: 18, padding: "20px 12px", display: "flex", flexDirection: "column", alignItems: "center", gap: 10, cursor: "pointer", boxShadow: "0 2px 10px rgba(120,100,70,0.05)" }}><span style={{ fontSize: 28 }}>{m.emoji}</span><span style={{ color: "#3D352C", fontSize: 13.5, fontWeight: 500 }}>{m.label}</span></button>)}
      </div>
      <PrimaryButton disabled={!selected} onClick={() => onSelect(selected)} style={{ marginTop: 20 }}>Continuar <ArrowRight size={16} /></PrimaryButton>
    </div>
  );
}

function OnboardingIntention({ onSelect }) {
  const [selected, setSelected] = useState(null);
  return (
    <div style={{ padding: "60px 24px 24px", height: "100%", display: "flex", flexDirection: "column" }}>
      <Pill color="#6FA0BD" bg="rgba(111,160,189,0.14)">Passo 2 de 2</Pill>
      <h1 style={{ fontFamily: "'Fraunces', serif", color: "#3D352C", fontSize: 26, lineHeight: 1.3, margin: "14px 0 8px", fontWeight: 500 }}>O que você quer<br/>atrair essa semana?</h1>
      <p style={{ color: "#8A7D6B", fontSize: 14, marginBottom: 24 }}>Escolha a área que mais pede atenção agora.</p>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1 }}>
        {INTENTIONS.map(i => <button key={i} onClick={() => setSelected(i)} style={{ background: selected === i ? "rgba(201,146,63,0.12)" : "#FFFFFF", border: selected === i ? "1.5px solid #C9923F" : "1px solid rgba(180,160,130,0.2)", borderRadius: 14, padding: "16px 18px", color: "#3D352C", fontSize: 14.5, textAlign: "left", cursor: "pointer", display: "flex", justifyContent: "space-between", alignItems: "center", boxShadow: "0 2px 10px rgba(120,100,70,0.05)" }}>{i}{selected === i && <Check size={16} color="#C9923F" />}</button>)}
      </div>
      <PrimaryButton disabled={!selected} onClick={() => onSelect(selected)} style={{ marginTop: 20 }}>Ver minha afirmação <Sparkles size={16} /></PrimaryButton>
    </div>
  );
}

function AffirmationReveal({ mood, onContinue }) {
  const [phase, setPhase] = useState("loading");
  useEffect(() => { const t = setTimeout(() => setPhase("reveal"), 1400); return () => clearTimeout(t); }, []);
  const affirmation = AFFIRMATION_BANK[mood]?.[0] || "Eu confio no processo da minha vida.";
  const reflection = REFLECTIONS[mood] || "";
  if (phase === "loading") return <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 18 }}><div style={{ width: 56, height: 56, borderRadius: "50%", background: "radial-gradient(circle, rgba(201,146,63,0.3), transparent 70%)", display: "flex", alignItems: "center", justifyContent: "center" }}><Sparkles size={26} color="#C9923F" /></div><p style={{ color: "#8A7D6B", fontSize: 13.5 }}>criando sua afirmação de hoje...</p></div>;
  return (
    <div style={{ padding: "50px 24px 24px", height: "100%", display: "flex", flexDirection: "column" }}>
      <div style={{ textAlign: "center", marginBottom: 8 }}><Pill>Sua afirmação de hoje</Pill></div>
      <Card style={{ marginTop: 24, padding: "32px 24px", textAlign: "center", background: "linear-gradient(160deg, #FFFFFF, #FBF3E5)" }}>
        <p style={{ fontFamily: "'Fraunces', serif", color: "#3D352C", fontSize: 21, lineHeight: 1.45, fontStyle: "italic" }}>"{affirmation}"</p>
      </Card>
      <Card style={{ marginTop: 20, padding: "16px 18px" }}>
        <p style={{ color: "#6B5F4F", fontSize: 13, lineHeight: 1.6 }}>{reflection}</p>
      </Card>
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <button style={{ flex: 1, background: "#FFFFFF", border: "1px solid rgba(180,160,130,0.25)", borderRadius: 14, padding: "13px", color: "#3D352C", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer" }}><Mic size={15} color="#C9923F" /> Ouvir com minha voz</button>
        <button style={{ flex: 1, background: "#FFFFFF", border: "1px solid rgba(180,160,130,0.25)", borderRadius: 14, padding: "13px", color: "#3D352C", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, cursor: "pointer" }}><Camera size={15} color="#C17F5C" /> Gravar declaração</button>
      </div>
      <div style={{ flex: 1 }} />
      <PrimaryButton onClick={onContinue}>Continuar para o app <ArrowRight size={16} /></PrimaryButton>
    </div>
  );
}

function GoalsWidget() {
  const [goals, setGoals] = useState(INITIAL_GOALS);
  const toggleDaily = (id) => setGoals(goals.map(g => g.id === id ? { ...g, done: !g.done } : g));
  const bumpWeekly = (id) => setGoals(goals.map(g => g.id === id && g.progress < g.target ? { ...g, progress: g.progress + 1 } : g));
  return (
    <Card style={{ padding: "16px 18px", marginBottom: 20 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 14 }}>
        <h3 style={{ color: "#3D352C", fontSize: 14, fontWeight: 700, margin: 0 }}>Suas metas</h3>
        <Pill color="#5A88A3" bg="#E6EFF3">esta semana</Pill>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        {goals.map(g => g.frequency === "daily" ? (
          <button key={g.id} onClick={() => toggleDaily(g.id)} style={{ display: "flex", alignItems: "center", gap: 10, background: "none", border: "none", cursor: "pointer", padding: 0, textAlign: "left" }}>
            <div style={{ width: 22, height: 22, borderRadius: "50%", flexShrink: 0, border: g.done ? "none" : "2px solid #D8CCB8", background: g.done ? "#7E9A6E" : "transparent", display: "flex", alignItems: "center", justifyContent: "center" }}>{g.done && <Check size={12} color="#fff" />}</div>
            <span style={{ color: g.done ? "#A89A87" : "#3D352C", fontSize: 13, textDecoration: g.done ? "line-through" : "none", flex: 1 }}>{g.text}</span>
            <Pill color="#C9923F" bg="#FBF1DE">diária</Pill>
          </button>
        ) : (
          <div key={g.id}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 5 }}><span style={{ color: "#3D352C", fontSize: 13 }}>{g.text}</span><span style={{ color: "#8A7D6B", fontSize: 12 }}>{g.progress}/{g.target}</span></div>
            <div style={{ display: "flex", gap: 4 }}>{Array.from({ length: g.target }).map((_, i) => <div key={i} style={{ flex: 1, height: 6, borderRadius: 4, background: i < g.progress ? "#7E9A6E" : "rgba(180,160,130,0.2)" }} />)}</div>
            {g.progress < g.target && <button onClick={() => bumpWeekly(g.id)} style={{ marginTop: 6, background: "none", border: "none", color: "#5A88A3", fontSize: 11.5, fontWeight: 600, cursor: "pointer", padding: 0 }}>+ marcar progresso</button>}
          </div>
        ))}
      </div>
    </Card>
  );
}

function HomeScreen({ user, setScreen, openTechnique, setShowPaywall }) {
  return (
    <div>
      <TopBar title="" right={<div style={{ display: "flex", alignItems: "center", gap: 5, background: "rgba(201,146,63,0.13)", borderRadius: 20, padding: "5px 10px" }}><Flame size={14} color="#C9923F" fill="#C9923F" /><span style={{ color: "#C9923F", fontSize: 12.5, fontWeight: 700 }}>{user.streak}</span></div>} />
      <div style={{ padding: "0 20px" }}>
        <p style={{ color: "#8A7D6B", fontSize: 13.5 }}>Bom te ver de novo,</p>
        <h1 style={{ fontFamily: "'Fraunces', serif", color: "#3D352C", fontSize: 24, fontWeight: 500, margin: "2px 0 22px" }}>{user.name} ☀️</h1>
        <Card style={{ padding: "22px 20px", marginBottom: 18, background: "linear-gradient(160deg, #FFFFFF, #FBF3E5)" }}>
          <Pill>Afirmação de hoje</Pill>
          <p style={{ fontFamily: "'Fraunces', serif", color: "#3D352C", fontSize: 18, lineHeight: 1.45, fontStyle: "italic", margin: "12px 0 16px" }}>"{AFFIRMATION_BANK[user.mood]?.[0]}"</p>
          <div style={{ display: "flex", gap: 8 }}>
            <button style={{ flex: 1, background: "rgba(201,146,63,0.1)", border: "none", borderRadius: 12, padding: "10px", color: "#3D352C", fontSize: 12.5, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, cursor: "pointer" }}><Mic size={13} color="#C9923F" /> Voz</button>
            <button style={{ flex: 1, background: "rgba(193,127,92,0.1)", border: "none", borderRadius: 12, padding: "10px", color: "#3D352C", fontSize: 12.5, fontWeight: 600, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, cursor: "pointer" }}><Camera size={13} color="#C17F5C" /> Declarar</button>
          </div>
        </Card>
        <GoalsWidget />
        <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>
          <button onClick={() => setScreen("myAffirmations")} style={{ flex: 1, background: "#FFFFFF", border: "1px solid rgba(180,160,130,0.15)", borderRadius: 16, padding: "14px 12px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, boxShadow: "0 2px 10px rgba(120,100,70,0.06)" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#FBF1DE", display: "flex", alignItems: "center", justifyContent: "center" }}><Mic size={15} color="#C9923F" /></div>
            <span style={{ color: "#3D352C", fontSize: 12, fontWeight: 600, textAlign: "center" }}>Minhas afirmações</span>
          </button>
          <button onClick={() => setScreen("futureLetter")} style={{ flex: 1, background: "#FFFFFF", border: "1px solid rgba(180,160,130,0.15)", borderRadius: 16, padding: "14px 12px", cursor: "pointer", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, boxShadow: "0 2px 10px rgba(120,100,70,0.06)" }}>
            <div style={{ width: 34, height: 34, borderRadius: "50%", background: "#E6EFF3", display: "flex", alignItems: "center", justifyContent: "center" }}><BookOpen size={15} color="#5A88A3" /></div>
            <span style={{ color: "#3D352C", fontSize: 12, fontWeight: 600, textAlign: "center" }}>Carta para o futuro</span>
          </button>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ color: "#3D352C", fontSize: 15, fontWeight: 600, margin: 0 }}>Sabedoria do dia</h3>
          <button onClick={() => setScreen("wisdom")} style={{ background: "none", border: "none", color: "#C9923F", fontSize: 12.5, cursor: "pointer", fontWeight: 600 }}>ver tudo</button>
        </div>
        <button onClick={() => setScreen("wisdom")} style={{ width: "100%", textAlign: "left", border: "none", padding: 0, cursor: "pointer", marginBottom: 20 }}>
          <Card style={{ padding: "16px 18px", background: "linear-gradient(160deg, #FFFFFF, #F1E7EF)", display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: "#F1E7EF", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><BookOpen size={17} color="#A06B98" /></div>
            <div style={{ flex: 1 }}>
              <div style={{ color: "#3D352C", fontSize: 13, fontWeight: 700 }}>Escolha seu pensador de hoje</div>
              <div style={{ color: "#8A7D6B", fontSize: 12, lineHeight: 1.4 }}>10 grandes nomes — um conceito, uma técnica e uma afirmação</div>
            </div>
            <ChevronRight size={16} color="#C4B6A2" />
          </Card>
        </button>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
          <h3 style={{ color: "#3D352C", fontSize: 15, fontWeight: 600, margin: 0 }}>Continue sua prática</h3>
          <button onClick={() => setScreen("techniques")} style={{ background: "none", border: "none", color: "#C9923F", fontSize: 12.5, cursor: "pointer", fontWeight: 600 }}>ver tudo</button>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 20 }}>
          {TECHNIQUES.slice(0, 2).map(t => <button key={t.id} onClick={() => openTechnique(t)} style={{ background: "#FFFFFF", border: "1px solid rgba(180,160,130,0.15)", borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", textAlign: "left", boxShadow: "0 2px 10px rgba(120,100,70,0.06)" }}><div><div style={{ color: "#3D352C", fontSize: 14, fontWeight: 600 }}>{t.name}</div><div style={{ color: "#A89A87", fontSize: 12 }}>{t.duration}</div></div><div style={{ width: 34, height: 34, borderRadius: "50%", background: t.bg, display: "flex", alignItems: "center", justifyContent: "center" }}><ChevronRight size={15} color={t.color} /></div></button>)}
        </div>
        <Card style={{ padding: "16px 18px", marginBottom: 20, display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer" }} onClick={() => setScreen("vault")}>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <div style={{ width: 38, height: 38, borderRadius: 12, background: "rgba(126,154,110,0.15)", display: "flex", alignItems: "center", justifyContent: "center" }}><Sparkles size={17} color="#7E9A6E" /></div>
            <div><div style={{ color: "#3D352C", fontSize: 13.5, fontWeight: 600 }}>Cofre de manifestações</div><div style={{ color: "#A89A87", fontSize: 11.5 }}>3 intenções aguardando</div></div>
          </div>
          <ChevronRight size={16} color="#C4B6A2" />
        </Card>
        <button onClick={() => setShowPaywall(true)} style={{ width: "100%", background: "linear-gradient(135deg, #D9A957, #C9923F)", border: "none", borderRadius: 16, padding: "13px", color: "#FFFFFF", fontSize: 13, fontWeight: 700, cursor: "pointer", marginBottom: 24, boxShadow: "0 10px 30px -10px rgba(201,146,63,0.5)", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
          <Sparkles size={14} /> Testar tudo grátis por 3 dias
        </button>
      </div>
    </div>
  );
}

function TechniquesScreen({ openTechnique }) {
  return (
    <div>
      <TopBar title="Técnicas" />
      <div style={{ padding: "0 20px 20px" }}>
        <p style={{ color: "#8A7D6B", fontSize: 13.5, marginBottom: 20, lineHeight: 1.5 }}>Práticas guiadas, passo a passo, com timer e áudio.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {TECHNIQUES.map(t => <button key={t.id} onClick={() => openTechnique(t)} style={{ background: "#FFFFFF", border: "1px solid rgba(180,160,130,0.15)", borderRadius: 18, padding: "18px", textAlign: "left", cursor: "pointer", display: "flex", flexDirection: "column", gap: 8, boxShadow: "0 2px 12px rgba(120,100,70,0.06)" }}><div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}><div><div style={{ color: "#3D352C", fontSize: 15.5, fontWeight: 600 }}>{t.name}</div><div style={{ color: "#A89A87", fontSize: 12 }}>{t.subtitle}</div></div><div style={{ width: 40, height: 40, borderRadius: "50%", background: t.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><Compass size={17} color={t.color} /></div></div><Pill color={t.color} bg={t.bg}>{t.duration}</Pill></button>)}
        </div>
      </div>
    </div>
  );
}

function TechniqueDetail({ technique, onBack, onComplete }) {
  const [step, setStep] = useState(0);
  const [timerOn, setTimerOn] = useState(false);
  const [seconds, setSeconds] = useState(60);
  const intervalRef = useRef(null);
  useEffect(() => { if (timerOn && seconds > 0) intervalRef.current = setInterval(() => setSeconds(s => s - 1), 1000); else if (seconds === 0) setTimerOn(false); return () => clearInterval(intervalRef.current); }, [timerOn, seconds]);
  const isLast = step === technique.steps.length - 1;
  return (
    <div>
      <TopBar title={technique.name} onBack={onBack} />
      <div style={{ padding: "0 20px 20px" }}>
        <div style={{ display: "flex", gap: 6, marginBottom: 22 }}>{technique.steps.map((_, i) => <div key={i} style={{ flex: 1, height: 4, borderRadius: 4, background: i <= step ? technique.color : "rgba(180,160,130,0.2)" }} />)}</div>
        <Pill color={technique.color} bg={technique.bg}>Passo {step + 1} de {technique.steps.length}</Pill>
        <p style={{ fontFamily: "'Fraunces', serif", color: "#3D352C", fontSize: 19, lineHeight: 1.55, margin: "16px 0 26px" }}>{technique.steps[step]}</p>
        <Card style={{ padding: "24px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 14, marginBottom: 20 }}>
          <div style={{ width: 90, height: 90, borderRadius: "50%", border: `3px solid ${technique.color}55`, display: "flex", alignItems: "center", justifyContent: "center" }}><span style={{ color: "#3D352C", fontSize: 22, fontWeight: 700 }}>{seconds}s</span></div>
          <button onClick={() => setTimerOn(!timerOn)} style={{ background: technique.bg, border: "none", borderRadius: 14, padding: "10px 20px", color: technique.color, fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", gap: 6, cursor: "pointer" }}>{timerOn ? <Pause size={14} /> : <Play size={14} />}{timerOn ? "Pausar" : "Iniciar"}</button>
          <button onClick={() => setSeconds(60)} style={{ background: "none", border: "none", color: "#A89A87", fontSize: 11.5, display: "flex", alignItems: "center", gap: 4, cursor: "pointer" }}><RotateCcw size={11} /> reiniciar</button>
        </Card>
        <div style={{ background: "rgba(126,154,110,0.08)", border: "1px solid rgba(126,154,110,0.2)", borderRadius: 14, padding: "14px 16px", marginBottom: 24 }}><p style={{ color: "#5C7050", fontSize: 12, lineHeight: 1.55 }}>💡 {technique.science}</p></div>
        <div style={{ display: "flex", gap: 10 }}>
          {step > 0 && <button onClick={() => setStep(step - 1)} style={{ padding: "14px 18px", borderRadius: 14, border: "1px solid rgba(180,160,130,0.25)", background: "#FFFFFF", color: "#3D352C", cursor: "pointer" }}><ChevronLeft size={18} /></button>}
          <PrimaryButton onClick={() => isLast ? onComplete(technique) : setStep(step + 1)}>{isLast ? "Marcar como feito hoje" : "Próximo passo"} <ChevronRight size={16} /></PrimaryButton>
        </div>
      </div>
    </div>
  );
}

function VaultScreen() {
  const DEADLINE_OPTIONS = ["Em 1 mês", "Em 3 meses", "Em 6 meses", "Em 1 ano", "Sem prazo"];
  const [items, setItems] = useState([
    { id: 1, text: "Conseguir a vaga na empresa que eu admiro", done: true, intention: "Propósito e carreira", deadline: null, reminder: false },
    { id: 2, text: "Curar a relação com minha mãe", done: false, intention: "Cura emocional", deadline: "Em 3 meses", reminder: true },
    { id: 3, text: "Juntar a reserva de emergência", done: false, intention: "Prosperidade financeira", deadline: "Em 6 meses", reminder: true },
  ]);
  const [creating, setCreating] = useState(false);
  const [draft, setDraft] = useState({ text: "", intention: INTENTIONS[0], deadline: "", reminder: true });
  const toggle = (id) => setItems(items.map(i => i.id === id ? { ...i, done: !i.done } : i));
  const save = () => { if (!draft.text.trim()) return; setItems([{ id: Date.now(), text: draft.text, done: false, intention: draft.intention, deadline: draft.deadline || null, reminder: draft.reminder }, ...items]); setDraft({ text: "", intention: INTENTIONS[0], deadline: "", reminder: true }); setCreating(false); };
  if (creating) return (
    <div>
      <TopBar title="Nova realização" onBack={() => setCreating(false)} />
      <div style={{ padding: "0 20px 24px" }}>
        <div style={{ color: "#8A7D6B", fontSize: 11.5, fontWeight: 700, marginBottom: 8 }}>O QUE VOCÊ ESTÁ MANIFESTANDO?</div>
        <Card style={{ padding: 4, marginBottom: 18 }}><textarea autoFocus value={draft.text} onChange={e => setDraft(d => ({ ...d, text: e.target.value }))} placeholder="Ex: Fechar meu primeiro contrato como freelancer" style={{ width: "100%", minHeight: 70, border: "none", borderRadius: 16, padding: "14px", fontSize: 14, color: "#3D352C", outline: "none", resize: "vertical", fontFamily: "inherit" }} /></Card>
        <div style={{ color: "#8A7D6B", fontSize: 11.5, fontWeight: 700, marginBottom: 8 }}>ÁREA</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>{INTENTIONS.map(i => <button key={i} onClick={() => setDraft(d => ({ ...d, intention: i }))} style={{ padding: "8px 13px", borderRadius: 20, border: draft.intention === i ? "1.5px solid #C9923F" : "1px solid rgba(180,160,130,0.25)", background: draft.intention === i ? "rgba(201,146,63,0.1)" : "#FFFFFF", color: "#3D352C", fontSize: 12, cursor: "pointer" }}>{i}</button>)}</div>
        <div style={{ color: "#8A7D6B", fontSize: 11.5, fontWeight: 700, marginBottom: 8 }}>PRAZO</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 18 }}>{DEADLINE_OPTIONS.map(d => <button key={d} onClick={() => setDraft(dr => ({ ...dr, deadline: d }))} style={{ padding: "8px 13px", borderRadius: 20, border: draft.deadline === d ? "1.5px solid #5A88A3" : "1px solid rgba(180,160,130,0.25)", background: draft.deadline === d ? "#E6EFF3" : "#FFFFFF", color: "#3D352C", fontSize: 12, cursor: "pointer" }}>{d}</button>)}</div>
        <Card style={{ padding: "14px 16px", marginBottom: 22, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}><Flame size={15} color="#C9923F" /><div><div style={{ color: "#3D352C", fontSize: 13, fontWeight: 600 }}>Lembrete diário</div><div style={{ color: "#A89A87", fontSize: 11 }}>"Você já fez sua afirmação hoje?"</div></div></div>
          <button onClick={() => setDraft(d => ({ ...d, reminder: !d.reminder }))} style={{ width: 44, height: 26, borderRadius: 20, border: "none", cursor: "pointer", position: "relative", background: draft.reminder ? "#C9923F" : "rgba(180,160,130,0.3)" }}><div style={{ width: 20, height: 20, borderRadius: "50%", background: "#FFFFFF", position: "absolute", top: 3, left: draft.reminder ? 21 : 3, transition: "left 0.2s" }} /></button>
        </Card>
        <PrimaryButton disabled={!draft.text.trim()} onClick={save}>Guardar no cofre <Check size={16} /></PrimaryButton>
      </div>
    </div>
  );
  return (
    <div>
      <TopBar title="Cofre de manifestações" right={<button onClick={() => setCreating(true)} style={{ background: "rgba(201,146,63,0.13)", border: "none", borderRadius: 10, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Plus size={16} color="#C9923F" /></button>} />
      <div style={{ padding: "0 20px 20px" }}>
        <p style={{ color: "#8A7D6B", fontSize: 13, lineHeight: 1.5, marginBottom: 20 }}>Crie sua própria realização, com prazo e lembrete diário.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {items.map(item => <Card key={item.id} style={{ padding: "16px", display: "flex", alignItems: "center", gap: 12, background: item.done ? "rgba(126,154,110,0.06)" : "#FFFFFF" }}>
            <div onClick={() => toggle(item.id)} style={{ width: 24, height: 24, borderRadius: "50%", flexShrink: 0, border: item.done ? "none" : "2px solid #D8CCB8", background: item.done ? "#7E9A6E" : "transparent", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}>{item.done && <Check size={13} color="#FFFFFF" />}</div>
            <div style={{ flex: 1 }}><div style={{ color: item.done ? "#6B7A60" : "#3D352C", fontSize: 14, textDecoration: item.done ? "line-through" : "none" }}>{item.text}</div><div style={{ display: "flex", gap: 8, marginTop: 3 }}><span style={{ color: "#A89A87", fontSize: 11 }}>{item.intention}</span>{item.deadline && <span style={{ color: "#5A88A3", fontSize: 11 }}>· {item.deadline}</span>}{item.reminder && !item.done && <Flame size={10} color="#C9923F" />}</div></div>
            {item.done && <Pill color="#7E9A6E" bg="rgba(126,154,110,0.13)">Realizado ✨</Pill>}
          </Card>)}
        </div>
      </div>
    </div>
  );
}

function CommunityScreen() {
  const [posts, setPosts] = useState(COMMUNITY_SEED);
  const [liked, setLiked] = useState({});
  const [filter, setFilter] = useState("Todos");
  const [reportModal, setReportModal] = useState(null);
  const [expanded, setExpanded] = useState({});
  const filters = ["Todos", ...INTENTIONS];
  const visible = filter === "Todos" ? posts : posts.filter(p => p.intention === filter);
  const toggleLike = (id) => { setLiked(l => ({ ...l, [id]: !l[id] })); setPosts(posts.map(p => p.id === id ? { ...p, likes: p.likes + (liked[id] ? -1 : 1) } : p)); };
  return (
    <div>
      <TopBar title="Comunidade" />
      <div style={{ padding: "0 0 20px" }}>
        <div style={{ display: "flex", gap: 8, overflowX: "auto", padding: "0 20px 16px" }}>
          {filters.map(f => <button key={f} onClick={() => setFilter(f)} style={{ flexShrink: 0, padding: "8px 14px", borderRadius: 20, border: "none", cursor: "pointer", background: filter === f ? "#C9923F" : "#FFFFFF", color: filter === f ? "#FFFFFF" : "#6B5F4F", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", boxShadow: filter === f ? "0 4px 12px rgba(201,146,63,0.3)" : "0 2px 8px rgba(120,100,70,0.06)" }}>{f}</button>)}
        </div>
        <div style={{ padding: "0 20px", marginBottom: 16 }}>
          <Card style={{ padding: "14px 16px", display: "flex", alignItems: "center", justifyContent: "space-between", background: "linear-gradient(135deg, #FBF1DE, #FFFFFF)" }}>
            <div><div style={{ color: "#3D352C", fontSize: 13, fontWeight: 700 }}>Desafio dos 21 dias — 369</div><div style={{ color: "#8A7D6B", fontSize: 11 }}>1.204 pessoas praticando junto</div></div>
            <Pill>Entrar</Pill>
          </Card>
        </div>
        <div style={{ padding: "0 20px", display: "flex", flexDirection: "column", gap: 14 }}>
          {visible.map(post => { const isLong = post.text.length > 160; const isOpen = expanded[post.id]; const displayText = isLong && !isOpen ? post.text.slice(0, 160) + "…" : post.text; return (
            <Card key={post.id} style={{ padding: "16px" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 10 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "linear-gradient(135deg,#E8C49B,#C9923F)", display: "flex", alignItems: "center", justifyContent: "center", color: "#FFFFFF", fontWeight: 700, fontSize: 13 }}>{post.initials}</div>
                  <div><div style={{ color: "#3D352C", fontSize: 13, fontWeight: 600 }}>{post.name}</div><div style={{ color: "#A89A87", fontSize: 11 }}>{post.days} dias · {post.technique} · {post.timeAgo}</div></div>
                </div>
                <button onClick={() => setReportModal(post)} style={{ background: "none", border: "none", cursor: "pointer", padding: 4 }}><ShieldAlert size={15} color="#C4B6A2" /></button>
              </div>
              <p style={{ color: "#4A4032", fontSize: 13.5, lineHeight: 1.6, marginBottom: 8 }}>{displayText}</p>
              {isLong && <button onClick={() => setExpanded(e => ({ ...e, [post.id]: !isOpen }))} style={{ background: "none", border: "none", color: "#C9923F", fontSize: 12, fontWeight: 600, padding: 0, marginBottom: 8, cursor: "pointer" }}>{isOpen ? "ver menos" : "ver mais"}</button>}
              <div style={{ display: "flex", gap: 16 }}>
                <button onClick={() => toggleLike(post.id)} style={{ background: "none", border: "none", display: "flex", alignItems: "center", gap: 5, cursor: "pointer" }}><Heart size={15} color={liked[post.id] ? "#C17F5C" : "#A89A87"} fill={liked[post.id] ? "#C17F5C" : "none"} /><span style={{ color: "#8A7D6B", fontSize: 12 }}>{post.likes}</span></button>
                <div style={{ display: "flex", alignItems: "center", gap: 5 }}><MessageCircle size={15} color="#A89A87" /><span style={{ color: "#8A7D6B", fontSize: 12 }}>{post.comments}</span></div>
              </div>
            </Card>
          ); })}
        </div>
      </div>
      {reportModal && <div style={{ position: "absolute", inset: 0, background: "rgba(61,53,44,0.4)", display: "flex", alignItems: "flex-end", zIndex: 50 }} onClick={() => setReportModal(null)}><div onClick={e => e.stopPropagation()} style={{ background: "#FFFFFF", width: "100%", borderRadius: "24px 24px 0 0", padding: "22px 22px 30px" }}><div style={{ width: 36, height: 4, background: "rgba(180,160,130,0.3)", borderRadius: 4, margin: "0 auto 18px" }} /><h3 style={{ color: "#3D352C", fontFamily: "'Fraunces', serif", fontSize: 17, margin: "0 0 6px" }}>Denunciar conteúdo</h3><p style={{ color: "#8A7D6B", fontSize: 12.5, lineHeight: 1.5, marginBottom: 18 }}>Ao denunciar, a conta de {reportModal.name} é automaticamente restrita enquanto nossa equipe revisa.</p><button onClick={() => setReportModal(null)} style={{ width: "100%", background: "rgba(193,127,92,0.13)", border: "1px solid rgba(193,127,92,0.35)", borderRadius: 14, padding: "13px", color: "#A45B3A", fontSize: 13.5, fontWeight: 700, cursor: "pointer", marginBottom: 10 }}>Confirmar denúncia</button><button onClick={() => setReportModal(null)} style={{ width: "100%", background: "none", border: "none", color: "#8A7D6B", fontSize: 13, padding: "10px", cursor: "pointer" }}>Cancelar</button></div></div>}
    </div>
  );
}

function WisdomPicker({ onPick, chosenToday }) {
  return (
    <div>
      <TopBar title="Sabedoria do dia" />
      <div style={{ padding: "0 20px 20px" }}>
        <p style={{ color: "#8A7D6B", fontSize: 13, lineHeight: 1.55, marginBottom: 20 }}>Escolha um pensador para ouvir hoje. Um por dia, pra mergulhar de verdade.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {WISDOM_AUTHORS.map(a => { const isChosen = chosenToday === a.id; return <button key={a.id} onClick={() => onPick(a.id)} style={{ background: isChosen ? a.bg : "#FFFFFF", border: isChosen ? `1.5px solid ${a.color}` : "1px solid rgba(180,160,130,0.18)", borderRadius: 16, padding: "14px 16px", display: "flex", alignItems: "center", gap: 12, cursor: "pointer", textAlign: "left", boxShadow: "0 2px 10px rgba(120,100,70,0.06)" }}><div style={{ width: 38, height: 38, borderRadius: "50%", background: a.bg, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}><BookOpen size={16} color={a.color} /></div><div style={{ flex: 1 }}><div style={{ color: "#3D352C", fontSize: 13.5, fontWeight: 700 }}>{a.author}</div><div style={{ color: "#A89A87", fontSize: 11.5 }}>{a.work}</div></div>{isChosen ? <Check size={16} color={a.color} /> : <ChevronRight size={15} color="#C4B6A2" />}</button>; })}
        </div>
      </div>
    </div>
  );
}

function WisdomDetail({ author, onBack }) {
  const [revealed, setRevealed] = useState(false);
  return (
    <div>
      <TopBar title={author.author} onBack={onBack} />
      <div style={{ padding: "0 20px 24px" }}>
        <Pill color={author.color} bg={author.bg}>{author.work}</Pill>
        <Card style={{ marginTop: 16, padding: "20px 18px", background: `linear-gradient(160deg, #FFFFFF, ${author.bg})` }}>
          <div style={{ color: "#A89A87", fontSize: 11, fontWeight: 700, marginBottom: 8 }}>O CONCEITO</div>
          <p style={{ color: "#3D352C", fontSize: 14.5, lineHeight: 1.65 }}>{author.idea}</p>
        </Card>
        <div style={{ marginTop: 18 }}>
          <div style={{ color: "#A89A87", fontSize: 11, fontWeight: 700, marginBottom: 10 }}>A TÉCNICA: {author.technique.name.toUpperCase()}</div>
          <Card style={{ padding: "16px 18px" }}>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {author.technique.steps.map((s, i) => <div key={i} style={{ display: "flex", gap: 10 }}><div style={{ width: 20, height: 20, borderRadius: "50%", background: author.bg, color: author.color, fontSize: 11, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, marginTop: 1 }}>{i + 1}</div><p style={{ color: "#4A4032", fontSize: 13, lineHeight: 1.55, margin: 0 }}>{s}</p></div>)}
            </div>
          </Card>
        </div>
        <div style={{ marginTop: 18 }}>
          <div style={{ color: "#A89A87", fontSize: 11, fontWeight: 700, marginBottom: 10 }}>REFLEXÃO DE LEITOR</div>
          <Card style={{ padding: "16px 18px" }}><p style={{ color: "#6B5F4F", fontSize: 13, lineHeight: 1.6, fontStyle: "italic", margin: 0 }}>{author.readerNote}</p></Card>
        </div>
        {!revealed ? <PrimaryButton onClick={() => setRevealed(true)} style={{ marginTop: 22, background: `linear-gradient(135deg, ${author.color}, ${author.color})` }}>Receber a afirmação de hoje <Sparkles size={16} /></PrimaryButton> : <Card style={{ marginTop: 22, padding: "26px 22px", textAlign: "center", background: `linear-gradient(160deg, #FFFFFF, ${author.bg})` }}><p style={{ fontFamily: "'Fraunces', serif", color: "#3D352C", fontSize: 18, lineHeight: 1.5, fontStyle: "italic", margin: 0 }}>"{author.affirmation}"</p></Card>}
      </div>
    </div>
  );
}

function WisdomScreen() {
  const [chosenId, setChosenId] = useState(null);
  const author = WISDOM_AUTHORS.find(a => a.id === chosenId);
  if (author) return <WisdomDetail author={author} onBack={() => setChosenId(null)} />;
  return <WisdomPicker onPick={setChosenId} chosenToday={chosenId} />;
}

function FrequencyPicker({ days, setDays, timesPerDay, setTimesPerDay }) {
  return (
    <div>
      <div style={{ color: "#8A7D6B", fontSize: 11.5, fontWeight: 700, marginBottom: 8 }}>QUE DIAS?</div>
      <div style={{ display: "flex", gap: 6, marginBottom: 18 }}>{WEEKDAYS.map(d => { const active = days.includes(d.id); return <button key={d.id} onClick={() => setDays(active ? days.filter(x => x !== d.id) : [...days, d.id])} style={{ width: 34, height: 34, borderRadius: "50%", border: active ? "none" : "1px solid rgba(180,160,130,0.3)", background: active ? "#C9923F" : "#FFFFFF", color: active ? "#FFFFFF" : "#8A7D6B", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>{d.label}</button>; })}</div>
      <div style={{ color: "#8A7D6B", fontSize: 11.5, fontWeight: 700, marginBottom: 8 }}>QUANTAS VEZES POR DIA?</div>
      <div style={{ display: "flex", gap: 8 }}>{[1, 2, 3, 4].map(n => <button key={n} onClick={() => setTimesPerDay(n)} style={{ flex: 1, padding: "10px", borderRadius: 12, border: timesPerDay === n ? "1.5px solid #C9923F" : "1px solid rgba(180,160,130,0.25)", background: timesPerDay === n ? "rgba(201,146,63,0.1)" : "#FFFFFF", color: "#3D352C", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{n}x</button>)}</div>
    </div>
  );
}

function MyAffirmationsScreen({ onBack }) {
  const [list, setList] = useState(INITIAL_CUSTOM_AFFIRMATIONS);
  const [creating, setCreating] = useState(false);
  const [text, setText] = useState("");
  const [days, setDays] = useState(["seg", "ter", "qua", "qui", "sex"]);
  const [timesPerDay, setTimesPerDay] = useState(1);
  const save = () => { if (!text.trim() || days.length === 0) return; setList([{ id: Date.now(), text, days, timesPerDay, active: true }, ...list]); setText(""); setDays(["seg", "ter", "qua", "qui", "sex"]); setTimesPerDay(1); setCreating(false); };
  const toggleActive = (id) => setList(list.map(a => a.id === id ? { ...a, active: !a.active } : a));
  const remove = (id) => setList(list.filter(a => a.id !== id));
  if (creating) return (
    <div>
      <TopBar title="Nova afirmação" onBack={() => setCreating(false)} />
      <div style={{ padding: "0 20px 24px" }}>
        <div style={{ color: "#8A7D6B", fontSize: 11.5, fontWeight: 700, marginBottom: 8 }}>SUA AFIRMAÇÃO</div>
        <Card style={{ padding: 4, marginBottom: 20 }}><textarea autoFocus value={text} onChange={e => setText(e.target.value)} placeholder="Escreva a frase que você quer ouvir de você mesma(o)..." style={{ width: "100%", minHeight: 90, border: "none", borderRadius: 16, padding: "14px", fontSize: 14, color: "#3D352C", outline: "none", resize: "vertical", fontFamily: "inherit" }} /></Card>
        <Card style={{ padding: "16px 18px", marginBottom: 22 }}><FrequencyPicker days={days} setDays={setDays} timesPerDay={timesPerDay} setTimesPerDay={setTimesPerDay} /></Card>
        <PrimaryButton disabled={!text.trim() || days.length === 0} onClick={save}>Salvar e ativar lembrete <Check size={16} /></PrimaryButton>
      </div>
    </div>
  );
  return (
    <div>
      <TopBar title="Minhas afirmações" onBack={onBack} right={<button onClick={() => setCreating(true)} style={{ background: "rgba(201,146,63,0.13)", border: "none", borderRadius: 10, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}><Plus size={16} color="#C9923F" /></button>} />
      <div style={{ padding: "0 20px 20px" }}>
        <p style={{ color: "#8A7D6B", fontSize: 13, lineHeight: 1.5, marginBottom: 18 }}>Crie suas próprias afirmações e escolha quando quer ser lembrada(o).</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {list.map(a => <Card key={a.id} style={{ padding: "16px" }}><p style={{ fontFamily: "'Fraunces', serif", color: "#3D352C", fontSize: 14.5, lineHeight: 1.5, fontStyle: "italic", marginBottom: 12 }}>"{a.text}"</p><div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}><div style={{ display: "flex", gap: 6, alignItems: "center" }}><Clock size={12} color="#A89A87" /><span style={{ color: "#8A7D6B", fontSize: 11.5 }}>{a.timesPerDay}x ao dia · {a.days.length === 7 ? "todos os dias" : `${a.days.length} dias/sem`}</span></div><div style={{ display: "flex", gap: 8 }}><button onClick={() => toggleActive(a.id)} style={{ background: a.active ? "rgba(126,154,110,0.13)" : "rgba(180,160,130,0.13)", border: "none", borderRadius: 10, padding: "5px 10px", color: a.active ? "#7E9A6E" : "#A89A87", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>{a.active ? "Ativo" : "Pausado"}</button><button onClick={() => remove(a.id)} style={{ background: "none", border: "none", color: "#C4B6A2", cursor: "pointer", padding: 4 }}><X size={14} /></button></div></div></Card>)}
        </div>
      </div>
    </div>
  );
}

function FutureLetterScreen({ onBack }) {
  const [mode, setMode] = useState("intro");
  const [letterText, setLetterText] = useState("");
  const [deliveryMonths, setDeliveryMonths] = useState(12);
  if (mode === "sealed") return (
    <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 28, textAlign: "center" }}>
      <div style={{ width: 80, height: 80, borderRadius: "50%", background: "#E6EFF3", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}><Sparkles size={34} color="#5A88A3" /></div>
      <h2 style={{ fontFamily: "'Fraunces', serif", color: "#3D352C", fontSize: 21, margin: "0 0 10px" }}>Sua carta está guardada</h2>
      <p style={{ color: "#8A7D6B", fontSize: 13.5, lineHeight: 1.6, marginBottom: 26 }}>Em {deliveryMonths} {deliveryMonths === 1 ? "mês" : "meses"}, você vai recebê-la de volta.</p>
      <PrimaryButton onClick={onBack}>Voltar ao início</PrimaryButton>
    </div>
  );
  if (mode === "writing") return (
    <div>
      <TopBar title="Carta para o futuro" onBack={() => setMode("intro")} />
      <div style={{ padding: "0 20px 24px" }}>
        <p style={{ color: "#8A7D6B", fontSize: 12.5, lineHeight: 1.5, marginBottom: 14 }}>Escreva livremente. Como você está, o que está sentindo, o que espera.</p>
        <Card style={{ padding: 4, marginBottom: 18 }}><textarea value={letterText} onChange={e => setLetterText(e.target.value)} placeholder="Querido eu do futuro..." style={{ width: "100%", minHeight: 220, border: "none", borderRadius: 16, padding: "16px", fontSize: 14, color: "#3D352C", outline: "none", resize: "vertical", fontFamily: "'Fraunces', serif", lineHeight: 1.6 }} /></Card>
        <div style={{ color: "#8A7D6B", fontSize: 11.5, fontWeight: 700, marginBottom: 8 }}>QUANDO QUER RECEBER DE VOLTA?</div>
        <div style={{ display: "flex", gap: 8, marginBottom: 22 }}>{[3, 6, 12].map(m => <button key={m} onClick={() => setDeliveryMonths(m)} style={{ flex: 1, padding: "12px", borderRadius: 12, border: deliveryMonths === m ? "1.5px solid #5A88A3" : "1px solid rgba(180,160,130,0.25)", background: deliveryMonths === m ? "#E6EFF3" : "#FFFFFF", color: "#3D352C", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>{m} meses</button>)}</div>
        <PrimaryButton disabled={!letterText.trim()} onClick={() => setMode("sealed")} style={{ background: "linear-gradient(135deg, #6FA0BD, #5A88A3)" }}>Lacrar carta <Sparkles size={16} /></PrimaryButton>
      </div>
    </div>
  );
  return (
    <div>
      <TopBar title="Carta para o futuro" onBack={onBack} />
      <div style={{ padding: "0 20px 24px" }}>
        <Card style={{ padding: "28px 22px", textAlign: "center", background: "linear-gradient(160deg, #FFFFFF, #E6EFF3)", marginBottom: 20 }}>
          <div style={{ width: 60, height: 60, borderRadius: "50%", background: "#FFFFFF", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><BookOpen size={26} color="#5A88A3" /></div>
          <p style={{ fontFamily: "'Fraunces', serif", color: "#3D352C", fontSize: 17, lineHeight: 1.5, fontStyle: "italic" }}>"Uma carta que só você vai ler — escrita por quem você é hoje, entregue a quem você será."</p>
        </Card>
        <p style={{ color: "#6B5F4F", fontSize: 13, lineHeight: 1.6, marginBottom: 24 }}>Escreva como você está se sentindo agora. O app guarda em segredo e devolve no prazo que você escolher.</p>
        <PrimaryButton onClick={() => setMode("writing")} style={{ background: "linear-gradient(135deg, #6FA0BD, #5A88A3)" }}>Escrever minha carta <ArrowRight size={16} /></PrimaryButton>
      </div>
    </div>
  );
}

function PaywallModal({ onClose }) {
  const handleSubscribe = () => { window.open(MERCADO_PAGO_SUBSCRIPTION_LINK, "_blank"); };
  return (
    <div style={{ position: "absolute", inset: 0, background: "rgba(61,53,44,0.45)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 60, padding: 20 }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{ background: "#FFFFFF", border: "1px solid rgba(201,146,63,0.2)", borderRadius: 26, padding: "30px 24px", width: "100%", maxWidth: 360, textAlign: "center", boxShadow: "0 30px 60px rgba(61,53,44,0.25)" }}>
        <div style={{ width: 56, height: 56, borderRadius: "50%", background: "rgba(201,146,63,0.13)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px" }}><Lock size={24} color="#C9923F" /></div>
        <h2 style={{ fontFamily: "'Fraunces', serif", color: "#3D352C", fontSize: 21, margin: "0 0 8px" }}>3 dias grátis, sem cartão</h2>
        <p style={{ color: "#8A7D6B", fontSize: 13, lineHeight: 1.5, marginBottom: 22 }}>Desbloqueie todas as técnicas, voz personalizada e o cofre completo.</p>
        <div style={{ textAlign: "left", display: "flex", flexDirection: "column", gap: 10, marginBottom: 22 }}>
          {["Todas as técnicas de manifestação", "Afirmações narradas com sua voz", "Cofre de manifestações ilimitado", "Desafios exclusivos da comunidade"].map(f => <div key={f} style={{ display: "flex", alignItems: "center", gap: 10 }}><Check size={15} color="#7E9A6E" /><span style={{ color: "#4A4032", fontSize: 13 }}>{f}</span></div>)}
        </div>
        <PrimaryButton onClick={handleSubscribe}>Começar 3 dias gratuitos</PrimaryButton>
        <p style={{ color: "#A89A87", fontSize: 11, marginTop: 10 }}>Depois, R$ 39,00/mês · cancele a qualquer momento</p>
        <button onClick={onClose} style={{ background: "none", border: "none", color: "#A89A87", fontSize: 12.5, marginTop: 14, cursor: "pointer" }}>Agora não</button>
      </div>
    </div>
  );
}

export default function App() {
  const [stage, setStage] = useState("mood");
  const [mood, setMood] = useState(null);
  const [screen, setScreen] = useState("home");
  const [techniqueOpen, setTechniqueOpen] = useState(null);
  const [celebrating, setCelebrating] = useState(null);
  const [showPaywall, setShowPaywall] = useState(false);
  const user = { name: "Você", mood: mood || "esperancoso", streak: 6 };

  let body;
  if (stage === "mood") body = <OnboardingMood onSelect={(m) => { setMood(m); setStage("intention"); }} />;
  else if (stage === "intention") body = <OnboardingIntention onSelect={() => setStage("reveal")} />;
  else if (stage === "reveal") body = <AffirmationReveal mood={mood} onContinue={() => setStage("app")} />;
  else if (celebrating) body = <div style={{ height: "100%", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, textAlign: "center" }}><div style={{ width: 80, height: 80, borderRadius: "50%", background: celebrating.bg, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}><Flame size={36} color={celebrating.color} fill={celebrating.color} /></div><h2 style={{ fontFamily: "'Fraunces', serif", color: "#3D352C", fontSize: 22, margin: "0 0 8px" }}>Prática concluída</h2><p style={{ color: "#8A7D6B", fontSize: 14, lineHeight: 1.5, marginBottom: 28 }}>Pequenos rituais consistentes constroem transformação real.</p><PrimaryButton onClick={() => { setCelebrating(null); setTechniqueOpen(null); setScreen("home"); }}>Voltar ao início</PrimaryButton></div>;
  else if (techniqueOpen) body = <TechniqueDetail technique={techniqueOpen} onBack={() => setTechniqueOpen(null)} onComplete={(t) => setCelebrating(t)} />;
  else if (screen === "home") body = <HomeScreen user={user} setScreen={setScreen} openTechnique={(t) => setTechniqueOpen(t)} setShowPaywall={setShowPaywall} />;
  else if (screen === "techniques") body = <TechniquesScreen openTechnique={(t) => setTechniqueOpen(t)} />;
  else if (screen === "vault") body = <VaultScreen />;
  else if (screen === "community") body = <CommunityScreen />;
  else if (screen === "wisdom") body = <WisdomScreen />;
  else if (screen === "myAffirmations") body = <MyAffirmationsScreen onBack={() => setScreen("home")} />;
  else if (screen === "futureLetter") body = <FutureLetterScreen onBack={() => setScreen("home")} />;

  const showNav = stage === "app" && !techniqueOpen && !celebrating;
  const navActive = ["wisdom", "myAffirmations", "futureLetter"].includes(screen) ? "home" : screen;

  return (
    <div style={{ width: "100%", minHeight: "100vh", background: "#F0E9DD", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px 12px" }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,500;9..144,600&family=Inter:wght@400;500;600;700&display=swap'); *{box-sizing:border-box;} ::-webkit-scrollbar{display:none;}`}</style>
      <ScreenShell footer={showNav ? <NavBar active={navActive} setScreen={setScreen} /> : null}>
        {body}
      </ScreenShell>
      {showPaywall && <div style={{ position: "fixed", inset: 0, zIndex: 100 }}><div style={{ width: "100%", maxWidth: 430, height: 860, margin: "24px auto", position: "relative", borderRadius: 36, overflow: "hidden" }}><PaywallModal onClose={() => setShowPaywall(false)} /></div></div>}
      <p style={{ color: "#A89A87", fontSize: 11.5, marginTop: 20, textAlign: "center" }}>Manifesta · seu espaço de transformação 🌙</p>
    </div>
  );
}
