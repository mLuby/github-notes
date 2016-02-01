var React = require('react')
var NotesList = require('./NotesList')
var Notes = React.createClass({
  render: function(){
    console.log('this.props.notes',this.props.notes)
    return (
      <div>
        <p>NOTES</p>
        <p>Notes for {this.props.username}</p>
        <NotesList notes={this.props.notes} />
      </div>
    )
  }
})

module.exports = Notes
