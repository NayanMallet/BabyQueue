<script setup lang="ts">
import type { HTMLAttributes } from "vue"
import { cn } from '~/lib/utils'
import { Button } from '~/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card'
import { Input } from '~/components/ui/input'
import { Label } from '~/components/ui/label'

const props = defineProps<{
  class?: HTMLAttributes["class"]
}>()
</script>

<template>
  <div :class="cn('flex flex-col gap-6', props.class)">
    <Card>
      <CardHeader>
        <CardTitle>Connectez-vous à votre compte</CardTitle>
        <CardDescription>
          Entrez votre email ci-dessous pour vous connecter à votre compte
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div class="flex flex-col gap-6">
            <div class="grid gap-3">
              <Label for="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@exemple.com"
                required
              />
            </div>
            <div class="grid gap-3">
              <div class="flex items-center">
                <Label for="password">Mot de passe</Label>
                <!-- <a
                  href="#"
                  class="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                >
                  Mot de passe oublié ?
                </a> -->
              </div>
              <Input id="password" type="password" required />
            </div>
            <div class="flex flex-col gap-3">
              <Button type="submit" class="w-full">
                Se connecter
              </Button>
              <!-- <Button variant="outline" class="w-full">
                Login with Google
              </Button> -->
            </div>
          </div>
          <div class="mt-4 text-center text-sm">
            Vous n'avez pas de compte ?
            <a href="/register" class="underline underline-offset-4">
              S'inscrire
            </a>
          </div>
        </form>
      </CardContent>
    </Card>
  </div>
</template>
