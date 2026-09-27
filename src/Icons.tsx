type IconProps = { size?: number; color?: string; strokeWidth?: number }

const d = (size: number, color: string, sw: number) => ({
  width: size, height: size,
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: color,
  strokeWidth: sw,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
})

export function ArrowLeft({ size = 20, color = 'currentColor', strokeWidth = 2 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><path d="M19 12H5M5 12l7 7M5 12l7-7" /></svg>
}
export function Home({ size = 18, color = 'currentColor', strokeWidth = 2 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><path d="M3 9.5L12 3l9 6.5V20a1 1 0 01-1 1H4a1 1 0 01-1-1V9.5z" /><path d="M9 21V12h6v9" /></svg>
}
export function BookOpen({ size = 22, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" /><path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" /></svg>
}
export function Users({ size = 22, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" /></svg>
}
export function ChevronRight({ size = 18, color = 'currentColor', strokeWidth = 2 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><path d="M9 18l6-6-6-6" /></svg>
}
export function ChevronDown({ size = 16, color = 'currentColor', strokeWidth = 2 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><path d="M6 9l6 6 6-6" /></svg>
}
export function RefreshCw({ size = 20, color = 'currentColor', strokeWidth = 2 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><path d="M23 4v6h-6" /><path d="M1 20v-6h6" /><path d="M3.51 9a9 9 0 0114.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0020.49 15" /></svg>
}
export function Shuffle({ size = 20, color = 'currentColor', strokeWidth = 2 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><polyline points="16 3 21 3 21 8" /><line x1="4" y1="20" x2="21" y2="3" /><polyline points="21 16 21 21 16 21" /><line x1="15" y1="15" x2="21" y2="21" /><line x1="4" y1="4" x2="9" y2="9" /></svg>
}
export function MessageCircle({ size = 22, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" /></svg>
}
export function Gamepad({ size = 22, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><line x1="6" y1="12" x2="10" y2="12" /><line x1="8" y1="10" x2="8" y2="14" /><line x1="15" y1="13" x2="15.01" y2="13" /><line x1="18" y1="11" x2="18.01" y2="11" /><rect x="2" y="6" width="20" height="12" rx="2" /></svg>
}
export function Sparkles({ size = 20, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z" /></svg>
}
export function Lightbulb({ size = 18, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><line x1="9" y1="18" x2="15" y2="18" /><line x1="10" y1="22" x2="14" y2="22" /><path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" /></svg>
}
export function Plus({ size = 20, color = 'currentColor', strokeWidth = 2 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><line x1="12" y1="5" x2="12" y2="19" /><line x1="5" y1="12" x2="19" y2="12" /></svg>
}
export function Minus({ size = 20, color = 'currentColor', strokeWidth = 2 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}><line x1="5" y1="12" x2="19" y2="12" /></svg>
}

// ── Category icons (used only in standalone icon contexts, NOT in stage labels) ─
export function WaveHands({ size = 22, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}>
    <path d="M7 11.5V7a1.5 1.5 0 013 0v4" />
    <path d="M10 10.5V6a1.5 1.5 0 013 0v5" />
    <path d="M13 10.5V8a1.5 1.5 0 013 0v4.5" />
    <path d="M16 11.5V10a1.5 1.5 0 013 0v2c0 4-3 7-7 7a6 6 0 01-6-6v-1" />
    <path d="M7 11.5a1.5 1.5 0 00-3 0v1" />
  </svg>
}
export function Layers({ size = 22, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}>
    <polygon points="12 2 2 7 12 12 22 7 12 2" />
    <polyline points="2 12 12 17 22 12" />
    <polyline points="2 17 12 22 22 17" />
  </svg>
}
export function PlayTogether({ size = 22, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}>
    <circle cx="9" cy="7" r="3" />
    <circle cx="17" cy="7" r="3" />
    <path d="M3 21v-1a5 5 0 015-5h4a5 5 0 015 5v1" />
    <path d="M17 15h2a3 3 0 013 3v1" />
  </svg>
}

// ── Game-specific icons (unified line style, same stroke weight) ───────────────
// 積み木式自己紹介 — stacked blocks
export function BlockStack({ size = 20, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}>
    <rect x="3" y="14" width="8" height="6" rx="1" />
    <rect x="7" y="8" width="8" height="6" rx="1" />
    <rect x="11" y="2" width="8" height="6" rx="1" />
  </svg>
}
// 好きな○○ — star / favorite
export function Star({ size = 20, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}>
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
}
// 最近楽しかった○○ — clock / recent
export function Clock({ size = 20, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
}
// 自己紹介しりとり — word chain / hash
export function WordChain({ size = 20, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}>
    <path d="M4 6h16M4 12h16M4 18h16" />
    <path d="M8 4l-4 8 4 8" />
    <path d="M16 4l4 8-4 8" />
  </svg>
}
// バースデーライン — calendar
export function Calendar({ size = 20, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
}
// うそほんとゲーム — question bubble
export function HelpCircle({ size = 20, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
    <line x1="12" y1="17" x2="12.01" y2="17" strokeWidth={2.5} />
  </svg>
}
// 十人十色ゲーム — multi-user / different people
export function UserGroup({ size = 20, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}>
    <circle cx="8" cy="8" r="3" />
    <circle cx="16" cy="8" r="3" />
    <path d="M2 20v-1a5 5 0 015-5h2" />
    <path d="M22 20v-1a5 5 0 00-5-5h-2" />
  </svg>
}
// 以心伝心ゲーム — two hearts / sync
export function HeartSync({ size = 20, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}>
    <path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z" />
  </svg>
}
// 究極の二択 — balance / scale
export function Scale({ size = 20, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}>
    <line x1="12" y1="3" x2="12" y2="21" />
    <path d="M5 6l7-3 7 3" />
    <path d="M3 12l2-6 4 6H3z" />
    <path d="M21 12l-2-6-4 6h6z" />
    <line x1="8" y1="21" x2="16" y2="21" />
  </svg>
}
// もしも○○ — wand / imagination
export function Wand({ size = 20, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}>
    <line x1="3" y1="21" x2="21" y2="3" />
    <path d="M12.5 8.5l1 1" />
    <path d="M7.5 13.5l1 1" />
    <path d="M19 4l1-1" />
    <path d="M4 19l-1 1" />
    <path d="M17 6l1-1" />
    <path d="M6 17l-1 1" />
  </svg>
}
// 私は誰でしょう — search / identity
export function Search({ size = 20, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}>
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
}
// サイレントジェスチャー — hand / gesture
export function Hand({ size = 20, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}>
    <path d="M18 11V6a2 2 0 00-2-2 2 2 0 00-2 2" />
    <path d="M14 10V4a2 2 0 00-2-2 2 2 0 00-2 2v2" />
    <path d="M10 10.5V6a2 2 0 00-2-2 2 2 0 00-2 2v8" />
    <path d="M18 8a2 2 0 114 0v6a8 8 0 01-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 012.83-2.82L7 15" />
  </svg>
}
// 山手線ゲーム — loop / train route
export function LoopCircle({ size = 20, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}>
    <polyline points="1 4 1 10 7 10" />
    <polyline points="23 20 23 14 17 14" />
    <path d="M20.49 9A9 9 0 005.64 5.64L1 10M23 14l-4.64 4.36A9 9 0 013.51 15" />
  </svg>
}
// みのりかリズム4 — music / rhythm
export function Music({ size = 20, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}>
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
}
// モッツァレラゲーム — voice / speak
export function Voice({ size = 20, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}>
    <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
    <path d="M19 10v2a7 7 0 01-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
}
// タケノコニョッキ — fingers up / raise hand
export function RaiseHand({ size = 20, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}>
    <line x1="12" y1="20" x2="12" y2="8" />
    <polyline points="8 12 12 8 16 12" />
    <line x1="8" y1="20" x2="8" y2="14" />
    <line x1="16" y1="20" x2="16" y2="14" />
    <line x1="4" y1="20" x2="20" y2="20" />
  </svg>
}
// なんでもバスケット — chair swap / circle
export function ChairSwap({ size = 20, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}>
    <path d="M8 3a5 5 0 015 5M3 8a5 5 0 005 5" />
    <path d="M16 3a5 5 0 00-5 5M21 8a5 5 0 01-5 5" />
    <circle cx="12" cy="19" r="2" />
    <line x1="12" y1="13" x2="12" y2="17" />
  </svg>
}
// 絵しりとり — pen / draw
export function Pen({ size = 20, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}>
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 013 3L7 19l-4 1 1-4L16.5 3.5z" />
  </svg>
}
// ワードウルフ — speech + hidden / wolf
export function WolfChat({ size = 20, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    <line x1="9" y1="10" x2="9.01" y2="10" strokeWidth={2.5} />
    <line x1="12" y1="10" x2="12.01" y2="10" strokeWidth={2.5} />
    <line x1="15" y1="10" x2="15.01" y2="10" strokeWidth={2.5} />
  </svg>
}
// 人狼 — moon / night / hidden role
export function Moon({ size = 20, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}>
    <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
  </svg>
}
// NGワード — speech ban
export function SpeechBan({ size = 20, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}>
    <path d="M21 15a2 2 0 01-2 2H7l-4 4V5a2 2 0 012-2h14a2 2 0 012 2z" />
    <line x1="9" y1="9" x2="15" y2="15" />
    <line x1="15" y1="9" x2="9" y2="15" />
  </svg>
}
// 古今東西 — grid / categories
export function Grid({ size = 20, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}>
    <rect x="3" y="3" width="7" height="7" />
    <rect x="14" y="3" width="7" height="7" />
    <rect x="14" y="14" width="7" height="7" />
    <rect x="3" y="14" width="7" height="7" />
  </svg>
}
// 大喜利系 — trophy / comedy
export function Trophy({ size = 20, color = 'currentColor', strokeWidth = 1.8 }: IconProps) {
  return <svg {...d(size, color, strokeWidth)}>
    <path d="M6 9H4.5a2.5 2.5 0 010-5H6" />
    <path d="M18 9h1.5a2.5 2.5 0 000-5H18" />
    <path d="M4 22h16" />
    <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
    <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
    <path d="M18 2H6v7a6 6 0 0012 0V2z" />
  </svg>
}
