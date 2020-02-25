import React from "react";
import { Link } from "react-router-dom";
import ReactLoading from 'react-loading';

// custom tools
import IconFav from "../icon/IconFavorite";
// styles
import "./../../styles/icon-color.css";

export default function CardArtist({ data }) {
  const color = data.style.color
return <div><ReactLoading position={"absolute"} type={"cubes"} color={color} height={20} width={20} /> <h3>{data.name}</h3></div>;
}
