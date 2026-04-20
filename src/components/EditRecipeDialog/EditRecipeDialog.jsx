import { useEffect, useState } from 'react'
import axios from 'axios'
import './EditRecipeDialog.css'

const API_URL = "https://simplesavory-server.onrender.com"

const CATEGORIES = [
  "Breakfast", "Lunch", "Dinner", "Pasta",
  "Chicken", "Vegetarian", "Soups", "Quick & Easy", "Desserts"
]

const MAX_IMAGE_BYTES = 5 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

function toLines(arr) {
  if (!arr) return ''
  if (Array.isArray(arr)) return arr.join('\n')
  return String(arr)
}

function validate(fields) {
  const errors = {}

  if (!fields.name || fields.name.trim().length < 2)
    errors.name = "Recipe name must be at least 2 characters."
  else if (fields.name.trim().length > 100)
    errors.name = "Recipe name must be 100 characters or fewer."

  if (!fields.description || fields.description.trim().length < 5)
    errors.description = "Description must be at least 5 characters."
  else if (fields.description.trim().length > 300)
    errors.description = "Description must be 300 characters or fewer."

  if (!fields.time || fields.time.trim().length < 2)
    errors.time = "Cook time is required (e.g. '30 min')."

  if (!fields.serves || fields.serves.trim().length < 1)
    errors.serves = "Serves is required (e.g. '2-3')."

  if (!fields.category || !CATEGORIES.includes(fields.category))
    errors.category = "Please select a category."

  const ingredientLines = fields.ingredients.split('\n').map(l => l.trim()).filter(Boolean)
  if (ingredientLines.length < 1)
    errors.ingredients = "Add at least one ingredient."

  const instructionLines = fields.instructions.split('\n').map(l => l.trim()).filter(Boolean)
  if (instructionLines.length < 1)
    errors.instructions = "Add at least one instruction step."

  if (fields.newImage) {
    if (!ALLOWED_IMAGE_TYPES.includes(fields.newImage.type))
      errors.image = "Image must be a JPG, PNG, WEBP, or GIF."
    else if (fields.newImage.size > MAX_IMAGE_BYTES)
      errors.image = "Image must be 5 MB or smaller."
  }

  return errors
}

function resolveExistingImage(image) {
  if (!image) return ''
  if (image.startsWith('http')) return image
  if (image.startsWith('images/')) return `${API_URL}/${image}`
  return image
}

function EditRecipeDialog({ recipe, onClose, onRecipeUpdated }) {
  const [fields, setFields] = useState({
    name: recipe.name || '',
    description: recipe.description || '',
    longDescription: recipe.longDescription || '',
    time: recipe.time || '',
    serves: recipe.serves || '',
    category: recipe.category || '',
    ingredients: toLines(recipe.ingredients),
    instructions: toLines(recipe.instructions),
  })
  const [newImage, setNewImage] = useState(null)
  const [newImagePreview, setNewImagePreview] = useState('')
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [serverMessage, setServerMessage] = useState('')

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  function handleChange(e) {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    if (status === 'error') setStatus(null)
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0] || null
    setNewImage(file)
    setNewImagePreview(file ? URL.createObjectURL(file) : '')
    if (errors.image) setErrors(prev => ({ ...prev, image: '' }))
    if (status === 'error') setStatus(null)
  }

  function clearNewImage() {
    setNewImage(null)
    setNewImagePreview('')
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const validationErrors = validate({ ...fields, newImage })
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setStatus('sending')
    setServerMessage('')

    const formData = new FormData()
    formData.append('name', fields.name.trim())
    formData.append('description', fields.description.trim())
    formData.append('longDescription', fields.longDescription.trim() || fields.description.trim())
    formData.append('time', fields.time.trim())
    formData.append('serves', fields.serves.trim())
    formData.append('category', fields.category)
    formData.append(
      'ingredients',
      JSON.stringify(fields.ingredients.split('\n').map(l => l.trim()).filter(Boolean))
    )
    formData.append(
      'instructions',
      JSON.stringify(fields.instructions.split('\n').map(l => l.trim()).filter(Boolean))
    )
    if (!newImage && recipe.image) formData.append('image', recipe.image)
    if (newImage) formData.append('image', newImage)

    try {
      const response = await axios.put(`${API_URL}/api/recipes/${recipe.id}`, formData)
      if (response.status === 200) {
        setStatus('success')
        setServerMessage(`"${response.data.recipe.name}" was updated.`)
        onRecipeUpdated(response.data.recipe)
        setTimeout(onClose, 900)
      }
    } catch (err) {
      setStatus('error')
      if (err.response?.data?.errors) {
        setServerMessage(err.response.data.errors.join(' '))
      } else {
        setServerMessage('Something went wrong. Please try again.')
      }
    }
  }

  const existingImageSrc = resolveExistingImage(recipe.image)
  const previewSrc = newImagePreview || existingImageSrc

  return (
    <div className="ed-backdrop" onClick={onClose}>
      <div
        className="ed-dialog"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={`Edit ${recipe.name}`}
      >
        <header className="ed-header">
          <div>
            <span className="ed-eyebrow">Edit Recipe</span>
            <h2>{recipe.name}</h2>
          </div>
          <button type="button" className="ed-close" onClick={onClose} aria-label="Close">×</button>
        </header>

        {status === 'success' && (
          <div className="ed-banner ed-banner--success" role="status">
            <span className="ed-banner-icon">✓</span> {serverMessage}
          </div>
        )}
        {status === 'error' && (
          <div className="ed-banner ed-banner--error" role="alert">
            <span className="ed-banner-icon">!</span> {serverMessage}
          </div>
        )}

        <form className="ed-form" onSubmit={handleSubmit} noValidate>
          <div className="ed-two-col">
            <div className="ed-col">
              <div className="ed-group">
                <label htmlFor="ed-name">Recipe Name <span className="req">*</span></label>
                <input
                  id="ed-name"
                  name="name"
                  type="text"
                  value={fields.name}
                  onChange={handleChange}
                  className={errors.name ? 'ed-input ed-input--err' : 'ed-input'}
                />
                {errors.name && <span className="ed-err">{errors.name}</span>}
              </div>

              <div className="ed-group">
                <label htmlFor="ed-description">Short Description <span className="req">*</span></label>
                <input
                  id="ed-description"
                  name="description"
                  type="text"
                  value={fields.description}
                  onChange={handleChange}
                  className={errors.description ? 'ed-input ed-input--err' : 'ed-input'}
                />
                {errors.description && <span className="ed-err">{errors.description}</span>}
              </div>

              <div className="ed-group">
                <label htmlFor="ed-longDescription">
                  Full Description <span className="ed-optional">(optional)</span>
                </label>
                <textarea
                  id="ed-longDescription"
                  name="longDescription"
                  rows={3}
                  value={fields.longDescription}
                  onChange={handleChange}
                  className="ed-input"
                />
              </div>

              <div className="ed-pair">
                <div className="ed-group">
                  <label htmlFor="ed-time">Cook Time <span className="req">*</span></label>
                  <input
                    id="ed-time"
                    name="time"
                    type="text"
                    value={fields.time}
                    onChange={handleChange}
                    className={errors.time ? 'ed-input ed-input--err' : 'ed-input'}
                  />
                  {errors.time && <span className="ed-err">{errors.time}</span>}
                </div>

                <div className="ed-group">
                  <label htmlFor="ed-serves">Serves <span className="req">*</span></label>
                  <input
                    id="ed-serves"
                    name="serves"
                    type="text"
                    value={fields.serves}
                    onChange={handleChange}
                    className={errors.serves ? 'ed-input ed-input--err' : 'ed-input'}
                  />
                  {errors.serves && <span className="ed-err">{errors.serves}</span>}
                </div>
              </div>

              <div className="ed-group">
                <label htmlFor="ed-category">Category <span className="req">*</span></label>
                <select
                  id="ed-category"
                  name="category"
                  value={fields.category}
                  onChange={handleChange}
                  className={errors.category ? 'ed-input ed-select ed-input--err' : 'ed-input ed-select'}
                >
                  <option value="">Select one…</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <span className="ed-err">{errors.category}</span>}
              </div>

              <div className="ed-group">
                <label htmlFor="ed-image">
                  Recipe Photo <span className="ed-optional">(leave blank to keep current)</span>
                </label>
                <input
                  id="ed-image"
                  name="image"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleImageChange}
                  className={errors.image ? 'ed-file ed-input--err' : 'ed-file'}
                />
                {errors.image && <span className="ed-err">{errors.image}</span>}
                {previewSrc && (
                  <div className="ed-image-preview">
                    <img src={previewSrc} alt="Recipe preview" />
                    {newImage && (
                      <button type="button" className="ed-image-remove" onClick={clearNewImage}>
                        Revert
                      </button>
                    )}
                  </div>
                )}
              </div>
            </div>

            <div className="ed-col">
              <div className="ed-group ed-group--grow">
                <label htmlFor="ed-ingredients">
                  Ingredients <span className="req">*</span>
                  <span className="ed-hint"> — one per line</span>
                </label>
                <textarea
                  id="ed-ingredients"
                  name="ingredients"
                  rows={8}
                  value={fields.ingredients}
                  onChange={handleChange}
                  className={errors.ingredients ? 'ed-input ed-textarea ed-input--err' : 'ed-input ed-textarea'}
                />
                {errors.ingredients && <span className="ed-err">{errors.ingredients}</span>}
              </div>

              <div className="ed-group ed-group--grow">
                <label htmlFor="ed-instructions">
                  Instructions <span className="req">*</span>
                  <span className="ed-hint"> — one step per line</span>
                </label>
                <textarea
                  id="ed-instructions"
                  name="instructions"
                  rows={8}
                  value={fields.instructions}
                  onChange={handleChange}
                  className={errors.instructions ? 'ed-input ed-textarea ed-input--err' : 'ed-input ed-textarea'}
                />
                {errors.instructions && <span className="ed-err">{errors.instructions}</span>}
              </div>
            </div>
          </div>

          <footer className="ed-footer">
            <button type="button" className="ed-btn ed-btn--ghost" onClick={onClose}>
              Cancel
            </button>
            <button
              type="submit"
              className="ed-btn ed-btn--primary"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Saving…' : 'Save Changes'}
            </button>
          </footer>
        </form>
      </div>
    </div>
  )
}

export default EditRecipeDialog
