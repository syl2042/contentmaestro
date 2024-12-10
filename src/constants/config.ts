export const APP_CONFIG = {
  name: 'ContentMaestro',
  version: '1.0.0',
  dateFormat: {
    full: {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    },
    short: {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }
  }
} as const;