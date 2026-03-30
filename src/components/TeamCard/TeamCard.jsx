import './TeamCard.css'

function TeamCard({ member }) {
  return (
    <div className="team-card">
      <div className="team-avatar">
        <img src={`${import.meta.env.BASE_URL}images/${member.image}`} alt={member.name} />
      </div>
      <h3>{member.name}</h3>
      <div className="role">{member.role}</div>
      <p>{member.description}</p>
    </div>
  )
}

export default TeamCard