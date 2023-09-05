import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1  // Ordre chronologique des slides en fonction des dates
  ) || [];

  const [index, setIndex] = useState(-1); // Définir initialement à -1

  useEffect(() => {
    if (byDateDesc.length > 0 && index === -1) {
      // Si les données sont disponibles et l'index est -1, l'index est défini sur 0
      setIndex(0);
    }
  }, [byDateDesc, index]);

  const nextCard = () => {
    setIndex((prevIndex) => (prevIndex + 1) % byDateDesc.length);  // Boucle du slider 
  };

  useEffect(() => {
    const timer = setTimeout(nextCard, 5000);  // Modification timer slider
    return () => clearTimeout(timer);
  }, [index]);

  const handleRadioChange = (radioIdx) => {  // Ajout fonction handleRadio pour les dots
    setIndex(radioIdx);
  };

  return (
    <div className="SlideCardList">
      {byDateDesc?.map((event, eventIdx) => (
        <div
          key={`${event.title}-${event.description}-${event.date}`} // Ajout de key unique
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
              key={`${event.title}-${event.description}-${event.date}`} // Ajout de key unique
              type="radio"
              name="radio-button"
              checked={index === radioIdx}
              onChange={() => handleRadioChange(radioIdx)} // Ajout fonction handleRadio
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
