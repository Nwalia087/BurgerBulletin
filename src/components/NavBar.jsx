import React from "react";

const NavBar = (props) => {
  return (
    <div>
      <nav className="navbar fixed-top  navbar-expand-lg bg-white">
        <div className="container-fluid">
          <a className="navbar-brand d-flex align-middle" href="/">
            <img
              src="./public/vegan-burger.png"
              alt="Logo"
              width="40"
              height="40"
              className="d-inline-block align-text-end me-2"
            />
            <span className="text-align-center lh-lg">Burger Bulletin</span>
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="/"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false">
                  Top Headlines
                </a>
                <ul className="dropdown-menu" id="catagory-Selector" onClick={props.handleDropdownClick}>
                  <li>
                    <div className="dropdown-item " href="#" data-option="business">
                      business
                    </div>
                  </li>
                  <li>
                    <div className="dropdown-item" href="#" data-option="entertainment">
                      entertainment
                    </div>
                  </li>
                  <li>
                    <div className="dropdown-item" href="#" data-option="general">
                      general
                    </div>
                  </li>
                  <li>
                    <div className="dropdown-item" href="#" data-option="health">
                      health
                    </div>
                  </li>
                  <li>
                    <div className="dropdown-item" href="#" data-option="science">
                      science
                    </div>
                  </li>
                  <li>
                    <div className="dropdown-item" href="#" data-option="sports">
                      sports
                    </div>
                  </li>
                  <li>
                    <div className="dropdown-item" href="#" data-option="technology">
                      technology
                    </div>
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default NavBar;
