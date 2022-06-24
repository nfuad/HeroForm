import { initPlasmicLoader } from '@plasmicapp/loader-nextjs'
import { SeeDemoButton } from '@components/home'
import Button from '@components/button'

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

PLASMIC.registerComponent(SeeDemoButton, {
  name: 'SeeDemoButton',
  props: {
    children: 'slot',
  },
})

PLASMIC.registerComponent(Button, {
  name: 'AnimatedButton',
  props: {
    children: 'slot',
    className: 'string',
  },
})
