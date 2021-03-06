import { Link } from 'react-router-dom';
import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import styles from './Navbar.module.css';
import Login from '../pages/login/Login';
import Signup from '../pages/signup/Signup';
import Home from '../pages/home/Home';

export default function Navbar() {
    const { logout }  = useLogout()
    const { user } = useAuthContext()

    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}><Link to="/" element={<Home />}>myMoney</Link></li>
                
                {!user && (
                    <>
                        <li><Link to="/login" element={<Login />}>Login</Link></li>
                        <li><Link to="/signup" element={<Signup />}>Signup</Link></li>
                    </>
                )}
                {user && (
                    <>
                        <li>Hello, {user.displayName}</li>
                        <li>
                            <button className='btn' onClick={logout}>Logout</button>
                        </li>
                    </>
                )}

            </ul>
        </nav>
    )
}
