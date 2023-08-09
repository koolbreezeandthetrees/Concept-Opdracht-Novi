import { NavLink} from 'react-router-dom'
export  default function Footer() {
    return (
        <>
        <footer className='footer'>
            <ul>

                <NavLink
                    className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'}
                    to="/">
                    Task List
                </NavLink>

                <NavLink
                    className={({ isActive }) => isActive ? 'active-menu-link' : 'default-menu-link'}
                    to="/about">
                    About
                </NavLink>
            </ul>
        </footer>
        </>
    )
}
