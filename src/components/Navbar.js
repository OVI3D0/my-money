import { Link } from 'react-router-dom';
import styles from './Navbar.module.css';
import Login from '../pages/login/Login';
import Signup from '../pages/signup/Signup';
import Home from '../pages/home/Home';

export default function Navbar() {
    return (
        <nav className={styles.navbar}>
            <ul>
                <li className={styles.title}><Link to="/" element={<Home />}>myMoney</Link></li>

                <li><Link to="/login" element={<Login />}>Login</Link></li>
                <li><Link to="/signup" element={<Signup />}>Signup</Link></li>
            </ul>
        </nav>
    )
}