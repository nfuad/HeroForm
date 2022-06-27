import { initPlasmicLoader } from '@plasmicapp/loader-nextjs'
import Button from '@components/button'
import Collapsible from '@components/plasmic/collapsible'
import Image from '@components/plasmic/image'
import ResponsiveModal from '@components/plasmic/modal'

export const PLASMIC = initPlasmicLoader({
  projects: [
    {
      id: process.env.PLASMIC_PROJECT_ID, // ID of a project you are using
      token: process.env.PLASMIC_API_TOKEN, // API token for that project
    },
  ],
  // Fetches the latest revisions, whether or not they were unpublished!
  // Disable for production to ensure you render only published changes.
  preview: true,
})

PLASMIC.registerComponent(Collapsible, {
  name: 'Collapsible',
  props: {
    children: 'slot',
    header: 'slot',
    open: 'boolean',
  },
})

PLASMIC.registerComponent(Image, {
  name: 'NextImage',
  props: {
    src: 'string',
    alt: 'string',
    width: 'string',
    height: 'string',
    others: 'object',
  },
})

PLASMIC.registerComponent(ResponsiveModal, {
  name: 'CustomModal', // couldn't give responsive modal as a component with the same name exists
  props: {
    openButton: 'slot',
  },
})

PLASMIC.registerComponent(Button, {
  name: 'AnimatedButton',
  props: {
    children: 'slot',
    className: 'string',
  },
})
