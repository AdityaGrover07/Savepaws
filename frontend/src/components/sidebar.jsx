import "../styles/sidebar.css";
export default function SideBar() {
  return (
    <div>
      <div className="d-flex flex-sm-column flex-row flex-nowrap  align-items-center ">
        <ul className="nav nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
          <li className="nav-item">
            <a
              href="#"
              className="nav-link py-3 px-2"
              title=""
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-original-title="filterOption1"
            >
              Gender
            </a>
          </li>
          <li>
            <a
              href="#"
              className="nav-link py-3 px-2"
              title=""
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-original-title="Dashboard"
            >
              MinAge
            </a>
          </li>
          <li>
            <a
              href="#"
              className="nav-link py-3 px-2"
              title=""
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-original-title="Orders"
            >
              MaxAge
            </a>
          </li>
          <li>
            <a
              href="#"
              className="nav-link py-3 px-2"
              title=""
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-original-title="Products"
            >
              Breed
            </a>
          </li>
          <li>
            <a
              href="#"
              className="nav-link py-3 px-2"
              title=""
              data-bs-toggle="tooltip"
              data-bs-placement="right"
              data-bs-original-title="Customers"
            >
              Health
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
