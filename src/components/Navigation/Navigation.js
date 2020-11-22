import React from 'react'
import ProfileIcon from '../Profile/ProfileIcon'
const Navigation = ({onRouteChange,isSignedIn}) => {
    return( isSignedIn ?
        <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <ProfileIcon onRouteChange={onRouteChange} />
        </nav>
        :
        <nav style={{display:'flex',justifyContent:'flex-end'}}>
        <p className='fa3 link dim white underline pa3 pointer' onClick={()=>onRouteChange('signin')}>Sign In</p>
        <p className='fa3 link dim white underline pa3 pointer' onClick={()=>onRouteChange('register')}>Register</p>
        </nav>
)

}

export default Navigation