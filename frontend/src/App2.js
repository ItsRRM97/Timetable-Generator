import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './App.css';
import uuid from 'uuid';
import interact from 'interactjs'

const draggableOptions = {
  onmove: event => {
     const target = event.target
   // keep the dragged position in the data-x/data-y attributes
   const x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx
   const y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy

   // translate the element
   target.style.webkitTransform =
   target.style.transform =
     'translate(' + x + 'px, ' + y + 'px)'

   // update the posiion attributes
   target.setAttribute('data-x', x);
   target.setAttribute('data-y', y);
 }
}

export default class App extends React.Component {
  state={
    timers:[],
  };


  handleCreateFormSubmit = (timer)=>{
    this.createTimer(timer);
  };
  handleEditFormSubmit = (attrs) => {
    this.updateTimer(attrs);
  };
  handleTrashClick = (timerId) =>{
    this.deleteTimer(timerId);
  };

  deleteTimer = (timerId) => {
    this.setState({
      timers: this.state.timers.filter(t => t.id !== timerId),
    });

  };
  createTimer = (timer) =>{
    function newTimer(attrs = {}) {
   const timer = {
     title: attrs.title || 'Please enter a Subject',
     project: attrs.project || 'time',
     id: uuid.v4(), // eslint-disable-line no-undef
     elapsed: 0,
   };

   return timer;
 }
    const t = newTimer(timer)
    this.setState({
      timers:this.state.timers.concat(t),
    });

  };
  updateTimer = (attrs) => {
    console.log(attrs);
    this.setState({
      timers: this.state.timers.map((timer) => {
        if (timer.id === attrs.id) {
          return Object.assign({}, timer, {
            title: attrs.title,
            project: attrs.project,
          });
        } else {
          return timer;
        }
      }),
    });

  };

  render() {
    return (
      <div className='ui three column centered grid'>
        <div className='column'>
          <EditableTimerList
          timers={this.state.timers}
          onFormSubmit={this.handleEditFormSubmit}
          onTrashClick={this.handleTrashClick}
          onEditClick={this.handleEditFormSubmit}
          />
          <ToggleableTimerForm onFormSubmit={this.handleCreateFormSubmit}/>
        </div>
      </div>
    );
  }
}

class EditableTimerList extends React.Component {
  componentDidMount () {
    this.interactable = interact(ReactDOM.findDOMNode(this));
    this.interactable
        .draggable(draggableOptions)
  };
  componentWillUnmount () {
      this.interactable.unset();
      this.interactable = null;
  };
  render() {
    const timers=this.props.timers.map((timer)=>(
          <EditableTimer
            key={timer.id}
            id={timer.id}
            title={timer.title}
            project={timer.project}
            onFormSubmit={this.props.onFormSubmit}
            onEditClick={this.props.onEditClick}
            onTrashClick={this.props.onTrashClick}
          />
    ));
    return(
      <div id='timers'>
      {timers}
      </div>
    );
  }
}

class EditableTimer extends React.Component {
  state={
    editFormOpen:false,
  };
  handleEditClick = ()=>{
    this.openForm();
  }
  handleFormClose = ()=>{
    this.closeForm();
  }
  closeForm = ()=>{
    this.setState({
      editFormOpen:false
    });
  };
  openForm = ()=>{
    this.setState({
      editFormOpen:true
    });
  };
  handleSubmit = (timer)=>{
    this.props.onFormSubmit(timer);
    this.closeForm();
  };


  render() {
    if (this.state.editFormOpen) {
      return (
        <TimerForm
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          onFormSubmit={this.handleSubmit}
          onFormClose={this.handleFormClose}
        />
      );
    } else {
      return (
        <Timer
          id={this.props.id}
          title={this.props.title}
          project={this.props.project}
          onEditClick={this.handleEditClick}
          onTrashClick={this.props.onTrashClick}
        />
      );
    }
  }
}

class TimerForm extends React.Component {
  state={
    title:this.props.title || '',
    project:this.props.project || '',
  };
  handleTitleChange = (e)=>{
    this.setState({
      title:e.target.value
    });
  };
  handleProjectChange = (e)=>{
    this.setState({
      project:e.target.value
    });
  };
  handleSubmit = () =>{
    this.props.onFormSubmit({
      id:this.props.id,
      title:this.state.title,
      project:this.state.project
    });
  };
  render() {
    const submitText = this.props.id ? 'Update' : 'Create';
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='ui form'>
            <div className='field'>
              <label>Subject</label>
              <input type='text' value={this.state.title}  onChange={this.handleTitleChange}/>
            </div>
            <div className='field'>
              <label>Time</label>
              <input type='number' value={this.state.project} onChange={this.handleProjectChange}/>
            </div>
            <div className='ui two bottom attached buttons'>
              <button className='ui basic blue button' onClick={this.handleSubmit}>
                {submitText}
              </button>
              <button className='ui basic red button' onClick={this.props.onFormClose}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
class ToggleableTimerForm extends React.Component {
  state={
    isOpen:false,
  };
  handleFormOpen = ()=>{
    this.setState({isOpen:true});
  };
  handleFormClose = ()=>{
    this.setState({isOpen:false});
  };
  handleFormSubmit = (timer)=>{
    this.props.onFormSubmit(timer);
    this.setState({isOpen: false});
  };
  render() {
    if (this.state.isOpen) {
      return (
        <TimerForm  onFormSubmit={this.handleFormSubmit}
        onFormClose={this.handleFormClose} />
      );
    } else {
      return (
        <div className='ui basic content center aligned segment'>
          <button className='ui basic button icon' onClick={this.handleFormOpen}>
            <i className='plus icon' />
          </button>
        </div>
      );
    }
  }
}

class Timer extends React.Component {


  handleTrashClick = () =>{
    this.props.onTrashClick(this.props.id);
  };
  handleEditClick = event => {
    this.props.onEditClick(event);
  }
  render() {
    return (
      <div className='ui centered card'>
        <div className='content'>
          <div className='header'>
            {this.props.title}
          </div>
          <div className='meta'>
            {this.props.project}
          </div>
          <div className='center aligned description'>
            <h2>

            </h2>
          </div>
          <div className='extra content'>
            <span className='right floated edit icon'
            onClick={this.handleEditClick}>
              <i className='edit icon' />
            </span>
            <span className='right floated trash icon'
            onClick={this.handleTrashClick}>
              <i className='trash icon' />
            </span>
          </div>
        </div>

        </div>
    );
  }
}
