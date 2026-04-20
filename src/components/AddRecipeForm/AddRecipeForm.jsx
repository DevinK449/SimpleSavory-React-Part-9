import { useState } from 'react'
import axios from 'axios'
import './AddRecipeForm.css'

const API_URL = "https://simplesavory-server.onrender.com"

const CATEGORIES = [
  "Breakfast", "Lunch", "Dinner", "Pasta",
  "Chicken", "Vegetarian", "Soups", "Quick & Easy", "Desserts"
]

const EMPTY_FORM = {
  name: '',
  description: '',
  longDescription: '',
  time: '',
  serves: '',
  category: '',
  ingredients: '',
  instructions: '',
}

const MAX_IMAGE_BYTES = 5 * 1024 * 1024
const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/gif']

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

  if (fields.image) {
    if (!ALLOWED_IMAGE_TYPES.includes(fields.image.type))
      errors.image = "Image must be a JPG, PNG, WEBP, or GIF."
    else if (fields.image.size > MAX_IMAGE_BYTES)
      errors.image = "Image must be 5 MB or smaller."
  }

  return errors
}

function AddRecipeForm({ onRecipeAdded }) {
  const [fields, setFields] = useState(EMPTY_FORM)
  const [image, setImage] = useState(null)
  const [imagePreview, setImagePreview] = useState('')
  const [errors, setErrors] = useState({})
  const [status, setStatus] = useState(null)
  const [serverMessage, setServerMessage] = useState('')

  function handleChange(e) {
    const { name, value } = e.target
    setFields(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
    if (status) setStatus(null)
  }

  function handleImageChange(e) {
    const file = e.target.files?.[0] || null
    setImage(file)
    setImagePreview(file ? URL.createObjectURL(file) : '')
    if (errors.image) setErrors(prev => ({ ...prev, image: '' }))
    if (status) setStatus(null)
  }

  function clearImage() {
    setImage(null)
    setImagePreview('')
  }

  async function handleSubmit(e) {
    e.preventDefault()

    const validationErrors = validate({ ...fields, image })
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
    if (image) formData.append('image', image)

    try {
      const response = await axios.post(`${API_URL}/api/recipes`, formData)
      if (response.status === 201) {
        setStatus('success')
        setServerMessage(`"${response.data.recipe.name}" was added! Scroll up to find it in the list.`)
        onRecipeAdded(response.data.recipe)
        setFields(EMPTY_FORM)
        clearImage()
        setErrors({})
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

  return (
    <section className="submit-section">
      <div className="submit-inner">
        <div className="submit-header">
          <span className="section-label">Community</span>
          <h2>Share a Recipe</h2>
          <p>Have a recipe you love? Fill in the details below and it'll appear in our collection.</p>
        </div>

        {status === 'success' && (
          <div className="submit-banner submit-banner--success" role="alert">
            <span className="banner-icon">✓</span>
            {serverMessage}
          </div>
        )}

        {status === 'error' && (
          <div className="submit-banner submit-banner--error" role="alert">
            <span className="banner-icon">!</span>
            {serverMessage}
          </div>
        )}

        <form className="recipe-form" onSubmit={handleSubmit} noValidate>
          <div className="form-two-col">

            {/* ── Left column ── */}
            <div className="form-col">
              <div className="form-group">
                <label htmlFor="rf-name">Recipe Name <span className="req">*</span></label>
                <input
                  id="rf-name"
                  name="name"
                  type="text"
                  placeholder="e.g. Creamy Tomato Soup"
                  value={fields.name}
                  onChange={handleChange}
                  className={errors.name ? 'rf-input rf-input--err' : 'rf-input'}
                />
                {errors.name && <span className="rf-err">{errors.name}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="rf-description">Short Description <span className="req">*</span></label>
                <input
                  id="rf-description"
                  name="description"
                  type="text"
                  placeholder="One sentence about your recipe"
                  value={fields.description}
                  onChange={handleChange}
                  className={errors.description ? 'rf-input rf-input--err' : 'rf-input'}
                />
                {errors.description && <span className="rf-err">{errors.description}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="rf-longDescription">Full Description <span className="rf-optional">(optional)</span></label>
                <textarea
                  id="rf-longDescription"
                  name="longDescription"
                  rows={3}
                  placeholder="A longer description for the recipe detail page"
                  value={fields.longDescription}
                  onChange={handleChange}
                  className="rf-input"
                />
              </div>

              <div className="form-pair">
                <div className="form-group">
                  <label htmlFor="rf-time">Cook Time <span className="req">*</span></label>
                  <input
                    id="rf-time"
                    name="time"
                    type="text"
                    placeholder="e.g. 30 min"
                    value={fields.time}
                    onChange={handleChange}
                    className={errors.time ? 'rf-input rf-input--err' : 'rf-input'}
                  />
                  {errors.time && <span className="rf-err">{errors.time}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="rf-serves">Serves <span className="req">*</span></label>
                  <input
                    id="rf-serves"
                    name="serves"
                    type="text"
                    placeholder="e.g. 2-3"
                    value={fields.serves}
                    onChange={handleChange}
                    className={errors.serves ? 'rf-input rf-input--err' : 'rf-input'}
                  />
                  {errors.serves && <span className="rf-err">{errors.serves}</span>}
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="rf-category">Category <span className="req">*</span></label>
                <select
                  id="rf-category"
                  name="category"
                  value={fields.category}
                  onChange={handleChange}
                  className={errors.category ? 'rf-input rf-select rf-input--err' : 'rf-input rf-select'}
                >
                  <option value="">Select one…</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && <span className="rf-err">{errors.category}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="rf-image">
                  Recipe Photo <span className="rf-optional">(optional, max 5 MB)</span>
                </label>
                <input
                  id="rf-image"
                  name="image"
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  onChange={handleImageChange}
                  className={errors.image ? 'rf-file rf-input--err' : 'rf-file'}
                />
                {errors.image && <span className="rf-err">{errors.image}</span>}
                {imagePreview && (
                  <div className="rf-image-preview">
                    <img src={imagePreview} alt="Preview" />
                    <button type="button" className="rf-image-remove" onClick={clearImage}>
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* ── Right column ── */}
            <div className="form-col">
              <div className="form-group form-group--grow">
                <label htmlFor="rf-ingredients">
                  Ingredients <span className="req">*</span>
                  <span className="rf-hint"> — one per line</span>
                </label>
                <textarea
                  id="rf-ingredients"
                  name="ingredients"
                  rows={8}
                  placeholder={"2 cups all-purpose flour\n1 tsp salt\n2 tbsp olive oil\n..."}
                  value={fields.ingredients}
                  onChange={handleChange}
                  className={errors.ingredients ? 'rf-input rf-textarea rf-input--err' : 'rf-input rf-textarea'}
                />
                {errors.ingredients && <span className="rf-err">{errors.ingredients}</span>}
              </div>

              <div className="form-group form-group--grow">
                <label htmlFor="rf-instructions">
                  Instructions <span className="req">*</span>
                  <span className="rf-hint"> — one step per line</span>
                </label>
                <textarea
                  id="rf-instructions"
                  name="instructions"
                  rows={8}
                  placeholder={"Mix flour and salt in a bowl.\nAdd olive oil and stir to combine.\n..."}
                  value={fields.instructions}
                  onChange={handleChange}
                  className={errors.instructions ? 'rf-input rf-textarea rf-input--err' : 'rf-input rf-textarea'}
                />
                {errors.instructions && <span className="rf-err">{errors.instructions}</span>}
              </div>
            </div>

          </div>

          <div className="form-footer">
            <p className="form-note"><span className="req">*</span> Required fields</p>
            <button
              type="submit"
              className="rf-submit-btn"
              disabled={status === 'sending'}
            >
              {status === 'sending' ? 'Adding Recipe…' : 'Add to Collection →'}
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}

export default AddRecipeForm
