import { useState, useEffect } from 'react';
import { MdPerson } from 'react-icons/md';

function Register()
{
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  });

  const { name, email, password, password2 } = formData;

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
        <h1><MdPerson /> Register</h1>
        <p>Create an account</p>
      </section>
      <section className="form">
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <input 
              type="text"
              className='form-control'
              id='name'
              name='name' 
              value={name}
              placeholder='Enter your name'
              onChange={onChange}
            />
          </div>
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
            <input 
              type="password"
              className='form-control'
              id='password2'
              name='password2' 
              value={password2}
              placeholder='Confirm password'
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <button type='submit' className='btn'>Register</button>
          </div>
        </form>
      </section>
    </>
  );
}

export default Register;