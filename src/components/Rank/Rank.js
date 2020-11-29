import React from 'react'

class Rank extends React.Component {
    constructor(){
        super();
        this.state={
            emoji: ''
        }
    }
    componentDidMount(){
        this.generateEmoji(this.props.entries)
    }
    componentDidUpdate(prevProps,prevState){
        if(prevProps.entries === this.props.entries && prevProps.name === this.props.name ){
            return null
        }
        this.generateEmoji(this.props.entries)
    }
    generateEmoji = (entries) =>{
        fetch(`https://1u2gmswme2.execute-api.ap-south-1.amazonaws.com/dev/rank?rank=${entries}`)
        .then(response => response.json())
        .then(data => this.setState({emoji: data.input}))
        .catch(console.log)
    }
    render(){
    return(
        <div>
            <div className='white f3'>
                {`${this.props.name}, You have made ${this.props.entries} entries so far`}
                <div className='white f3'>
                    {`Rank badge: ${this.state.emoji}`}
                </div>
            </div>
        </div>
    )
    }
}

export default Rank