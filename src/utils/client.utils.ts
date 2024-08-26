import type { IMessage, IPublishParams } from '@stomp/stompjs'
import { useMainStore } from '@/stores/main.store'

export function publishAndSubscribe(
  path: string,
  callback: (message: IMessage) => void,
  publishParams?: Omit<IPublishParams, 'destination'>
): void {
  const mainStore = useMainStore()
  const client = mainStore.getClient
  let params: IPublishParams = { destination: `/app/${path}` }
  params = Object.assign(params, publishParams)
  client?.publish(params)
  client?.subscribe(`/game/${path}`, callback)
}
