import { useEffect, useState } from 'react'
import axios from 'axios'
import './DeleteRecipeDialog.css'

const API_URL = "https://simplesavory-server.onrender.com"

function DeleteRecipeDialog({ recipe, onClose, onRecipeDeleted }) {
  const [status, setStatus] = useState(null)
  const [message, setMessage] = useState('')

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape' && status !== 'sending') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      window.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose, status])

  async function handleConfirm() {
    setStatus('sending')
    setMessage('')

    try {
      const response = await axios.delete(`${API_URL}/api/recipes/${recipe.id}`)
      if (response.status === 200) {
        setStatus('success')
        setMessage(`"${recipe.name}" was deleted.`)
        setTimeout(() => {
          onRecipeDeleted(recipe.id)
          onClose()
        }, 700)
      }
    } catch (err) {
      setStatus('error')
      setMessage(err.response?.data?.error || 'Something went wrong. Please try again.')
    }
  }

  return (
    <div className="dd-backdrop" onClick={status === 'sending' ? undefined : onClose}>
      <div
        className="dd-dialog"
        onClick={(e) => e.stopPropagation()}
        role="alertdialog"
        aria-modal="true"
        aria-label={`Delete ${recipe.name}`}
      >
        <div className="dd-icon" aria-hidden="true">🗑️</div>
        <h2>Delete this recipe?</h2>
        <p>
          Are you sure you want to remove <strong>{recipe.name}</strong>? This action cannot be undone.
        </p>

        {status === 'success' && (
          <div className="dd-banner dd-banner--success" role="status">{message}</div>
        )}
        {status === 'error' && (
          <div className="dd-banner dd-banner--error" role="alert">{message}</div>
        )}

        <div className="dd-actions">
          <button
            type="button"
            className="dd-btn dd-btn--ghost"
            onClick={onClose}
            disabled={status === 'sending' || status === 'success'}
          >
            Cancel
          </button>
          <button
            type="button"
            className="dd-btn dd-btn--danger"
            onClick={handleConfirm}
            disabled={status === 'sending' || status === 'success'}
          >
            {status === 'sending' ? 'Deleting…' : 'Yes, delete it'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default DeleteRecipeDialog
