// see: https://github.com/4lejandrito/next-plausible/blob/master/index.tsx

import { useCallback } from 'react'

// https://docs.plausible.io/custom-event-goals#using-custom-props
type Props = Record<string, unknown> | never
type EventOptions<P extends Props> = {
  props: P
  callback?: VoidFunction
}
type EventOptionsTuple<P extends Props> = P extends never
  ? [Omit<EventOptions<P>, 'props'>?]
  : [EventOptions<P>]
type Events = { [K: string]: Props }

export function usePlausible<E extends Events = any>() {
  return useCallback(function <N extends keyof E>(
    eventName: N,
    ...rest: EventOptionsTuple<E[N]>
  ) {
    try {
      return (window as any).plausible?.(eventName, rest[0])
    } catch (error) {
      return () => {} // return empty function if plausible is not available
    }
  },
  [])
}
