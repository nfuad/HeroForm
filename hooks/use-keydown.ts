import { useCallback, useEffect } from 'react'

type Params = {
  onKeyDown: (context: {
    key: string
    isEnterKeyPressed: boolean
    isShiftKeyPressed: boolean
  }) => void
  stopListening?: boolean
}

export const useKeydown = (params: Params) => {
  const { onKeyDown, stopListening = false } = params

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      onKeyDown({
        key: e.key,
        isEnterKeyPressed: e.key === 'Enter',
        isShiftKeyPressed: e.shiftKey,
      })
    },
    [onKeyDown],
  )

  useEffect(() => {
    if (stopListening) {
      window.removeEventListener('keydown', handleKeyDown)
      return
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [handleKeyDown, stopListening])
}
