import React, {PropTypes} from 'react';

const Event = ({event}) => {
  const getDescriptionHTML = (description) => {
    return {__html: description};
  };
  const tags = event.formattedTagArray.map((tag, i) => <li className="tag" key={i}>{tag}</li>);

  return (
    <div className={'ev-event ' + (event.formattedIsPast ? 'past' : '')}>
      <div className="ev-event__col ev-event__col--info">
        <div className="ev-event__title">{event.name}</div>

        {event.description &&
          <div className="ev-event__description">
            <span className="ev-event__label">Descrição do evento</span>
            <span dangerouslySetInnerHTML={getDescriptionHTML(event.description)}></span>
          </div>
        }

        <div className="u-row">
          <div className="u-col">
            <div className="ev-event__price">
              <span className="ev-event__label">Valor</span>{event.formattedPrice}
            </div>
          </div>
          <div className="u-col">
            <div className="ev-event__date"><span className="ev-event__label">Data</span>{event.formattedDate}</div>
          </div>
          <div className="u-col">
            <div className="ev-event__time"><span className="ev-event__label">Horário</span>{event.formattedTime}</div>
          </div>
        </div>
        <div className="ev-event__location">
          <span className="ev-event__label">Local</span>
          {event.formattedLocation}
          <br/>
          {event.formattedAddress}
        </div>

        {event.url && <div><a href={event.url} target="_blank">+ Site do evento</a></div>}

        {tags.length && <div className=""><ul className="tags">{tags}</ul></div>}
      </div>

      {event.img && <div className="ev-event__col ev-event__col--image"><img src={event.img} className="ev-event__image" /></div>}
    </div>
  );
};

Event.propTypes = {
  event: PropTypes.object.isRequired,
};

export default Event;
