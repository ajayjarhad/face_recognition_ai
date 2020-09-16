import React from 'react'
import './FaceRecognition.css'

const FaceRecognition = ({imageUrl,boxes}) =>{
    return(
        <div className='center ma'>
            <div className='mt2 absolute'>
                <img id='inputImage' alt='' src={imageUrl} width='500px' height='auto' />
                {
                    boxes.map(box => {
                        return <div key={box.topRow} className='bounding-box' style = {{top: box.topRow,bottom: box.bottomRow,right: box.rightCol,left: box.leftCol}}> </div>

                    })
                }
                        </div>
            
        </div>
    )
}

export default FaceRecognition