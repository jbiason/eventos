import React, { PropTypes } from 'react'
import util from '../../util/util'

const EventYears = ({ events, selectedYear, selectYear }) => {
  const years = util.arrayUniq(events.map(event => event.formattedYear))
  .sort((e1, e2) => parseInt(e2) - parseInt(e1))

  const yearsButtons = years.map((year, index) => {
    return (
      <div key={index}>
        <button type="button"
          onClick={() => selectYear(year)}
          className={'pure-button ' + (selectedYear === year ? 'pure-button-disabled' : '')}
        >
          {year}
        </button>
      </div>
    )
  })

  return (
    <div className="year-list">
      {yearsButtons}
    </div>
  )
}

EventYears.propTypes = {
  events: PropTypes.array.isRequired,
  selectedYear: PropTypes.number.isRequired,
  selectYear: PropTypes.func.isRequired,
}

export default EventYears
