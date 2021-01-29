import React, { useState } from 'react'
import './Header.css'
import { Link } from 'react-router-dom'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';
import Logo from './images/apnacomplex_logo.png'
import { useStateValue } from './StateProvider';
import { getUser, removeUserSession } from './Utils/Common';
import { useHistory } from "react-router-dom";

function Header() {
    const history = useHistory();
    const user = getUser();
    // const [signinFlag, setsigninFlag] = useState(false);
    // let signinFlag = false;
    const[{ cart }, dispatch] = useStateValue();
    const [inputText, setInputText] = useState('');
    
    const handleLogout = () => {
        removeUserSession();
        window.localStorage.removeItem("accessToken")
        window.localStorage.removeItem("username")
        // props.history.push('/');
        history.push('/');
      }    

      const handleLogin = () => {
        //   <Link to='/login' />
        history.push('/login');
      }

    const changeInput = (e) => {
        let text = e.target.value;
        setInputText(text);
        console.log("Header it --> ",inputText);
        
        //dispatch an action
        dispatch({
            type: 'UPDATE_SEARCH_STRING',
            item: inputText
        })
    }

    return (
        <nav className='header'>
            <Link to='/'>
                <div className='header__sLogo'>
                    <img className='header_logo'
                        src={Logo} 
                        alt=''
                    />
                </div>
            </Link>

            <div className='header__search'>
                <input className='header__searchInput' 
                    placeholder='Search Here...' 
                    value={inputText}
                    onChange={e => changeInput(e)}
                />
            </div>

            <Link to='/login' className='header__link'>
                <div className='header__SignIn'>
                    { window.localStorage.getItem("username") ?  <input type="button" onClick={handleLogout} value="Logout" /> : <input type="button" onClick={handleLogin} value="Login" />}
                </div>
            </Link>

            <Link to='/prime' className='header__link'>
                <div className='header__Prime'>
                    <h3>Prime TV</h3>
                </div>
            </Link>

            <Link to='/orders' className='header__link'>
                <div className='header__Orders'>
                    <h3>Your Orders</h3>
                </div>
            </Link>

            <Link to='/cart' className='header__link'>
                <div className='header__shoppingCart'>
                    <ShoppingCartOutlinedIcon className='shoppingCart' />
                    <span className='header_shoppingCart_len'>{cart?.length}</span>
                </div>
            </Link>
        </nav>
    )
}

export default Header
