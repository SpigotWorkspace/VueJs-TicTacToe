<script setup lang="ts">
import Square from '@/components/Square.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

let squares = ref(Array(9).fill(null))

const route = useRoute()
const gameId = route.params.gameId

function onClick(index: number) {
  squares.value[index] = 'X'
}
</script>

<template>
  <main>
    <div id="board">
      <Square v-for="index in 9" @click="onClick(index - 1)">{{ squares[index - 1] }}</Square>
    </div>
  </main>
</template>

<style scoped>
main {
  height: 100vh;
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
