<template>
  <div class="d-flex justify-content-center">
    <div :class="[hasFocus ? 'w350' : 'w250']">
      <SearchInput
        v-model="searchText"
        placeholder="Search..."
        class="search-input-wrapper"
        @focus="hasFocus = true"
        @blur="hasFocus = false"
      />
    </div>
  </div>
  <div class="d-flex justify-content-center" style="margin-top: 10px">
    {{ searchText }}
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SearchInput from '@/SearchInput.vue'

const hasFocus = ref(false)

const searchText = ref('')
</script>

<style lang="scss">
@import '@/styles.scss';

.w250 {
  width: 250px;
  transition: width 0.35s;
}

.w350 {
  width: 550px;
  transition: width 0.35s;
}
</style>