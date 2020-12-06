import React from 'react'

class Signin extends React.Component {
constructor(props) {
    super(props)
    this.state={
        signInEmail: '',
        signInPassword: ''
    }
    }

onSignInEmail=(event)=>{
    this.setState({signInEmail: event.target.value})
}
onSignInPassword=(event)=>{
    this.setState({signInPassword: event.target.value})
}
saveAuthTokenInSessions = (token) => {
    window.sessionStorage.setItem('token', token);
  }

  onSubmit = () => {
    fetch('http://65.0.134.91:3552/signin', {
      method: 'post',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        email: this.state.signInEmail,
        password: this.state.signInPassword
      })
    })
      .then(response => response.json())
      .then(data => {
        if (data && data.success === "true") {
          this.saveAuthTokenInSessions(data.token)
          this.props.loadUser(data.user)
          this.props.onRouteChange('home');
        }
      })
      .catch(console.log)
  }

    enterKey = (event) => {
        if (event.key === 'Enter') { 
            this.onSubmit();   
    }
}
    
    render() {
        return(
            <article className="br3 ba dark-gray b--white-10 mv4 w-100 w-50-m w-25-l mw6 shadow-5 center">
                <main className="pa4 black-80 white">
                    <div className="measure">
                        <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
                        <legend className="f1 fw6 ph0 mh0 " >Sign In</legend>
                        <div className="mt3">
                            <label className="db fw6 lh-copy f6" htmlFor="email-address" >Email</label>
                            <input className="pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="email" name="email-address"  id="email-address" onChange={this.onSignInEmail}/>
                        </div>
                        <div className="mv3">
                            <label className="db fw6 lh-copy f6" htmlFor="password" >Password</label>
                                <input className="b pa2 input-reset ba bg-transparent hover-bg-black hover-white w-100" type="password" name="password" id="password" onChange={this.onSignInPassword}
                                 onKeyPress={this.enterKey}/>
                        </div>
                        </ fieldset>
                        <div className="">
                            <input className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white" type="submit" value="Sign in"
                                onClick={this.onSubmit}
                               />
                        </div>
                        <div className="lh-copy mt3">
                        <p  onClick={() => this.props.onRouteChange('register')} className="b ph3 pv2 input-reset ba b--white bg-transparent grow pointer f6 dib white">Register</p>
                        </div>
                    </div>
                </main>
            </article>
        )
    }
    }
 

export default Signin