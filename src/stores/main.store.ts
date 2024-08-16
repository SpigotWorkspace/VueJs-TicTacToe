import { defineStore } from 'pinia'
import type { MainStoreStateInterface } from '@/interfaces/main-store-state.interface'
import type { Client } from '@stomp/stompjs'

export const useMainStore = defineStore('main', {
  state: (): MainStoreStateInterface => {
    return {
      hostname: window.location.hostname,
      client: undefined
    }
  },
  getters: {
    getClient(state): Client | undefined {
      if (state.client === undefined) {
        console.error("Client in store 'main' is undefined")
      }

      return state.client as Client
    }
  }
})
