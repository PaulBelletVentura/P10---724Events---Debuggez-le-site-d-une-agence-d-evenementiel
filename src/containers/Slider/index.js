import { useEffect, useState } from "react";
import { useData } from "../../contexts/DataContext";
import { getMonth } from "../../helpers/Date";

import "./style.scss";

const Slider = () => {
  const { data } = useData();
  const [index, setIndex] = useState(0);
  const byDateDesc = data?.focus.sort((evtA, evtB) =>
    new Date(evtA.date) < new Date(evtB.date) ? -1 : 1 // Tri dans l'ordre chronologique, faire test en live dans le fichier events.json
  )|| []; // ou valeur nule

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
      {byDateDesc?.map((event) => (
        <div
          key={event.id} // Utilisation de l'identifiant unique comme clé
          className={`SlideCard SlideCard--${
            index === byDateDesc.indexOf(event) ? "display" : "hide"
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
              key={event.id} // Utilisation de l'identifiant unique comme clé
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