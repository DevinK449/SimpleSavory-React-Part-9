import Breadcrumb from '../Breadcrumb/Breadcrumb'
import './PageHero.css'

function PageHero({ title, description, breadcrumbItems }) {
  return (
    <section className="page-hero">
      <div className="container">
        <Breadcrumb items={breadcrumbItems} />
        <h1>{title}</h1>
        <p>{description}</p>
      </div>
    </section>
  )
}

export default PageHero
