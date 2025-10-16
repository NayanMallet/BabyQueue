<script setup lang="ts">
defineProps<{
    position: number
}>()

import pluralize from "pluralize"

</script>
<template>
    <div class="flex flex-col items-center justify-center p-6 rounded-lg space-y-4">
        <h1 class="text-5xl font-bold">File d'attente</h1>
        <div class="rounded-full border-4 border-black w-18 h-18 flex items-center justify-center text-4xl font-medium text-gray-800 shadow-md">
            {{ position }}
        </div>
        <div v-if="position === 0" class="text-gray-800 text-center">
            <p>
                Il n'y a personne dans la file d'attente pour le moment!<br>
                Viens jouer seul ou à plusieurs!
            </p>
        </div>

        <p v-else class="text-gray-800 mt-4 text-center"> Il y a {{ position }} {{ pluralize("personne", position) }} devant toi dans la file d'attente. <br />  Ne tarde pas et lance une partie!</p>
    </div>
</template>