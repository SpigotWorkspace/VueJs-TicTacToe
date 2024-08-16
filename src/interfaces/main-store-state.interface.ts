import type { Client } from '@stomp/stompjs'
import type { StateTree } from 'pinia'

export interface MainStoreStateInterface extends StateTree {
  hostname: string
  client: Client | undefined
}
