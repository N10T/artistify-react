import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import APIHandler from "../../api/APIHandler";

// custom tools
import CustomInputFile from "./../icon/IconAvatarAdmin";
// import LabPreview from "../LabPreview";
// styles
import "./../../styles/form.css";
import "./../../styles/icon-avatar.css";

export default withRouter(function FormAlbum({
  mode = "create",
  _id,
  history,
  match
}) {
  const [
    { coverTmp, cover, title, releaseDate, artist, label, description, rates },
    setState
  ] = useState({
    cover: "",
    coverTmp: "",
    title: "",
    artist: "",
    label: "",
    releaseDate: "",
    description: "",
    rates: []
  });

  const [artistsList, setArtistList] = useState([]);
  const [labelList, setLabelList] = useState([]);

  useEffect(() => {
    const initFormData = async () => {
      const apiRes = await APIHandler.get(`/albums/${_id}`);
      delete apiRes.data._id;
      setState({ ...apiRes.data });
    };
    if (mode === "edit") initFormData();
  }, [mode, _id]);

  useEffect(() => {
    APIHandler.get(`/artists/`)
      .then(res => setArtistList(res.data.artists))
      .catch(err => console.error(err));
  }, []);
  useEffect(() => {
    APIHandler.get(`/labels/`)
      .then(res => setLabelList(res.data.labels))
      .catch(err => console.error(err));
  }, []);

  const handleChange = e => {
    e.persist();
    setState(prevValues => ({
      ...prevValues,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("cover", cover);
    fd.append("title", title);
    fd.append("releaseDate", releaseDate);
    fd.append("artist", artist);
    fd.append("label", label);
    fd.append("description", description);
    fd.append("rates", rates);

    try {
      if (mode === "create") await APIHandler.post("/albums", fd);
      else await APIHandler.patch(`/albums/${match.params.id}`, fd);
      // here, we access history as a destructured props (see the parameters of this component)
      // history is accessible because we wrapped the component in the withROuter fiunction
      history.push("/admin/albums");
    } catch (apiErr) {
      console.error(apiErr);
    }
  };

  const handleCover = file => {
    const reader = new FileReader();
    reader.onloadend = () => {
      // when the fileReader ends reading image  ...
      const base64String = reader.result;
      // add the actual file to the state + the tmp cover as a preview before upload
      setState(preValues => ({
        ...preValues,
        cover: file,
        coverTmp: base64String
      }));
    };
    reader.readAsDataURL(file); // read the file from the local disk
  };

  return (
    <form className="form" onSubmit={handleSubmit} onChange={handleChange}>
      <label className="album" htmlFor="cover">
        cover
      </label>
      <CustomInputFile
        avatar={coverTmp || cover}
        clbk={e => handleCover(e.target.files[0])}
      />

      <label className="album" htmlFor="title">
        title
      </label>
      <input className="input" id="title" type="text" defaultValue={title} />

      <label className="album"  id="releaseDate" htmlFor="releaseDate">
        release date
      </label>
      <input
        className="input"
        id="releaseDate"
        type="date"
        defaultValue={releaseDate}
      />

      <label className="album" htmlFor="artist">
        artist
      </label>
      <select  name="artist" id="artist">
        <option value="">Please choose an artist</option>
        {artistsList.map((v, i) => (
          <option key={i} value={v._id}>
            {v.name}
          </option>
        ))}
      </select>

      <label className="album" htmlFor="label">
        label
      </label>
      <select name="label" id="label">
        <option value="">Please choose a label</option>
        {labelList.map((v, i) => (
          <option key={i} value={v._id}>
            {v.name}
          </option>
        ))}
      </select>

      <label className="albums" htmlFor="description">
        description
      </label>
      <textarea
        className="input"
        id="description"
        type="text"
        defaultValue={description}
      />

      <label className="albums" htmlFor="rates">
        rates
      </label>
      <input className="input" id="rates" type="number" defaultValue={0} />

      <button className="btn" onClick={handleSubmit}>
        ok
      </button>
    </form>
  );
});
