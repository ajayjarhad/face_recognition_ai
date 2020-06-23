import React from 'react'
import brain from './brain.png'
import Tilt from 'react-tilt'

import './Logo.css'

const Logo = () => {
return(
    <div className='ma4 mt0'>
        <Tilt className="Til br shadow-2" options={{ max : 55 }} style={{ height: 250, width: 250 }} >
 <div className="Tilt-inner pa3"> <img style={{ paddingTop: '5px' }} alt='logo' src={brain} /> </div>
</Tilt>
    </div>
)
}

export default Logo