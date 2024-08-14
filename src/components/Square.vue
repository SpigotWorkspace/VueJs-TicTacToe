<script setup lang="ts"></script>

<template>
  <div class="square"><slot></slot></div>
</template>

<style scoped>
.square {
  border: 1px red solid;
  width: 5rem;
  height: 5rem;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
