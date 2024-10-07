import type { IMessage, IPublishParams, StompSubscription } from '@stomp/stompjs'
import { useMainStore } from '@/stores/main.store'

export function publishAndSubscribe(
  path: string,
  callback: (message: IMessage) => void,
  isPrivate?: boolean,
  shouldUnsubscribe: boolean = true,
  publishParams?: Omit<IPublishParams, 'destination'>,
  shouldPublish: boolean = true
): StompSubscription | undefined {
  const mainStore = useMainStore()
  const client = mainStore.getClient
  let params: IPublishParams = { destination: `/app/${path}` }
  let subDestination: string = `/game/${path}`
  if (isPrivate) {
    subDestination = '/user' + subDestination
  }
  params = Object.assign(params, publishParams)
  const subscription: StompSubscription | undefined = client?.subscribe(
    subDestination,
    (message: IMessage): void => {
      callback(message)

      if (shouldUnsubscribe) {
        subscription?.unsubscribe()
      }
    }
  )
  if (shouldPublish) {
    client?.publish(params)
  }

  return subscription
}

export function subscribe(
  path: string,
  callback: (message: IMessage) => void,
  isPrivate?: boolean
): StompSubscription | undefined {
  return publishAndSubscribe(path, callback, isPrivate, false, {}, false)
}

export function publish(path: string, publishParams?: Omit<IPublishParams, 'destination'>): void {
  const mainStore = useMainStore()
  const client = mainStore.getClient

  let params: IPublishParams = { destination: `/app/${path}` }
  params = Object.assign(params, publishParams)
  client?.publish(params)
}
