import React,{Component} from 'react';


import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Signin from './components/Signin/Signin'
import Register from './components/Register/Register'
import Modal from './components/Modal/Modal'
import Profile from './components/Profile/Profile'
import './App.css';
import Particles from 'react-particles-js';
const ParticlesOption = {"particles":{"number":{"value":30,"density":{"enable":true,"value_area":800}}}}

const initialState = {
  input : '',
  imageUrl: '',
  boxes:[],
  route: 'signin',
  isProfileOpen : false,
  isSignedIn:false,
  user:{
    id : '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
    pet: '',
    age: ''
  }
}
class App extends Component {
  constructor(){
    super()
      this.state = initialState
  }

  
  componentDidMount() {
    const token = window.sessionStorage.getItem('token');
    if (token) {
      fetch('https://backend.ajayjarhad.com/signin', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token
        }
      })
        .then(response => response.json())
        .then(data => {
          if (data && data.id) {
            fetch(`https://backend.ajayjarhad.com/profile/${data.id}`, {
              method: 'GET',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': token
              }
            })
            .then(response => response.json())
            .then(user => {
              if (user && user.email) {
                this.loadUser(user)
                this.onRouteChange('home');
              }
            })
          }
        })
        .catch(console.log)
    }
  }


  onInputChange = (event) =>{
    this.setState({input:event.target.value})
  }
  
  onButtonSubmit = () =>{
    this.setState({imageUrl: this.state.input})
   // fetch('https://nameless-shore-94252.herokuapp.com/imageurl',{
    fetch('https://backend.ajayjarhad.com/imageurl',{
      method: 'post',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': window.sessionStorage.getItem('token')
      },
    body: JSON.stringify({input:this.state.input})
    })
    .then(response => response.json())
    .then(response => {
      if (response) {
        // fetch('https://nameless-shore-94252.herokuapp.com/image', {
          fetch('https://backend.ajayjarhad.com/image', {
          method: 'put',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': window.sessionStorage.getItem('token')
            },
          
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

  toggleModal = () => {
    this.setState(prevState => ({
      ...prevState,
      isProfileOpen: !prevState.isProfileOpen
    }))
  }

  calculateFaceLocations = (data) => {
    if (data && data.outputs) {
      
    
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
    return

  }

  displayTheBoxes = (boxes) => {
    if(boxes){ this.setState({boxes:boxes})}
   
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
   const { isSignedIn,imageUrl,boxes,route, isProfileOpen,user } = this.state
    return (
    <div className="App">
       <Particles className='particles' 
      params={ParticlesOption}
       />
        <Navigation isSignedIn={isSignedIn} onRouteChange={this.onRouteChange}
          toggleModal={this.toggleModal}
        />
      {isProfileOpen ?             <Modal>
          <Profile isProfileOpen={isProfileOpen} toggleModal={this.toggleModal}
            loadUser={this.loadUser}
            user={user} />
              </Modal> : null}
        
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
