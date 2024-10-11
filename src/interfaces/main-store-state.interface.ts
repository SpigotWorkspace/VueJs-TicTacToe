import type { Client } from '@stomp/stompjs'
import type { StateTree } from 'pinia'
import type { PlayerEnum } from '@/interfaces/enums/player.enum'

export interface MainStoreStateInterface extends StateTree {
  client: Client | undefined
  gameId: string | undefined
  playerType: PlayerEnum | undefined
}
