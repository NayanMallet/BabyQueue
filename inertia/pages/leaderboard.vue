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
        <Tabs default-value="unranked" class="w-[400px]">
            <TabsList class="grid w-full grid-cols-2">
            <TabsTrigger value="unranked">
                Unranked
            </TabsTrigger>
            <TabsTrigger value="ranked" disabled>
                <Lock class="h-5 w-5 absolute" />
                Ranked
            </TabsTrigger>
            </TabsList>
        </Tabs>
        <div class="max-h-[70dvh] overflow-y-auto w-full">
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
                    <TableRow v-for="i in 30" :key="i">
                        <TableCell>Joueur {{ i }}</TableCell>
                        <TableCell>{{ Math.floor(Math.random() * 100) }}</TableCell>
                        <TableCell class="text-right">
                        N°{{ i }}
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </div>
    </PageTemplate>
</template>