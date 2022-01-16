<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import SearchInputTest from '@playground/components/SearchInputTest.vue'
</script>

<template>
  <div class="d-flex justify-content-center">
    <img alt="Vue logo" src="./assets/logo.png" />
  </div>
  <SearchInputTest />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 60px;
}

.d-flex {
  display: flex;
}

.justify-content-center {
  justify-content: center;
}
</style>
