<template>
  <Main/>
  <div class="principal">
    <div class="container">
    <header class="header">
      <img src="/Logo_CORPOELEC.png" alt="CORPOELEC" class="logo" />
      <h1>Estatus de los Servicios Corporativos</h1>
    </header>

    <div class="status-legend">
      <span><span class="dot green"></span> Operacional</span>
      <span><span class="dot yellow"></span> Lento</span>
      <span><span class="dot red"></span> Caído</span>
    </div>


    <div class="table-container">
    <table>
      <thead>
        <tr>
          <th scope="col">Nombre del Servicio</th>
          <th scope="col">Dominio</th>
          <th scope="col">Estatus</th>
          <th scope="col">Ultimo Ping</th>
          <th scope="col">Acciones</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(service, index) in servicios" :key="index">
            <td>{{ service.nombre }}</td>
            <td>{{ service.dominio }}</td>
            <td>
              <span :class="['status', service.statusColor]">{{ service.estatus }}</span>
            </td>
            <td>{{ service.lastCheck }}</td>
            <td class="acciones">
              <button class="ping-button" @click="pingService(index)">↻ Ping</button>
              <span @click="editar(service)" class="icono">
                 📋
              </span>
              <span @click="eliminar(service)" class="icono">
                 ❌
              </span>
            </td>
        </tr>
      </tbody>
    </table>
        <div>
      <button @click="agregar()" class="boton">Agregar Servicio</button>
    </div>
    </div>
  </div>
  </div>
</template>


<script setup>
import Main from '../components/Main.vue'
//import Footer from '../components/Footer.vue'

//import { RouterLink, RouterView } from 'vue-router'
import router from '../router/router';

import {onMounted, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
const { params } = useRoute();
//const router = useRouter();

const servicios = ref([]);
//const API = 'http://localhost:3000';
const API = 'https://backendvercel-umber.vercel.app';

const cargar = async () => {
  const data = await fetch(`${API}/api/servicios`);
  servicios.value = await data.json();
  console.log(servicios.value);
};

onMounted(() => {
  cargar();
});

//const services = ref([
//  { nombre: "DNS 192.168.10.10", dominio: "dns.corpoelec.com", statusText: "Desconocido", statusColor: "gray", lastCheck: "-" },
//  { nombre: "Correo Web", dominio: "correo.corpoelec.com", statusText: "Desconocido", statusColor: "gray", lastCheck: "-" },
//  { nombre: "Intranet", dominio: "intranet.corpoelec.com", statusText: "Desconocido", statusColor: "gray", lastCheck: "-" },
//  { nombre: "Correo Thunderbird", dominio: "thunderbird.corpoelec.com", statusText: "Desconocido", statusColor: "gray", lastCheck: "-" },
//]);

async function pingService(index) {
  const service = servicios.value[index];
  try {
    //const res = await fetch(`http://localhost:3000/ping/${service.dominio}`);
    const resp = await fetch(`https://backendvercel-umber.vercel.app/ping/${service.dominio}`);
    //const data = await res.json();
    

    if (resp>0) {
      //service.estatus = res < 250 ? "Operacional" : "Lento";
      service.status = "prueba";
      service.statusColor = resp < 250 ? "green" : "yellow";
    } else {
      service.estatus = "Caído resp < 0";
      service.statusColor = "red";
    }
  } catch (e) {
    //service.estatus = "Caído";
    service.status = "prueba-error";
    service.statusColor = "red";
  }
  service.lastCheck = "hace unos segundos";
}

const agregar = () => {
  router.push({ name: "crearServicio"});
}

const editar = ({ _id, nombre, dominio }) => {
  router.push({ name: "editarservicio", params: { id: _id, nombre: nombre, dominio:dominio } });
}

const eliminar = async ({ nombre, _id }) => {
  const respuesta = confirm(`¿Estas seguro de eliminar a ${nombre}?`)
  if (respuesta) {
    const data = await fetch(`${API}/api/servicios/${_id}`, {
      method: 'DELETE'
    });
    cargar();
  }
}


</script>



<style scoped>
/* --- Layout general --- */
.container {
  max-width: 900px;
  margin: 20px auto;
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  font-family: "Segoe UI", sans-serif;
}

.header {
  text-align: center;
}

.logo {
  width: 360px;
  margin-bottom: 10px;
}

/* --- Leyenda --- */
.status-legend {
  display: flex;
  justify-content: center;
  gap: 20px;
  margin-bottom: 16px;
  font-weight: 500;
}

.dot {
  display: inline-block;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 5px;
}

.green { background-color: #4CAF50; }
.yellow { background-color: #FFEB3B; }
.red { background-color: #F44336; }
.gray { background-color: #9e9e9e; }

/* --- Tabla --- */
.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  text-align: left;
}

th, td {
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f2f2f2;
  color: #333;
  font-weight: bold;
}

.status.green { color: #94e097; }
.status.yellow { color: #EFB700; }
.status.red { color: #ddd; }

.ping-button {
  background-color: #e53935;
  border: none;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  transition: 0.2s;
}

.ping-button:hover {
  background-color: #c62828;
}

.boton {
  margin-top: 15px;
  padding: 6px;
  margin-bottom: 10px;
  background-color: #7ad855;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.acciones {
  display: flex;
  gap: 15px;
}

.icono {
  cursor: pointer;
}


/* --- Responsive (Móvil) --- */
@media (max-width: 600px) {

.principal{
  display: inline-block;
  align-items: center;
  align-content: center;
}
  h1 {
    font-size: 0.8rem;
  }

.container {
  max-width: 95%;
  margin: 0 auto;
  padding: 0px;
}

.logo {
  width: 160px;
  margin-bottom: 2px;
}


.status-legend {
  display: flex;
  justify-content: center;
  gap: 5px;
  margin-bottom: 16px;
  font-size: 0.8rem;
  font-weight: 500;
}

  table, thead, tbody, th, td, tr {
    display: block;
  }

  thead {
    display: none;
  }

  tr {
    margin-bottom: 12px;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 8px;
  }

  td {
    display: flex;
    justify-content: center;
    padding: 6px 10px;
  }

  td::before {
    content: attr(data-label);
    font-weight: bold;
    color: #555;
  }

  .ping-button {
    padding: 7px 12px;
    font-size: 0.9rem;
  }
}
</style>