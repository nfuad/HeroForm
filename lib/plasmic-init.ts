import { initPlasmicLoader } from '@plasmicapp/loader-nextjs'
import Button from '@components/button'
import Collapsible from '@components/collapsible'

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

PLASMIC.registerComponent(Button, {
  name: 'AnimatedButton',
  props: {
    children: 'slot',
    className: 'string',
  },
})
