<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import GameInProgress from '@/components/GameInProgress.vue';
import confetti from 'canvas-confetti';

// Générer un code de 4 chiffres aléatoires
const generatePartyCode = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

const partyCode = ref(generatePartyCode());
const gameStarted = ref(false);

// Liste des joueurs en attente (pour l'instant statique)
const waitingPlayers = ref([
  { name: 'Vous', status: 'Prêt' },
  { name: 'Joueur 2', status: 'Prêt' }
]);

const copyCodeToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(partyCode.value);
    
    // Détection mobile
    const isMobile = window.innerWidth <= 768;
    
    confetti({
      particleCount: 100,
      spread: 100,
      origin: isMobile ? { y: 0.55, x: 0.5 } : { y: 0.45, x: 0.6 }
    });
  } catch (err) {
    console.error('Erreur lors de la copie:', err);
  }
};

const emit = defineEmits<{
  gameStarted: []
}>();

const startGame = () => {
  gameStarted.value = true;
  emit('gameStarted');
};
</script>

<template>
  <div class="flex flex-col items-center justify-center p-4 sm:p-6">
    <!-- Affichage de la partie en cours -->
    <GameInProgress
      v-if="gameStarted"
      :players="waitingPlayers"
      :party-code="partyCode"
    />

    <!-- Affichage du lobby d'attente -->
    <div v-else class="w-full max-w-sm space-y-6">
      <!-- Titre -->
      <h2 class="text-xl sm:text-2xl font-bold text-center text-foreground">
        Lobby de partie
      </h2>

      <!-- Code de la partie -->
      <div class="text-center">
        <p class="text-sm text-muted-foreground mb-2">Code de la partie :</p>
        <div 
          class="text-2xl sm:text-3xl font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg cursor-pointer hover:bg-primary/20 transition-colors"
          @click="copyCodeToClipboard"
        >
          {{ partyCode }}
        </div>
        <p class="text-xs text-muted-foreground mt-2">
          Cliquez pour copier le code
        </p>
      </div>

      <!-- Liste des joueurs -->
      <div>
        <h3 class="text-lg font-semibold text-center mb-4">Joueurs en attente</h3>
        <div class="space-y-2">
          <div
            v-for="player in waitingPlayers"
            :key="player.name"
            class="flex items-center justify-between p-3 bg-muted rounded-lg"
          >
            <span class="font-medium">{{ player.name }}</span>
            <span class="text-sm text-muted-foreground">{{ player.status }}</span>
          </div>
        </div>
      </div>

      <!-- Bouton démarrer (désactivé tant qu'il n'y a pas assez de joueurs) -->
      <Button
        @click="startGame"
        class="w-full text-base sm:text-lg font-bold"
        :disabled="waitingPlayers.length < 2"
      >
        {{ waitingPlayers.length < 2 ? 'En attente d\'un autre joueur...' : 'Lancer la partie' }}
      </Button>
    </div>
  </div>
</template>