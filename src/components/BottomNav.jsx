import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

function BottomNav({ isLoading, isDark }) {
  const navigate = useNavigate();

  const isiPhone = () => {
    return /iPhone/i.test(navigator.userAgent);
  }
  
  useEffect(() => {
    const nav = document.querySelector("nav");
    if (isiPhone()) {
      nav.style.height = "20vh";
    } else {
      nav.style.height = "10vh";
    }
  }, []);

  const handleBtnHover = (event) => {
    const btn = event.target;
    const circleInnerDiv = btn.parentElement;
    const circleOuterDiv = circleInnerDiv.parentElement;

    if (btn.id === "map-btn") {
      return;
    }

    if (event.type === "mouseenter") {
      circleInnerDiv.classList.add("nav-btn-circle-inner");
      circleOuterDiv.classList.add("nav-btn-circle-outer");
    } else {
      circleInnerDiv.classList.remove("nav-btn-circle-inner");
      circleOuterDiv.classList.remove("nav-btn-circle-outer");
    }
  };

  const handeBtnClick = (route) => {
    if (!isLoading) {
      navigate(route);
    }
  };

  return (
    <nav style={{ backgroundColor: isDark === "true" ? "#000437" : "#66cdaa" }}>
      <div>
        <div>
          <img
            id="list-btn"
            className="nav-btn"
            src="/icons/list-outline.svg"
            alt="List button"
            onMouseEnter={handleBtnHover}
            onMouseLeave={handleBtnHover}
            onClick={() => handeBtnClick("/stations")}
          />
        </div>
      </div>
      <div>
        <div>
          <img
            id="fav-btn"
            className="nav-btn"
            src="/icons/heart-outline.svg"
            alt="Favourite button"
            onMouseEnter={handleBtnHover}
            onMouseLeave={handleBtnHover}
            onClick={() => handeBtnClick("/favourite-stations")}
          />
        </div>
      </div>
      <img
        id="map-btn"
        className="nav-btn"
        src="/icons/logo.png"
        alt="Map button"
        onMouseEnter={handleBtnHover}
        onMouseLeave={handleBtnHover}
        onClick={() => handeBtnClick("/")}
      />
      <div>
        <div>
          <img
            id="card-btn"
            className="nav-btn"
            src="/icons/card-outline.svg"
            alt="Card button"
            onMouseEnter={handleBtnHover}
            onMouseLeave={handleBtnHover}
            onClick={() => handeBtnClick("/payment")}
          />
        </div>
      </div>
      <div>
        <div>
          <img
            id="settings-btn"
            className="nav-btn"
            src="/icons/settings-outline.svg"
            alt="Settings button"
            onMouseEnter={handleBtnHover}
            onMouseLeave={handleBtnHover}
            onClick={() => handeBtnClick("/settings")}
          />
        </div>
      </div>
    </nav>
  );
}

export default BottomNav;
