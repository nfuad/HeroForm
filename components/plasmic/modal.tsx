import 'react-responsive-modal/styles.css'
import { Modal } from 'react-responsive-modal'
import React, { useState } from 'react'
import styles from './styles.module.css'

interface props {
  openButton: any
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
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6 18L18 6M6 6l12 12"
      />
    </svg>
  )
}

const ResponsiveModal = ({ openButton = 'open it' }: props) => {
  const [open, setOpen] = useState(false)

  const onOpenModal = () => setOpen(true)
  const onCloseModal = () => setOpen(false)

  return (
    <div>
      <button className="w-full" onClick={onOpenModal}>
        {openButton}
      </button>

      <Modal
        open={open}
        onClose={onCloseModal}
        center
        classNames={{
          overlay: styles['customOverlay'],
          modal: styles['customModal'],
          closeIcon: styles['closeIcon'],
        }}
      >
        <iframe
          className="aspect-video bg-white w-full max-w-[1280]"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"
          title="YouTube video player"
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen={true}
        />
        <div
          onClick={onCloseModal}
          className={`${
            open ? 'block' : 'hidden'
          } bg-white p-1 cursor-pointer rounded-full top-0 absolute z-50 right-0 hover:bg-slate-200 transition-all duration-200 ease-in-out`}
        >
          <Icon />
        </div>
      </Modal>
    </div>
  )
}
export default ResponsiveModal
