<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref } from 'vue'
import SearchInput from '@/SearchInput.vue'

const example = ref('example1')
const hasFocus1 = ref(false)
const hasFocus2 = ref(false)
const val1 = ref('')
const val2 = ref('')
const val3 = ref('')
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
        <a href="#" class="mr-3" @click="example = 'example1'">Storybook style</a>
        <a href="#" class="mr-3" @click="example = 'example2'">GitHub style</a>
        <a href="#" class="mr-3" @click="example = 'example3'">Gmail style</a>
      </div>
    </div>
    <div v-if="example === 'example1'" class="row mt-4">
      <div class="col">
        <div>Storybook style</div>
        <SearchInput
          v-model="val1"
          class="search-input-wrapper mt-2 w270"
          :placeholder="hasFocus1 ? 'Type to find...' : 'Find components'"
          @focus="hasFocus1 = true"
          @blur="hasFocus1 = false"
        />
        <div class="d-flex mt-2">{{ val1 }}</div>
      </div>
    </div>
    <div v-if="example === 'example2'" class="row mt-4">
      <div class="col">
        <div>GitHub style</div>
        <SearchInput
          v-model="val2"
          placeholder="Search or jump to..."
          :class="['search-input-wrapper no-search-icon mt-2', hasFocus2 ? 'w350' : 'w270']"
          :search-icon="false"
          :clear-icon="false"
          :clear-on-esc="false"
          :select-on-focus="false"
          :hide-shortcut-icon-on-blur="false"
          @focus="hasFocus2 = true"
          @blur="hasFocus2 = false"
        />
        <div class="d-flex mt-2">{{ val2 }}</div>
      </div>
    </div>
    <div v-if="example === 'example3'" class="row mt-4">
      <div class="col">
        <div>Gmail style</div>
        <SearchInput
          v-model="val3"
          class="search-input-wrapper gmail mt-2 w270"
          placeholder="Search mail"
          :clear-on-esc="false"
          :shortcut-icon="false"
          :shortcut-listener-enabled="false"
        >
          <template #append-outer>
            <button class="settings">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"
                ></path>
              </svg>
            </button>
          </template>
        </SearchInput>
        <div class="d-flex mt-2">{{ val1 }}</div>
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

.w270 {
  width: 270px;
  transition: width 0.35s;
}

.w350 {
  width: 550px;
  transition: width 0.35s;
}

.search-input-wrapper {
  &.no-search-icon {
    [data-search-input='true'] {
      padding-left: 12px;
    }
  }

  &.gmail {
    input[data-search-input='true'] {
      padding-right: 56px;
    }
    .search-icon {
      &.clear {
        right: 32px;
      }
    }
    .settings {
      position: absolute;
      bottom: 7px;
      right: 6px;
      background: none;
      border: none;
      cursor: pointer;
      outline: none;
      padding: 0px;
      line-height: 0;
      color: $icon-color;
      fill: $icon-color;
    }
  }
}
</style>
