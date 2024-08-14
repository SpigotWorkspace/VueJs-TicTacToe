<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Client } from '@stomp/stompjs'
import { ref, onMounted } from 'vue'
import { useMainStore } from '@/stores/main.store'

const store = useMainStore()
const connected = ref(false)
const client = new Client({
  brokerURL: `ws://${store.hostname}:8080/tictactoe-ws`,
  onConnect: () => {
    connected.value = true
  },
  onDisconnect: () => {
    connected.value = false
  }
})

onMounted(() => {
  client.activate()
})
</script>

<template>
  <RouterView v-if="connected" />
  <h1 v-else>WebSocket nicht verbunden</h1>
</template>

<style>
* {
  user-select: none;
}
</style>
