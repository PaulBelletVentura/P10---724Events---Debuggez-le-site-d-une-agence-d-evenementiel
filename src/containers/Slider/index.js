import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1
  ) || [];

  const [index, setIndex] = useState(-1); // Définir initialement à -1

  useEffect(() => {
    if (byDateDesc.length > 0 && index === -1) {
      // Si des données sont disponibles et l'index est -1, définissez l'index sur 0
      setIndex(0);
    }
  }, [byDateDesc, index]);

  const nextCard = () => {
    setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length);
  };

  useEffect(() => {
    const timer = setTimeout(nextCard, 5000); // Modification timer slider
    return () => clearTimeout(timer);
  }, [index]);

  const handleRadioChange = (radioIdx) => {
    setIndex(radioIdx);
  };

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, eventIdx) => (
        <div
          key={`${event.title}-${event.description}-${event.date}`}
          className={`SlideCard SlideCard--${
            index === eventIdx ? "display" : "hide"
          }`}
        >
          <img src={event.cover} alt="forum" />
          <div className="SlideCard__descriptionContainer">
            <div className="SlideCard__description">
              <h3>{event.title}</h3>
              <p>{event.description}</p>
              <div>{getMonth(new Date(event.date))}</div>
            </div>
          </div>
        </div>
      ))}
      <div className="SlideCard__paginationContainer">
        <div className="SlideCard__pagination">
          {byDateDesc?.map((event, radioIdx) => (
            <input
              key={`${event.title}-${event.description}-${event.date}`}
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => handleRadioChange(radioIdx)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
