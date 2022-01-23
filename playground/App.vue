<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import { ref, Ref } from 'vue'
import SearchInput from '@/SearchInput.vue'

type Refs = {
  [key in string]: Ref
}

const example = ref('example1')

const hasFocus1 = ref(false)
const hasFocus2 = ref(false)

const val1 = ref('')
const val2 = ref('')
const val3 = ref('')

const ref1 = ref(null)
const ref2 = ref(null)
const ref3 = ref(null)

const refs: Refs = {
  ref1,
  ref2,
  ref3
}

const showProps = (refName: string) => {
  const propKeys = Object.keys(SearchInput.props)
  const attrs = refs[refName].value ?? {}

  const res = Object.keys(attrs).reduce((acc, curr) => {
    return { ...acc, ...(propKeys.includes(curr) && { [curr]: attrs[curr] }) }
  }, {})
  return res
}

const say = (text: string) => {
  alert(text)
}
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
        <a href="#" :class="['mr-3', example === 'example1' && 'font-weight-bold']" @click="example = 'example1'">
          Storybook style
        </a>
        <a href="#" :class="['mr-3', example === 'example2' && 'font-weight-bold']" @click="example = 'example2'">
          GitHub style
        </a>
        <a href="#" :class="['mr-3', example === 'example3' && 'font-weight-bold']" @click="example = 'example3'">
          Gmail style
        </a>
      </div>
    </div>
    <div v-if="example === 'example1'" class="row mt-4">
      <div class="col">
        <div class="font-weight-bold">Storybook</div>
        <SearchInput
          ref="ref1"
          v-model="val1"
          class="search-input-wrapper mt-2 w270"
          :placeholder="hasFocus1 ? 'Type to find...' : 'Find components'"
          @focus="hasFocus1 = true"
          @blur="hasFocus1 = false"
        />
        <pre class="d-flex mt-2">{{ showProps('ref1') }}</pre>
      </div>
    </div>
    <div v-if="example === 'example2'" class="row mt-4">
      <div class="col">
        <div class="font-weight-bold">GitHub</div>
        <SearchInput
          ref="ref2"
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
        <pre class="d-flex mt-2">{{ showProps('ref2') }}</pre>
      </div>
    </div>
    <div v-if="example === 'example3'" class="row mt-4">
      <div class="col">
        <div class="font-weight-bold">Gmail</div>
        <SearchInput
          ref="ref3"
          v-model="val3"
          class="search-input-wrapper gmail mt-2 w270"
          placeholder="Search mail"
          :clear-on-esc="false"
          :shortcut-icon="false"
          :shortcut-listener-enabled="false"
        >
          <template #append-outer>
            <button class="settings" @click="say('Settings clicked')">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <path
                  d="M3 17v2h6v-2H3zM3 5v2h10V5H3zm10 16v-2h8v-2h-8v-2h-2v6h2zM7 9v2H3v2h4v2h2V9H7zm14 4v-2H11v2h10zm-6-4h2V7h4V5h-4V3h-2v6z"
                ></path>
              </svg>
            </button>
          </template>
        </SearchInput>
        <pre class="d-flex mt-2">{{ showProps('ref3') }}</pre>
      </div>
    </div>

    <hr class="mt-4" />

    <div class="d-flex justify-content-center">
      <a
        href="https://github.com/kouts/vue-search-input"
        target="_blank"
        rel="noreferrer noopener"
        class="d-inline-flex align-items-center text-decoration-none"
      >
        <svg width="24" height="24" viewBox="0 0 16 16" class="mr-2">
          <path
            fill-rule="evenodd"
            d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
          ></path>
        </svg>
        <div>GitHub</div>
      </a>
    </div>
  </div>
</template>

<style lang="scss">
@import '@/styles.scss';

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $input-color;
  margin-top: 1rem;
}

hr {
  border: 0;
  height: 1px;
  background: lighten($input-color, 50%);
}

a {
  color: $active-color;
}

.d-flex {
  display: flex;
}

.d-inline-flex {
  display: inline-flex;
}

.justify-content-center {
  justify-content: center;
}

.align-items-center {
  align-items: center;
}

.text-decoration-none {
  text-decoration: none;
}

.font-weight-bold {
  font-weight: bold;
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
