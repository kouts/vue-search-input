<script setup lang="ts">
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
import SearchInput from '@/SearchInput.vue'
import { Ref, ref } from 'vue'

type Refs = {
  [key in string]: Ref
}

const example = ref('example1')

const hasFocus1 = ref(false)
const hasFocus2 = ref(false)

const val1 = ref('')
const val2 = ref('')
const val3 = ref('')
const val4 = ref('')

const ref1 = ref(null)
const ref2 = ref(null)
const ref3 = ref(null)
const ref4 = ref(null)

const refs: Refs = {
  ref1,
  ref2,
  ref3,
  ref4
}

const showProps = (refName: string) => {
  const cmp = refs[refName].value ?? {}

  return cmp?._?.props
}

const say = (text: string) => {
  alert(text)
}
</script>

<template>
  <div class="container">
    <h1 class="mt-4">Playground for vue-search-input</h1>
    <p>
      <a href="https://github.com/kouts/vue-search-input" target="_blank" rel="noreferrer noopener">vue-search-input</a> is a
      Vue.js 3 search input component.<br />
      Inspired by the global search input of Storybook and GitHub, it gets <strong>focus</strong> by pressing the "/" key on the
      keyboard.
    </p>

    <h2>Examples</h2>
    <div class="row">
      <div class="col">
        <a href="#" :class="['me-3', example === 'example1' && 'fw-bold']" @click.prevent="example = 'example1'">
          Storybook style
        </a>
        <a href="#" :class="['me-3', example === 'example2' && 'fw-bold']" @click.prevent="example = 'example2'">
          GitHub style
        </a>
        <a href="#" :class="['me-3', example === 'example3' && 'fw-bold']" @click.prevent="example = 'example3'">
          Gmail style
        </a>
        <a href="#" :class="['me-3', example === 'example4' && 'fw-bold']" @click.prevent="example = 'example4'">
          YouTube style
        </a>
      </div>
    </div>

    <div v-if="example === 'example1'" class="row mt-4">
      <div class="col">
        <div class="fw-bold">Storybook</div>
        <SearchInput
          ref="ref1"
          v-model="val1"
          class="search-input-wrapper mt-2 w270"
          :placeholder="hasFocus1 ? 'Type to find...' : 'Find components'"
          @focus="hasFocus1 = true"
          @blur="hasFocus1 = false"
        />
        <div class="font-monospace text-secondary mt-3">Props</div>
        <pre class="text-secondary">{{ showProps('ref1') }}</pre>
      </div>
    </div>

    <div v-if="example === 'example2'" class="row mt-4">
      <div class="col">
        <div class="fw-bold">GitHub</div>
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
        <div class="font-monospace text-secondary mt-3">Props</div>
        <pre class="text-secondary">{{ showProps('ref2') }}</pre>
      </div>
    </div>

    <div v-if="example === 'example3'" class="row mt-4">
      <div class="col">
        <div class="fw-bold">Gmail</div>
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
        <div class="font-monospace text-secondary mt-3">Props</div>
        <pre class="text-secondary">{{ showProps('ref3') }}</pre>
      </div>
    </div>

    <div v-if="example === 'example4'" class="row mt-4">
      <div class="col">
        <div class="fw-bold">YouTube</div>
        <SearchInput
          ref="ref4"
          v-model="val4"
          placeholder="Search"
          class="search-input-wrapper no-search-icon youtube mt-2 w350"
          :search-icon="false"
          :clear-on-esc="false"
          :select-on-focus="false"
          :shortcut-icon="false"
        >
          <template #append-outer>
            <button class="btn btn-primary btn-search" @click="say('Search clicked')">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
                <path
                  d="M20.87,20.17l-5.59-5.59C16.35,13.35,17,11.75,17,10c0-3.87-3.13-7-7-7s-7,3.13-7,7s3.13,7,7,7c1.75,0,3.35-0.65,4.58-1.71 l5.59,5.59L20.87,20.17z M10,16c-3.31,0-6-2.69-6-6s2.69-6,6-6s6,2.69,6,6S13.31,16,10,16z"
                ></path>
              </svg>
            </button>
          </template>
        </SearchInput>
        <div class="font-monospace text-secondary mt-3">Props</div>
        <pre class="text-secondary">{{ showProps('ref4') }}</pre>
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
        <svg width="24" height="24" viewBox="0 0 16 16" class="me-2">
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
@import '@playground/scss/app.scss';
@import '@/styles.scss';
</style>
