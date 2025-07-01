import { Link } from "react-router-dom";

export default function ButtonMaintenance({ value1, value2, value3, route }) {
  return (
    <div className="container-buttonMaintenance">
      <p className="title-buttonMaintenance">{value1}</p>
      <p className="p-buttonMaintenance">{value2}</p>
      <Link to={route || "/"} className="buttonMaintenance-link">
        {value3}
      </Link>
    </div>
  );
}
