import { Link } from "react-router-dom";

export default function Button404({ value1, value2, value3, route }) {
  return (
    <div className="container-button404">
      <div className="text1-button404">
        <p className="title-button404">{value1}</p>
      </div>
      <div className="text2-button404">
        <p className="p-button404">{value2}</p>
      </div>
      <div className="path-button404">
        <Link to={route || "/"} className="button404-link">
          {value3}
        </Link>
      </div>
    </div>
  );
}
