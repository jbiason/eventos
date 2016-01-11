import { expect } from 'chai'
import { getEvents } from '../../src/js/services/EventService'
import { useInterceptors, ejectInterceptors } from '../axiosMock'
import mockData from '../data/EventsData'
import clone from 'clone'

describe('EventService', () => {
  const eventData = clone(mockData)

  beforeEach(() => {
    useInterceptors(clone(eventData))
  })

  afterEach(() => {
    ejectInterceptors()
  })

  it('should return events with formatted data set', () => {
    const expectEvent = (event) => {
      expect(event.formattedType).to.exist
      expect(event.formattedPrice).to.exist
      expect(event.formattedDate).to.exist
      expect(event.formattedDateArray).to.exist
      expect(event.formattedYear).to.exist
      expect(event.formattedIsPast).to.exist
      expect(event.formattedTime).to.exist
      expect(event.formattedLocation).to.exist
      expect(event.formattedAddress).to.exist
      expect(event.formattedTagArray).to.exist
    }

    return getEvents()
    .then((data) => {
      data.forEach(expectEvent)
    })
  })
})
