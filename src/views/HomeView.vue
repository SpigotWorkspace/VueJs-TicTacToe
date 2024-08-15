<script setup lang="ts">
import { ref } from 'vue'

function createGame() {
  console.debug('createGame')
}

function joinGame() {
  dialogRef.value?.showModal()
}

const dialogRef = ref<HTMLDialogElement | undefined>(undefined)
</script>

<template>
  <main>
    <button class="button" @click="createGame">Create Game</button>
    <button class="button" @click="joinGame">Join Game</button>

    <dialog ref="dialogRef">
      <button autofocus @click="dialogRef?.close">Close</button>
    </dialog>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 2rem;
  height: 100vh;
  background: linear-gradient(#6482e6, #9198e5, #b6b6cc);
}

.button {
  cursor: pointer;
  border: none;
  border-radius: 1rem;
  min-width: 100px;
  min-height: 30px;
  width: 20vw;
  height: 5vh;
}

dialog {
  align-self: center;
  height: 10vh;
  width: 10vw;
}
</style>
