import PageHero from '../../components/PageHero/PageHero'
import TeamCard from '../../components/TeamCard/TeamCard'
import MissionCard from '../../components/MissionCard/MissionCard'
import './About.css'

function About() {
  const baseUrl = import.meta.env.BASE_URL

  const breadcrumbItems = [
    { label: 'Home', link: '/' },
    { label: 'About' }
  ]

  const teamMembers = [
    {
      id: 1,
      name: "Emma Collins",
      role: "Founder & Recipe Developer",
      description: "Emma focuses on building approachable recipes that anyone can cook with confidence and creativity.",
      image: "team-emma.jpg"
    },
    {
      id: 2,
      name: "Daniel Brooks",
      role: "Culinary Content Manager",
      description: "Daniel helps simplify instructions so every recipe is easy to follow and practical for busy schedules.",
      image: "team-daniel.jpg"
    }
  ]

  const missions = [
    {
      id: 1,
      icon: "📋",
      title: "Simple Recipes",
      description: "Reliable recipes designed for real kitchens and everyday ingredients."
    },
    {
      id: 2,
      icon: "💡",
      title: "Practical Tips",
      description: "Helpful guidance that makes cooking easier and more enjoyable."
    },
    {
      id: 3,
      icon: "🌿",
      title: "Bold Flavor",
      description: "Meals that feel satisfying, fresh, and worth repeating."
    }
  ]

  return (
    <>
      <PageHero 
        title="About Simply Savory"
        description="Helping home cooks create delicious, high-quality meals with confidence."
        breadcrumbItems={breadcrumbItems}
      />

      {/* About Intro */}
      <section className="section">
        <div className="container">
          <div className="about-intro">
            <div className="about-intro-text">
              <span className="section-label">Our Story</span>
              <h2>Cooking Made Simple</h2>
              <p>
                Simply Savory was created to make cooking approachable, enjoyable,
                and stress-free for everyday home cooks.
              </p>
              <p>
                We believe great meals do not require complicated ingredients or hours
                in the kitchen. Our recipes focus on simplicity, flavor, and practical cooking.
              </p>
              <p>
                Whether you are making a quick breakfast, preparing dinner after class,
                or trying something new, Simply Savory is designed to inspire confidence.
              </p>
            </div>

            <div className="about-img">
              <img src={`${baseUrl}images/about-cooking.jpg`} alt="Cooking in kitchen" />
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="team-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Who We Are</span>
            <h2>Meet the Simply Savory Team</h2>
            <p>A passionate group dedicated to making home cooking simple and enjoyable.</p>
          </div>

          <div className="team-grid">
            {teamMembers.map(member => (
              <TeamCard key={member.id} member={member} />
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="mission-section">
        <div className="container">
          <div className="section-header">
            <span className="section-label">What Drives Us</span>
            <h2>Our Mission</h2>
            <p>Empowering home cooks to create flavorful meals with ease.</p>
          </div>

          <div className="mission-grid">
            {missions.map(mission => (
              <MissionCard key={mission.id} mission={mission} />
            ))}
          </div>
        </div>
      </section>

      {/* Cooking Inspiration Video */}
      <section className="section section-warm">
        <div className="container">
          <div className="section-header">
            <span className="section-label">Get Inspired</span>
            <h2>Cooking Inspiration</h2>
            <p>Watch and learn simple techniques to level up your home cooking.</p>
          </div>

          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/ZJy1ajvMU1k"
              title="Cooking Inspiration"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </section>

      {/* Closing Statement */}
      <section className="section">
        <div className="container">
          <div className="closing-statement">
            <h2>Why Simply Savory Matters</h2>
            <p>
              Cooking should feel rewarding, not overwhelming. Our goal is to make every
              meal feel possible, whether you are a beginner or already love spending time
              in the kitchen.
            </p>
          </div>
        </div>
      </section>
    </>
  )
}

export default About