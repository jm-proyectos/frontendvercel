<template>
  <div class="container">
      <img alt="" src="/cintillo.jpg" />
    <div class="items">
      <nav class="opciones">
        <div v-if="!tokenStore.auth">
          <router-link to="/login" class="opcion boton">Iniciar Sesión</router-link>
        </div>
        <div v-else>
          <button @click="cambiar()" class="opcion boton">Cerrar Sesión</button>
        </div>
      </nav>
    </div>
  </div>
  <RouterView />
</template>

<script setup>
//  import Main from './components/Main.vue'
import { RouterLink, RouterView } from 'vue-router'
import { useTokenStore } from '@/stores/userStore.js';
const tokenStore = useTokenStore();
import router from './router/router.js';
import Cookies from 'js-cookie';

const cambiar = (() => {
  tokenStore.auth = false;
  Cookies.remove('token');
  router.push({ name: "home" });
});
</script>


<style scoped>
header {
  height: 2.5rem;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  background-color: #F0F1F2;
}

.container {
  max-width: 900px;
  margin: 20px auto;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  font-family: "Segoe UI", sans-serif;
}

.cintillo {
  width: max-content;
  padding: 5px;
}

.logo {
  margin-left: 4rem;
}

.items {
  margin-right: 4rem;
  padding: 5px 3px;
}

.opciones {
  display: flex;
  align-items: center;
}

.opcion {
  font-size: small;
  text-decoration: none;
  padding: 0px 10px;
}

.boton {
  padding: 4px 10px;
  border: none;
  border-radius: 8px;
  background-color: #609FFF;
}

.contenido {
  width: 100vw;
  display: flex;
  justify-content: center;
  padding: 5px;
}

/* --- Responsive (Móvil) --- */
@media (max-width: 600px) {

  .contenido {
    display: none;
    margin: 0 auto;
    padding: 0;
  }
}
</style>
