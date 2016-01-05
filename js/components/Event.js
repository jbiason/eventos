import React from 'react';
import ReactDOM from 'react-dom';

export default ({event}) => {
  let tags;
  if (event.tagArray && event.tagArray.length > 0) {
    tags = event.tagArray.map((tag, i) => <li className="tag" key={i}>{tag}</li>)
  }

  return (
    <div className="ev-event {past ? 'past' : ''}">
      <div className="ev-event__col ev-event__col--info">
        <div className="ev-event__title">{event.name}</div>

        {event.description && <div className="ev-event__description"><span className="ev-event__label">Descrição do evento:</span>{event.description}</div>}

        <div className="u-row">
          <div className="u-col">
            <div className="ev-event__price"><span className="ev-event__label">Valor:</span>{event.formattedPrices}</div>
          </div>
          <div className="u-col">
            <div className="ev-event__date"><span className="ev-event__label">Data:</span>{event.formattedDates}</div>
          </div>
          <div className="u-col">
            <div className="ev-event__time"><span className="ev-event__label">Horário:</span>{event.formattedTime}</div>
          </div>
        </div>
        <div className="ev-event__location">
          <span className="ev-event__label">Local:</span>
          {event.formattedLocation}
          <br/>
          {event.formattedAddress}
        </div>

        {event.url && <div><a href="<%= event.url %>" target="_blank">+ Site do evento</a></div>}

        {tags && <div className=""><ul className="tags">{tags}</ul></div>}
      </div>

      {event.img && <div className="ev-event__col ev-event__col--image"><img src={event.img} className="ev-event__image" /></div>}
    </div>
  )
}
