import { useState, useEffect, useRef } from 'react'
import {
  GAMES, CATEGORY_META, HOBBY_OPTIONS, FOOD_OPTIONS, PERSONALITY_OPTIONS,
  TRAVEL_OPTIONS, ENTERTAINMENT_OPTIONS, generateTopics,
  type GameCategory, type SelfProfile, type MbtiType, type Game, type Topic,
} from './data'
import {
  ArrowLeft, Home, BookOpen, Users, ChevronRight, ChevronDown,
  RefreshCw, MessageCircle, Gamepad, Lightbulb, Shuffle,
  BlockStack, Star, Clock, WordChain, Calendar,
  HelpCircle, UserGroup, HeartSync, Scale, Wand,
  Search, Hand, LoopCircle, Music, Voice,
  RaiseHand, ChairSwap, Pen, WolfChat, Moon,
  SpeechBan, Grid, Trophy,
} from './Icons'

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
  bg:           '#F5F9FF',
  surface:      '#FFFFFF',
  surfaceAlt:   '#EEF5FF',
  border:       '#DBEAFE',
  borderLight:  '#EFF6FF',
  primary:      '#2B77E6',
  primaryDark:  '#1D5FBF',
  primaryLight: '#EFF6FF',
  primaryMid:   '#BFDBFE',
  sky:          '#7DD3FC',
  skyLight:     '#F0F9FF',
  accent:       '#FCD34D',
  accentLight:  '#FFFBEB',
  text:         '#1E293B',
  textMid:      '#334155',
  sub:          '#64748B',
  muted:        '#94A3B8',
  chip:         '#DBEAFE',
  chipText:     '#1E40AF',
}

// ─── Shared primitives ────────────────────────────────────────────────────────
function Chip({ label, active, onClick }: { label: string; active: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="px-3 py-1.5 rounded-full text-sm font-medium transition-all"
      style={{
        backgroundColor: active ? C.primary : C.chip,
        color: active ? '#fff' : C.chipText,
        border: `1.5px solid ${active ? C.primary : C.border}`,
      }}
    >
      {label}
    </button>
  )
}

function BackBtn({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      className="flex items-center gap-1.5 text-sm font-medium transition-colors"
      style={{ color: C.sub }}
    >
      <ArrowLeft size={16} color={C.sub} />
      戻る
    </button>
  )
}

function HomeBar({ onHome }: { onHome: () => void }) {
  return (
    <div
      className="fixed bottom-0 left-1/2 z-50 flex justify-center pb-6"
      style={{ transform: 'translateX(-50%)', width: '100%', maxWidth: 480, pointerEvents: 'none' }}
    >
      <button
        onClick={onHome}
        className="flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all active:scale-95"
        style={{
          backgroundColor: C.surface,
          border: `1.5px solid ${C.border}`,
          color: C.primary,
          pointerEvents: 'auto',
          boxShadow: '0 4px 24px rgba(43,119,230,0.15)',
        }}
      >
        <Home size={15} color={C.primary} />
        ホームに戻る
      </button>
    </div>
  )
}

function Divider({ label, color = C.muted, lineColor = C.border }: { label: string; color?: string; lineColor?: string }) {
  return (
    <div className="flex items-center gap-3 mb-3">
      <div className="flex-1 h-px" style={{ backgroundColor: lineColor }} />
      <span className="text-xs font-bold tracking-wider" style={{ color }}>{label}</span>
      <div className="flex-1 h-px" style={{ backgroundColor: lineColor }} />
    </div>
  )
}

// Icon badge used in mode/category cards
function IconBadge({ children, bg, size = 44 }: { children: React.ReactNode; bg: string; size?: number }) {
  return (
    <div
      className="flex items-center justify-center flex-shrink-0 rounded-xl"
      style={{ width: size, height: size, backgroundColor: bg }}
    >
      {children}
    </div>
  )
}

// ─── Home ─────────────────────────────────────────────────────────────────────
function ModeSelect({ onSelect }: { onSelect: (m: 'prep' | 'live') => void }) {
  return (
    <div className="flex flex-col min-h-screen px-6" style={{ paddingTop: 80, paddingBottom: 40 }}>

      {/* Hero */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl mb-4" style={{ backgroundColor: C.primaryLight }}>
          <MessageCircle size={26} color={C.primary} />
        </div>
        <h1 className="text-3xl font-black tracking-tight mb-1" style={{ color: C.text, letterSpacing: '-0.02em' }}>
          HANASO
        </h1>
        <p className="text-sm font-medium" style={{ color: C.sub }}>「はじめまして」に、青空を。</p>
      </div>

      {/* Mode cards */}
      <div className="flex flex-col gap-3 flex-1">
        <button
          onClick={() => onSelect('prep')}
          className="w-full rounded-2xl p-5 text-left flex items-center gap-4 transition-all active:scale-98"
          style={{ backgroundColor: C.surface, border: `1.5px solid ${C.border}`, boxShadow: '0 1px 8px rgba(43,119,230,0.06)' }}
        >
          <IconBadge bg={C.primaryLight}>
            <BookOpen size={22} color={C.primary} />
          </IconBadge>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-base mb-0.5" style={{ color: C.text }}>予習モード</div>
            <div className="text-sm leading-relaxed" style={{ color: C.sub }}>
              自己分析から話題を準備して会う前に備えよう
            </div>
          </div>
          <ChevronRight size={18} color={C.muted} />
        </button>

        <button
          onClick={() => onSelect('live')}
          className="w-full rounded-2xl p-5 text-left flex items-center gap-4 transition-all active:scale-98"
          style={{
            background: `linear-gradient(140deg, ${C.primary} 0%, #1A5FCC 100%)`,
            border: `1.5px solid ${C.primary}`,
            boxShadow: '0 4px 20px rgba(43,119,230,0.30)',
          }}
        >
          <IconBadge bg="rgba(255,255,255,0.18)">
            <Users size={22} color="#fff" />
          </IconBadge>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-base mb-0.5" style={{ color: '#fff' }}>対面モード</div>
            <div className="text-sm leading-relaxed" style={{ color: '#BFDBFE' }}>
              ゲームや話題カードで今すぐ盛り上げよう
            </div>
          </div>
          <ChevronRight size={18} color="#BFDBFE" />
        </button>
      </div>

      <p className="text-center text-xs mt-10" style={{ color: C.muted }}>
        話せない を 話せる に変えよう
      </p>
    </div>
  )
}

// ─── Prep ─────────────────────────────────────────────────────────────────────
const MBTI_LIST: MbtiType[] = [
  'INTJ','INTP','ENTJ','ENTP','INFJ','INFP','ENFJ','ENFP',
  'ISTJ','ISFJ','ESTJ','ESFJ','ISTP','ISFP','ESTP','ESFP','不明',
]

function PrepAnalysis({ onDone }: { onDone: (p: SelfProfile) => void }) {
  const [step, setStep] = useState(0)
  const [profile, setProfile] = useState<SelfProfile>({
    hobbies: [], foods: { likes: [], dislikes: [] }, personality: [], mbti: '', travel: [], entertainment: [],
  })

  const toggle = (key: keyof Omit<SelfProfile, 'foods' | 'mbti'>, val: string) =>
    setProfile(p => { const arr = p[key] as string[]; return { ...p, [key]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] } })

  const toggleFood = (sub: 'likes' | 'dislikes', val: string) =>
    setProfile(p => {
      const arr = p.foods[sub]; const other = sub === 'likes' ? 'dislikes' : 'likes'
      return { ...p, foods: { ...p.foods, [other]: p.foods[other].filter(x => x !== val), [sub]: arr.includes(val) ? arr.filter(x => x !== val) : [...arr, val] } }
    })

  const steps = [
    {
      title: '趣味・興味', sub: '好きなことを選んでください（複数OK）',
      content: <div className="flex flex-wrap gap-2">{HOBBY_OPTIONS.map(h => <Chip key={h} label={h} active={profile.hobbies.includes(h)} onClick={() => toggle('hobbies', h)} />)}</div>,
    },
    {
      title: '食べ物の好み', sub: '好きなものと苦手なものを選んでください',
      content: (
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-xs font-bold mb-2.5" style={{ color: C.muted }}>好き</p>
            <div className="flex flex-wrap gap-2">{FOOD_OPTIONS.map(f => <Chip key={f} label={f} active={profile.foods.likes.includes(f)} onClick={() => toggleFood('likes', f)} />)}</div>
          </div>
          <div>
            <p className="text-xs font-bold mb-2.5" style={{ color: C.muted }}>苦手・嫌い</p>
            <div className="flex flex-wrap gap-2">{FOOD_OPTIONS.map(f => <Chip key={f} label={f} active={profile.foods.dislikes.includes(f)} onClick={() => toggleFood('dislikes', f)} />)}</div>
          </div>
        </div>
      ),
    },
    {
      title: '性格・MBTI', sub: '自分に当てはまるものを選んでください（複数OK）',
      content: (
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-xs font-bold mb-2.5" style={{ color: C.muted }}>性格</p>
            <div className="flex flex-wrap gap-2">{PERSONALITY_OPTIONS.map(p => <Chip key={p} label={p} active={profile.personality.includes(p)} onClick={() => toggle('personality', p)} />)}</div>
          </div>
          <div>
            <p className="text-xs font-bold mb-2.5" style={{ color: C.muted }}>MBTI（わかれば）</p>
            <div className="flex flex-wrap gap-2">{MBTI_LIST.map(m => <Chip key={m} label={m} active={profile.mbti === m} onClick={() => setProfile(p => ({ ...p, mbti: m as MbtiType }))} />)}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'エンタメ・旅行', sub: '好きなエンタメや旅行スタイルを選んでください',
      content: (
        <div className="flex flex-col gap-5">
          <div>
            <p className="text-xs font-bold mb-2.5" style={{ color: C.muted }}>旅行スタイル</p>
            <div className="flex flex-wrap gap-2">{TRAVEL_OPTIONS.map(t => <Chip key={t} label={t} active={profile.travel.includes(t)} onClick={() => toggle('travel', t)} />)}</div>
          </div>
          <div>
            <p className="text-xs font-bold mb-2.5" style={{ color: C.muted }}>エンタメ</p>
            <div className="flex flex-wrap gap-2">{ENTERTAINMENT_OPTIONS.map(e => <Chip key={e} label={e} active={profile.entertainment.includes(e)} onClick={() => toggle('entertainment', e)} />)}</div>
          </div>
        </div>
      ),
    },
  ]

  const cur = steps[step]

  return (
    <div className="flex flex-col h-full" style={{ paddingTop: 70 }}>
      <div className="px-5 mb-5">
        <div className="flex items-center justify-between mb-3">
          {step > 0 ? <BackBtn onClick={() => setStep(s => s - 1)} /> : <div />}
          <span className="text-xs font-semibold" style={{ color: C.muted }}>{step + 1} / {steps.length}</span>
        </div>
        <div className="h-1 rounded-full overflow-hidden" style={{ backgroundColor: C.border }}>
          <div
            className="h-full rounded-full transition-all duration-400"
            style={{ width: `${((step + 1) / steps.length) * 100}%`, backgroundColor: C.primary }}
          />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-4">
        <h2 className="text-xl font-bold mb-1" style={{ color: C.text }}>{cur.title}</h2>
        <p className="text-sm mb-5" style={{ color: C.sub }}>{cur.sub}</p>
        {cur.content}
      </div>

      <div className="px-5 pb-20 pt-4" style={{ borderTop: `1px solid ${C.border}` }}>
        <button
          onClick={() => step < steps.length - 1 ? setStep(s => s + 1) : onDone(profile)}
          className="w-full py-3.5 rounded-xl font-bold text-white transition-all active:scale-98"
          style={{ backgroundColor: C.primary, boxShadow: '0 4px 16px rgba(43,119,230,0.22)' }}
        >
          {step < steps.length - 1 ? '次へ' : '話題を生成する'}
        </button>
      </div>
    </div>
  )
}

function PrepTopics({ profile, onBack }: { profile: SelfProfile; onBack: () => void }) {
  const topics = generateTopics(profile)
  const [expanded, setExpanded] = useState<number | null>(0)

  return (
    <div className="flex flex-col h-full" style={{ paddingTop: 70 }}>
      <div className="px-5 mb-5 flex items-center gap-3">
        <BackBtn onClick={onBack} />
        <div className="flex-1">
          <h2 className="font-bold text-base" style={{ color: C.text }}>話題の提案</h2>
          <p className="text-xs" style={{ color: C.muted }}>{topics.length}件のトピック</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 flex flex-col gap-2">
        {topics.map((t, i) => (
          <div
            key={i}
            className="rounded-2xl overflow-hidden transition-all"
            style={{ backgroundColor: C.surface, border: `1.5px solid ${expanded === i ? C.primaryMid : C.border}` }}
          >
            <button
              className="w-full p-4 flex items-center gap-3 text-left"
              onClick={() => setExpanded(expanded === i ? null : i)}
            >
              <div className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0 text-base" style={{ backgroundColor: C.primaryLight }}>
                {t.emoji}
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-xs font-semibold mb-0.5" style={{ color: C.primary }}>{t.theme}</div>
                <div className="text-sm font-medium leading-snug" style={{ color: C.text }}>{t.question}</div>
              </div>
              <div style={{ transform: expanded === i ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s', flexShrink: 0 }}>
                <ChevronDown size={16} color={C.muted} />
              </div>
            </button>
            {expanded === i && (
              <div className="px-4 pb-4">
                <div className="rounded-xl p-3" style={{ backgroundColor: C.primaryLight, border: `1px solid ${C.primaryMid}` }}>
                  <p className="text-xs font-bold mb-1" style={{ color: C.primary }}>フォローアップ</p>
                  <p className="text-sm" style={{ color: C.sub }}>{t.followUp}</p>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// ─── Live select ──────────────────────────────────────────────────────────────
function LiveSelect({ onSelect, onBack }: { onSelect: (m: 'game' | 'topic') => void; onBack: () => void }) {
  return (
    <div className="flex flex-col h-full px-5" style={{ paddingTop: 70 }}>
      <div className="mb-7">
        <BackBtn onClick={onBack} />
        <h2 className="text-xl font-bold mt-4 mb-1" style={{ color: C.text }}>対面モード</h2>
        <p className="text-sm" style={{ color: C.sub }}>どちらで盛り上がりますか？</p>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={() => onSelect('game')}
          className="w-full rounded-2xl p-5 text-left flex items-center gap-4 transition-all active:scale-98"
          style={{ backgroundColor: C.surface, border: `1.5px solid ${C.border}`, boxShadow: '0 1px 8px rgba(43,119,230,0.06)' }}
        >
          <IconBadge bg={C.primaryLight}>
            <Gamepad size={22} color={C.primary} />
          </IconBadge>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm mb-0.5" style={{ color: C.text }}>ゲームモード</div>
            <div className="text-xs leading-relaxed" style={{ color: C.sub }}>みんなで遊べるゲームのルール説明と提案</div>
          </div>
          <ChevronRight size={18} color={C.muted} />
        </button>

        <button
          onClick={() => onSelect('topic')}
          className="w-full rounded-2xl p-5 text-left flex items-center gap-4 transition-all active:scale-98"
          style={{ backgroundColor: C.surface, border: `1.5px solid ${C.border}`, boxShadow: '0 1px 8px rgba(43,119,230,0.06)' }}
        >
          <IconBadge bg={C.primaryLight}>
            <MessageCircle size={22} color={C.primary} />
          </IconBadge>
          <div className="flex-1 min-w-0">
            <div className="font-bold text-sm mb-0.5" style={{ color: C.text }}>話題モード</div>
            <div className="text-xs leading-relaxed" style={{ color: C.sub }}>ルーレットで会話のきっかけをつくろう</div>
          </div>
          <ChevronRight size={18} color={C.muted} />
        </button>
      </div>
    </div>
  )
}

// ─── Game icon map (SVG line icons per game) ──────────────────────────────────
type GameIconFn = (color: string) => React.ReactNode
const GAME_ICON_FNS: Record<string, GameIconFn> = {
  'tsumiki':             c => <BlockStack size={20} color={c} strokeWidth={1.8} />,
  'suki-na':             c => <Star size={20} color={c} strokeWidth={1.8} />,
  'saikin-tanoshikatta': c => <Clock size={20} color={c} strokeWidth={1.8} />,
  'jiko-shiritori':      c => <WordChain size={20} color={c} strokeWidth={1.8} />,
  'birthday-line':       c => <Calendar size={20} color={c} strokeWidth={1.8} />,
  'uso-honto':           c => <HelpCircle size={20} color={c} strokeWidth={1.8} />,
  'junin-toiro':         c => <UserGroup size={20} color={c} strokeWidth={1.8} />,
  'ishin-denshin':       c => <HeartSync size={20} color={c} strokeWidth={1.8} />,
  'kyukyoku-nитaku':     c => <Scale size={20} color={c} strokeWidth={1.8} />,
  'moshimo':             c => <Wand size={20} color={c} strokeWidth={1.8} />,
  'dare-desho':          c => <Search size={20} color={c} strokeWidth={1.8} />,
  'silent-gesture':      c => <Hand size={20} color={c} strokeWidth={1.8} />,
  'yamanote':            c => <LoopCircle size={20} color={c} strokeWidth={1.8} />,
  'minori':              c => <Music size={20} color={c} strokeWidth={1.8} />,
  'mozzarella':          c => <Voice size={20} color={c} strokeWidth={1.8} />,
  'takenoko':            c => <RaiseHand size={20} color={c} strokeWidth={1.8} />,
  'nandemo-basket':      c => <ChairSwap size={20} color={c} strokeWidth={1.8} />,
  'eshiritori':          c => <Pen size={20} color={c} strokeWidth={1.8} />,
  'word-wolf':           c => <WolfChat size={20} color={c} strokeWidth={1.8} />,
  'jinro':               c => <Moon size={20} color={c} strokeWidth={1.8} />,
  'ng-word':             c => <SpeechBan size={20} color={c} strokeWidth={1.8} />,
  'kokon-tozai':         c => <Grid size={20} color={c} strokeWidth={1.8} />,
  'ogiri':               c => <Trophy size={20} color={c} strokeWidth={1.8} />,
}
const GAME_ICONS: Record<string, React.ReactNode> = Object.fromEntries(
  Object.entries(GAME_ICON_FNS).map(([k, fn]) => [k, fn(C.primary)])
)
const GAME_ICONS_WHITE: Record<string, React.ReactNode> = Object.fromEntries(
  Object.entries(GAME_ICON_FNS).map(([k, fn]) => [k, fn('#fff')])
)

// ─── Game mode intro ──────────────────────────────────────────────────────────

function GameModeIntro({ onNext, onBack }: { onNext: () => void; onBack: () => void }) {
  const steps = ['モード選択', 'ゲームを知る', 'ゲームを選ぶ']
  return (
    <div className="flex flex-col h-full px-6" style={{ paddingTop: 70 }}>
      <div className="mb-7"><BackBtn onClick={onBack} /></div>

      {/* Step indicator */}
      <div className="flex items-center mb-10">
        {steps.map((label, i) => (
          <div key={i} className="flex items-center flex-1 min-w-0">
            <div className="flex flex-col items-center gap-1 flex-shrink-0">
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{
                  backgroundColor: i === 1 ? C.primary : i < 1 ? C.primaryMid : C.border,
                  color: i === 1 ? '#fff' : i < 1 ? C.primaryDark : C.muted,
                }}
              >{i + 1}</div>
              <span className="text-xs font-medium whitespace-nowrap" style={{ color: i === 1 ? C.primary : C.muted }}>{label}</span>
            </div>
            {i < 2 && <div className="flex-1 h-px mx-1 mb-3" style={{ backgroundColor: i < 1 ? C.primaryMid : C.border }} />}
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 rounded-2xl flex items-center justify-center" style={{ backgroundColor: C.primaryLight }}>
            <Gamepad size={30} color={C.primary} />
          </div>
        </div>
        <h1 className="text-2xl font-black leading-snug text-center mb-4" style={{ color: C.text, letterSpacing: '-0.01em' }}>
          ゲームを通して、<br />自然に会話を始めよう
        </h1>
        <p className="text-sm leading-loose text-center mb-6" style={{ color: C.sub }}>
          初対面の人とも楽しめるゲームで<br />会話のきっかけをつくります。
        </p>

        <p className="text-sm font-semibold text-center mb-3" style={{ color: C.primary }}>今の関係から選べる3つのモード</p>

        {/* Category preview */}
        <div className="flex flex-col gap-2">
          {(['intro', 'deeper', 'play'] as GameCategory[]).map(cat => {
            const m = CATEGORY_META[cat]
            return (
              <div key={cat} className="flex items-center gap-3 px-4 py-3 rounded-xl" style={{ backgroundColor: m.light, border: `1.5px solid ${m.border}` }}>
                <span className="text-2xl flex-shrink-0 leading-none">{m.icon}</span>
                <div className="flex-1">
                  <span className="text-sm font-bold" style={{ color: m.color }}>{m.label}</span>
                </div>
                <span className="text-xs font-medium" style={{ color: m.color }}>
                  {GAMES.filter(g => g.category === cat).length}種類
                </span>
              </div>
            )
          })}
        </div>
      </div>

      <div className="pb-20 pt-6">
        <button
          onClick={onNext}
          className="w-full py-4 rounded-xl font-bold text-white text-base transition-all active:scale-98"
          style={{ backgroundColor: C.primary, boxShadow: '0 4px 16px rgba(43,119,230,0.25)' }}
        >
          ゲームを選ぶ
        </button>
      </div>
    </div>
  )
}

// ─── Game list ────────────────────────────────────────────────────────────────
type GameFilter = 'all' | GameCategory

function GameList({ onSelect, onBack }: { onSelect: (g: Game) => void; onBack: () => void }) {
  const [filter, setFilter] = useState<GameFilter>('all')

  const filterTabs: { id: GameFilter; label: string }[] = [
    { id: 'all',    label: 'すべて' },
    { id: 'intro',  label: `${CATEGORY_META.intro.icon} ${CATEGORY_META.intro.label}` },
    { id: 'deeper', label: `${CATEGORY_META.deeper.icon} ${CATEGORY_META.deeper.label}` },
    { id: 'play',   label: `${CATEGORY_META.play.icon} ${CATEGORY_META.play.label}` },
  ]

  const groups = (['intro', 'deeper', 'play'] as GameCategory[])
    .map(cat => ({ cat, games: GAMES.filter(g => g.category === cat && (filter === 'all' || filter === cat)) }))
    .filter(g => g.games.length > 0)

  return (
    <div className="flex flex-col h-full" style={{ paddingTop: 70 }}>
      <div className="px-5 mb-3">
        <BackBtn onClick={onBack} />
        <h2 className="text-xl font-bold mt-4 mb-0.5" style={{ color: C.text }}>ゲームを選ぼう</h2>
        <p className="text-sm" style={{ color: C.sub }}>タップしてルールを確認しよう</p>
      </div>

      {/* Filter tabs */}
      <div className="px-5 mb-4 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
        <div className="flex gap-2 w-max">
          {filterTabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setFilter(tab.id)}
              className="px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all"
              style={{
                backgroundColor: filter === tab.id ? C.primary : C.surface,
                color: filter === tab.id ? '#fff' : C.sub,
                border: `1.5px solid ${filter === tab.id ? C.primary : C.border}`,
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 flex flex-col gap-6">
        {groups.map(({ cat, games }) => {
          const m = CATEGORY_META[cat]
          return (
            <div key={cat}>
              {/* Category header */}
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg leading-none flex-shrink-0">{m.icon}</span>
                <span className="text-sm font-bold" style={{ color: m.color }}>{m.label}</span>
                <div className="flex-1 h-px" style={{ backgroundColor: m.border }} />
              </div>

              <div className="flex flex-col gap-2">
                {games.map(g => (
                  <button
                    key={g.id}
                    onClick={() => onSelect(g)}
                    className="w-full rounded-2xl p-4 flex items-center gap-3 text-left transition-all active:scale-98"
                    style={{ backgroundColor: C.surface, border: `1.5px solid ${C.border}` }}
                  >
                    <div
                      className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: C.primaryLight }}
                    >
                      {GAME_ICONS[g.id] ?? <Gamepad size={20} color={C.primary} strokeWidth={1.8} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm mb-0.5" style={{ color: C.text }}>{g.name}</div>
                      <div className="text-xs leading-snug" style={{ color: C.sub, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{g.summary}</div>
                      <div className="flex gap-1.5 mt-1.5 flex-wrap">
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: C.chip, color: C.chipText }}>
                          {g.players}
                        </span>
                        <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: C.surfaceAlt, color: C.muted }}>
                          {g.duration}
                        </span>
                        {g.needsItems && (
                          <span className="text-xs px-2 py-0.5 rounded-full font-medium" style={{ backgroundColor: '#FFFBEB', color: '#92400E' }}>
                            道具あり
                          </span>
                        )}
                      </div>
                    </div>
                    <ChevronRight size={16} color={C.muted} />
                  </button>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ─── Game detail ──────────────────────────────────────────────────────────────
function GameDetail({ game, onBack }: { game: Game; onBack: () => void }) {
  const [showExtra, setShowExtra] = useState(false)
  const m = CATEGORY_META[game.category]

  return (
    <div className="flex flex-col h-full" style={{ paddingTop: 70 }}>
      <div className="px-5 mb-4"><BackBtn onClick={onBack} /></div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 flex flex-col gap-4">
        {/* Header card */}
        <div className="rounded-2xl p-5" style={{ background: `linear-gradient(140deg, ${C.primary} 0%, ${C.primaryDark} 100%)` }}>
          <div className="flex items-start gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: 'rgba(255,255,255,0.18)' }}>
              {GAME_ICONS_WHITE[game.id] ?? <Gamepad size={22} color="#fff" strokeWidth={1.8} />}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-semibold mb-1" style={{ color: '#BFDBFE' }}>{m.icon} {m.label}</div>
              <h2 className="text-xl font-black leading-tight" style={{ color: '#fff' }}>{game.name}</h2>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap mb-3">
            <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: 'rgba(255,255,255,0.18)', color: '#fff' }}>
              {game.players}
            </span>
            <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: 'rgba(255,255,255,0.18)', color: '#fff' }}>
              {game.duration}
            </span>
            {game.needsItems && (
              <span className="text-xs px-2.5 py-1 rounded-full font-medium" style={{ backgroundColor: 'rgba(255,255,255,0.18)', color: '#fff' }}>
                道具あり
              </span>
            )}
          </div>
          <p className="text-sm leading-relaxed" style={{ color: '#DBEAFE' }}>{game.summary}</p>
        </div>

        {/* Rules */}
        <div className="rounded-2xl p-5" style={{ backgroundColor: C.surface, border: `1.5px solid ${C.border}` }}>
          <p className="text-xs font-bold tracking-widest mb-4" style={{ color: C.muted }}>ルール説明</p>
          <div className="flex flex-col gap-3">
            {game.rules.map((r, i) => (
              <div key={i} className="flex items-start gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5"
                  style={{ backgroundColor: C.primaryLight, color: C.primary }}
                >
                  {i + 1}
                </div>
                <p className="text-sm leading-relaxed flex-1" style={{ color: C.textMid }}>{r}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        {game.tips.length > 0 && (
          <div className="rounded-2xl p-4 flex gap-3" style={{ backgroundColor: C.accentLight, border: `1.5px solid ${C.accent}` }}>
            <Lightbulb size={18} color="#B45309" strokeWidth={1.8} />
            <div className="flex flex-col gap-1">
              {game.tips.map((t, i) => <p key={i} className="text-sm" style={{ color: '#92400E' }}>{t}</p>)}
            </div>
          </div>
        )}

        {/* Extra rules */}
        <div className="rounded-2xl overflow-hidden" style={{ border: `1.5px solid ${C.border}` }}>
          <button
            className="w-full p-4 flex items-center justify-between transition-colors"
            onClick={() => setShowExtra(v => !v)}
            style={{ backgroundColor: C.surfaceAlt }}
          >
            <div className="flex items-center gap-2">
              <div className="w-5 h-5 rounded-md flex items-center justify-center" style={{ backgroundColor: C.primaryLight }}>
                <span style={{ fontSize: 11 }}>✦</span>
              </div>
              <span className="font-bold text-sm" style={{ color: C.text }}>追加ルールの提案</span>
            </div>
            <div style={{ transform: showExtra ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
              <ChevronDown size={16} color={C.muted} />
            </div>
          </button>
          {showExtra && (
            <div className="p-4 flex flex-col gap-3" style={{ backgroundColor: C.surface }}>
              {game.extraRules.map((r, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5" style={{ backgroundColor: C.chip, color: C.chipText }}>
                    {i + 1}
                  </div>
                  <p className="text-sm leading-relaxed flex-1" style={{ color: C.textMid }}>{r}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// ─── Topic roulette ───────────────────────────────────────────────────────────
const LIVE_TOPICS: Topic[] = [
  { emoji: '🌅', theme: '最近のこと', question: '最近ハマっていることはありますか？', followUp: '趣味・グルメ・動画など何でもOK！' },
  { emoji: '✈️', theme: '旅行', question: '行ってみたい場所はどこですか？', followUp: '国内でも海外でも！' },
  { emoji: '🍜', theme: 'グルメ', question: '無人島に一品だけ持っていくなら何？', followUp: '意外な答えが出るかも！' },
  { emoji: '🎬', theme: 'エンタメ', question: '最近見た映画やドラマでおすすめは？', followUp: 'ジャンル問わず教えて！' },
  { emoji: '🌙', theme: 'ライフスタイル', question: '朝型？夜型？理由も教えて！', followUp: '生活スタイルについて話してみよう' },
  { emoji: '🐾', theme: '動物', question: '犬派？猫派？それとも別の動物が好き？', followUp: '盛り上がる定番トピック！' },
  { emoji: '💭', theme: 'もしも', question: '明日から一週間休みが取れたら何をする？', followUp: '理想の過ごし方を想像してみよう！' },
  { emoji: '🏆', theme: '得意なこと', question: '自分が一番得意なことは何ですか？', followUp: '小さなことでも自慢してOK！' },
  { emoji: '📖', theme: '子どもの頃', question: '子どもの頃、将来の夢は何でしたか？', followUp: 'あの頃の自分を振り返ってみよう' },
  { emoji: '🎵', theme: '音楽', question: '今の気分にぴったりな曲は何ですか？', followUp: 'テンションが上がる曲、落ち着く曲など' },
]

function TopicMode({ onBack }: { onBack: () => void }) {
  const [spinning, setSpinning] = useState(false)
  const [current, setCurrent] = useState<Topic | null>(null)
  const [landed, setLanded] = useState<Topic | null>(null)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)

  const spin = () => {
    if (spinning) return
    setSpinning(true)
    setLanded(null)
    let speed = 55, elapsed = 0
    const total = 2600
    const tick = () => {
      setCurrent(LIVE_TOPICS[Math.floor(Math.random() * LIVE_TOPICS.length)])
      elapsed += speed
      if (elapsed >= total) {
        if (intervalRef.current) clearInterval(intervalRef.current)
        const result = LIVE_TOPICS[Math.floor(Math.random() * LIVE_TOPICS.length)]
        setCurrent(result); setLanded(result); setSpinning(false)
        return
      }
      if (elapsed > total * 0.6) speed = Math.min(speed + 20, 280)
      if (intervalRef.current) clearInterval(intervalRef.current)
      intervalRef.current = setInterval(tick, speed)
    }
    intervalRef.current = setInterval(tick, speed)
  }

  useEffect(() => () => { if (intervalRef.current) clearInterval(intervalRef.current) }, [])

  return (
    <div className="flex flex-col h-full" style={{ paddingTop: 70 }}>
      <div className="px-5 mb-5">
        <BackBtn onClick={onBack} />
        <h2 className="font-bold text-lg mt-3" style={{ color: C.text }}>話題ルーレット</h2>
        <p className="text-xs mt-0.5" style={{ color: C.muted }}>スピンして話題を決めよう</p>
      </div>

      <div className="flex-1 overflow-y-auto px-5 pb-24 flex flex-col items-center gap-5">
        {/* Slot window */}
        <div
          className="w-full rounded-3xl relative overflow-hidden"
          style={{
            minHeight: 200,
            backgroundColor: C.surface,
            border: `2px solid ${spinning ? C.primary : C.border}`,
            boxShadow: spinning ? `0 0 0 3px ${C.primaryMid}` : '0 2px 16px rgba(43,119,230,0.07)',
            transition: 'box-shadow 0.3s, border-color 0.3s',
          }}
        >
          <div className="absolute inset-x-0 top-0 h-12 z-10 pointer-events-none" style={{ background: `linear-gradient(to bottom, ${C.surface}, transparent)` }} />
          <div className="absolute inset-x-0 bottom-0 h-12 z-10 pointer-events-none" style={{ background: `linear-gradient(to top, ${C.surface}, transparent)` }} />
          <div className="absolute inset-x-0 z-20 pointer-events-none" style={{ top: '50%', transform: 'translateY(-50%)', height: 1.5, backgroundColor: C.primaryMid }} />

          <div className="flex flex-col items-center justify-center px-6 py-6" style={{ minHeight: 200 }}>
            {!current && !spinning && (
              <div className="text-center">
                <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-3" style={{ backgroundColor: C.primaryLight }}>
                  <Shuffle size={22} color={C.primary} />
                </div>
                <p className="text-sm font-medium" style={{ color: C.muted }}>スピンボタンを押してね</p>
              </div>
            )}
            {(spinning || current) && current && (
              <div className="text-center py-2 w-full">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-2xl mx-auto mb-2" style={{ backgroundColor: C.primaryLight }}>
                  {current.emoji}
                </div>
                <div className="text-xs font-bold px-3 py-1 rounded-full inline-block mb-3" style={{ backgroundColor: C.chip, color: C.chipText }}>
                  {current.theme}
                </div>
                <p className="text-lg font-bold leading-snug" style={{ color: C.text }}>{current.question}</p>
              </div>
            )}
          </div>
        </div>

        {/* Spin button */}
        <button
          onClick={spin}
          disabled={spinning}
          className="flex items-center gap-2.5 px-10 py-4 rounded-full font-bold text-white transition-all active:scale-95 disabled:opacity-60"
          style={{
            background: spinning ? C.muted : `linear-gradient(135deg, ${C.primary} 0%, #0EA5E9 100%)`,
            boxShadow: spinning ? 'none' : '0 4px 20px rgba(43,119,230,0.30)',
            fontSize: 15,
          }}
        >
          {spinning
            ? <><RefreshCw size={18} color="#fff" /><span>スピン中…</span></>
            : <><Shuffle size={18} color="#fff" /><span>{landed ? 'もう一回！' : 'スピン！'}</span></>
          }
        </button>

        {/* Follow-up */}
        {landed && !spinning && (
          <div className="w-full rounded-2xl p-4" style={{ backgroundColor: C.primaryLight, border: `1.5px solid ${C.primaryMid}` }}>
            <p className="text-xs font-bold mb-1" style={{ color: C.primary }}>フォローアップ</p>
            <p className="text-sm" style={{ color: C.sub }}>{landed.followUp}</p>
          </div>
        )}

        {/* Topic grid */}
        {landed && !spinning && (
          <div className="w-full">
            <p className="text-xs font-semibold mb-2" style={{ color: C.muted }}>他のトピック</p>
            <div className="grid grid-cols-5 gap-2">
              {LIVE_TOPICS.map((t, i) => (
                <button
                  key={i}
                  onClick={() => { setLanded(t); setCurrent(t) }}
                  className="aspect-square rounded-xl flex items-center justify-center text-xl transition-all"
                  style={{
                    backgroundColor: landed.question === t.question ? C.primaryLight : C.surface,
                    border: `1.5px solid ${landed.question === t.question ? C.primaryMid : C.border}`,
                  }}
                >
                  {t.emoji}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <style>{`@keyframes spin-icon { to { transform: rotate(360deg); } }`}</style>
    </div>
  )
}

// ─── App root ─────────────────────────────────────────────────────────────────
type Screen =
  | { id: 'home' }
  | { id: 'prep-analysis' }
  | { id: 'prep-topics'; profile: SelfProfile }
  | { id: 'live-select' }
  | { id: 'live-game-intro' }
  | { id: 'live-game-list' }
  | { id: 'live-game-detail'; game: Game }
  | { id: 'live-topic' }

export default function App() {
  const [screen, setScreen] = useState<Screen>({ id: 'home' })
  const go = (s: Screen) => setScreen(s)
  const home = () => go({ id: 'home' })
  const isHome = screen.id === 'home'

  return (
    <div className="min-h-screen flex flex-col relative" style={{ backgroundColor: C.bg, maxWidth: 480, margin: '0 auto' }}>
      {screen.id === 'home'          && <ModeSelect onSelect={m => go(m === 'prep' ? { id: 'prep-analysis' } : { id: 'live-select' })} />}
      {screen.id === 'prep-analysis' && <PrepAnalysis onDone={profile => go({ id: 'prep-topics', profile })} />}
      {screen.id === 'prep-topics'   && <PrepTopics profile={(screen as any).profile} onBack={() => go({ id: 'prep-analysis' })} />}
      {screen.id === 'live-select'   && <LiveSelect onSelect={m => go(m === 'game' ? { id: 'live-game-intro' } : { id: 'live-topic' })} onBack={() => go({ id: 'home' })} />}
      {screen.id === 'live-game-intro' && <GameModeIntro onNext={() => go({ id: 'live-game-list' })} onBack={() => go({ id: 'live-select' })} />}
      {screen.id === 'live-game-list'  && <GameList onSelect={game => go({ id: 'live-game-detail', game })} onBack={() => go({ id: 'live-game-intro' })} />}
      {screen.id === 'live-game-detail' && <GameDetail game={(screen as any).game} onBack={() => go({ id: 'live-game-list' })} />}
      {screen.id === 'live-topic'    && <TopicMode onBack={() => go({ id: 'live-select' })} />}
      {!isHome && <HomeBar onHome={home} />}
    </div>
  )
}
