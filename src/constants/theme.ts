export const COLORS = {
  primary: '#2B6CB0',
  secondary: '#E2E8F0',
  accent: '#ED8936',
  stats: {
    projects: {
      bg: '#EBF5FF',
      text: '#1E40AF',
      icon: '#3B82F6'
    },
    content: {
      bg: '#F0FDF4',
      text: '#166534',
      icon: '#22C55E'
    },
    profiles: {
      bg: '#FEF3F2',
      text: '#B42318',
      icon: '#EF4444'
    },
    satisfaction: {
      bg: '#FEF9C3',
      text: '#854D0E',
      icon: '#EAB308'
    }
  }
} as const;

export const TRANSITIONS = {
  default: 'transition-all duration-200',
  hover: 'hover:shadow-md hover:translate-y-[-2px]'
} as const;