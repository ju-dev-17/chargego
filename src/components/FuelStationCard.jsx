import React from "react";

function FuelStationCard(station) {
  const handleClick = (event) => {
    const cardFavBtn = event.target;
    if (
      localStorage
        .getItem("favStations")
        .includes(cardFavBtn.parentElement.parentElement.id)
    ) {
      removeFromFav(event);
    } else {
      addToFav(event);
    }
  };

  return (
    <div class="card" id={station.id}>
      <div class="card-header">
        <img src="/img/card-img-placeholder.svg" alt="Fuel Station" />
      </div>
      <div class="card-body">
        <img
          onClick={handleClick}
          class="card-fav-btn"
          src={
            localStorage.getItem("favStations").includes(station.id)
              ? "/icons/heart.svg"
              : "/icons/heart-outline.svg"
          }
          alt="Favourite Button"
        />
        <div class="card-body-mid">
          <span>Price: {station.diesel} €/kw</span>
          <span>Time: 4.45 min</span>
        </div>
        <div class="card-body-last">
          <span>Distance: {distance} km</span>
          <div>
            <img src="/icons/car.png" alt="Car" />
            <div
              class={
                station.isOpen ? "status-circle-open" : "status-circle-close"
              }
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FuelStationCard;