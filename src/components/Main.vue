<script setup>
  import router from '../router/router';
  router.push({ name: "home"});
</script>

<template>
    <div class="contenido">
      <img alt="" class="logo" src="/cintillo.jpg" />
    </div>
</template>


<style scoped>

.contenido{
  width: 100vw;
  display: flex;
  justify-content:center;
  padding: 5px;
}

/* --- Responsive (Móvil) --- */
@media (max-width: 600px) {

.contenido{
  display: none;
  margin: 0 auto;
  padding: 0;
}

}



</style>