import React from 'react';
import Button from 'antd/lib/button';
import { Link } from 'react-router-dom';

function Login(){
  return (
    <div>
      <h1>Here is login!</h1>
      <br/>
      <Link to="/"><Button>ToIndex</Button></Link>
      <Link to="/signUp"><Button>ToSignUp</Button></Link>
    </div>
  )
}

export default Login;