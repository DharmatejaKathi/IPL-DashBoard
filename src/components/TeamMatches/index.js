// Write your code here
// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import LatestMatch from '../LatestMatch'
import MatchCard from '../MatchCard'

import './index.css'

const apiStatusConstant = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  initial: 'INITIAL',
}

class TeamMatches extends Component {
  state = {
    teamBannerImage: '',
    latestMatchDetails: {},
    matchCard: [],
    apiStatus: apiStatusConstant.initial,
  }

  componentDidMount() {
    this.getMatchDetails()
  }

  getMatchDetails = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log(id)

    const url = `https://apis.ccbp.in/ipl/${id}`

    const response = await fetch(url)

    const data = await response.json()
    console.log(data)
    const teamBannerImg = data.team_banner_url
    const updateLatestMatchDetails = {
      competingTeam: data.latest_match_details.competing_team,
      competingTeamLogo: data.latest_match_details.competing_team_logo,
      date: data.latest_match_details.date,
      firstInnings: data.latest_match_details.first_innings,
      id: data.latest_match_details.id,
      manOfTheMatch: data.latest_match_details.man_of_the_match,
      matchStatus: data.latest_match_details.match_status,
      result: data.latest_match_details.result,
      secondInnings: data.latest_match_details.second_innings,
      umpires: data.latest_match_details.umpires,
      venue: data.latest_match_details.venue,
    }
    console.log(updateLatestMatchDetails)
    const updateMatchCard = data.recent_matches.map(each => ({
      competingTeam: each.competing_team,
      competingTeamLogo: each.competing_team_logo,
      result: each.result,
      matchStatus: each.match_status,
      id: each.id,
    }))
    this.setState({
      teamBannerImage: teamBannerImg,
      latestMatchDetails: updateLatestMatchDetails,
      matchCard: updateMatchCard,
      apiStatus: apiStatusConstant.success,
    })
  }

  backTOHome = () => {
    const {history} = this.props
    history.push('/')
  }

  renderMatchCard = () => {
    const {matchCard, teamBannerImage, latestMatchDetails} = this.state
    console.log(matchCard, latestMatchDetails)
    return (
      <div>
        <div className="backButtonContainer">
          <button
            className="backButton"
            type="button"
            onClick={this.backTOHome}
          >
            Back
          </button>
        </div>
        <img className="banner" src={teamBannerImage} alt="team banner" />
        <p className="latest">Latest Matches</p>
        <div>
          <LatestMatch latestMatchDetails={latestMatchDetails} />
        </div>

        <ul className="match-ul">
          {matchCard.map(each => (
            <MatchCard matchDetails={each} key={each.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div data-testid="loader" className="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderFinal = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.renderLoader()
      case apiStatusConstant.success:
        return this.renderMatchCard()
      default:
        return null
    }
  }

  render() {
    return <div className="team-matches-container">{this.renderFinal()}</div>
  }
}

export default TeamMatches
