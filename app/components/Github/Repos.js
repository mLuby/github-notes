import React from 'react'

const Repos = (props) => (
  <div>
    <p>REPOS</p>
    <ul className="list-group">
      {props.repos.map((repo, index) => (
        <li className="list-group-item" key={index}>
          {repo.html_url && <h4><a href={repo.html_url}>{repo.name}</a></h4>}
          {repo.description && <p>{repo.description}</p>}
        </li>))}
    </ul>
  </div>
)

Repos.propTypes = {
  username: React.PropTypes.string.isRequired,
  repos: React.PropTypes.array.isRequired
}

export default Repos
