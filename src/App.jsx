import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar/Navbar'
import Footer from './components/Footer/Footer'
import Home from './pages/Home/Home'
import Recipes from './pages/Recipes/Recipes'
import Categories from './pages/Categories/Categories'
import About from './pages/About/About'
import Contact from './pages/Contact/Contact'
import RecipeDetail from './pages/RecipeDetail/RecipeDetail'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <>
      <ScrollToTop />
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/recipes" element={<Recipes />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/recipe/:id" element={<RecipeDetail />} />
        </Routes>
      </main>
      <Footer />
    </>
  )
}

export default App
