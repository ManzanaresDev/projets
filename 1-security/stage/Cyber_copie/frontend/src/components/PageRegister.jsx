import Navbar from "./header/Navbar.jsx";
import Register from "./account/Register.jsx";
import { useEffect, useState } from "react";
import { getNavbarLinks } from "./header/GetNavbarLinks.jsx";

export default function PageRegister() {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    getNavbarLinks().then(setLinks);
  }, []);

  return (
    <>
      <Navbar links={links} />
      <Register />
    </>
  );
}
