import { FC, useEffect } from 'react'
import { InlineWidget, useCalendlyEventListener } from 'react-calendly'
import Cal from '@calcom/embed-react'
import { WarningIcon } from '@components/icons'

type Props = {
  properties: any
  handleEventScheduled?: (val: any) => void
}

enum SchedulingServiceType {
  CALENDLY = 'calendly',
  CAL_COM = 'cal.com',
  UNKNOWN = 'unknown',
}

const Scheduling: FC<Props> = ({ properties, handleEventScheduled }) => {
  const { schedulingLink } = properties

  const onEventScheduled = ({ data: { event } }) => {
    const isEventScheduled = event === 'calendly.event_scheduled'
    if (isEventScheduled) {
      handleEventScheduled(true)
    }
  }

  useCalEventListener({ handleEventScheduled })

  useCalendlyEventListener({ onEventScheduled })

  const renderSchedulingService = (type) => {
    switch (type) {
      case SchedulingServiceType.CALENDLY:
        return (
          <InlineWidget
            // pageSettings={{
            //   hideLandingPageDetails: true,
            //   hideEventTypeDetails: true,
            // }}
            key={schedulingLink}
            url={schedulingLink}
          />
        ) // "https://calendly.com/creable-nafis"
      case SchedulingServiceType.CAL_COM:
        const getCalLink = (schedulingLink) => {
          if (!schedulingLink) return ''
          try {
            const url = new URL(schedulingLink)
            return url?.pathname
          } catch (error) {
            return ''
          }
        }
        const calLink = getCalLink(schedulingLink)
        if (!calLink)
          return (
            <p className="text-center text-red-500 py-3">
              Invalid cal.com link
            </p>
          )

        return (
          <Cal
            key={calLink}
            embedJsUrl="https://cal.com/embed.js"
            calLink={calLink} // "realnafis/quick"
            config={
              process.env.NODE_ENV === 'development'
                ? {
                    name: 'John Doe',
                    email: 'johndoe@gmail.com',
                    notes: 'Test Meeting',
                    guests: ['janedoe@gmail.com'],
                    theme: 'light',
                  }
                : {}
            }
          />
        )
      case SchedulingServiceType.UNKNOWN:
        return (
          <div className="flex justify-center items-center mx-auto text-red-600">
            <WarningIcon />

            <p className="ml-2 text-center py-3">
              Please add a valid calendly.com or cal.com link.
            </p>
          </div>
        )
      default:
        throw new Error('Unknown scheduling service type')
    }
  }

  const getSchedulingLinkType = (schedulingLink) => {
    if (!schedulingLink) {
      return SchedulingServiceType.UNKNOWN
    }
    if (schedulingLink?.includes('calendly.com')) {
      return SchedulingServiceType.CALENDLY
    }
    if (schedulingLink?.includes('cal.com')) {
      return SchedulingServiceType.CAL_COM
    }
    return SchedulingServiceType.UNKNOWN
  }

  return (
    <div className="flex flex-col items-center justify-center w-full gap-y-3 mt-6">
      <div className="w-full mx-auto">
        {renderSchedulingService(getSchedulingLinkType(schedulingLink))}
      </div>
    </div>
  )
}

export default Scheduling

const useCalEventListener = ({ handleEventScheduled }) => {
  useEffect(() => {
    const globalCal =
      // @ts-ignore
      typeof window !== 'undefined' && typeof window.Cal !== 'undefined'
        ? // @ts-ignore
          window.Cal
        : null
    if (globalCal) {
      globalCal?.('on', {
        action: 'bookingSuccessful',
        callback: (e) => {
          handleEventScheduled(true)
        },
      })
    }
  })
}
