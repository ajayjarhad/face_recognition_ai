import React from 'react'

const Navigation = ({onRouteChange,isSignedIn}) => {
    return( isSignedIn ?
        <nav style={{display:'flex',justifyContent:'flex-end'}}>
            <p className='fa3 link dim white underline pa3 pointer' onClick={()=>onRouteChange('signout')}>Sign out</p>
        </nav>
        :
        <nav style={{display:'flex',justifyContent:'flex-end'}}>
        <p className='fa3 link dim white underline pa3 pointer' onClick={()=>onRouteChange('signin')}>Sign In</p>
        <p className='fa3 link dim white underline pa3 pointer' onClick={()=>onRouteChange('register')}>Register</p>
        </nav>
)

}

export default Navigation