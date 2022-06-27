import * as React from 'react'
import { useEffect, useRef, useState } from 'react'

export interface Props {
  open?: boolean
  header: string | React.ReactNode
  children: any
}

const Icon = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 w-6"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={2}
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  )
}

const Collapsible: React.FC<Props> = ({ open, children = '', header = '' }) => {
  const [isOpen, setIsOpen] = useState(open)
  const [height, setHeight] = useState<number | undefined>(open ? undefined : 0)
  const ref = useRef<HTMLDivElement>(null)
  const handleFilterOpening = () => {
    setIsOpen((prev) => !prev)
  }

  useEffect(() => {
    if (!height || !isOpen || !ref.current) return undefined
    // @ts-ignore
    const resizeObserver = new ResizeObserver((el) => {
      setHeight(el[0].contentRect.height)
    })
    resizeObserver.observe(ref.current)
    return () => {
      resizeObserver.disconnect()
    }
  }, [height, isOpen])

  useEffect(() => {
    if (isOpen) setHeight(ref.current?.getBoundingClientRect().height)
    else setHeight(0)
  }, [isOpen])

  return (
    <>
      <div className="w-full">
        <div
          className="bg-gray-50 rounded-xl cursor-pointer"
          onClick={handleFilterOpening}
        >
          <div className="flex justify-between p-5">
            <div>{header}</div>
            <i
              className={`flex justify-center items-center ${
                isOpen ? 'rotate-180' : ''
              }`}
            >
              <Icon />
            </i>
          </div>
        </div>
        <div
          className="overflow-hidden transition-height duration-200 ease-in-out"
          style={{ height }}
        >
          <div ref={ref}>
            <div className={`p-5`}>{children}</div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Collapsible
