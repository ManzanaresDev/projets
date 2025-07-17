import { MdArrowDropDown } from "react-icons/md";
import React, { useState } from "react";
import { List } from "./List";
import { NavLink } from "react-router-dom";

export function Navlink({ value, hasDropdown = true, list = [], path }) {
  const [open, setOpen] = useState(false);

  const handleArrowClick = (e) => {
    e.stopPropagation();
    setOpen((prev) => !prev);
  };

  return (
    <div
      className="Navlink"
      style={{ position: "relative" }}
      aria-expanded={open}
    >
      {path ? (
        <NavLink
          to={path}
          className="underline"
          style={{ cursor: "pointer" }}
          onClick={() => setOpen(false)} // ferme le dropdown si navigation
        >
          {value}
        </NavLink>
      ) : (
        <span className="underline">{value}</span>
      )}
      {hasDropdown && (
        <MdArrowDropDown
          className="dropdown-icon"
          onClick={handleArrowClick}
          style={{ cursor: "pointer" }}
        />
      )}
      {hasDropdown && open && <List items={list} />}
    </div>
  );
}
