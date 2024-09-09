<script setup lang="ts">
import Square from '@/components/Square.vue'
import { onBeforeUnmount, ref } from 'vue'
import { useMainStore } from '@/stores/main.store'
import { publishAndSubscribe } from '@/utils/client.utils'
import type { IMessage } from '@stomp/stompjs'

let squares = ref(Array(9).fill(null))

const mainStore = useMainStore()
const gameId = mainStore.getGameId

onBeforeUnmount(() => {
  publishAndSubscribe(
    'disconnect',
    (message: IMessage) => {
      //TODO
    },
    true,
    true
  )
})

function onClick(index: number) {
  squares.value[index] = 'X'
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
