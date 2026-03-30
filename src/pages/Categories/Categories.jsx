import { Link } from 'react-router-dom'
import PageHero from '../../components/PageHero/PageHero'
import CategoryCard from '../../components/CategoryCard/CategoryCard'
import { categories } from '../../data/recipes'
import './Categories.css'

function Categories() {
  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'Categories' }
  ]

  return (
    <>
      <PageHero 
        title="Categories"
        description="Explore our collection of easy, delicious recipes categorized to help you find the perfect meal."
        breadcrumbItems={breadcrumbItems}
      />

      <section className="section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Find inspiration</span>
            <h2>Find Inspiration for Your Next Meal</h2>
          </div>

          <div className="categories-page-grid">
            {categories.map(category => (
              <CategoryCard key={category.id} category={category} variant="page" />
            ))}
          </div>

          <div className="browse-all-wrapper">
            <Link to="/recipes" className="btn btn-primary">Browse All →</Link>
          </div>
        </div>
      </section>
    </>
  )
}

export default Categories
