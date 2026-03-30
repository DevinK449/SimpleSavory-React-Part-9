import { Link } from 'react-router-dom'
import './Breadcrumb.css'

function Breadcrumb({ items }) {
  return (
    <div className="breadcrumb">
      {items.map((item, index) => (
        <span key={index}>
          {item.link ? (
            <Link to={item.link}>{item.label}</Link>
          ) : (
            <span className="current">{item.label}</span>
          )}
          {index < items.length - 1 && <span className="separator">›</span>}
        </span>
      ))}
    </div>
  )
}

export default Breadcrumb
