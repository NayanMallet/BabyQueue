// Helper d'augmentation de types pour s'assurer que l'IDE/TS voit les guards 'api' et 'web'
// (évite les erreurs où TS n'infère qu'un seul guard)

declare module '@adonisjs/auth/types' {
  // On déclare les authenticators comme any pour être permissifs.
  // Idéalement vous pourriez affiner ces types si nécessaire plus tard.
  export interface Authenticators {
    api: any
    web: any
  }
}

