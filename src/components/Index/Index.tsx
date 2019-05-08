import React from 'react';
import Button from 'antd/lib/button';
import { Link } from 'react-router-dom';

function Index(){
  return (
    <div>
      <h1>Here is index!</h1>
      <br/>
      <Link to="/login"><Button>ToLogin</Button></Link>
      <Link to="/signUp"><Button>ToSignUp</Button></Link>
    </div>
  )
}

export default Index;