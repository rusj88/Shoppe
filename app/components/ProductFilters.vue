<script setup lang="ts">
  defineEmits(['closeFilters'])
</script>
<template>
  <div class="filter">
    Filters <button class="close-btn" @click="$emit('closeFilters')">X</button>
  </div>
</template>
<style scoped lang="scss">
  .filter {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 6px;
  }

  .close-btn {
    @media (min-width: $bp-lg) {
      display: none;
    }
  }
</style>
