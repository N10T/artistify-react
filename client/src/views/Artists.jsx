import React, { Component } from "react";
// custom tools
import apiHandler from "../api/APIHandler";
import CardArtist from "../components/card/CardArtist";
import List from "../components/List";
import LabPreview from "../components/LabPreview";
import ReactLoading from 'react-loading';

// styles
import "../styles/card.css";
import { Link } from "react-router-dom";

export default class Artists extends Component {
  state = {
    artists: []
  };

  componentDidMount() {
    apiHandler.get("/artists").then(apiRes => {
      this.setState({ artists: apiRes.data.artists });
    });
  }

  render() {
    return this.state.artists ? (
      <>
        <h1 className="title">All artists</h1>
        

          <div>
            
            <List
              data={this.state.artists}
              Component={CardArtist}
              cssList="cards"
              cssItem="card artist"
            />
           
          </div>
          
      </>
      ) 
        : (<p>no artist yet...</p>)}
}



          {/* <p>
            Fetch all artists from the database.
          <br />
            Display a card for each album.
          <br />
            Provide a router {`<Link>`} to="artists/artists.id",
          <br />
            leading to separate component Artist (details) component.
          <br />
            If the artists list is empty, provide a default view.
        </p>

          <h1 className="title diy">D.I.Y (IconFavorite)</h1>
          <p>
            Import a custom {`<IconFavorite />`} on each artist card.
          <br />
            When clicked, send an axios.patch request to add the artist to the
            user's favorites.
        </p>

          <hr />

          <LabPreview name="artists" />

          <h1 className="title">All artists</h1>
          <List
            data={this.state.artists}
            Component={CardArtist}
            cssList="cards"
            cssItem="card artist"
          />
      </React.Fragment>
    );
  }
} */}
