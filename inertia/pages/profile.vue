<script setup>
import { ref, reactive, onMounted } from 'vue';

import PageTemplate from './PageTemplate.vue';

import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Eye, EyeClosed } from 'lucide-vue-next';

const firstName = ref('');
const lastName = ref('');
const email = ref('');
const password = ref('');
const showPassword = ref(false);

const user = ref(null);
const loading = ref(true);

const formErrors = reactive({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
});

onMounted(async () => {
    /* fetch(`${API_BASE_URL}/user/get`, {
        credentials: 'include',
    })
        .then((res) => {
            if (res.status === 401) {
                router.push({ path: '/auth/login', query: { redirect: router.currentRoute.value.fullPath } });
                return;
            }
            return res.json();
        })
        .then((data) => {
            user.value = data;
        })
        .catch((err) => {
            console.error('Error fetching user data:', err);
        })
        .finally(() => {
            loading.value = false;
        }); */
});

const schema = z.object({
    firstName: z
        .string()
        .min(2, 'First name must be at least 2 characters')
        .max(30, 'First name must be at most 30 characters')
        .regex(/^[a-zA-ZÀ-ÿ\-'\s]+$/, 'First name contains invalid characters'),

    lastName: z
        .string()
        .min(2, 'Last name must be at least 2 characters')
        .max(30, 'Last name must be at most 30 characters')
        .regex(/^[a-zA-ZÀ-ÿ\-'\s]+$/, 'Last name contains invalid characters'),

    email: z
        .string()
        .email('Invalid email address'),

    password: z
        .string()
        .min(8, 'Password must be at least 8 characters')
        .max(64, 'Password must be at most 64 characters')
        .regex(/[a-z]/, 'Password must contain a lowercase letter')
        .regex(/[A-Z]/, 'Password must contain an uppercase letter')
        .regex(/[0-9]/, 'Password must contain a number')
        .regex(/[^a-zA-Z0-9]/, 'Password must contain a special character'),
});

const handleSubmit = async () => {
    const rawData = {
        firstName: firstName.value,
        lastName: lastName.value,
        email: email.value,
        password: password.value
    };

    // Ne garder que les champs non vides
    const filteredData = Object.fromEntries(
        Object.entries(rawData).filter(([_, value]) => value.trim() !== '')
    );

    if (Object.keys(filteredData).length === 0) {
        alert('Veuillez modifier au moins un champ.');
        return;
    }

    const partialSchema = schema.partial();
    const result = partialSchema.safeParse(filteredData);

    if (!result.success) {
        result.error.errors.forEach((err) => {
            const field = err.path[0];
            formErrors[field] = err.message;
        });
        return;
    }

    try {
        const res = await fetch(`${API_BASE_URL}/user/update`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(filteredData)
        });

        if (!res.ok) throw new Error('Échec de la mise à jour');

        console.log('✅ Utilisateur mis à jour :', filteredData);
        router.push('/home');
    } catch (err) {
        console.error('Erreur update user:', err);
        alert('Une erreur est survenue lors de la mise à jour.');
    }
};
</script>

<template>
    <PageTemplate :pageInfos="'My Account'">
        <div v-if="loading" class="text-center py-10 text-muted-foreground">
            Chargement de vos données...
        </div>

        <div v-else class="flex flex-col items-center justify-center w-full h-full">
            <h1 class="text-2xl font-bold mb-2 text-center">My Account</h1>
            <p class="text-gray-500 mb-8 text-center max-w-2xl">
                Manage your account settings and preferences.
            </p>

            <Card class="w-full max-w-2xl">
                <CardHeader>
                    <CardTitle>Account Information</CardTitle>
                    <CardDescription>Update your personal information.</CardDescription>
                </CardHeader>

                <CardContent class="space-y-6">
                    <form autocomplete="off" class="grid gap-4" @submit.prevent="handleSubmit">
                        <div>
                            <Label for="firstName">First Name</Label>
                            <Input id="firstName" name="fake-firstname" autocomplete="off" v-model="firstName"
                                :placeholder="user?.firstName || 'First Name'" :error="formErrors.firstName" />
                        </div>

                        <div>
                            <Label for="lastName">Last Name</Label>
                            <Input id="lastName" name="fake-lastname" autocomplete="off" v-model="lastName"
                                :placeholder="user?.lastName || 'Last Name'" :error="formErrors.lastName"
                                :class="formErrors.lastName ? 'border-red-500 ring-1 ring-red-500' : ''" />
                            <p v-if="formErrors.lastName" class="text-sm text-red-500">{{ formErrors.lastName }}</p>
                        </div>

                        <div>
                            <Label for="email">Email</Label>
                            <Input id="email" name="fake-email" type="email" autocomplete="off" v-model="email"
                                :placeholder="user?.email || 'Email'" :error="formErrors.email"
                                :class="formErrors.email ? 'border-red-500 ring-1 ring-red-500' : ''" />
                            <p v-if="formErrors.email" class="text-sm text-red-500">{{ formErrors.email }}</p>
                        </div>

                        <div>
                            <Label for="password">Password</Label>
                            <div class="relative w-full">
                                <Input id="password" name="fake-password" autocomplete="new-password"
                                    :type="showPassword ? 'text' : 'password'" v-model="password"
                                    placeholder="••••••••••" class="pr-10"
                                    :class="formErrors.password ? 'border-red-500 ring-1 ring-red-500' : ''" />
                                <span
                                    class="absolute end-0 inset-y-0 flex items-center justify-center px-2 cursor-pointer"
                                    @click="showPassword = !showPassword">
                                    <EyeClosed v-if="!showPassword" class="size-5 text-muted-foreground" />
                                    <Eye v-else class="size-5 text-muted-foreground" />
                                </span>
                            </div>
                            <p v-if="formErrors.password" class="text-sm text-red-500">{{ formErrors.password }}</p>
                        </div>

                        <div class="flex justify-end">
                            <Button @click="handleSubmit">Update Account</Button>
                        </div>
                    </form>
                </CardContent>
            </Card>
        </div>
    </PageTemplate>
</template>