<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import confetti from 'canvas-confetti';

// Props pour recevoir les données de la partie
interface Props {
  players: Array<{ name: string; status: string }>;
  partyCode: string;
}

const props = defineProps<Props>();

// État du modal et du résultat
const showResultModal = ref(false);
const gameResult = ref<'win' | 'lose' | null>(null);
const winner = ref<string>('');

// Simuler la fin de partie
const endGame = (result: 'win' | 'lose') => {
    gameResult.value = result;
    winner.value = result === 'win' ? 'Vous' : props.players.find(p => p.name !== 'Vous')?.name || 'Adversaire';
    showResultModal.value = false;
    
    if (result === 'win') {
        confetti({
            particleCount: 1000,
            spread: 500,
            origin: { y: 0.5 }
        });
    }
};

// Réinitialiser pour une nouvelle partie
const GoToLobby = () => {
  window.location.href = '/play'; // Rediriger vers la page d'accueil ou du lobby
};
</script>

<template>
  <div class="flex flex-col items-center justify-center p-4 sm:p-6">
    <div class="w-full max-w-sm space-y-6">
      <!-- Statut de la partie -->
      <div class="text-center">
        <p class="text-lg font-semibold text-muted-foreground">
          La partie est en cours...
        </p>
      </div>

      <!-- Liste des joueurs -->
      <div>
        <h3 class="text-lg font-semibold text-center mb-4">Joueurs</h3>
        <div class="space-y-2">
          <div
            v-for="player in players"
            :key="player.name"
            class="flex items-center justify-between p-3 bg-muted rounded-lg"
          >
            <span class="font-medium">{{ player.name }}</span>
            <span class="text-sm text-muted-foreground">{{ player.status }}</span>
          </div>
        </div>
      </div>

      <!-- Résultat de la partie (si terminée) -->
      <div v-if="gameResult" class="text-center space-y-4">
        <div class="p-4 rounded-lg" :class="gameResult === 'win' ? 'bg-green-500 text-white' : 'bg-muted'">
          <h3 class="text-lg font-bold mb-2">
            Partie terminée !
          </h3>
          <p class="text-muted-foreground" :class="gameResult === 'win' ? 'text-white' : ''">
            Gagnant : <span class="font-semibold" :class="gameResult === 'win' ? 'text-white' : ''">{{ winner }}</span>
          </p>
        </div>
        <Button
          @click="GoToLobby()"
          variant="outline"
          class="w-full"
        >
          Retour à l'accueil
        </Button>
      </div>

      <!-- Bouton terminer la partie (si partie en cours) -->
      <div v-else>
        <Button
          @click="showResultModal = true"
          class="w-full text-base sm:text-lg font-bold"
          
        >
          Terminer la partie
        </Button>

        <!-- Modal pour le résultat -->
        <div
          v-if="showResultModal"
          class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          @click="showResultModal = false"
        >
          <div
            class="bg-background p-6 rounded-lg shadow-lg max-w-sm w-full mx-4"
            @click.stop
          >
            <h3 class="text-lg font-bold mb-4 text-center">Résultat de la partie</h3>
            <p class="text-muted-foreground mb-6 text-center">
              Qui a gagné cette partie ?
            </p>
            <div class="space-y-3">
              <Button
                @click="endGame('win')"
                class="w-full text-lg font-bold bg-green-600 hover:bg-green-700"
              >
                J'ai gagné ! 🏆
              </Button>
              <Button
                @click="endGame('lose')"
                variant="outline"
                class="w-full text-lg font-bold border-red-500 text-red-600 hover:bg-red-50"
              >
                J'ai perdu 😔
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>