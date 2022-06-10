import "./nav.css";
import { Outlet } from "react-router";
import { Link } from "react-router-dom";
import Clock from "../clock/Clock";
import {
  IoHomeSharp,
  IoJournalSharp,
  IoWalletSharp,
  IoCreateSharp,
  IoInformationCircle,
  IoListSharp,
  IoSunnySharp,
  IoMoonSharp,
} from "react-icons/io5";

const Nav = (props) => {
  return (
    <div
      className={props.mode === "darkMode" ? "wrapper dark" : "wrapper light"}
    >
      <div className="nav-menu">
        <div className="nav-left">The Daily Mind</div>
        <ul className="nav-list">
          <li className="nav-item">
            <Link to="/">
              <IoHomeSharp />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/journal">
              <IoJournalSharp />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/budget">
              <IoWalletSharp />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/todo">
              <IoListSharp />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/notes">
              <IoCreateSharp />
            </Link>
          </li>
          <li className="nav-item">
            <Link to="about">
              <IoInformationCircle />
            </Link>
          </li>
        </ul>
        <div className="nav-right">
          <Clock />
          <button onClick={props.change}>
            {props.mode === "darkMode" ? (
              <IoSunnySharp alt="change to light mode" />
            ) : (
              <IoMoonSharp />
            )}
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
};

export default Nav;
