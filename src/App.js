import React,{Component} from 'react';


import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import './App.css';
import Particles from 'react-particles-js';
const ParticlesOption = {"particles":{"number":{"value":30,"density":{"enable":true,"value_area":800}}}}

const initialState = {
  input : '',
  imageUrl: '',
  boxes:[],
  route : 'home',
  isSignedIn:true,
  user:{
    id : '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}
class App extends Component {
  constructor(){
    super()
      this.state = initialState
  }

  onInputChange = (event) =>{
    this.setState({input:event.target.value})
  }
  
  onButtonSubmit = () =>{
    this.setState({imageUrl: this.state.input})
   // fetch('https://nameless-shore-94252.herokuapp.com/imageurl',{
    fetch('http://localhost:3552/imageurl',{
      method: 'post',
      headers: {'Content-Type':'application/json'},
    body: JSON.stringify({input:this.state.input})
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        // fetch('https://nameless-shore-94252.herokuapp.com/image', {
          fetch('http://localhost:3552/image', {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            id: this.state.user.id
          })
        })
          .then(response => response.json())
          .then(count => {
            this.setState(Object.assign(this.state.user, { entries: count}))
          })
          .catch(err => console.log(err))

      }
      this.displayTheBoxes(this.calculateFaceLocations(response))
    })
     .catch(err=> console.log(err))
  }

  onRouteChange = (route) => {
    if (route === 'signout') {
      return this.setState({ initialState })
    }
    else if (route === 'home') this.setState({isSignedIn:true})
    this.setState({route:route})
  }

  calculateFaceLocations = (data) =>{
    return data.outputs[0].data.regions.map(face => {
          const clarifaiFace = face.region_info.bounding_box
          const image = document.getElementById('inputImage')
          const width = image.width;
          const height = image.height;
          return {
            leftCol: clarifaiFace.left_col * width,
            rightCol: width - (clarifaiFace.right_col * width),
            topRow: clarifaiFace.top_row * height,
            bottomRow: height - (clarifaiFace.bottom_row * height)
          }
    })
    

  }

  displayTheBoxes = (boxes) => {
    this.setState({boxes:boxes})
  }

  loadUser = (data) => {
    this.setState({user: {
      id: data.id,
      name: data.name,
      email: data.email,
      entries: data.entries,
      joined: data.joined
    }})
  }
  render()
  {
   const { isSignedIn,imageUrl,boxes,route } = this.state
    return (
    <div className="App">
       <Particles className='particles' 
      params={ParticlesOption}
       />
       <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}/>
      {route === 'home' ?
            <div>
            <Logo />
            <Rank 
            name={this.state.user.name}
            entries={this.state.user.entries}
            />
            <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
            <FaceRecognition imageUrl={imageUrl} boxes={boxes}/>
            </div>

      :(route ==='signin' ?
      <Signin loadUser={this.loadUser} onRouteChange={this.onRouteChange}/>
      :<Register loadUser={this.loadUser} onRouteChange={this.onRouteChange}/> 
      )
    }
    </div>
  );
}
}
export default App;
