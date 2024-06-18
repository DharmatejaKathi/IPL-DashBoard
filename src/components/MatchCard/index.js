// Write your code here
// Write your code here
import './index.css'

const MatchCard = props => {
  const {matchDetails} = props
  const {competingTeam, competingTeamLogo, result, matchStatus} = matchDetails
  const color = matchStatus === 'Won' ? 'green' : 'red'

  return (
    <li className="match-card">
      <img
        className="match-card-img"
        src={competingTeamLogo}
        alt={`competing team ${competingTeam}`}
      />
      <p>{competingTeam}</p>
      <p>{result}</p>
      <p className={color}>{matchStatus}</p>
    </li>
  )
}

export default MatchCard
