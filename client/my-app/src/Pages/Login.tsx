
import React, {useState} from 'react';

import '../Login.css'

const Login = () => {
    return (
        <div className={'mainContainer'}>
      <div className={'titleContainer'}>
        <div>All District Reads Login</div>
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          placeholder="Enter your email here"
          className={'inputBox'}
        />
      </div>
      <br />
      <div className={'inputContainer'}>
        <input
          placeholder="Enter your password here"
          className={'inputBox'}
        />
      </div>
      <br />
      <div className={'inputContainer'}>
        <input className={'inputButton'} type="button" value={'Log in'} />
      </div>
    </div>
    )
}

export default Login;



