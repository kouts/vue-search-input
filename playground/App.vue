<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from 'vue'
import SearchInput from '@/SearchInput.vue'

const example = ref('example1')
const hasFocus = ref(false)
const val1 = ref('')
const val2 = ref('')
const val3 = ref('')
const val4 = ref('')
</script>

<template>
  <div class="container">
    <h1>Playground for vue-search-input</h1>
    <p>
      <a href="https://github.com/kouts/vue-search-input" target="_blank" rel="noreferrer noopener">vue-search-input</a> is a
      Vue.js 3 search input component.<br />
      Inspired by the global search input of Storybook and GitHub, it gets <strong>focus</strong> by pressing the "/" key on the
      keyboard.
    </p>

    <h2>Examples</h2>
    <div class="row">
      <div class="col">
        <a href="#" class="mr-3" @click="example = 'example1'">Autogrow</a>
        <a href="#" class="mr-3" @click="example = 'example2'">Without search icon</a>
        <a href="#" class="mr-3" @click="example = 'example3'">Without shortcut icon</a>
        <a href="#" @click="example = 'example4'">Without clear icon</a>
      </div>
    </div>
    <div v-if="example === 'example1'" class="row mt-4">
      <div class="col">
        <div>Autogrow</div>
        <div :class="['search-input-wrapper mt-2', hasFocus ? 'w350' : 'w250']">
          <SearchInput v-model="val1" placeholder="Search..." @focus="hasFocus = true" @blur="hasFocus = false" />
        </div>
        <div class="d-flex mt-2">{{ val1 }}</div>
      </div>
    </div>
    <div v-if="example === 'example2'" class="row mt-4">
      <div class="col">
        <div>Without search icon</div>
        <SearchInput v-model="val2" class="search-input-wrapper no-search-icon mt-2 w250" :search-icon="false" />
        <div class="d-flex mt-2">{{ val2 }}</div>
      </div>
    </div>
    <div v-if="example === 'example3'" class="row mt-4">
      <div class="col">
        <div>Without shortcut icon</div>
        <SearchInput v-model="val3" class="search-input-wrapper no-shortcut-icon mt-2 w250" :shortcut-icon="false" />
        <div class="d-flex mt-2">{{ val3 }}</div>
      </div>
    </div>
    <div v-if="example === 'example4'" class="row mt-4">
      <div class="col">
        <div>Without clear icon</div>
        <SearchInput v-model="val4" class="search-input-wrapper no-clear-icon mt-2 w250" :clear-icon="false" />
        <div class="d-flex mt-2">{{ val4 }}</div>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/styles.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  margin-top: 1rem;
}

a {
  color: #2d8ac4;
}

.d-flex {
  display: flex;
}

.justify-content-center {
  justify-content: center;
}

.container {
  max-width: 1140px;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  margin-right: auto;
  margin-left: auto;
}

.row {
  display: flex;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
}

.col {
  flex-basis: 0;
  flex-grow: 1;
  max-width: 100%;
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
}

.mt-1 {
  margin-top: 0.25rem;
}

.mt-2 {
  margin-top: 0.5rem;
}

.mt-3 {
  margin-top: 0.75rem;
}

.mt-4 {
  margin-top: 1rem;
}

.mt-5 {
  margin-top: 1.25rem;
}

.mr-2 {
  margin-right: 0.5rem;
}

.mr-3 {
  margin-right: 0.75rem;
}

.w250 {
  width: 250px;
  transition: width 0.35s;
}

.w350 {
  width: 550px;
  transition: width 0.35s;
}

.search-input-wrapper {
  &.no-search-icon {
    .search-input {
      padding-left: 12px;
    }
  }
}
</style>
