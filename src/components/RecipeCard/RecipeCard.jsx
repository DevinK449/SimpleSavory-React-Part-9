import { Link } from 'react-router-dom'
import './RecipeCard.css'

const API_URL = "https://simplesavory-server.onrender.com"

function RecipeCard({ recipe, onEdit, onDelete }) {
  const imageSrc = recipe.image.startsWith("images/")
    ? `${API_URL}/${recipe.image}`
    : `${import.meta.env.BASE_URL}images/${recipe.image}`

  function handleEdit(e) {
    e.preventDefault()
    e.stopPropagation()
    onEdit?.(recipe)
  }

  function handleDelete(e) {
    e.preventDefault()
    e.stopPropagation()
    onDelete?.(recipe)
  }

  return (
    <Link to={`/recipe/${recipe.id}`} className="recipe-card">
      <div className="recipe-card-img">
        <img src={imageSrc} alt={recipe.name} />
        <span className="recipe-card-time">{recipe.time}</span>
        {(onEdit || onDelete) && (
          <div className="recipe-card-actions">
            {onEdit && (
              <button
                type="button"
                className="recipe-card-action recipe-card-action--edit"
                onClick={handleEdit}
                aria-label={`Edit ${recipe.name}`}
                title="Edit recipe"
              >
                ✏️
              </button>
            )}
            {onDelete && (
              <button
                type="button"
                className="recipe-card-action recipe-card-action--delete"
                onClick={handleDelete}
                aria-label={`Delete ${recipe.name}`}
                title="Delete recipe"
              >
                🗑️
              </button>
            )}
          </div>
        )}
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
