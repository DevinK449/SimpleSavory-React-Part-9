import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PageHero from '../../components/PageHero/PageHero'
import RecipeCard from '../../components/RecipeCard/RecipeCard'
import { filterCategories } from '../../data/recipes'
import './Recipes.css'

const API_URL = "https://simplesavory-server.onrender.com"

function Recipes() {
  const [recipes, setRecipes] = useState([])
  const [activeFilter, setActiveFilter] = useState('All')

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${API_URL}/api/recipes`)
        setRecipes(response.data)
      } catch (error) {
        console.error("Error fetching recipes:", error)
      }
    })()
  }, [])

  const filteredRecipes = activeFilter === 'All'
    ? recipes
    : recipes.filter(recipe => recipe.category === activeFilter)

  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'Recipes' }
  ]

  return (
    <>
      <PageHero 
        title="Recipes"
        description="Discover a variety of delicious and easy-to-follow recipes for every occasion."
        breadcrumbItems={breadcrumbItems}
      />

      <section className="section" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="filter-bar">
            {filterCategories.map(category => (
              <button
                key={category}
                className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          <div className="recipes-grid">
            {filteredRecipes.length > 0 ? (
              filteredRecipes.map(recipe => (
                <RecipeCard key={recipe.id} recipe={recipe} />
              ))
            ) : (
              <p className="no-recipes">No recipes found in this category.</p>
            )}
          </div>

          <div className="load-more-wrapper">
            <Link to="/contact" className="btn btn-outline">Request a Recipe</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Recipes
