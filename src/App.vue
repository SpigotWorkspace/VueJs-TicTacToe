<script setup lang="ts">
import { RouterView } from 'vue-router'
import { Client } from '@stomp/stompjs'
import { ref, onMounted, computed } from 'vue'
import { useMainStore } from '@/stores/main.store'

const mainStore = useMainStore()
const connected = ref(false)
const client = new Client({
  brokerURL: `ws://${mainStore.hostname}:8080/tictactoe-ws`,
  onConnect: () => {
    console.debug('connect')
    connected.value = true
  },
  onWebSocketClose: () => {
    connected.value = false
  }
})

onMounted(() => {
  client.activate()
  mainStore.client = client
})

const notConnectedMessage = computed(() => `WebSocket (${client.brokerURL}) not connected`)
</script>

<template>
  <RouterView v-if="connected" />
  <h1 v-else>{{ notConnectedMessage }}</h1>
</template>

<style>
* {
  user-select: none;
}
</style>
