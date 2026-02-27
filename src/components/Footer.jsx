import { HiOutlineChatAlt2, HiOutlineChartBar, HiOutlineUser } from 'react-icons/hi'
import { NavLink } from 'react-router-dom'

function Footer () {
  return (
    <footer className="footer">
  <NavLink to="/" className={({ isActive }) =>
    isActive || window.location.pathname.startsWith('/thread')
      ? 'footer__item active'
      : 'footer__item'
  }>
        <HiOutlineChatAlt2 className="footer__icon" />
        <span>Threads</span>
      </NavLink>
      <NavLink to="/leaderboards" className="footer__item">
        <HiOutlineChartBar className="footer__icon" />
        <span>Leaderboards</span>
      </NavLink>
      <NavLink to="/profile" className="footer__item">
        <HiOutlineUser className="footer__icon" />
        <span>Profile</span>
      </NavLink>
    </footer>
  )
}

export default Footer
