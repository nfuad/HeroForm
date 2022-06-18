// import Layout from '@components/layout'
// import {
//   Heading,
//   SeeDemoButton,
//   Video,
//   HowItWorks,
//   // Testimonials,
//   LastCTA,
//   Features,
//   Integrations,
// } from '@components/home'

// const HomePage = () => {
//   return (
//     <Layout showHeader showFooter>
//       <Heading />
//       <SeeDemoButton />
//       <Video />
//       <HowItWorks />
//       <Features />
//       {/* <Testimonials /> */}
//       <Integrations />
//       <LastCTA />
//     </Layout>
//   )
// }

// export default HomePage

// This page will show up at the route /mypage

import {
  PlasmicRootProvider,
  PlasmicComponent,
  ComponentRenderData,
  extractPlasmicQueryData,
} from '@plasmicapp/loader-nextjs'
import { PLASMIC } from '@lib/plasmic-init'

// Statically fetch the data needed to render Plasmic pages or components.
export const getStaticProps = async () => {
  // You can pass in multiple page paths or component names.
  const plasmicData = await PLASMIC.fetchComponentData('Homepage')
  if (!plasmicData) {
    throw new Error('No Plasmic design found')
  }

  // Cache the necessary data fetched for the page
  const queryCache = await extractPlasmicQueryData(
    <PlasmicRootProvider loader={PLASMIC} prefetchedData={plasmicData}>
      <PlasmicComponent component={plasmicData.entryCompMetas[0].displayName} />
    </PlasmicRootProvider>,
  )
  return {
    props: {
      plasmicData,
      queryCache,
      // ...
    },

    // Using incremental static regeneration, will invalidate this page
    // after 300s (no deploy webhooks needed)
    revalidate: 300,
  }
}

// Render the page or component from Plasmic.
export default function MyPage(props: {
  plasmicData: ComponentRenderData
  queryCache?: Record<string, any>
}) {
  return (
    <PlasmicRootProvider
      loader={PLASMIC}
      prefetchedData={props.plasmicData}
      prefetchedQueryData={props.queryCache}
    >
      <PlasmicComponent component="Homepage" />
    </PlasmicRootProvider>
  )
}
