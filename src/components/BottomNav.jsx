import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";

function BottomNav({ isLoading, isDark }) {
  const navigate = useNavigate();

  const isAndroid = navigator.userAgent.indexOf("Android") !== -1;

  useEffect(() => {
    // if (isAndroid) {
    //   for (let navBtn of document.querySelectorAll(".nav-btn")) {
    //     navBtn.style.marginBottom = 100;
    //   }
    // }
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
      <div style={{ marginBottom: isAndroid ? 90 : 45 }}>
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
      <div style={{ marginBottom: isAndroid ? 90 : 45 }}>
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
        style={{ marginBottom: isAndroid ? 100 : 55 }}
      />
      <div style={{ marginBottom: isAndroid ? 90 : 45 }}>
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
      <div style={{ marginBottom: isAndroid ? 90 : 45 }}>
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
