<script setup lang="ts">
import { Trophy, Gamepad2, CircleUserRound } from "lucide-vue-next"
import { usePage } from '@inertiajs/vue3'

const page = usePage()
</script>

<template>
  <nav class="absolute bg-white border-t bottom-0 flex justify-around items-center w-full h-16">
    <a href="/leaderboard" class="flex flex-col items-center justify-center transition-colors h-full w-16" :class="{ 'border-t-4 border-red-500': page.url === '/leaderboard' }">
      <Trophy />
      <span>Classement</span>
    </a>

    <div class="absolute -mt-10">
      <a
        href="/play"
        class="flex flex-col items-center justify-center bg-red-500 text-white rounded-full w-22 h-22 shadow-lg hover:bg-red-600 transition border-8 border-gray-100"
      >
        <Gamepad2 class="w-6 h-6" />
        <span class="text-sm">Jouer</span>
      </a>
    </div>

    <a href="/profile" class="flex flex-col items-center justify-center transition-colors h-full w-16" :class="{ 'border-t-4 border-red-500': page.url === '/profile' }">
      <CircleUserRound />
      <span>Profil</span>
    </a>
  </nav>
</template>
