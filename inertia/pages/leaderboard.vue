<script setup lang="ts">
import PageTemplate from "@/pages/PageTemplate.vue"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table'
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import { Lock } from 'lucide-vue-next'
</script>

<template>
    <PageTemplate>
        <div class="flex flex-col justify-between items-center w-full space-y-6">
            <h1 class="font-bold text-3xl">Classement des Joueurs</h1>
            <Tabs default-value="unranked" class="w-full">
                <TabsList class="grid w-full grid-cols-2">
                <TabsTrigger value="unranked">
                    Unranked
                </TabsTrigger>
                <TabsTrigger value="ranked" class="relative" disabled>
                    <Lock class="h-5 w-5 absolute stroke-black z-10" />
                    <span class="opacity-30">Ranked (soon)</span>
                </TabsTrigger>
                </TabsList>
            </Tabs>
            <div class="max-h-[68dvh] overflow-y-auto w-full mb-6 xs:mb-14">
                <Table>
                    <TableHeader>
                    <TableRow>
                        <TableHead>Joueur</TableHead>
                        <TableHead>Victoires</TableHead>
                        <TableHead>
                        Position
                        </TableHead>
                    </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow v-for="i in 30" :key="i">
                            <TableCell>Joueur {{ i }}</TableCell>
                            <TableCell>{{ Math.floor(Math.random() * 100) }}</TableCell>
                            <TableCell>
                            N°{{ i }}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
        </div>
    </PageTemplate>
</template>