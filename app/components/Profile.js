import React from 'react'
import Repos from './Github/Repos'
import UserProfile from './Github/UserProfile'
import Notes from './Notes/Notes'
import getGithubInfo from '../utils/helpers'
import Rebase from 're-base'

const base = Rebase.createClass('https://githubnotesml.firebaseio.com')

class Profile extends React.Component {
  constructor(props){
    super(props) // basically always have to do this
    this.state = {
      notes: [],
      bio: {},
      repos: []
    }
  }
  componentDidMount(){
    this.init(this.props.params.username)
  }
  componentWillReceiveProps(nextProps){
    base.removeBinding(this.ref)
    this.init(nextProps.params.username)
  }
  componentWillUnmount(){
    base.removeBinding(this.ref)
  }
  init(_username){
    const username = _username.toLowerCase()
    this.ref = base.bindToState(username, {
      context: this,
      asArray: true,
      state: 'notes'
    })
    getGithubInfo(username).then(data => this.setState({
      bio: data.bio,
      repos: data.repos
    }))
  }
  handleAddNote(newNote){ // modify state where state is kept
    base.post(this.props.params.username.toLowerCase(), {
      data: this.state.notes.concat([newNote])
    })
  }
  render(){
    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile username={this.props.params.username} bio={this.state.bio}/>
        </div>
        <div className="col-md-4">
          <Repos username={this.props.params.username} repos={this.state.repos}/>
        </div>
        <div className="col-md-4">
          <Notes username={this.props.params.username} notes={this.state.notes} addNote={(newNote) => this.handleAddNote(newNote)} />
        </div>
      </div>
    )
  }
}

export default Profile
