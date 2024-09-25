import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { faEnvelopeSquare } from "@fortawesome/free-solid-svg-icons";
import "../styles/footer.css";

library.add(fab);

export default function Footer() {
  return (
    <footer className=" footer bg-light text-center container-fluid bottom-0 text-black d-flex lg:flex-row :flex-column justify-content-between  lg:px-8 sm:px-4 py-2 ">
      <div className="text-center d-flex flex text-center align-items-center justify-content-start me-6 w-50">
        <h6 className=" px-3">
          <Link className="nav-link active" aria-current="page" to="/home">
            Adopt
          </Link>
        </h6>
        <h6 className=" px-3">
          <Link className="nav-link active" aria-current="page" to="/profile">
            Profile
          </Link>
        </h6>
        <h6 className=" px-3">
          <Link className="nav-link active" aria-current="page" to="/">
            About Us
          </Link>
        </h6>
        <h6 className=" px-3">
          <Link
            className="nav-link active"
            aria-current="page"
            to="https://github.com/Hardikag17/savepaws"
          >
            Team
          </Link>
        </h6>
        <h6 className=" px-3">
          <Link
            className="nav-link active"
            aria-current="page"
            to="https://github.com/Hardikag17/savepaws"
          >
            Contribute
          </Link>
        </h6>
      </div>

      <div className="text-center d-flex flex text-center align-items-center m-auto">
        <h6 className=" p-2">
          <Link className="navbar-brand" to="/">
            <img alt="logo" src="../assets/brand/logo.png" height="20" />
            <b> Paws</b>
          </Link>
        </h6>
        <h6 className=" p-2">Terms of use</h6>
        <h6 className=" p-2">Privacy Policy</h6>
      </div>
    </footer>
  );
}
