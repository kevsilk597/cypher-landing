// Cypher Design Tokens — Single source of truth
// DM Serif Display (headlines), Source Sans 3 (body), JetBrains Mono (data).
// Gold: #4A90D9. Background: #0D0D0D.

export const colors = {
  // Text
  textPrimary:   '#F5F7FB',
  textSecondary: '#A2A8B6',
  textTertiary:  '#5B6372',
  textMuted:     '#5B6372',

  // Brand
  gold:          '#CFAE3C',
  goldLight:     '#E3C765',
  goldGlow:      'rgba(207,174,60,0.2)',

  // Surfaces
  bgPage:        '#090A0D',
  bgSurface:     '#101217',
  bgElevated:    '#151922',
  border:        'rgba(255,255,255,0.08)',
  borderGold:    'rgba(207,174,60,0.28)',

  // Semantic
  red:           '#E04040',
  blue:          '#4A90D9',
  green:         '#3DAF6A',

  // Shadows (as a nested object for convenience)
  shadows: {
    glow: '0 0 30px rgba(74,144,217,0.2)',
  },
} as const;

export const typography = {
  serif:  "'DM Serif Display', Georgia, serif",
  sans:   "'Source Sans 3', system-ui, sans-serif",
  mono:   "'JetBrains Mono', monospace",
} as const;

export const prismaticGradient = 'conic-gradient(from 0deg, #4A90D9, #E8A4B8, #A4B8E8, #285E95, #4A90D9)';
