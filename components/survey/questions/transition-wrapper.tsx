import { Transition } from '@headlessui/react'

const TransitionWrapper = ({
  isVisible,
  children,
  enter = 'transform transition duration-[400ms]',
  enterFrom = 'opacity-0',
  enterTo = 'opacity-100 translate-y-0',
  leave = 'transform duration-200 transition ease-in-out',
  leaveFrom = 'opacity-100 scale-100 translate-y-0',
  leaveTo = 'opacity-0',
}) => {
  return (
    <Transition
      className={'w-full flex justify-center items-center'}
      show={isVisible}
      enter={enter}
      enterFrom={enterFrom}
      enterTo={enterTo}
      leave={leave}
      leaveFrom={leaveFrom}
      leaveTo={leaveTo}
    >
      {children}
    </Transition>
  )
}

export default TransitionWrapper
