<script setup lang="ts">
import { ref } from 'vue'

const dialogRef = ref<HTMLDialogElement | undefined>(undefined)
function showModal() {
  dialogRef.value?.showModal()
}

function closeModal() {
  dialogRef.value?.close()
}
defineExpose({
  showModal
})
</script>

<template>
  <dialog ref="dialogRef">
    <div
      style="display: flex; justify-content: center; align-items: center; flex-direction: column"
    >
      <slot></slot>
      <br />
      <button class="button" autofocus @click="closeModal">Close</button>
    </div>
  </dialog>
</template>

<style scoped>
dialog {
  background: linear-gradient(#6482e6, #9198e5, #8989c9);
  border: none;
  border-radius: 1rem;
  overflow: hidden;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 25vw;
  height: 20vh;
}
</style>
