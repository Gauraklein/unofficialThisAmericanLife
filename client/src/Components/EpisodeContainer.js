import React from "react";
import logo from "./../talLogo.png";
import Fade from "react-reveal/Fade";
// import { PresignedPost } from "aws-sdk/clients/s3";
// import { handleEpisodeClick } from "../actions/episodeActions"
// import styles from './EpisodeContainer.css';
const moment = require("moment");

// episode container component

export const EpisodeContainer = (props) => {

  console.log(props)

  if (!props.singleEpisodeView) {

  return (
    <div className="episodeCardContainer centered flex8 flex-wrap flex-row">
      {
      
        props.allEpisodesArray.map((episode) => <EpisodeCard {...episode} handleEpisodeClick= {props.handleEpisodeClick} />)
      
      }
    </div>
  );

    } else {

      return (

        <div className="SingleEpisodeContainer flex8">
          
          {renderEpisode(props.episodeMetadata, props)}
          </div>
          
      )
    }
};


//Single episode view

function renderEpisode (episodeMetadata, props) {
  if (episodeMetadata.length > 0) {

      let publishDate = moment(episodeMetadata[0].date_published).format(
          "MMM Do YYYY"
        );

      let episodeUrl = "https://podcast.thisamericanlife.org/podcast/" + episodeMetadata[0].episode_number + ".mp3"

      let playingEpisodeObject = {
        playingUrl: episodeUrl,
        playingNumber: episodeMetadata[0].episode_number,
        playingTitle: episodeMetadata[0].episode_title,
        playingImage: episodeMetadata[0].image 
      }
  return (
  <div className="SingleEpisodeMetadataContainer flex-column">

    <div className="episodeMetaSticky flex-column flex1">

      <div className="episodeMetaStickyTopRow flex-row">

      <a onClick={props.backToAllEpisodes.bind(this)} className="blackLink"><i  className="fas fa-2x fa-angle-double-left"></i></a>

        {/* <button  className="singleEpisodeBackButton">Back</button> */}

        <p id="singleEpisodeDateText">
            <i>Episode {episodeMetadata[0].episode_number} | {publishDate}</i>
        </p>
 
      </div>
          
      <div className="episeodeMetaBottomRow flex-column centered">
        <div className="singleEpisodePlayAndTitle flex-row">

          {/* PLAY EPISODE  */}

          <a onClick={props.playEpisode.bind(this, playingEpisodeObject)} className="blackLink"><i id="playIcon" class="far fa-2x fa-play-circle"></i></a>
          
          <h1 id="singleEpisodeTitle">{episodeMetadata[0].episode_title}</h1>
        </div>
          <hr/>
          <p className="singleEpisodeText">{episodeMetadata[0].episode_description}</p>
          
      </div>

    </div>

    <div className="episodeMetaScroll flex9 flex-column">

      <div className="episodeMetadataImgContainer centered">
        <img className="episodeMetadataImg"src={episodeMetadata[0].image} alt=""/>
      </div>

      <div className="singleEpisodeActs flex-column">
        {episodeMetadata.map(RenderAct)}
      </div>
    </div>
  </div>
  )
  }
}

function RenderAct(act) {
  let actNumberName = ""

  //names the act number

  if (act.act_number.endsWith(0)) {
      actNumberName = "Prologue"
  } else {
      let actNumberForRendering = act.act_number.charAt(act.act_number.length - 1)
      actNumberName = "Act " + actNumberForRendering
  }


  return (
      <div className="actContainer">
          <h3><strong>{actNumberName}: </strong>{act.act_title}</h3> 
          
          <p className="singleEpisodeText"><i>{act.producers}</i></p>
          
          <p className="singleEpisodeText">{act.act_description}</p>
          
          {renderSong(act)}

      </div>
  )

}

function renderSong (act) {

  if (act.act_song !== "") {
      let actSong = act.act_song

      return (
          <p className="singleEpisodeText"><i>Song: {actSong}</i></p>
      )
  }
}


//function to render episode card

const EpisodeCard = (episodeMetadata) => {


  let backgroundImage = episodeMetadata.image;

  if (backgroundImage == null) {
    backgroundImage = logo;
  }

  let publishDate = moment(episodeMetadata.date_published).format(
    "MMM Do YYYY"
  );

  let wrapperStyle = {
    backgroundImage: "url(" + backgroundImage + ")",
    backgroundSize: "cover",
    backgroundPosition: "center"
  };

  let fadeDuration = Math.floor(Math.random() * 1801);

  return (
    <Fade big cascade duration={fadeDuration}>
      <div className="episodeCardStyle card">
      
        <div id={episodeMetadata.episode_number}  onClick={episodeMetadata.handleEpisodeClick.bind(this, episodeMetadata.episode_number)} className="wrapper episodeCardClickable" style={wrapperStyle}>
          <div className="date">{publishDate}</div>
          <div className="data">
            <div className="content">
              <div className="readMoreFooter">
                <span className="author">
                  Episode {episodeMetadata.episode_number}
                </span>

                <a href="#" className="button">
                  Read more
                </a>
              </div>
              <h1 className="title">
                <a href="#">{episodeMetadata.episode_title}</a>
              </h1>
              <p className="text">{episodeMetadata.episode_description}</p>
            </div>
          </div>
        </div>
      </div>
    </Fade>
  );
};
