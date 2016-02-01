var React = require('react')
var Router = require('react-router')
var Repos = require('./Github/Repos')
var UserProfile = require('./Github/UserProfile')
var Notes = require('./Notes/Notes')
var ReactFireMixin = require('reactfire')
var Firebase = require('firebase')
var helpers = require('../utils/helpers')

var Profile = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function(){
    return {
      notes: [1,2,3],
      bio: {name: 'Mike Luby'},
      repos: ['a','b','c']
    }
  },
  init: function(_username){
    var username = _username.toLowerCase()
    this.ref = new Firebase('https://githubnotesml.firebaseIO.com')
    var childRef = this.ref.child(username)
    this.bindAsArray(childRef, 'notes') // added to this by ReactFireMixin

    helpers.getGithubInfo(username.toLowerCase()).then(function(data){
      this.setState({
        bio: data.bio,
        repos: data.repos
      })
    }.bind(this))
  },
  componentDidMount: function(){
    this.init(this.props.params.username)
  },
  componentWillReceiveProps: function(nextProps){
    this.unbind('notes')
    this.init(nextProps.params.username)
  },
  componentWillMount: function(){
    // this.unbind('notes') // removes listener; from ReactFireMixin
  },
  handleAddNote: function(newNote){ // modify state where state is kept
    // update firebase w new note
    var relativePath = this.props.params.username.toLowerCase()
    var key = this.state.notes.length
    this.ref.child(relativePath).child(key).set(newNote)
  },
  render: function(){
    return (
      <div className="row">
        <div className="col-md-4">
          <UserProfile username={this.props.params.username} bio={this.state.bio}/>
        </div>
        <div className="col-md-4">
          <Repos username={this.props.params.username} repos={this.state.repos}/>
        </div>
        <div className="col-md-4">
          <Notes username={this.props.params.username} notes={this.state.notes} addNote={this.handleAddNote} />
        </div>
      </div>
    )
  }
})

module.exports = Profile
