var React = require('react')
var Router = require('react-router')
var Repos = require('./Github/Repos')
var UserProfile = require('./Github/UserProfile')
var Notes = require('./Notes/Notes')
var ReactFireMixin = require('reactfire')
var Firebase = require('firebase')

var Profile = React.createClass({
  mixins: [ReactFireMixin],
  getInitialState: function(){
    return {
      notes: [1,2,3],
      bio: {name: 'Mike Luby'},
      repos: ['a','b','c']
    }
  },
  componentDidMount: function(){
    this.ref = new Firebase('https://githubnotesml.firebaseIO.com')
    console.log('this.props.params.username',this.props.params.username)
    var childRef = this.ref.child(this.props.params.username)
    this.bindAsArray(childRef, 'notes') // added to this by ReactFireMixin
  },
  componentWillMount: function(){
    // this.unbind('notes') // removes listener; from ReactFireMixin
  },
  handleAddNote: function(newNote){ // modify state where state is kept
    // update firebase w new note
    var relativePath = this.props.params.username
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
