<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Button } from '@/components/ui/button';

const code = ref<string[]>([]);
const maxDigits = 4;
const isMobile = ref(false);
const hasJoined = ref(false);
const joinedPartyCode = ref('');

const isCodeComplete = computed(() => code.value.length === maxDigits);

// Détection de la taille d'écran
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768; // 768px = breakpoint md de Tailwind
};

const addDigit = (digit: number) => {
  if (code.value.length < maxDigits) {
    code.value.push(digit.toString());
  }
};

const deleteDigit = () => {
  code.value.pop();
};

const handleKeyPress = (event: KeyboardEvent) => {
  // Ignorer si on est sur mobile
  if (isMobile.value) return;

  const key = event.key;
  
  // Gérer les chiffres (0-9)
  if (/^[0-9]$/.test(key)) {
    event.preventDefault();
    addDigit(parseInt(key));
  }
  
  // Gérer la suppression (Backspace ou Delete)
  if (key === 'Backspace' || key === 'Delete') {
    event.preventDefault();
    deleteDigit();
  }
  
  // Gérer la validation (Enter)
  if (key === 'Enter' && isCodeComplete.value) {
    event.preventDefault();
    joinParty();
  }
};

const joinParty = () => {
  if (isCodeComplete.value) {
    const partyCode = code.value.join('');
    console.log('Rejoindre avec le code:', partyCode);
    // Simuler la connexion à la partie
    hasJoined.value = true;
    joinedPartyCode.value = partyCode;
    // Ici vous ajouterez la logique réelle pour rejoindre la partie
  }
};

onMounted(() => {
  checkScreenSize();
  window.addEventListener('resize', checkScreenSize);
  window.addEventListener('keydown', handleKeyPress);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkScreenSize);
  window.removeEventListener('keydown', handleKeyPress);
});
</script>

<template>
  <div class="flex flex-col items-center justify-center p-4 sm:p-6">
    <div class="w-full max-w-sm space-y-6">
      <!-- Affichage du lobby après avoir rejoint -->
      <div v-if="hasJoined">
        <!-- Titre -->
        <h2 class="text-xl sm:text-2xl font-bold text-center text-foreground">
          Lobby de partie
        </h2>

        <!-- Code de la partie -->
        <div class="text-center">
          <p class="text-sm text-muted-foreground mb-2">Code de la partie :</p>
          <div class="text-2xl sm:text-3xl font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg">
            {{ joinedPartyCode }}
          </div>
          <p class="text-xs text-muted-foreground mt-2">
            Vous avez rejoint cette partie
          </p>
        </div>

        <!-- Liste des joueurs -->
        <div>
          <h3 class="text-lg font-semibold text-center mb-4">En attente de l'hôte</h3>
          <div class="space-y-2">
            <div class="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span class="font-medium">Vous</span>
              <span class="text-sm text-muted-foreground">Prêt</span>
            </div>
            <div class="flex items-center justify-between p-3 bg-muted rounded-lg">
              <span class="font-medium">Joueur 1</span>
              <span class="text-sm text-muted-foreground">Prêt</span>
            </div>
          </div>
        </div>

        <!-- Bouton démarrer (désactivé tant qu'il n'y a pas assez de joueurs) -->
        <Button
          class="w-full text-base sm:text-lg font-bold mt-6"
          disabled
        >
          En attente du lancement...
        </Button>
      </div>

      <!-- Formulaire de saisie du code (affiché si pas encore rejoint) -->
      <div v-else>
        <!-- Titre -->
        <h2 class="text-xl sm:text-2xl font-bold text-center text-foreground">
          Rejoindre une partie privée
        </h2>
        
        <!-- Instructions pour PC -->
        <p v-if="!isMobile" class="text-sm text-center text-muted-foreground">
          Tapez le code avec votre clavier
        </p>
        
        <!-- Affichage du code -->
        <div class="flex gap-2 sm:gap-3 justify-center">
          <div 
            v-for="i in maxDigits" 
            :key="i"
            class="w-14 h-16 sm:w-16 sm:h-20 border-2 rounded-lg flex items-center justify-center text-2xl sm:text-3xl font-bold transition-all"
            :class="code[i - 1] !== undefined 
              ? 'border-primary bg-primary/10 text-primary' 
              : 'border-muted-foreground/30 bg-background text-muted-foreground'"
          >
            {{ code[i - 1] || '' }}
          </div>
        </div>

        <!-- Pavé numérique (seulement sur mobile) -->
        <div v-if="isMobile" class="grid grid-cols-3 gap-2 sm:gap-3 max-w-xs mx-auto">
          <Button
            v-for="digit in 9"
            :key="digit"
            @click="addDigit(digit)"
            variant="outline"
            class="aspect-square text-xl sm:text-2xl font-bold hover:scale-105 active:scale-95 transition-transform w-14 h-16 sm:w-16 sm:h-20"
            :disabled="code.length >= maxDigits"
          >
            {{ digit }}
          </Button>
          
          <!-- Ligne du 0 avec bouton effacer -->
          <Button 
            @click="deleteDigit" 
            variant="ghost"
            class="aspect-square text-sm sm:text-base font-semibold w-14 h-16 sm:w-16 sm:h-20"
            :disabled="code.length === 0"
          >
            ←
          </Button>
          
          <Button
            @click="addDigit(0)"
            variant="outline"
            class="aspect-square text-xl sm:text-2xl font-bold hover:scale-105 active:scale-95 transition-transform w-14 h-16 sm:w-16 sm:h-20"
            :disabled="code.length >= maxDigits"
          >
            0
          </Button>
          
          <div class="aspect-square"></div>
        </div>

        <!-- Bouton effacer pour PC -->
        <div v-if="!isMobile && code.length > 0" class="flex justify-center">
          <Button 
            @click="deleteDigit" 
            variant="ghost"
            class="text-sm font-semibold"
          >
            ← Effacer
          </Button>
        </div>

        <!-- Bouton rejoindre (affiché seulement quand le code est complet) -->
        <Transition
          enter-active-class="transition-all duration-300 ease-out"
          enter-from-class="opacity-0 translate-y-2"
          enter-to-class="opacity-100 translate-y-0"
          leave-active-class="transition-all duration-200 ease-in"
          leave-from-class="opacity-100 translate-y-0"
          leave-to-class="opacity-0 translate-y-2"
        >
          <Button 
            v-if="isCodeComplete"
            @click="joinParty"
            class="w-full text-base sm:text-lg font-bold hover:scale-105 active:scale-98 transition-transform"
            size="lg"
          >
            Rejoindre la partie
            <span v-if="!isMobile" class="ml-2 text-xs opacity-70">(ou Entrée)</span>
          </Button>
        </Transition>
      </div>
    </div>
  </div>
</template>