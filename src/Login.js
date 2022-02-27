import React from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {GoogleLogin} from 'react-google-login'
import './Login.css'
import { login, logout, selectUser } from './features/userSlice'
import Imessage from './Imessage'
import axios from 'axios'
import { changesignup, selectSign } from './features/signSlice'



function Login() {

    const user = useSelector(selectUser);
    const sign = useSelector(selectSign);
    // const [showloginButton, setShowloginButton] = useState(true);
    const dispatch = useDispatch();
    const clientId = "462063567019-jlggrahcar9pblua2e26lsql6lvrfe5r.apps.googleusercontent.com";

    
        const onLoginSuccess = (res) => {
            console.log('Login Success: ' , res.profileObj);
            // setShowloginButton(false);
                // dispatch(changesignup(true));
            
            dispatch(login({
                uid: res.profileObj.googleId,
                photo: res.profileObj.imageUrl,
                email: res.profileObj.email,
                displayName: res.profileObj.name,
                firstName: res.profileObj.givenName,
                lastName: res.profileObj.familyName,
            }))
            const obj= {
                first_name: res.profileObj.givenName,
                last_name: res.profileObj.familyName,
                email: res.profileObj.email,
                unique_id: res.profileObj.googleId
            };
    
            axios.post('http://localhost/dashboard/imessagephp/insert.php',obj)
            .then(res => {
                console.log(res.data);
            if(res.data == "success"){
               console.log('hello man')
            }
        })
        }
   
    

    const onLoginFailure = (res) => {
        console.log('Login Failure: ' , res);
    }

    // const onSignoutSuccess = () => {
    //     alert("you have been logout successfully");
    //     dispatch(logout());
    // }
    // console.log(sign.sign)
    return (
        <div>
            { user.user ?
             <Imessage />
         : <div className="login">
         <div className="login__logo">
             
             <img src="ims.png" alt=""/>
             
         <h1>iMessage</h1>
         
     </div>
     <GoogleLogin
                 clientId={clientId}
                 buttonText="Sign In"
                 onSuccess={onLoginSuccess}
                 onFailure={onLoginFailure}
                 cookiePolicy={'single_host_origin'}
                 isSignedIn={true}
             />
     {/* <Button onSuccess={onLoginSuccess}>Sign In</Button> */}
     </div>}
        </div>
        
    )
}

export default Login
