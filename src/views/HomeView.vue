<script setup lang="ts">
import { ref } from 'vue'
import { useMainStore } from '@/stores/main.store'
import type { IMessage } from '@stomp/stompjs'
import { useRouter } from 'vue-router'

const dialogRef = ref<HTMLDialogElement | undefined>(undefined)
const gameIdInputRef = ref<HTMLInputElement | undefined>(undefined)

const mainStore = useMainStore()
const router = useRouter()

function createGame() {
  const client = mainStore.getClient
  client?.publish({ destination: '/app/createGame' })
  client?.subscribe('/game/createGame', (message: IMessage) => {
    const gameId = message.body

    router.push({ name: 'board', params: { gameId } })
  })
}

function joinGame() {
  console.debug('gameId', gameIdInputRef.value?.value)
}
</script>

<template>
  <main>
    <button class="button" @click="createGame">Create Game</button>
    <button class="button" @click="dialogRef?.showModal()">Join Game</button>
  </main>

  <dialog ref="dialogRef">
    <div
      style="display: flex; justify-content: center; align-items: center; flex-direction: column"
    >
      <div style="display: grid; gap: 0.2rem">
        <label for="input-game-id" style="font-weight: bold; color: rgb(0, 0, 0)">Game-ID</label>
        <input type="text" id="input-game-id" ref="gameIdInputRef" />
      </div>
      <br />
      <button class="button" @click="joinGame">Join Game</button>
      <br />
      <button class="button" autofocus @click="dialogRef?.close">Close</button>
    </div>
  </dialog>
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
  font-size: 0.9rem;
}

#input-game-id {
  border: none;
  border-radius: 0.3rem;
  background-color: #b6b6cc;
  height: 3vh;
  width: 19vw;
  font-size: 0.9rem;
  padding: 0.2rem;
}

#input-game-id:focus {
  outline: none;
}

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
