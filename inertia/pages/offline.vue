<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import PageTemplate from "@/pages/PageTemplate.vue"

const playerName = ref('');
const code = ref<string[]>([]);
const maxDigits = 4;
const isMobile = ref(false);
const hasJoined = ref(false);
const joinedPartyCode = ref('');
const step = ref<'name' | 'code'>('name');

const isCodeComplete = computed(() => code.value.length === maxDigits);
const isNameValid = computed(() => playerName.value.trim().length > 0);

// Détection de la taille d'écran
const checkScreenSize = () => {
  isMobile.value = window.innerWidth < 768;
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
  if (isMobile.value) return;

  const key = event.key;
  
  if (/^[0-9]$/.test(key)) {
    event.preventDefault();
    addDigit(parseInt(key));
  }
  
  if (key === 'Backspace' || key === 'Delete') {
    event.preventDefault();
    deleteDigit();
  }
  
  if (key === 'Enter' && isCodeComplete.value) {
    event.preventDefault();
    joinParty();
  }
};

const nextStep = () => {
  if (isNameValid.value) {
    step.value = 'code';
  }
};

const joinParty = () => {
  if (isCodeComplete.value) {
    const partyCode = code.value.join('');
    console.log('Rejoindre avec le code:', partyCode, 'Nom:', playerName.value);
    hasJoined.value = true;
    joinedPartyCode.value = partyCode;
    // Stocker le nom en localStorage pour le mode hors ligne
    localStorage.setItem('offlinePlayerName', playerName.value);
  }
};

const goBack = () => {
  step.value = 'name';
  code.value = [];
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
    <div class="flex flex-col items-center justify-center p-4 sm:p-6 min-h-screen">
      <div class="w-full max-w-sm space-y-6">
        <!-- Affichage du lobby après avoir rejoint -->
        <div v-if="hasJoined">
          <h2 class="text-xl sm:text-2xl font-bold text-center text-foreground">
            Lobby de partie
          </h2>

          <div class="text-center">
            <p class="text-sm text-muted-foreground mb-2">Code de la partie :</p>
            <div class="text-2xl sm:text-3xl font-bold text-primary bg-primary/10 px-4 py-2 rounded-lg">
              {{ joinedPartyCode }}
            </div>
            <p class="text-xs text-muted-foreground mt-2">
              Vous avez rejoint cette partie en tant que {{ playerName }}
            </p>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-center mb-4">En attente de l'hôte</h3>
            <div class="space-y-2">
              <div class="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span class="font-medium">{{ playerName }}</span>
                <span class="text-sm text-muted-foreground">Prêt</span>
              </div>
              <div class="flex items-center justify-between p-3 bg-muted rounded-lg">
                <span class="font-medium">Joueur 1</span>
                <span class="text-sm text-muted-foreground">Prêt</span>
              </div>
            </div>
          </div>

          <Button
            class="w-full text-base sm:text-lg font-bold mt-6"
            disabled
          >
            En attente du lancement...
          </Button>
        </div>

        <!-- Étape 1: Saisie du nom -->
        <div v-else-if="step === 'name'">
          <h2 class="text-xl sm:text-2xl font-bold text-center text-foreground">
            Mode hors ligne
          </h2>
          
          <p class="text-sm text-center text-muted-foreground mb-6">
            Entrez votre nom pour rejoindre une partie
          </p>

          <div class="space-y-4">
            <div>
              <Label for="playerName">Votre nom</Label>
              <Input
                id="playerName"
                v-model="playerName"
                placeholder="Entrez votre nom"
                @keyup.enter="nextStep"
                class="mt-1"
              />
            </div>

            <Button 
              @click="nextStep"
              :disabled="!isNameValid"
              class="w-full text-base sm:text-lg font-bold"
              size="lg"
            >
              Continuer
            </Button>
          </div>
        </div>

        <!-- Étape 2: Saisie du code -->
        <div v-else>
          <h2 class="text-xl sm:text-2xl font-bold text-center text-foreground">
            Rejoindre une partie
          </h2>
          
          <p class="text-sm text-center text-muted-foreground mb-4">
            Tapez le code de 4 chiffres de la partie
          </p>

          <div class="flex gap-2 sm:gap-3 justify-center mb-6">
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

          <div v-if="isMobile" class="grid grid-cols-3 gap-2 sm:gap-3 max-w-xs mx-auto mb-4 place-items-center">
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
              class="aspect-square text-xl sm:text-2xl font-bold hover:scale-105 active:scale-95 transition-transform w-14 h-16 sm:h-20"
              :disabled="code.length >= maxDigits"
            >
              0
            </Button>
            
            <div class="aspect-square"></div>
          </div>

          <div v-if="!isMobile && code.length > 0" class="flex justify-center mb-4">
            <Button 
              @click="deleteDigit" 
              variant="ghost"
              class="text-sm font-semibold"
            >
              ← Effacer
            </Button>
          </div>

          <div class="flex gap-2">
            <Button 
              @click="goBack"
              variant="outline"
              class="flex-1"
            >
              Retour
            </Button>

            <Button 
              v-if="isCodeComplete"
              @click="joinParty"
              class="flex-1 text-base sm:text-lg font-bold hover:scale-105 active:scale-98 transition-transform"
              size="lg"
            >
              Rejoindre
            </Button>
          </div>
        </div>
      </div>
    </div>
</template>