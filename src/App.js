import React,{Component} from 'react';
import './App.css';
import Navigation from './components/Navigation/Navigation'
import Logo from './components/Logo/Logo'
import Rank from './components/Rank/Rank'
import FaceRecognition from './components/FaceRecognition/FaceRecognition'
import Particles from 'react-particles-js';
import Clarifai from 'clarifai'
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm'

const ParticlesOption = {"particles":{"number":{"value":30,"density":{"enable":true,"value_area":800}}}}

const app = new Clarifai.App({
  apiKey: 'e242210386b14b15a85b870be21964ec'
})

class App extends Component {
  constructor(){
    super()
      this.state = {
        input : '',
        imageUrl: '',
        box:{}
    }
  }

  onInputChange = (event) =>{
    this.setState({input:event.target.value})
  }
  
  calculateFaceLocation = (data) =>{
    const clarifaiFace = data.outputs[0].data.regions[0].region_info.bounding_box
    const image = document.getElementById('inputImage')
    const width = image.width;
    const height = image.height;
    return{
      leftCol: clarifaiFace.left_col * width,
      rightCol : width - (clarifaiFace.right_col * width),
      topRow : clarifaiFace.top_row * height,
      bottomRow : height - (clarifaiFace.bottom_row * height)
    }
  }

  displayTheBox = (calculation) => {
    console.log(calculation)
    this.setState({box:calculation})
  }

  onButtonSubmit = () =>{
    this.setState({imageUrl: this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input
    ).then(response => this.displayTheBox(this.calculateFaceLocation(response)))
     .catch(err=> console.log(err))
  }

  render(){return (
    <div className="App">
       <Particles className='particles' 
      params={ParticlesOption}
       />
      <Navigation />
      <Logo />
      <Rank />
      <ImageLinkForm onInputChange={this.onInputChange} onButtonSubmit={this.onButtonSubmit}/>
      <FaceRecognition imageUrl={this.state.imageUrl} box={this.state.box}/>
    </div>
  );
}
}
export default App;
