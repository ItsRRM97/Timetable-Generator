import React, { Component } from 'react';
import './App.css';
import uuid from 'uuid';


export default class App extends Component{
  state={
    step:1
  }
onNextClick = (e)=>{
  e.preventDefault();
  this.setState({
  step : this.state.step + 1
  })
};
onBackClick = (e) =>{
  e.preventDefault();
  this.setState({
    step : this.state.step - 1
  })
};

render(){
  switch (this.state.step) {
			case 1:
        return <First onNextClick={this.onNextClick}/>
      case 2:
        return <Second onNextClick={this.onNextClick}
      onBackClick={this.onBackClick}
      />
      case 3:
      return <Third onBackClick={this.onBackClick} onNextClick={this.onNextClick}/>
      case 4:
      return <Fourth onNextClick={this.onNextClick}
    onBackClick={this.onBackClick} />
    }
  }
}
class First extends Component{
  state = {
    fields: {
      branch: '',
      section: ''
    },
    branchAndSection: [],
  };
  handleNext = event => {
    this.props.onNextClick(event);
  };
  onFormSubmit = (e) => {
    const branchAndSection = [
      ...this.state.branchAndSection,
      this.state.fields,
    ];
    this.setState({
      branchAndSection,
      fields: {
        branch: '',
        section: ''
      }
    });
    e.preventDefault();
  };

  onInputChange = (e) => {
    const fields = this.state.fields;
    fields[e.target.name] = e.target.value;
    this.setState({ fields });
  };

  render() {
    return (
      <div>
        <form onSubmit={this.onFormSubmit}>
          <input
            placeholder='branch'
            name='branch'
            value={this.state.fields.branch}
            onChange={this.onInputChange}
          />

          <input
            placeholder='section'
            name='section'
            value={this.state.fields.section}
            onChange={this.onInputChange}
          />

          <input type='submit' />
          <button onClick={this.handleNext} >next</button>
        </form>

        <div>
          <ul>
            { this.state.branchAndSection.map(({ branch, section }, i) =>
              <li key={i}>{branch}  { section }</li>
            ) }
          </ul>
        </div>
      </div>
    );
  }
};

class Second extends Component{
  handleBack = event =>{
    this.props.onBackClick(event);
  };
  handleNext = event => {
    this.props.onNextClick(event);
  };
  render(){
    return(
      <div id="cards">
      <div class="ui card">
        <div class="content">
          <div class="header">Project Time Table</div>
        </div>
        <div class="ui header">Choose your Semister</div>
          <select name="semisters" class="ui fluid normal dropdown">
            <option value="">choose any one</option>
          <option value="First">First</option>
          <option value="Second">Second</option>
          <option value="Third">Third</option>
          <option value="Fourth">Fourth</option>
          <option value="Fifth">Fifth</option>
          <option value="Sixth">Sixth</option>
          </select>
          <div class="extra content">
             <div class="ui two buttons" tabindex="0">
               <div class="ui basic green button" onClick ={this.handleBack}>Back</div>
               <div class="ui basic blue button" onClick ={this.handleNext}>Next</div>
             </div>
           </div>
      </div>
      </div>
    );
  }
}


  class Third extends Component{
    handleBack = event =>{
      this.props.onBackClick(event);
    };
    handleNext = event => {
      this.props.onNextClick(event);
    };

    render(){
      return(
        <div id="cards">
        <div class="ui card">
          <div class="content">
            <div class="header">Project Time Table</div>
          </div>
          <div class="content">
            <h2 class="ui sub header">No. of Faculties</h2>
          </div>
          <div class="ui action input">
            <input type="text" placeholder="total no of faculties." />
            <div class="ui animated button" tabindex="0">
              <div class="visible content">Submit</div>
              <div class="hidden content">
                <i class="right arrow icon"></i>
              </div>
            </div>
          </div>
          <div class="extra content">
             <div class="ui two buttons" tabindex="0">
               <div class="ui basic green button" onClick ={this.handleBack}>Back</div>
               <div class="ui basic blue button" onClick ={this.handleNext}>Next</div>
             </div>
           </div>
        </div>
        </div>
      );
    }
  }
  class Fourth extends Component{
    handleBack = event =>{
      this.props.onBackClick(event);
    };
    render(){
      return(
        <div id="cards">
          <div class="ui card">
            <div class="content">
              <div class="header">Project Time Table</div>
            </div>
            <div class="content">
              <h2 class="ui sub header">No. of Rooms</h2>
            </div>
            <div class="ui action input">
              <input type="text" placeholder="total no of rooms." />
              <div class="ui animated button" tabindex="0">
                <div class="visible content">Submit</div>
                <div class="hidden content">
                  <i class="right arrow icon"></i>
                </div>
              </div>
            </div>
            <div class="extra content">
               <div class="ui two buttons" tabindex="0">
                 <div class="ui basic green button" onClick ={this.handleBack}>Back</div>
                 <div class="ui basic blue button" onClick ={this.handleNext}>Next</div>
               </div>
             </div>
          </div>
        </div>
      );
    }
  }
