<template>
  <Transition name="login">
        <div class="modal-mask">
          <div class="modal-container">
            <button @click="cerrar()" class="cerrar">X</button>
        <h2>Inicia Sesión</h2>
          <form  @submit.prevent="enviar()" class="formulario">
            <input 
              v-model="user.email"
              name="email"
              type="email"
              placeholder="Correo"
              class="form-control"
            />
            <input
              v-model="user.password"
              name="password"
              type="password"
              placeholder="Contraseña"
              class="form-control"
            />
          <button class="boton">
            <span>Enviar</span>
          </button>
        </Form>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import {ref, reactive} from 'vue';
import Cookies from 'js-cookie';
import router from '../router/router';
//import axiosInstance from '../plugins/axios.js';
import {useTokenStore} from '@/stores/userStore.js';
const tokenStore = useTokenStore();

const API = 'https://backendvercel-umber.vercel.app';
const user = reactive({
   "email":"alex20@gmail.com",
   "password":"123"
  //"email":"",
  //"password":""
});

const enviar = async () => {
 fetch(`${API}/api/auth/login`, {
    method: 'POST', 
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user)
  })
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la red ' + response.statusText);
    }
     return response.json();
  })
  .then(data => {
    console.log('Login exitoso...:', data);
     tokenStore.auth=true;
     tokenStore.token = Cookies.get('token');
     tokenStore.usuario = data;
     router.push({ name: "home"});
     return;
  })
  .catch(error => {
    console.error('Error al iniciar sesion:', error);
  });

};


const cerrar = (() => {
  router.back();
})


//async function enviar1(){
//   try {
//     const {data} = await axiosInstance.post('/auth/login',user);
//     if (!data){
//       tokenStore.auth=false;
//       return;
//     }
//     tokenStore.auth=true;
//     tokenStore.token = Cookies.get('token');
//     tokenStore.usuario = data;
//     router.push({ name: "dashboard"});
//     return;
//   } catch (error) {
//     console.log(error);
//     return;
//   }
//}
</script>



<style scoped>
.modal-mask {
  font-family:  'Arial Narrow Bold', sans-serif;  
  position: fixed;
  z-index: 9998;
  top: 2.5rem;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(184, 181, 181, 0.5);
  display: flex;
  transition: opacity 0.3s ease;
}

.modal-container {
  width: 350px;
  margin: auto;
  padding: 20px 15px;
  background-color: #e6e5e5;
  border-radius: 25px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.cerrar {
  margin-left: 90%;
  cursor: pointer;
  width: 20px;
  height: 20px;
  border: none;
  border-radius: 50%;
}


h2{
    font-size: 2.5rem;
    font-weight: bold;
}

.formulario{
    display: flex;
    flex-direction: column;
    width: 100%;
    gap: 20px;

}

.form-control{
    padding: 12px;
    border:none;
    border-radius: 15px;   
}

input::placeholder {
  font-weight: bold;
  opacity: 0.6;
  color:#000000;
}

.boton{
    margin-top: 20px;
    padding: 10px;
    border:none;
    border-radius: 8px;
    background-color: #003380;
    color:#FFFFFF;
    font-size: 1.2rem
}
</style>

