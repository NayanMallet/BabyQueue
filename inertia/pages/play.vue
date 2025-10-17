<script setup lang="ts">
import { ref } from 'vue';
import WaitingLine from "@/components/WaitingLine.vue";
import PageTemplate from "@/pages/PageTemplate.vue"
import { Button } from "@/components/ui/button"
import Separator from "@/~/components/ui/separator/Separator.vue";
import JoinPrivateParty from "@/components/JoinPrivateParty.vue";
import CreateParty from "@/components/CreateParty.vue";

const showGameModes = ref(false);
const showCreateJoinOptions = ref(false);
const showJoinParty = ref(false);
const showCreateParty = ref(false);
const gameInProgress = ref(false);

const handlePrivatePartyClick = () => {
    showGameModes.value = true;
};

const handleOneVsOneClick = () => {
    showCreateJoinOptions.value = true;
};

const handleCreatePartyClick = () => {
    showCreateParty.value = true;
};

const handleJoinPartyClick = () => {
    showJoinParty.value = true;
};

const handleGameStarted = () => {
    gameInProgress.value = true;
};
</script>

<template>
    <PageTemplate>
        <!-- Affichage du lobby de création de partie -->
        <div v-if="showCreateParty" class="flex flex-col lg:flex-row gap-4 items-center justify-center lg:items-start lg:justify-center">
            <WaitingLine v-if="!gameInProgress" :position="31" />
            
            <div class="flex flex-col items-center justify-center w-full max-w-xs">
                <CreateParty @game-started="handleGameStarted" />
            </div>
        </div>
        
        <!-- Affichage combiné WaitingLine et JoinPrivateParty -->
        <div v-else-if="showJoinParty" class="flex flex-col lg:flex-row gap-4 items-center justify-center lg:items-start lg:justify-center">
            <WaitingLine :position="31" />
            
            <div class="flex flex-col items-center justify-center w-full max-w-xs">
                <JoinPrivateParty />
            </div>
        </div>
        
        <!-- Affichage des options créer/rejoindre -->
        <div v-else-if="showCreateJoinOptions" class="flex flex-col items-center justify-center w-full max-w-xs gap-4">
            <WaitingLine :position="31" />
            <Button 
                class="w-full" 
                @click="handleCreatePartyClick"
            >
                Créer une partie
            </Button>
            <Button 
                class="w-full" 
                @click="handleJoinPartyClick"
            >
                Rejoindre une partie
            </Button>
        </div>
        
        <!-- Affichage des modes de jeu (1v1, 2v2) -->
        <div v-else-if="showGameModes" class="flex flex-col items-center justify-center w-full max-w-xs gap-4">
            <WaitingLine :position="31" />
            <Button 
                class="w-full" 
                @click="handleOneVsOneClick"
            >
                1 vs 1
            </Button>
            <Button 
                class="w-full relative" 
                disabled
            >
                <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    class="h-5 w-5 absolute" 
                    viewBox="0 0 20 20" 
                    fill="currentColor"
                >
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
                <span class="opacity-30">2 vs 2</span>
            </Button>
        </div>

        <!-- Écran initial avec les choix Partie publique / Partie privée -->
        <div v-else class="flex flex-col items-center justify-center space-y-6 w-full max-w-xs">
            <WaitingLine :position="31" />
            <div class="w-full">
                <Button 
                    class="w-full relative" 
                    disabled
                >
                    <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        class="h-5 w-5 absolute" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                    >
                        <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                    </svg>
                    <span class="opacity-30">Partie publique</span>
                </Button>
                <div class="flex items-center justify-center space-x-4 w-full">
                    <Separator class="my-8 bg-black flex-1" />
                    <p>ou</p>
                    <Separator class="my-8 bg-black flex-1" />
                </div>
                <Button 
                    class="w-full" 
                    @click="handlePrivatePartyClick"
                >
                    Partie privée
                </Button>
            </div>
        </div>
    </PageTemplate>
</template>
