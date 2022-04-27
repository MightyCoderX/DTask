import { useState, useEffect } from 'react';
import { MdLogin } from 'react-icons/md';

function Login()
{
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onSubmit = e =>
  {
    e.preventDefault();
  }

  const onChange = e =>
  {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
    console.log(e.target.name, formData);
  }

  return (
    <>
      <section className="heading">
        <h1><MdLogin /> Login</h1>
        <p>Log into your account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input 
              type="email" 
              className='form-control' 
              id='email' 
              name='email' 
              value={email}
              placeholder='Enter your email'
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input 
              type="password"
              className='form-control'
              id='password'
              name='password' 
              value={password}
              placeholder='Enter your password'
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type='submit' className='btn'>Login</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Login;