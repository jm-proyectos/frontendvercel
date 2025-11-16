<template>
    <header>
    <img alt="" class="logo" src="./assets/Navbar Logo.png" width="140" height="30" />
    <div class="items">
      <nav class="opciones">
        <router-link to="/" class="opcion">Inicio</router-link>
        <router-link to="/" class="opcion">Dashboard</router-link>
        <div v-if="!tokenStore.auth">
          <router-link to="/" class="opcion boton">Iniciar Sesión</router-link>
        </div>
        <div v-else>
          <button @click="cambiar()" class="opcion boton">Cerrar Sesión</button>
        </div>
      </nav>
    </div>
  </header>
    <RouterView/>
</template>

<script setup>
import { RouterLink, RouterView } from 'vue-router'
import {useTokenStore} from '@/stores/userStore.js';
const tokenStore = useTokenStore();
import router from './router';
import Cookies from 'js-cookie';
const cambiar=(()=>{  
    tokenStore.auth=false;
    Cookies.remove('token');
    router.push({ name: "home"});
  });
</script>


