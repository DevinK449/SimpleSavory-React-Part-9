import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import './Navbar.css'

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  const toggleNav = () => {
    setIsOpen(!isOpen)
    document.body.style.overflow = !isOpen ? 'hidden' : ''
  }

  const closeNav = () => {
    setIsOpen(false)
    document.body.style.overflow = ''
  }

  return (
    <nav className="navbar">
      <div className="nav-inner">
        <Link to="/" className="nav-logo" onClick={closeNav}>
          <span className="logo-icon">🍽</span>
          Simply Savory
        </Link>

        <div className={`nav-links ${isOpen ? 'open' : ''}`} id="navLinks">
          <NavLink to="/" onClick={closeNav}>Home</NavLink>
          <NavLink to="/recipes" onClick={closeNav}>Recipes</NavLink>
          <NavLink to="/categories" onClick={closeNav}>Categories</NavLink>
          <NavLink to="/about" onClick={closeNav}>About</NavLink>
          <NavLink to="/contact" onClick={closeNav}>Contact</NavLink>
        </div>

        <button 
          className="nav-toggle" 
          id="navToggle" 
          aria-label="Toggle navigation"
          aria-expanded={isOpen}
          onClick={toggleNav}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div 
        className={`nav-overlay ${isOpen ? 'show' : ''}`} 
        id="navOverlay"
        onClick={closeNav}
      ></div>
    </nav>
  )
}

export default Navbar
