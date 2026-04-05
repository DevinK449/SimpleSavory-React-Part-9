import { Link } from 'react-router-dom'
import './RecipeCard.css'

const API_URL = "https://simplesavory-server.onrender.com"

function RecipeCard({ recipe }) {
  const imageSrc = recipe.image.startsWith("images/")
    ? `${API_URL}/${recipe.image}`
    : `${import.meta.env.BASE_URL}images/${recipe.image}`

  return (
    <Link to={`/recipe/${recipe.id}`} className="recipe-card">
      <div className="recipe-card-img">
        <img src={imageSrc} alt={recipe.name} />
        <span className="recipe-card-time">{recipe.time}</span>
      </div>
      <div className="recipe-card-body">
        <h3>{recipe.name}</h3>
        <p>{recipe.description}</p>
        <div className="recipe-card-meta">
          <span className="stars">★★★★★</span>
          <span className="rating">{recipe.rating}</span>
          <span>({recipe.reviews} reviews)</span>
        </div>
      </div>
    </Link>
  )
}

export default RecipeCard