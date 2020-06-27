import React from 'react'

const Rank = ({name,entries}) => {
    return(
        <div>
            <div className='white f3'>
                {`${name}, You have made ${entries} entries so far`}
                <div className='white f1'>
                    
                </div>
            </div>
        </div>
    )
}

export default Rank