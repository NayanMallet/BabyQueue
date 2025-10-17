<script setup lang="ts">
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { computed, ref } from "vue"

const props = defineProps({
    name: String,
    status: String,
})

const editName = ref(props.name)
const editStatus = ref(props.status)

const statusColor = computed(() => {
    switch (props.status) {
        case 'Disponible':
            return 'bg-green-500 animate-pulse shadow-lg shadow-green-500/50'
        case 'Indisponible':
            return 'bg-red-500 animate-pulse shadow-lg shadow-red-500/50'
        case 'Hors Service':
            return 'bg-gray-500 animate-pulse shadow-lg shadow-gray-500/50'
        default:
            return 'bg-gray-500 animate-pulse shadow-lg shadow-gray-500/50'
    }
})
</script>
<template>
    <Card>
        <CardHeader>
            <CardTitle>{{ props.name }}</CardTitle>
        </CardHeader>
        <CardContent>
            <CardDescription class="flex gap-2 items-center">
                <span :class="statusColor" class="w-3 h-3 rounded-full"></span>
                <span>Status: {{ props.status }}</span>
            </CardDescription>
        </CardContent>
        <CardFooter class="flex justify-end">
            <Dialog>
                <DialogTrigger as-child>
                    <Button>
                        Edit
                    </Button>
                </DialogTrigger>
                <DialogContent
                    class="sm:max-w-[425px]" 
                >
                    <!--  relative !-my-[35dvh] !mx-[30dvh] -->
                    <DialogHeader>
                        <DialogTitle>Edit {{ props.name }}</DialogTitle>
                        <DialogDescription>
                            Make changes to the player's info here. Click save when you're done.
                        </DialogDescription>
                    </DialogHeader>
                    <div class="grid gap-4 py-4">
                        <div class="grid grid-cols-4 items-center gap-4">
                            <Label for="name" class="text-right">
                                Name
                            </Label>
                            <Input id="name" v-model="editName" class="col-span-3" />
                        </div>
                        <div class="grid grid-cols-4 items-center gap-4">
                            <Label for="status" class="text-right">
                                Status
                            </Label>
                            <Select v-model="editStatus" class="col-span-3">
                                <SelectTrigger class="min-w-full">
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Disponible">Disponible</SelectItem>
                                    <SelectItem value="Indisponible">Indisponible</SelectItem>
                                    <SelectItem value="Hors Service">Hors Service</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter class="flex !justify-between gap-2">
                        <Button variant="destructive">
                            Remove
                        </Button>
                        <Button type="submit">
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </CardFooter>
    </Card>
</template>