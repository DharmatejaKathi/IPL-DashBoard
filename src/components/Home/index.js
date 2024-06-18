// Write your code here

// Write your code here
import {Component} from 'react'

import Loader from 'react-loader-spinner'

import TeamCard from '../TeamCard'

import './index.css'

const apiStatusConstant = {
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  initial: 'INITIAL',
}

class Home extends Component {
  state = {teamsList: [], apiStatus: apiStatusConstant.initial}

  componentDidMount() {
    this.getIplLists()
  }

  getIplLists = async () => {
    this.setState({apiStatus: apiStatusConstant.inProgress})
    const teamsApiUrl = 'https://apis.ccbp.in/ipl'

    const response = await fetch(teamsApiUrl)

    const data = await response.json()
    console.log(data)
    const newData = data.teams.map(each => ({
      id: each.id,
      name: each.name,
      teamImageUrl: each.team_image_url,
    }))
    console.log(newData)
    this.setState({teamsList: newData, apiStatus: apiStatusConstant.success})
  }

  renderTeamsList = () => {
    const {teamsList} = this.state
    return (
      <ul className="team-card-ul">
        {teamsList.map(each => (
          <TeamCard teamDetails={each} key={each.id} />
        ))}
      </ul>
    )
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="Oval" color="#ffffff" height={50} width={50} />
    </div>
  )

  renderFinal = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstant.inProgress:
        return this.renderLoader()
      case apiStatusConstant.success:
        return this.renderTeamsList()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="container">
        <div className="ipl-head-container">
          <img
            className="ipl-img"
            src="https://assets.ccbp.in/frontend/react-js/ipl-logo-img.png"
            alt="ipl logo"
          />
          <h1 className="ipl-head">IPL Dashboard</h1>
        </div>
        {this.renderFinal()}
      </div>
    )
  }
}

export default Home
