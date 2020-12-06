import React from 'react'
import './ImageLinkForm.css'

const ImageLinkForm = ({onInputChange,onButtonSubmit}) =>{
    return(
        <div>
            <p className='f3' style={{'color':'white'}}>
                {'This app will detect faces in a photograph. Give it a try'}
            </p>
            <div className='form center pa4 br3 shadow-5'>
                <input type='text' className='f4 pa2 w-70 center' onChange={onInputChange}/>
                <button className='w-30 grow f4 link ph3 pv2 dib white bg-light-purple'
                onClick={onButtonSubmit}
                >Detect</button>
            </div>
        </div>
    )
}

export default ImageLinkForm