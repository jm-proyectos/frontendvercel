<template>
  <div class="modal-mask">
    <div class="modal-container">
      <button @click="cerrar()" class="cerrar">X</button>
      <h2 class="titulo">Agregar Servicio</h2>
      <form @submit.prevent="enviar()" class="formulario">
        <input v-model="newservicio.nombre" type="text" placeholder="Nombre" required class="form-control">
        <input v-model="newservicio.dominio" type="text" placeholder="Dominio" required class="form-control">
        <button class="boton">
          <span>Guardar</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import axiosInstance from '../plugins/axios.js';
import router from '..//router/router.js';
import { ref, reactive } from 'vue';
const newservicio = reactive({
  "nombre": '',
  "dominio": '',
  "estatus": 'desconocido',
  "estatusColor": '',
  "ultimoPing":''
});


async function enviar() {
  try {
    const { data } = await axiosInstance.post('/servicios', newservicio);
    router.back();
    return;
  } catch (error) {
    console.log(error);
    return;
  }
}

const cerrar = (() => {
  router.back();
})

</script>

<style scoped>

.modal-mask {
  font-family: 'Arial Narrow Bold', sans-serif;
  position:fixed;
  z-index: 9998;
  top: 2.5rem;
  left: 0;
  width: 100%;
  height: 70%;
  display: flex;
  transition: opacity 0.3s ease;
}

.cerrar {
  margin-left: 90%;
  cursor: pointer;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 50%;
}

.modal-container {
  width: 450px;
  margin: auto;
  padding: 20px 15px;
  background-color: #e6e5e5;
  border-radius: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items:center;
}

.titulo {
  font-size: 2rem;
  font-weight: bold;
  margin: 20px auto;
}

.formulario {
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
}

.form-control {
  padding: 12px;
  border: none;
  border-radius: 15px;
}

input::placeholder {
  font-weight: bold;
  opacity: 0.6;
  color: #000000;
}

.boton {
  margin-top: 40px;
  padding: 7px;
  border: none;
  border-radius: 8px;
  background-color: #003380;
  color: #FFFFFF;
  font-size: 1.2rem
}
</style>