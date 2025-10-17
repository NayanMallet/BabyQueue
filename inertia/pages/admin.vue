<script setup lang="ts">
import BabyCard from '@/components/BabyCard.vue';

const players = [
    { name: 'Player 1', status: 'Disponible' },
    { name: 'Player 2', status: 'Indisponible' },
    { name: 'Player 3', status: 'Disponible' },
    { name: 'Player 4', status: 'Hors Service' },
]
</script>
<template>
    <div class="font-bold text-3xl p-6">
        ️🛠️ Admin Panel 🛠️
    </div>
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6">
        <BabyCard v-for="(player, index) in players" :key="index" :name="player.name" :status="player.status" />
    </div>
</template>