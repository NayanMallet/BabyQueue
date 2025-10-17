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
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
</script>

<template>
    <PageTemplate>
        <Tabs default-value="account" class="w-[400px]">
            <TabsList class="items-center justify-center rounded-lg bg-muted p-1 text-muted-foreground grid w-full grid-cols-2">
            <TabsTrigger class="box-border px-4 py-2" value="account">
                Unranked
            </TabsTrigger>
            <TabsTrigger class="box-border" value="password" disabled>
                <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        class="h-5 w-5 absolute" 
                        viewBox="0 0 20 20" 
                        fill="currentColor"
                >
                    <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
                </svg>
                Ranked
            </TabsTrigger>
            </TabsList>
        </Tabs>
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