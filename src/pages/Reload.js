import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Reload() {
  const { link } = useParams();
  const navigate = useNavigate();
  console.log(link);

  useEffect(() => {
    navigate(`/${link}`);
  }, []);

  return <div></div>;
}

export default Reload;
