import React from 'react'
import SearchGithub from './SearchGithub'

const Main = ({history, children}) => (
  <div className="main-container">
    <nav className="navbar navbar-default" role="navigation">
      <div className="col-sm-7 col-sm-offset-2" style={{marginTop: 15}}>
        <SearchGithub history={history}/>
      </div>
    </nav>
    <div className="container">
      {children}
    </div>
  </div>
)

Main.PropTypes = {
  history: React.PropTypes.object.isRequired, // TODO these seem to have no impact.
  children: React.PropTypes.object.isRequired
}

export default Main
