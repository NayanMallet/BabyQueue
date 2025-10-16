<script setup lang="ts">
import Navbar from "@/components/Navbar.vue"
</script>
<template>
  <div class="flex min-h-screen flex-col items-center justify-center bg-gray-100 p-6">
      <slot></slot>
  </div>
  <Navbar />
</template>

