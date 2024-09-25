import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faHeart, faComments } from "@fortawesome/free-solid-svg-icons";
import "../styles/loadingcard.css";

library.add(fab);
export default function LoadingCard() {
  return (
    <div className="cards animate-pulse">
      <section className="cards container-fluid animate-pulse">
        <article className="card--loading-pet card--2 animate-pulse">
          <div className="card_loading__img animate-pulse"></div>
          <div className=" card__info">
            <div className="inner-card animate-pulse"></div>
            <br />
            <div className="inner-card animate-pulse"></div>
          </div>
        </article>
      </section>
    </div>
  );
}
