<script setup lang="ts">
import Square from '@/components/Square.vue'
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { useMainStore } from '@/stores/main.store'
import { publish, publishAndSubscribe } from '@/utils/client.utils'
import type { IMessage, StompSubscription } from '@stomp/stompjs'
import type { BaseResultInterface } from '@/interfaces/base-result.interface'
import { ResultStatusEnum } from '@/interfaces/enums/result-status.enum'
import { useRouter } from 'vue-router'

let squares = ref(Array(9).fill(''))

const router = useRouter()
const mainStore = useMainStore()
const gameId = mainStore.getGameId
const clickPath = `click/${gameId}`
let subscription: StompSubscription | undefined = undefined

onBeforeUnmount(() => {
  publishAndSubscribe(
    'disconnect',
    (message: IMessage) => {
      //TODO
    },
    true,
    true
  )
  subscription?.unsubscribe()
})

onMounted(() => {
  if (!gameId) {
    router.push({ name: 'home' })
    return
  }

  subscription = publishAndSubscribe(
    clickPath,
    (message) => {
      const baseResult: BaseResultInterface<string[]> = JSON.parse(message.body)
      if (baseResult.resultStatus == ResultStatusEnum.SUCCESS) {
        squares.value = baseResult.resultValue
      }
    },
    false,
    false
  )
})

function onClick(index: number) {
  publish(clickPath, { body: index.toString() })
}
</script>

<template>
  <div v-if="gameId">
    <main>
      <div id="board">
        <Square v-for="index in 9" @click="onClick(index - 1)">{{ squares[index - 1] }}</Square>
      </div>
    </main>
  </div>
  <h1 v-else>Not connected to any game</h1>
</template>

<style scoped>
main {
  height: 100vh;
  max-height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

#board {
  display: inline-grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: center;
  align-items: center;
}
</style>
