<script setup lang="ts">
import { ref } from 'vue'
import type { IMessage } from '@stomp/stompjs'
import { useRouter } from 'vue-router'
import { publishAndSubscribe } from '@/utils/client.utils'
import { useMainStore } from '@/stores/main.store'
import { type BaseResultInterface } from '@/interfaces/base-result.interface'
import { ResultStatusEnum } from '@/interfaces/enums/result-status.enum'
import { PlayerEnum } from '@/interfaces/enums/player.enum'

const dialogRef = ref<HTMLDialogElement | undefined>(undefined)
const gameIdInputRef = ref<HTMLInputElement | undefined>(undefined)

const router = useRouter()
const mainStore = useMainStore()

function createGame() {
  publishAndSubscribe(
    'createGame',
    (message: IMessage) => {
      const gameId = message.body
      mainStore.joinGame(gameId, PlayerEnum.ONE)
      router.push({ name: 'board' })
    },
    true
  )
}

function joinGame() {
  const gameId = gameIdInputRef.value?.value
  publishAndSubscribe(
    `joinGame/${gameId}`,
    (message: IMessage) => {
      const baseResult: BaseResultInterface<string> = JSON.parse(message.body)
      console.debug(baseResult)
      if (baseResult.resultStatus == ResultStatusEnum.FAILURE) {
        console.error(baseResult.errorMessage)
      } else {
        mainStore.joinGame(baseResult.resultValue, PlayerEnum.TWO)
        router.push({ name: 'board' })
      }
    },
    false,
    true
  )
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
