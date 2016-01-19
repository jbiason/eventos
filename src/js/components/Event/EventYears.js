import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import util from '../../util/util'

const EventYears = ({ events }) => {
  const years = util.arrayUniq(events.map(event => event.formattedYear))
  .sort((e1, e2) => parseInt(e2) - parseInt(e1))

  const yearsButtons = years.map((year, index) => {
    return (
      <div key={index}>
        <Link to={`/${year}`} className="pure-button" activeClassName="pure-button-disabled">
          { year }
        </Link>
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
}

export default EventYears
