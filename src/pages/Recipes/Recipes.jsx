import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import PageHero from '../../components/PageHero/PageHero'
import RecipeCard from '../../components/RecipeCard/RecipeCard'
import AddRecipeForm from '../../components/AddRecipeForm/AddRecipeForm'
import EditRecipeDialog from '../../components/EditRecipeDialog/EditRecipeDialog'
import DeleteRecipeDialog from '../../components/DeleteRecipeDialog/DeleteRecipeDialog'
import { filterCategories } from '../../data/recipes'
import './Recipes.css'

const API_URL = "https://simplesavory-server.onrender.com"

function Recipes() {
  const [recipes, setRecipes] = useState([])
  const [activeFilter, setActiveFilter] = useState('All')
  const [editingRecipe, setEditingRecipe] = useState(null)
  const [deletingRecipe, setDeletingRecipe] = useState(null)
  const [flashMessage, setFlashMessage] = useState(null)

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

  useEffect(() => {
    if (!flashMessage) return
    const t = setTimeout(() => setFlashMessage(null), 3500)
    return () => clearTimeout(t)
  }, [flashMessage])

  function handleRecipeAdded(newRecipe) {
    setRecipes(prev => [...prev, newRecipe])
  }

  function handleRecipeUpdated(updated) {
    setRecipes(prev => prev.map(r => (r.id === updated.id ? updated : r)))
    setFlashMessage({ type: 'success', text: `"${updated.name}" was updated.` })
  }

  function handleRecipeDeleted(id) {
    const removed = recipes.find(r => r.id === id)
    setRecipes(prev => prev.filter(r => r.id !== id))
    setFlashMessage({
      type: 'success',
      text: removed ? `"${removed.name}" was deleted.` : 'Recipe deleted.',
    })
  }

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
          {flashMessage && (
            <div className={`recipes-flash recipes-flash--${flashMessage.type}`} role="status">
              {flashMessage.text}
            </div>
          )}

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
                <RecipeCard
                  key={recipe.id}
                  recipe={recipe}
                  onEdit={setEditingRecipe}
                  onDelete={setDeletingRecipe}
                />
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

      <AddRecipeForm onRecipeAdded={handleRecipeAdded} />

      {editingRecipe && (
        <EditRecipeDialog
          recipe={editingRecipe}
          onClose={() => setEditingRecipe(null)}
          onRecipeUpdated={handleRecipeUpdated}
        />
      )}

      {deletingRecipe && (
        <DeleteRecipeDialog
          recipe={deletingRecipe}
          onClose={() => setDeletingRecipe(null)}
          onRecipeDeleted={handleRecipeDeleted}
        />
      )}
    </>
  )
}

export default Recipes
