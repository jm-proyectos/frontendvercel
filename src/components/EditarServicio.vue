<template>
  <div class="modal-mask">
    <div class="modal-container">
      <button @click="cerrar()" class="cerrar">X</button>
      <h2>Editar Servicio</h2>
      <form @submit.prevent="enviar()" class="formulario">
        <input v-model="newservicio.nombre" type="text" placeholder="Nombre" required class="form-control">
        <input v-model="newservicio.dominio" type="text" placeholder="Dominio" required class="form-control">
        <button class="boton">Guardar</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import axiosInstance from '../plugins/axios.js';
const API = 'https://backendvercel-umber.vercel.app';
//import router from '..//router';
import { ref, reactive } from 'vue';

import { useRoute, useRouter } from "vue-router";
const { params } = useRoute();
const router = useRouter();
const newservicio = reactive({
  "nombre": params.nombre,
  "dominio": params.dominio
});


// async function enviar() {
//   try {
//     const { data } = await axiosInstance.patch(`/servicios/${params.id}`, newservicio);
//     router.back();
//     return;
//   } catch (error) {
//     console.log(error);
//     return;
//   }
// };

async function enviar() {
try {
fetch(`${API}/api/servicios/${params.id}`, {
    method: 'PATCH', // o 'PATCH' si solo quieres actualizar campos específicos
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newservicio)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la red ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {
    console.log('Registro actualizado exitosamente:', data);
    router.back();
  })
  .catch(error => {
    console.error('Error al actualizar el registro:', error);
  });

   } catch (error) {
     console.log(error);
     return;
   }
 };

const cerrar = (() => {
  router.back();
})

</script>


<style scoped>
.modal-mask {
  font-family: 'Arial Narrow Bold', sans-serif;
  position: fixed;
  z-index: 9998;
  top: 2.5rem;
  left: 0;
  width: 100%;
  height: 100%;
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
  width: 350px;
  margin: auto;
  padding: 20px 15px;
  background-color: #80B3FF;
  border-radius: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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