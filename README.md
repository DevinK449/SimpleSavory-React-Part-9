# Simply Savory - React Recipe Website

A responsive recipe website built with React and React Router. This project is a conversion of an HTML/CSS website to a modern React application.

## Features

- ✅ **Responsive Design** - Looks great on all screen sizes
- ✅ **Mobile Navigation** - Hamburger menu that displays vertically on small screens
- ✅ **React Router** - Client-side routing for all pages
- ✅ **Reusable Components** - RecipeCard, CategoryCard, TeamCard, MissionCard, etc.
- ✅ **Page Components** - Home, Recipes, Categories, About, Contact, RecipeDetail
- ✅ **Recipe Filtering** - Filter recipes by category
- ✅ **Contact Form** - Functional contact form with validation

## Project Structure

```
src/
├── components/
│   ├── Navbar/
│   ├── Footer/
│   ├── RecipeCard/
│   ├── CategoryCard/
│   ├── PageHero/
│   ├── Breadcrumb/
│   ├── TeamCard/
│   ├── MissionCard/
│   └── ScrollToTop.jsx
├── pages/
│   ├── Home/
│   ├── Recipes/
│   ├── Categories/
│   ├── About/
│   ├── Contact/
│   └── RecipeDetail/
├── data/
│   └── recipes.js
├── App.jsx
├── main.jsx
└── index.css
```

## Getting Started

### Install Dependencies
```bash
npm install
```

### Run Development Server
```bash
npm run dev
```

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

## Deploying to GitHub Pages

### Step 1: Update vite.config.js
Update the `base` property to match your GitHub repository name:
```javascript
base: '/your-repo-name/',
```

### Step 2: Build the Project
```bash
npm run build
```

### Step 3: Deploy to GitHub Pages

**Option A: Using gh-pages package**
```bash
npm install gh-pages --save-dev
```

Add to package.json scripts:
```json
"deploy": "gh-pages -d dist"
```

Then run:
```bash
npm run deploy
```

**Option B: Manual deployment**
1. Push the `dist` folder contents to a `gh-pages` branch
2. Go to your repo Settings > Pages
3. Set source to `gh-pages` branch

## Adding Your Images

Replace the placeholder images in `public/images/` with your actual images. The required images are:

### Recipe Images
- creamy-garlic-pasta.jpg
- pancakes.jpg
- chicken-stir-fry.jpg
- cheesy-baked-ziti.jpg
- caprese-salad.jpg
- lemon-garlic-shrimp.jpg
- chocolate-chip-cookies.jpg
- vegetable-stir-fry.jpg
- tuscan-chicken.jpg
- chicken-rice.jpg

### Hero Images
- hero-salad-bowl.jpg
- hero-pizza.jpg
- hero-eggs-toast.jpg

### Category Images
- cat-breakfast.jpg
- cat-lunch.jpg
- cat-dinner.jpg
- cat-chicken.jpg
- cat-vegetarian.jpg
- cat-soups.jpg
- cat-desserts.jpg
- categories-dinner.jpg
- categories-popular.jpg
- quick-easy.jpg

### About Page Images
- about-cooking.jpg
- team-emma.jpg
- team-daniel.jpg

## Technologies Used

- React 19
- React Router DOM 7
- Vite
- CSS3 (Custom Properties/Variables)
- Google Fonts (Playfair Display, DM Sans)

## License

© 2026 Simply Savory
