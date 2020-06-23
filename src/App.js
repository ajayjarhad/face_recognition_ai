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
        imageUrl: ''
    }
  }

  onInputChange = (event) =>{
    this.setState({input:event.target.value})
  }
  
  onButtonSubmit = () =>{
    this.setState({imageUrl: this.state.input})
    app.models.predict(
      Clarifai.FACE_DETECT_MODEL,
      this.state.input
    ).then(function(response){console.log(response.outputs[0].data.regions[0].region_info.bounding_box) },function(err){})
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
      <FaceRecognition imageUrl={this.state.imageUrl}/>
    </div>
  );
}
}
export default App;
