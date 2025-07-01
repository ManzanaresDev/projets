import Navbar from "./header/Navbar.jsx";
import Reset2 from "./account/Reset2.jsx";

export default function PageRegister() {
  const links = [
    { value: "Accueil", hasDropdown: false },
    {
      value: "Outils Gratuits",
      hasDropdown: true,
      list: ["Canva", "Notion", "ChatGPT"],
    },
    {
      value: "Formations",
      hasDropdown: true,
      list: ["FrontEnd", "BackEnd", "FullStack"],
    },
  ];

  return (
    <>
      <Navbar links={links} />
      <Reset2 />
    </>
  );
}
