<script lang="ts">
export const description
  = "Un formulaire d'inscription avec prénom, nom de famille, email et mot de passe dans une carte. Il y a une option pour s'inscrire avec GitHub et un lien pour se connecter si vous avez déjà un compte"
export const iframeHeight = "600px"
export const containerClass = "w-full h-screen flex items-center justify-center px-4"
</script>

<script setup lang="ts">
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
</script>

<template>
  <Card class="mx-auto max-w-sm">
    <CardHeader>
      <CardTitle class="text-xl">
        S'inscrire
      </CardTitle>
      <CardDescription>
        Entrez vos informations pour créer un compte
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div class="grid gap-4">
        <div class="grid grid-cols-2 gap-4">
          <div class="grid gap-2">
            <Label for="first-name">Prénom</Label>
            <Input id="first-name" placeholder="Max" required />
          </div>
          <div class="grid gap-2">
            <Label for="last-name">Nom de famille</Label>
            <Input id="last-name" placeholder="Robinson" required />
          </div>
        </div>
        <div class="grid gap-2">
          <Label for="email">Email</Label>
          <Input
            id="email"
            type="email"
            placeholder="m@exemple.com"
            required
          />
        </div>
        <div class="grid gap-2">
          <Label for="password">Mot de passe</Label>
          <Input id="password" type="password" />
        </div>
        <Button type="submit" class="w-full">
          Créer un compte
        </Button>
        <!-- <Button variant="outline" class="w-full">
          Sign up with GitHub
        </Button> -->
      </div>
      <div class="mt-4 text-center text-sm">
        Vous avez déjà un compte ?
        <a href="/login" class="underline">
          Se connecter
        </a>
      </div>
    </CardContent>
  </Card>
</template>
