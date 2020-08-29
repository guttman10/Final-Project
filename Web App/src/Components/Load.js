import React, { Component } from 'react'
import { MdSave } from 'react-icons/md'

class Load extends Component {
  constructor (props) {
    super(props)
    this.state = {
      editing: false
    }
    this.edit = this.edit.bind(this)
    this.delete = this.delete.bind(this)
    this.save = this.save.bind(this)
    this.renderForm = this.renderForm.bind(this)
    this.renderUI = this.renderUI.bind(this)
  }

  edit () {
    alert('editing')
    this.setState(({ editing: true }))
  }

  delete () {
    alert('deleting')
  }

  save () {
    alert(this.newLoad.value)
  }

  renderForm () {
    return (
      <div>
        <form>
          <textarea ref={input => this.newLoad = input}/>
          <button onClick={this.save}><MdSave/></button>
        </form>
      </div>
    )
  }

  // between span there is    <button onClick={this.delete} className="btn btn-primary"><MdDelete/></button>
  renderUI () {
    return (
      <div className='load'>
        <div>{this.props.children}</div>
        <span>
        </span>
      </div>
    )
  }

  render () {
    return this.state.editing ? this.renderForm() : this.renderUI()
  }
}

export default Load
