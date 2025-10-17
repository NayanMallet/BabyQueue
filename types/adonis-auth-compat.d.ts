// Fournit des alias/types de secours pour les utilitaires d'@adonisjs/auth
// (certaines versions du package n'exportent pas `InferAuthenticators` / `InferAuthEvents`)
// Ces définitions évitent les erreurs d'import et laissent TypeScript inférer via
// la déclaration faite dans `config/auth.ts`.

declare module '@adonisjs/auth/types' {
  // Types génériques d'inférence (fallback à any pour compatibilité)
  export type InferAuthenticators<T> = any
  export type InferAuthEvents<T> = any

  // Exporter aussi Authenticators pour que les imports explicites fonctionnent
  export interface Authenticators {}
}
