var React = require('react')

var UserProfile = React.createClass({
  propTypes: {
    username: React.PropTypes.string.isRequired,
    bio: React.PropTypes.object.isRequired
  },
  upperCase: function(str){ return str[0].toUpperCase() + str.slice(1) },
  maybeKeyToListItem: function (key) { // seemed like a good idea at the time but img src vs href is tricky to guess at…
    if(this.props.bio[key] && typeof this.props.bio[key].match === 'function' && this.props.bio[key].match(/^https/)){
      return (<li className="list-group-item" key={key}><img src={this.props.bio[key]} /></li>)
    } else if (this.props.bio[key] && typeof this.props.bio[key].match === 'function' && this.props.bio[key].match(/.+@.+\..+/)) {
      return (this.props.bio[key] && <li className="list-group-item" key={key}>{this.upperCase(key)}: <a href="mailto:{this.props.bio[key]}">{this.props.bio[key]}</a></li>)
    } else {
      return (this.props.bio[key] && <li className="list-group-item" key={key}>{this.upperCase(key)}: {this.props.bio[key]}</li>)
    }
  },
  render: function(){
    return (
      <div>
        {this.props.bio.avatar_url && <li className="list-group-item"><img src={this.props.bio.avatar_url} className="img-rounded img-responsive" /></li>}
        {this.props.bio.name && <li className="list-group-item">Name: {this.props.bio.name}</li>}
        {this.props.bio.login && <li className="list-group-item">Username: {this.props.bio.login}</li>}
        {this.props.bio.email && <li className="list-group-item">Email: <a href="mailto:{this.props.bio.email}">{this.props.bio.email}</a></li>}
        {this.props.bio.location && <li className="list-group-item">Location: {this.props.bio.location}</li>}
        {this.props.bio.company && <li className="list-group-item">Company: {this.props.bio.company}</li>}
        {this.props.bio.followers && <li className="list-group-item">Followers: {this.props.bio.followers}</li>}
        {this.props.bio.following && <li className="list-group-item">Following: {this.props.bio.following}</li>}
        {this.props.bio.public && <li className="list-group-item">Public Repos: {this.props.bio.public_repos}</li>}
        {this.props.bio.blog && <li className="list-group-item">Blog: <a href={this.props.bio.blog}>{this.props.bio.blog}</a></li>}
      </div>
    )
  }
})

module.exports = UserProfile
