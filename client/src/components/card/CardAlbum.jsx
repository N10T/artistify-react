import React from "react";

import { Link } from "react-router-dom";
// custom tools
import IconFav from "../icon/IconFavorite";
// styles
import "./../../styles/icon-color.css";

export default function CardAlbum({ data }) {
return (
<div> 
<Link to={`/artists/${data._id}`}>
 <p>{data.title}</p><img src={data.cover} alt="cover"/>  </Link>
</div>);
}
