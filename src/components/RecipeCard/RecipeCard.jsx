import { Link } from 'react-router-dom'
import './RecipeCard.css'

function RecipeCard({ recipe }) {
  return (
    <Link to={`/recipe/${recipe.id}`} className="recipe-card">
      <div className="recipe-card-img">
        <img src={`${import.meta.env.BASE_URL}images/${recipe.image}`} alt={recipe.name} />
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