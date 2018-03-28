import React, { Component } from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import FaceRecognition from './components/FaceRecognition/FaceRecognition';
import Particles from 'react-particles-js';
import Signin from './components/Signin/Signin';
import Register from './components/Register/Register';
import Rank from './components/Rank/Rank';
import Clarifai from 'clarifai';

const app = new Clarifai.App({
 apiKey: 'b45088bd9e0449adb2086f0ffd0f641f'
});

const particleOptions = {
                particles: {
                  number: {
                    value:160,
                    density: {
                      enable:true,
                      value_area:1200
                    }
                  }
                }
              }
class App extends Component {
  constructor() {
    super();
    this.state = {
      input:'',
      imgUrl: '',
      box:{},
      route:'signin',
      isSignedIn: false,
      user: {
        id:'',
        name: '',
        email:'',
        entries: 0,
        joined: ''
      }
    }
  }

  loadUser = (userdata) => {
    this.setState({
      user:{
        id:userdata.id,
        name: userdata.name,
        email:userdata.email,
        entries: userdata.entries,
        joined: userdata.joined
      }
    })
  }

  calculateFaceLocation = (data) => {
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputimage');
    const width = Number(image.width);
    const height = Number(image.height);
    return {
      leftcol: clarifaiFace.left_col * width,
      toprow: clarifaiFace.top_row * height,
      rightcol: width - (clarifaiFace.right_col * width),
      botrow: height - (clarifaiFace.bottom_row * height)
    }
  }
  calculateFaceBox = (box) => {
  	console.log(box);
  	this.setState({box: box})
  }
  onInputChange = (event) => {
    this.setState({input: event.target.value})
  }
  onButtonSubmit = () => {
    this.setState({imgUrl: this.state.input});
    app.models
    .predict(
    Clarifai.FACE_DETECT_MODEL,
     this.state.input)
    .then(response => this.calculateFaceBox(this.calculateFaceLocation(response)))
    .catch(err => console.log(err));
  }
  onRouteChange = (route) => {
  	if (route === 'signout') {
  		this.setState({isSignedIn:false})
  	} else if (route === 'home') {
  		this.setState({isSignedIn:true})
  	}
  	this.setState({route:route});
  }

  render() {
  	const {isSignedIn, imgUrl, route, box} =this.state;
    return (
      <div className="App">
        <Particles 
          className="particles"
          params={particleOptions}
        />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
        {route === 'home' 
        ? <div> <Logo />
         	<Rank name={this.state.user.name} entries={this.state.user.entries}/>
         	<ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
        	<FaceRecognition box={box} imgUrl={imgUrl}/> 
         </div>
		:(
        	this.state.route === 'signin'  
        	? <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange} />
        	: <Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
        )
    	}	
      </div>
    );
  }
}

export default App;
