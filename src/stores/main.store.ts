import { defineStore } from 'pinia'
import type { MainStoreStateInterface } from '@/interfaces/main-store-state.interface'
import type { Client } from '@stomp/stompjs'
import { PlayerEnum } from '@/interfaces/enums/player.enum'

export const useMainStore = defineStore('main', {
  state: (): MainStoreStateInterface => {
    return {
      client: undefined,
      gameId: undefined,
      playerType: undefined
    }
  },
  getters: {
    getClient(state): Client | undefined {
      if (state.client === undefined) {
        console.error("Client in store 'main' is undefined")
      }
      return state.client as Client
    },
    getGameId(state): string | undefined {
      return state.gameId
    },
    isPlayerOne(state): boolean {
      return state.playerType == PlayerEnum.ONE
    }
  },
  actions: {
    joinGame(gameId: string, playerType: PlayerEnum): void {
      this.gameId = gameId
      this.playerType = playerType
    }
  }
})
