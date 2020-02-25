import React, { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
// custom tools
import APIHandler from "../../api/APIHandler";
// import Button from "@material-ui/core/Button";

// styles
import "./../../styles/form.css";

export default withRouter(function FormArtist({
  mode = "create",
  _id,
  history,
  match
}) {
  const [{ name, style, description, isBand, rates }, setState] = useState({
    name: "",
    style: "",
    description: "",
    isBand: "",
    rates: []
  });

  const [styleList, setStyleList] = useState([]);

  useEffect(() => {
    APIHandler.get(`/styles/`)
      .then(res => setStyleList(res.data.styles))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    const initFormData = async () => {
      const apiRes = await APIHandler.get(`/artists/${_id}`);
      delete apiRes.data._id;
      setState({ ...apiRes.data });
    };

    if (mode === "edit") initFormData();
  }, [mode, _id]);

  const handleChange = e => {
    e.persist();
    setState(prevValues => ({
      ...prevValues,
      [e.target.id]: e.target.value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

let fd = { name, style, description, isBand, rates }
    try {

      if (mode === "create") await APIHandler.post("/artists", fd);
      else await APIHandler.patch(`/artists/${match.params.id}`, fd);
      // here, we access history as a destructured props (see the parameters of this component)
      // history is accessible because we wrapped the component in the withROuter fiunction
      history.push("/admin/artists");
    } catch (apiErr) {
      console.error(apiErr);
    }
  };

  return (
    <form className="form" onSubmit={handleSubmit} onChange={handleChange}>
      <label className="artist" htmlFor="name">
        name
      </label>
      <input
        className="input"
        id="name"
        name="name"
        type="text"
        defaultValue={name}
      />

<label className="album" htmlFor="style">
        style
      </label>
      <select name="style" id="style">
        <option value="">Please choose a style</option>
        {styleList.map((v, i) => (
          <option key={i} value={v._id}>
            {v.name}
          </option>
        ))}
      </select>

      <label className="artist" htmlFor="description">
        description
      </label>
      <textarea
        className="input"
        id="description"
        name="description"
        type="text"
        defaultValue={description}
      />

      <label htmlFor="isBand">is band ?</label>

      <select name="isBand" id="isBand" defaultValue={isBand}>
        <option value="">--Please choose an option--</option>
        <option value={true}>Yes</option>
        <option value={false}>No</option>
      </select>

      <label className="artist" htmlFor="rates">
        rates
      </label>
      <input className="input" id="rates" type="number" name="rates" />

      <button className="btn" onClick={handleSubmit}>
        ok
      </button>
    </form>
  );
});
