<script setup lang="ts">
import WaitingLine from "@/components/WaitingLine.vue";
import PageTemplate from "@/pages/PageTemplate.vue"
import { Button } from "@/components/ui/button"
import Separator from "@/~/components/ui/separator/Separator.vue";
</script>

<template>
    <PageTemplate>
        <WaitingLine :position="31" />
        <div class="flex flex-col items-center justify-center w-full max-w-xs">
            <Button class="w-full"> Partie publique </Button>
            <div class="flex items-center justify-center space-x-4 w-full">
                <Separator class="my-8 bg-black flex-1" />
                <p>ou</p>
                <Separator class="my-8 bg-black flex-1" />
            </div>
            <Button class="w-full"> Partie privée </Button>
        </div>
    </PageTemplate>
</template>
