import { useCallback, useContext, useEffect, useState } from "react";
import { UserContext } from "../utils/userContext";
import { Link, useNavigate } from "react-router-dom";
import { API_ROOT } from "../api-config";
import axios from "axios";
import SearchOverlay from "./searchOverlay";
export default function Navbar() {
  const { state, setState } = useContext(UserContext);
  const [searchText, setSearchText] = useState(null);
  const [pets, setPets] = useState([]);
  const [overlay, setOverlay] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchText && searchText.length > 0) setOverlay(true);
    else setOverlay(false);

    setState({ ...state, overlay: overlay });
  }, [searchText, overlay]);

  const getPets = useCallback(async (event) => {
    setSearchText(event.target.value);
    const res = await axios.get(
      `${API_ROOT}/pets?searchText=${event.target.value}`
    );

    await setPets(res.data);
  });

  const search = (
    <div className="d-flex mx-auto" role="search">
      <input
        className="form-control me-3"
        style={{ width: "250px" }}
        type="search"
        placeholder="Search"
        aria-label="Search"
        value={searchText}
        onChange={getPets}
      />
      <button
        className="btn btn-success btn-lg banner-btn"
        style={{ fontSize: "15px" }}
      >
        Search
      </button>
    </div>
  );

  const Logout = () => {
    try {
      axios
        .get(`${API_ROOT}/user/logout`, {
          withCredentials: true,
        })
        .then((res) => {
          if (res.status === 200) {
            sessionStorage.clear();
            setState({
              user: false,
              email: "",
              name: "",
              userPosts: [],
              token: false,
            });

            navigate("/");
          }
        });
    } catch (err) {
      console.log(err);
    }
  };

  const notLoggedIn = (
    <nav className="navbar navbar-expand-lg bg-light sticky-top z-5">
      <div className="container-fluid">
        <Link onClick={() => setSearchText("")} className="navbar-brand" to="/">
          <img alt="logo" src="../assets/brand/logo.png" height="20" />
          <b> Paws Adoption</b>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <Link
                onClick={() => setSearchText("")}
                className="nav-link active"
                aria-current="page"
                to="/"
              >
                Help
              </Link>
            </li> */}
            <li className="nav-item">
              <Link
                onClick={() => setSearchText("")}
                className="nav-link active"
                to="/home"
              >
                Adopt
              </Link>
            </li>
            <li className="nav-item">
              <Link
                onClick={() => setSearchText("")}
                className="nav-link active"
                to="/analytics"
              >
                Analytics
              </Link>
            </li>
            {/* <li className="nav-item">
                <a className="nav-link" href="/">
                  Shop
                </a>
              </li> */}
          </ul>

          {search}

          <ul className="navbar-nav mr-auto mr-2 mr-lg-0">
            <li className="nav-item">
              <Link
                onClick={() => setSearchText("")}
                to="/register"
                className="nav-link active"
                aria-current="page"
              >
                Register
              </Link>
            </li>
            <li className="nav-item">
              <Link
                onClick={() => setSearchText("")}
                to="/login"
                className="nav-link active"
              >
                Login
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

  const LoggedIn = (
    <nav className="navbar navbar-expand-lg sticky-top z-5 bg-light">
      <div className="container-fluid ">
        <Link onClick={() => setSearchText("")} className="navbar-brand" to="/">
          <img alt="logo" src="../assets/brand/logo.png" height="20" /> Paws
          Adoption
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            {/* <li className="nav-item">
              <Link
                onClick={() => setSearchText("")}
                className="nav-link active"
                aria-current="page"
                to="/"
              >
                Help
              </Link>
            </li> */}
            <li className="nav-item">
              <Link
                onClick={() => setSearchText("")}
                className="nav-link active"
                to="/home"
              >
                Adopt
              </Link>
            </li>
            <li className="nav-item">
              <Link
                onClick={() => setSearchText("")}
                className="nav-link active"
                to="/analytics"
              >
                Analytics
              </Link>
            </li>
            {/* <li className="nav-item">
                <a className="nav-link" href="/">
                  Shop
                </a>
              </li> */}
          </ul>

          {/* <form className="d-flex mx-auto" role="search">
            <input
              className="form-control me-3"
              style={{ width: "250px" }}
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button
              className="btn btn-success btn-lg banner-btn"
              style={{ fontSize: "15px" }}
              type="submit"
            >
              Search
            </button>
          </form> */}
          {search}
          <ul className="navbar-nav mr-auto mr-2 mr-lg-0">
            <li className="nav-item">
              <Link
                onClick={() => setSearchText("")}
                className="nav-link active"
                to="/chats"
              >
                Chat
              </Link>
            </li>
            <li className=" px-2 cursor-pointer dropdown">
              <img
                type="button"
                data-bs-toggle="dropdown"
                src={` https://paws-adoption.s3.ap-south-1.amazonaws.com/users/${state.userID}.jpeg`}
                onError={({ currentTarget }) => {
                  currentTarget.onerror = null;
                  currentTarget.src =
                    "https://s3.eu-central-1.amazonaws.com/bootstrapbaymisc/blog/24_days_bootstrap/fox.jpg";
                }}
                width="40"
                height="40"
                className="rounded-circle dropdown-toggle"
                alt="Placeholder profile pic"
              />
              <ul class="dropdown-menu dropdown-menu-end text-center">
                <li>
                  <Link
                    onClick={() => setSearchText("")}
                    class="dropdown-item"
                    to="/requests"
                  >
                    Requests
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setSearchText("")}
                    class="dropdown-item"
                    to="/addpet"
                  >
                    Add Pet
                  </Link>
                </li>
                <li>
                  <Link
                    onClick={() => setSearchText("")}
                    class="dropdown-item"
                    to="/profile"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button class="dropdown-item" onClick={Logout}>
                    Logout
                  </button>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );

  return (
    <div className=" sticky-top">
      {state.user ? LoggedIn : notLoggedIn}
      {state.overlay ? (
        <SearchOverlay
          setSearchText={setSearchText}
          searchText={searchText}
          Pets={pets}
        />
      ) : (
        <div />
      )}
    </div>
  );
}
