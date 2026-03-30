import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RecipeCard from '../../components/RecipeCard/RecipeCard'
import { recipes } from '../../data/recipes'
import './Home.css'

function Home() {
  const featuredRecipes = recipes.slice(0, 3)

  const homeCategories = [
    { name: "Breakfast", image: "pancakes.jpg", link: "/recipes" },
    { name: "Categories", image: "categories-dinner.jpg", link: "/categories" },
    { name: "Popular", image: "categories-popular.jpg", link: "/recipes" },
    { name: "Quick & Easy", image: "quick-easy.jpg", link: "/recipes" }
  ]

  const baseUrl = import.meta.env.BASE_URL

  const slides = [
    { image: "hero-salad-bowl.jpg", title: "Fresh Salad Bowl", link: "/recipe/1" },
    { image: "hero-pizza.jpg", title: "Homemade Pizza", link: "/recipes" },
    { image: "hero-eggs-toast.jpg", title: "Eggs & Toast", link: "/recipes" },
    { image: "creamy-garlic-pasta.jpg", title: "Creamy Garlic Pasta", link: "/recipe/1" },
    { image: "tuscan-chicken.jpg", title: "Tuscan Chicken", link: "/recipe/9" }
  ]

  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % slides.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [slides.length])

  const goToSlide = (index) => setCurrentSlide(index)
  const prevSlide = () => setCurrentSlide(prev => (prev - 1 + slides.length) % slides.length)
  const nextSlide = () => setCurrentSlide(prev => (prev + 1) % slides.length)

  return (
    <>
      {/* Hero Section with Slideshow */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-text">
            <h1>Delicious, High-Quality<br /><span>Meals Made Simple</span></h1>
            <p>Discover quick, flavorful recipes for everyday cooking. From easy breakfasts to satisfying dinners, Simply Savory helps make every meal feel effortless.</p>
            <Link to="/recipes" className="btn btn-primary">Browse Recipes →</Link>
          </div>

          <div className="slideshow">
            <div className="slideshow-container">
              {slides.map((slide, index) => (
                <Link
                  to={slide.link}
                  key={index}
                  className={`slide ${index === currentSlide ? 'active' : ''}`}
                >
                  <img src={`${baseUrl}images/${slide.image}`} alt={slide.title} />
                  <div className="slide-caption">
                    <span>{slide.title}</span>
                  </div>
                </Link>
              ))}

              <button className="slide-arrow slide-prev" onClick={(e) => { e.preventDefault(); prevSlide() }}>&#10094;</button>
              <button className="slide-arrow slide-next" onClick={(e) => { e.preventDefault(); nextSlide() }}>&#10095;</button>
            </div>

            <div className="slide-dots">
              {slides.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => goToSlide(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Browse By</span>
            <h2>Explore Our Categories</h2>
            <p>Find recipes by type, occasion, and cooking style.</p>
          </div>

          <div className="categories-grid">
            {homeCategories.map((category, index) => (
              <Link to={category.link} className="category-card" key={index}>
                <img src={`${baseUrl}images/${category.image}`} alt={category.name} />
                <div className="card-overlay">
                  <h3>{category.name}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Recipes Section */}
      <section className="section section-warm">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Top Picks</span>
            <h2>Featured Recipes</h2>
            <p>Popular dishes our visitors love most.</p>
          </div>

          <div className="featured-grid">
            {featuredRecipes.map(recipe => (
              <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default Home