import useIntersectionObserver from '@hooks/use-intersection-observer'
import { FC, useRef } from 'react'
import TransitionWrapper from './transition-wrapper'

const SuccessPage: FC = () => {
  const ref = useRef()
  const entryScreen1 = useIntersectionObserver(ref, {})
  const isVisible = !!entryScreen1?.isIntersecting

  return (
    <div
      ref={ref}
      className="flex flex-col items-center justify-center w-full h-full max-w-4xl px-4 mx-auto text-center gap-y-8 md:gap-y-12 lg:gap-y-16"
    >
      <TransitionWrapper isVisible={isVisible}>
        <div className="flex flex-col justify-center items-center mx-auto gap-y-3">
          <SuccessAnimation />
          <h1 className="text-xl md:text-3xl lg:text-5xl lg:leading-tight">
            Your response has been submitted. Thanks for your time!
          </h1>
        </div>
      </TransitionWrapper>
    </div>
  )
}

export default SuccessPage

const SuccessAnimation = () => (
  <div>
    <svg
      className="checkmark"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 52 52"
    >
      <circle
        className="checkmark__circle"
        cx="26"
        cy="26"
        r="25"
        fill="none"
      />{' '}
      <path
        className="checkmark__check"
        fill="none"
        d="M14.1 27.2l7.1 7.2 16.7-16.8"
      />
    </svg>

    <style jsx>{`
      .checkmark__circle {
        stroke-dasharray: 166;
        stroke-dashoffset: 166;
        stroke-width: 2;
        stroke-miterlimit: 10;
        stroke: #42c1a6;
        fill: none;
        animation: stroke 0.6s cubic-bezier(0.65, 0, 0.45, 1) forwards;
      }
      .checkmark {
        width: 56px;
        height: 56px;
        border-radius: 50%;
        display: block;
        stroke-width: 2;
        stroke: #fff;
        stroke-miterlimit: 10;
        margin: 10% auto;
        box-shadow: inset 0px 0px 0px #7ac142;
        animation: fill 0.4s ease-in-out 0.4s forwards,
          scale 0.3s ease-in-out 0.9s both;
      }
      .checkmark__check {
        transform-origin: 50% 50%;
        stroke-dasharray: 48;
        stroke-dashoffset: 48;
        animation: stroke 0.3s cubic-bezier(0.65, 0, 0.45, 1) 0.8s forwards;
      }
      @keyframes stroke {
        100% {
          stroke-dashoffset: 0;
        }
      }
      @keyframes scale {
        0%,
        100% {
          transform: none;
        }
        50% {
          transform: scale3d(1.1, 1.1, 1);
        }
      }
      @keyframes fill {
        100% {
          box-shadow: inset 0px 0px 0px 30px #7ac142;
        }
      }
    `}</style>
  </div>
)
