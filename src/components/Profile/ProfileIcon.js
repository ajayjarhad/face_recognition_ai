import React,{ useState } from 'react';
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
const ProfileIcon = ({props}) =>   {

    
        const [dropdownOpen, setDropdownOpen] = useState(false);

        const toggle = () => setDropdownOpen(prevState => !prevState);
    // constructor(props) {
    //     super(props);
    //     // this.state = {
    //     //     dropdownOpen:false
    //     // }

    // }


       
       
        return (
<div className="pa4 tc">
<Dropdown isOpen={dropdownOpen} toggle={toggle}>
<DropdownToggle
        tag="span"
        data-toggle="dropdown"
        aria-expanded={dropdownOpen}
        style={{marginRight: '2.5rem'}}
                    >
                
  <img
      src="http://tachyons.io/img/logo.jpg"
      className="br-100 h3 w3 dib" alt="avatar" />
                
      </DropdownToggle>
                    <DropdownMenu className="b--transparent shadow-5" style={{ marginTop: '20px', backgroundColor: 'rgba(255,255,255,0.5)', marginRight: '2rem' }}>
        <DropdownItem >View Profile</DropdownItem>
        <DropdownItem onClick={()=>this.props.onRouteChange('register')}>Sign out</DropdownItem>
      </DropdownMenu>
    </Dropdown>



                </div>
        )
    }



export default ProfileIcon;