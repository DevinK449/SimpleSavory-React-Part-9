import { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Breadcrumb from '../../components/Breadcrumb/Breadcrumb'
import './RecipeDetail.css'

const API_URL = "https://simplesavory-server.onrender.com"

function RecipeDetail() {
  const { id } = useParams()
  const [recipe, setRecipe] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    (async () => {
      try {
        const response = await axios.get(`${API_URL}/api/recipes/${id}`)
        setRecipe(response.data)
      } catch (error) {
        console.error("Error fetching recipe:", error)
      } finally {
        setLoading(false)
      }
    })()
  }, [id])

  if (loading) {
    return (
      <div className="container">
        <div className="recipe-not-found">
          <p>Loading recipe...</p>
        </div>
      </div>
    )
  }

  if (!recipe) {
    return (
      <div className="container">
        <div className="recipe-not-found">
          <h1>Recipe Not Found</h1>
          <p>Sorry, we couldn't find the recipe you're looking for.</p>
          <Link to="/recipes" className="btn btn-primary">Browse All Recipes</Link>
        </div>
      </div>
    )
  }

  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'Recipes', link: '/recipes' },
    { label: recipe.name }
  ]

  return (
    <>
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <section className="recipe-detail">
        <div className="container">
          <div className="recipe-detail-header">
            <div className="recipe-detail-img">
              <img src={`${API_URL}/${recipe.image}`} alt={recipe.name} />
            </div>
            <div className="recipe-detail-info">
              <h1>{recipe.name}</h1>
              <p>{recipe.longDescription}</p>

              <div className="recipe-meta-bar">
                <div className="meta-item">
                  <span className="icon">⏱</span>
                  <strong>{recipe.time}</strong>
                </div>
                <div className="meta-item">
                  <span className="icon">🍽</span>
                  <strong>Serves {recipe.serves}</strong>
                </div>
                <div className="meta-item">
                  <span className="stars">★★★★★</span>
                  <strong>{recipe.rating}</strong>
                  <span>({recipe.reviews} reviews)</span>
                </div>
              </div>

              {/* Ingredients */}
              <div className="ingredients-section">
                <h2>Ingredients</h2>
                <ul className="ingredients-list">
                  {recipe.ingredients.map((ingredient, index) => (
                    <li key={index}>{ingredient}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Instructions */}
          <div className="instructions-section">
            <h2>Instructions</h2>
            <div className="instructions-list">
              {recipe.instructions.map((instruction, index) => (
                <div className="instruction-step" key={index}>
                  <div className="step-number">{index + 1}</div>
                  <div className="step-text">{instruction}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default RecipeDetail