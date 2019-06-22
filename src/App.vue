<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  .edit{
    float: right;
  }
  .edit:hover{
    color: yellow;
  }

  .delete{
    float: right;
  }

  .delete:hover{
    color: red;
  }
  .page{
    background-color: #f0f0f0;
  }

</style>
