import React, { useState, useEffect } from 'react';
import { withRouter } from "react-router-dom";
// custom tools
import APIHandler from "../../api/APIHandler";
import LabPreview from "../LabPreview";
// styles
import "./../../styles/form.css";


export default withRouter(function FormArtist({
  mode = "create",
  _id,
  history,
  match
}) {
  const [
    { name, style, description, isBand, rates },
    setState
  ] = useState({
    name: "",
    style: "", 
    description: "",
    isBand: true,
    rates: []
  });

  useEffect(() => {
    const initFormData = async () => {
      const apiRes = await APIHandler.get(`/artists/${_id}`);
      delete apiRes.data._id;
      setState({ ...apiRes.data });
    };

    if (mode === "edit") initFormData();

  }, [mode, _id]);

  const handleChange = e => {
    
    console.log(e.target.name)
    console.log(e.target.value)
    e.persist();
    setState(prevValues => ({
      ...prevValues,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const fd = new FormData();
    fd.append("name", name);
    fd.append("style", style);
    fd.append("description", description);
    fd.append("isBand", isBand);
    fd.append("rates", rates);

console.log(fd);

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


      <label className="artist" htmlFor="style">
        style
      </label>
      <input
        className="input"
        id="style"
        name="style"
        type="text"
        defaultValue={style}
      />

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

      {/* <p>is band ?</p>
      <div>
        <input type="radio" id="yes" name="isBand"/>
        <label for="yes">Yes</label>
      </div>

      <div>
        <input type="radio" id="no" name="isBand"/>
        <label for="no">No</label>
      </div> */}

<label htmlFor="is-band">is band ?</label>

<select name="is-band" id="is-band" defaultValue={isBand}>
    <option value="">--Please choose an option--</option>
    <option value={true}>Yes</option>
    <option value={false}>No</option>
</select>


      <label className="artist" htmlFor="rates">
        rates
      </label>
      <input
        className="input"
        id="rates"
        type="number"
        defaultValue={rates}
      />

      <button className="btn" onClick={handleSubmit}>ok</button>
    </form>
  );
});


