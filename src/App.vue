<template>
    <RouterView/>
</template>

<script setup>
</script>


<style scoped>
  header {
    height: 2.5rem;
    width: 100vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #F0F1F2;
  }
  .logo{
    margin-left: 4rem;
  }
  .items {
    margin-right: 4rem;
    padding: 5px 3px;
  }
  .opciones{
    display: flex;
    align-items: center;
  }
  .opcion{
    font-size: small;
    text-decoration: none;
    padding: 0px 10px;
  }

  .boton{
    padding: 4px 10px;
    border:none;
    border-radius: 8px;
    background-color: #609FFF;
  }
</style>
