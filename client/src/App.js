import React from 'react';
import { Component } from 'react'
import logo from './talLogo.png';
import './App.css';
import Fade from 'react-reveal/Fade'

const moment = require("moment")

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { apiResponse: []}
  }

  callAPI() {
    fetch("http://localhost:9000/testApi")
    .then(res => res.json())
    .then(res => this.setState({ apiResponse: res }))
    .then(res => console.log(this.state, 'this is the state'))
   
    // .then(console.log('fetched data', this.state.apiResponse))
    .catch(err => err);
  }

  componentDidMount() {
    this.callAPI();
  }

  render() {
    return (
      <div className="App">
          <Nav />
          
            <EpisodeContainer episodes={this.state.apiResponse} />
          
          <Footer />
      </div>
    )
  }

}

export default App;

const EpisodeContainer = ({episodes}) => {
  
  return (
    
    <div className="episodeCardContainer centered flex8 flex-wrap flex-row">
    {episodes.map(renderEpisodeCard)}
  </div>
  )
}

const renderEpisodeCard = (episodeMetadata) => {

  let backgroundImage = episodeMetadata.image

  if (backgroundImage == null) {
    backgroundImage = logo
  }

  let publishDate = moment(episodeMetadata.date_published).format('MMM Do YYYY')
  
  let wrapperStyle = {
    backgroundImage: "url(" + backgroundImage + ")",
    backgroundSize: "cover",
    backgroundPosition: "center"
  };

  let fadeDuration = Math.floor(Math.random() * 2001)

  return (
    <Fade big cascade duration={fadeDuration}>
    <div className="episodeCardStyle card">
    <div className="wrapper" style={wrapperStyle}>
      <div className="date">
        {publishDate}
      </div>
      <div className="data">
        <div className="content">
        <div className="readMoreFooter">
        <span className="author">Episode {episodeMetadata.episode_number}</span>

      <a href="#" className="button">Read more</a>

      </div>
          <h1 className="title"><a href="#">{episodeMetadata.episode_title}</a></h1>
          <p className="text">{episodeMetadata.episode_description}</p>
        
        </div>
      </div>

      
  </div>
  </div>

  </Fade>

  )

}



const Nav = (props) => {
  return (
    <nav className="navBar flex1 flex-row">

      <div className="nav-left flex1 centered flex-column">
          <img className="navLogo"  src={logo} alt="This American life logo" />
      </div>

    <div className="flex8 navSpacer"></div>

    <div className="flex1 nav-right centered flex-row">
        <ul className="navMenu">
            <li><a href="#">Login</a></li>
            <li><a href="#about">About</a></li>
        </ul>
    </div>
  </nav>
  )
}

const LoginBody = (props) => {

  return (
    <div className="flex4 title flex-column centered">
              <h3 className="flex2">The Best Way to Keep Track of Your Listening History</h3>
    
               <div  className="loginForm flex6 flex-column">
                    <form action="submit">
                           UserName:<input type="text" />
                           Password:<input type="text"/>
                    </form>
                </div>
                
                <div className="flex2" id="about">
                <p>This project started by filling a need to keep track of which episodes of 'This American Life' I have listened to
                     as well as a way to keep track of my ratings of those episodes.
                 </p>
             </div>
     </div> 
  )
}



const Footer = (props) => {

  return (
    <div id="footer" className="centered flex1">
        <p>Footer Goes Here</p>
    </div>
  )
}
