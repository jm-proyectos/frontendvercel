import { createRouter, createWebHistory} from 'vue-router';
import HomeView from '../views/HomeView.vue';
import AgregarServicio from '../components/AgregarServicio.vue';
import EditarServicio from '../components/EditarServicio.vue';
//import axios from 'axios';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {keyAuth: false}
    },
    {
      path: '/crearServicio',
      name: 'crearServicio',
      component: AgregarServicio,
      meta: {keyAuth: false}
    },
    {
      path: '/editarservicio/:id?/:nombre?/:dominio?',
      name: 'editarservicio',
      component: EditarServicio,
      meta: {keyAuth: false}
    },
  ]
})

//const axiosInstance = axios.create({
//  baseURL: 'http://localhost:3000/api',
//  withCredentials: true,
//});

export default router
