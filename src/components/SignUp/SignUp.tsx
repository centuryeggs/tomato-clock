import React from 'react';
import Button from 'antd/lib/button';
import { Link } from 'react-router-dom';

function SignUp(){
  return (
    <div>
      <h1>Here is signUp!</h1>
      <br/>
      <Link to="/login"><Button>ToLogin</Button></Link>
      <Link to="/"><Button>ToIndex</Button></Link>
    </div>
  )
}

export default SignUp;