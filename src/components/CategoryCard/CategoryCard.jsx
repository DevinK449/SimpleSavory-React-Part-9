import { Link } from 'react-router-dom'
import './CategoryCard.css'

function CategoryCard({ category, variant = 'default' }) {
  return (
    <Link 
      to="/recipes" 
      className={`category-card ${variant === 'page' ? 'cat-page-card' : ''}`}
    >
      <img src={`${import.meta.env.BASE_URL}images/${category.image}`} alt={category.name} />
      <div className={variant === 'page' ? 'cat-label' : 'card-overlay'}>
        <h3>{category.name}</h3>
      </div>
    </Link>
  )
}

export default CategoryCard