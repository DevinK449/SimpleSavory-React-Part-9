import './MissionCard.css'

function MissionCard({ mission }) {
  return (
    <div className="mission-card">
      <div className="mission-icon">{mission.icon}</div>
      <h3>{mission.title}</h3>
      <p>{mission.description}</p>
    </div>
  )
}

export default MissionCard
