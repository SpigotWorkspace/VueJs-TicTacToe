<script setup lang="ts">
import Square from '@/components/Square.vue'
import { computed, type ComputedRef, onMounted, type Ref, ref } from 'vue'
import { useMainStore } from '@/stores/main.store'
import { publish, subscribe } from '@/utils/client.utils'
import type { IMessage, StompSubscription } from '@stomp/stompjs'
import type { BaseResultInterface } from '@/interfaces/base-result.interface'
import { ResultStatusEnum } from '@/interfaces/enums/result-status.enum'
import { useRouter } from 'vue-router'
import type { GameResultInterface } from '@/interfaces/game-result.interface'
import { PlayerEnum } from '@/interfaces/enums/player.enum'

let squares = ref(Array(9).fill(''))
let playerJoined: Ref<boolean> = ref(true)
let currentPlayerTurn: PlayerEnum = PlayerEnum.ONE
let showBoard: ComputedRef<boolean> = computed(() => {
  return (
    !currentGameResult.value?.cancelled && !currentGameResult.value?.winner && playerJoined.value
  )
})

const router = useRouter()
const mainStore = useMainStore()
const gameId = mainStore.getGameId
const clickPath = `click/${gameId}`
let currentGameResult: Ref<GameResultInterface | null> = ref(null)
let clickSubscription: StompSubscription | undefined = undefined
let joinSubscription: StompSubscription | undefined = undefined

onMounted(() => {
  if (!gameId) {
    router.push({ name: 'home' })
    return
  }

  clickSubscription = subscribe(clickPath, (message: IMessage) => {
    const baseResult: BaseResultInterface<GameResultInterface> = JSON.parse(message.body)
    if (baseResult.resultStatus == ResultStatusEnum.SUCCESS) {
      const gameResult = baseResult.resultValue
      currentGameResult.value = gameResult
      currentPlayerTurn = currentPlayerTurn == PlayerEnum.ONE ? PlayerEnum.TWO : PlayerEnum.ONE
      squares.value = gameResult.field

      if (gameResult.cancelled) {
        clickSubscription?.unsubscribe()
        mainStore.gameId = undefined
        setTimeout(() => {
          router.push({ name: 'home' })
        }, 3000)
      }
    }
  })

  if (mainStore.isPlayerOne) {
    playerJoined.value = false
    joinSubscription = subscribe(`joinGame/${gameId}`, (message: IMessage) => {
      const baseResult: BaseResultInterface<GameResultInterface> = JSON.parse(message.body)
      if (baseResult.resultStatus == ResultStatusEnum.SUCCESS) {
        playerJoined.value = true
        joinSubscription?.unsubscribe()
      }
    })
  }

  window.addEventListener('beforeunload', () => {
    publish(`disconnect/${gameId}`)
    clickSubscription?.unsubscribe()
  })
})

function onClick(index: number) {
  if (currentPlayerTurn == mainStore.playerType) {
    publish(clickPath, { body: index.toString() })
  }
}
</script>

<template>
  <div v-if="gameId">
    <main>
      <h2 class="gameId">
        GAME-ID: <span>{{ gameId }}</span>
      </h2>
      <h2 v-if="currentGameResult?.cancelled && !currentGameResult?.winner" style="color: red">
        Game is cancelled
      </h2>
      <h2 v-if="currentGameResult?.winner">
        <span style="color: #243da1">{{ currentGameResult?.winner }}</span> won the Game!
      </h2>
      <h2 v-if="!playerJoined">Waiting for another player to join</h2>
      <div id="board" v-if="showBoard">
        <Square v-for="index in 9" :key="index" @click="onClick(index - 1)">{{
          squares[index - 1]
        }}</Square>
      </div>
    </main>
  </div>
  <h1 v-else>Not connected to any game</h1>
</template>

<style scoped>
main {
  background: linear-gradient(#6482e6, #9198e5, #b6b6cc);
  height: 100vh;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  user-select: text;
}

.gameId {
  position: absolute;
  top: 0;
  left: 0;
  margin: 1rem;
  color: black;
  font-weight: normal;

  span {
    color: #243da1;
    font-weight: bold;
    user-select: all;
  }
}

#board {
  display: inline-grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
}
</style>
