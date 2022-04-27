import { MdLogin, MdLogout, MdPerson } from 'react-icons/md';
import { Link } from 'react-router-dom';

function Header()
{
  return (
    <header className='header'>
      <div className="logo"><Link to='/'>DTask</Link></div>
      <ul>
        <li><Link to='/login'><MdLogin /> Login</Link></li>
        <li><Link to='/register'><MdPerson /> Register</Link></li>
      </ul>  
    </header>
  );
}

export default Header;