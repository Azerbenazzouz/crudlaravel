<template>
  <!-- Section hero avec overlay dégradé -->
  <v-parallax :src="heroImage" height="500">
    <div class="hero-overlay">
      <v-row class="fill-height" align="center" justify="center">
        <v-col cols="12" md="8" class="text-center">
          <h1 class="white--text">SaaS AI Content Generator</h1>
          <p class="white--text">
            Générez des descriptions détaillées et des posts pour réseaux sociaux grâce à l'IA
          </p>
          <v-btn class="hero-btn" color="primary" @click="getStarted" large>
            Commencez Maintenant
          </v-btn>
        </v-col>
      </v-row>
    </div>
  </v-parallax>

  <!-- Section fonctionnalités avec design amélioré et transition -->
  <v-container class="features my-10" v-motion.fade>
    <v-row>
      <v-col cols="12" md="8" class="mx-auto">
        <h2 class="text-center">Fonctionnalités</h2>
        <v-expansion-panels>
          <v-expansion-panel v-for="(feature, index) in features" :key="index" outlined>
            <v-expansion-panel-title>
              <v-icon class="mr-2">{{ feature.icon }}</v-icon>
              {{ feature.title }}
            </v-expansion-panel-title>
            <v-expansion-panel-text>
              <v-card elevation="1" outlined class="pa-3">
                {{ feature.description }}
              </v-card>
            </v-expansion-panel-text>
          </v-expansion-panel>
        </v-expansion-panels>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import heroImage from '../assets/bg.jpg'

function getStarted() {
  console.log('Commencez maintenant !')
}

const features = ref([
  {
    icon: 'mdi-text-box-check',
    title: 'Génération automatique de descriptions de produit',
    description:
      "Créez des descriptions de produits uniques et optimisées pour le SEO en quelques secondes. Notre IA analyse votre produit et génère des descriptions qui attirent l'attention et augmentent les conversions.",
  },
  {
    icon: 'mdi-account-group',
    title: 'Création de contenu pour réseaux sociaux',
    description:
      "Générez des posts engageants pour vos réseaux sociaux en un clin d'œil. Choisissez le ton, le style et la plateforme, et notre IA créera du contenu sur mesure pour votre audience.",
  },
  {
    icon: 'mdi-speedometer',
    title: 'Interface intuitive & rapide',
    description:
      'Notre interface utilisateur est conçue pour être simple et facile à utiliser. Vous pouvez générer du contenu de haute qualité en quelques clics, sans aucune compétence technique requise.',
  },
])
</script>

<style scoped>
.hero {
  text-align: center;
  padding: 2rem;
}

/* Overlay dégradé sur le hero */
.hero-overlay {
  position: relative;
  height: 100%;
  width: 100%;
  background: linear-gradient(135deg, rgba(0, 0, 0, 0.6) 0%, rgba(0, 0, 0, 0.3) 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Animation sur le bouton et hover */
.hero-btn {
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
}
.hero-btn:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
}

.features {
  /* Couleur de fond subtile pour la section fonctionnalités */
  background-color: #f5f7fa;
  padding: 2rem;
  border-radius: 8px;
}

.demo {
  /* Couleur de fond légère pour la démonstration du post */
  background-color: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

/* Ajustements généraux */
h1,
h2,
p {
  margin: 0.5rem 0;
}
</style>
