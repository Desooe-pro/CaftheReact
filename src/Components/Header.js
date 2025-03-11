import React, { useEffect, useState } from "react";
import NavBar from "./NavBar";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <NavBar />
    </div>
  );
}

export default Header;
