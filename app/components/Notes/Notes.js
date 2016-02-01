var React = require('react')

var Notes = React.createClass({
  render: function(){
    return (
      <div>
        <p>NOTES</p>
        <p>Notes: {this.props.notes}</p>
      </div>
    )
  }
})

module.exports = Notes
