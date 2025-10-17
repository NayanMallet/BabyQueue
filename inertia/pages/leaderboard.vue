<script setup lang="ts">
import PageTemplate from "@/pages/PageTemplate.vue"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
</script>

<template>
    <PageTemplate>
        <!-- <h1 class="mb-4 text-4xl font-bold text-gray-800 dark:text-gray-200">LeaderBoard</h1> -->
         <Table>
            <TableHeader>
            <TableRow>
                <TableHead>Joueur</TableHead>
                <TableHead>Victoires</TableHead>
                <TableHead class="text-right">
                Position
                </TableHead>
            </TableRow>
            </TableHeader>
            <TableBody>
            <TableRow v-for="i in 10" :key="i">
                <TableCell>Joueur {{ i }}</TableCell>
                <TableCell>{{ Math.floor(Math.random() * 100) }}</TableCell>
                <TableCell class="text-right">
                N°{{ i }}
                </TableCell>
            </TableRow>

            </TableBody>
        </Table>
    </PageTemplate>
</template>