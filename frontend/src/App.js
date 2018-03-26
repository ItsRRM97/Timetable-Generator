import React, { Component } from 'react';
import image from './logo.png';
import './App.css';
import {Tab, Card, Container,Icon } from 'semantic-ui-react';

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

    }
  }
}
class First extends React.Component{
  handleNext = event => {
    this.props.onNextClick(event);
  };
  render(){
    return(
      <div className="ui middle aligned center aligned grid" id="whole">
        <div className="column">
          <h2 className="ui teal image header">
            <img src={image} className="image" />
            <div className="content">
              Log-in to your account
            </div>
          </h2>
        <form className="ui large form">
          <div className="ui stacked segment">
                <h2>TIME TABLE </h2>
            <div className="field">
              <div className="ui left icon input">
                <i className  ="user icon"></i>
                <input type="text" name="username" placeholder="Username" />
              </div>
            </div>
       <div className="ui animated button" tabIndex="0" onClick={this.handleNext}>
        <div className="visible content">Next</div>
          <div className="hidden content">
            <i className="right arrow icon"></i>
          </div>
       </div>
       </div>
       <div className="ui error message"></div>
       </form>
       <div className="ui message">
         New to us? <a href="#">Sign Up</a>
       </div>
       </div>
       </div>
    );
  }
}
class Second extends React.Component{
  handleBack = event =>{
    this.props.onBackClick(event);
  };
  render(){
    return(
      <div className="ui middle aligned center aligned grid" id="whole">
        <div className="column">
          <h2 className="ui teal image header">
            <img src={image} className="image" />
            <div className="content">
              Log-in to your account
            </div>
          </h2>
    <form className="ui large form">
          <div className="ui stacked segment">
            <h2>TIME TABLE</h2>
            <div className="field">
              <div className="ui left icon input">
                <i className  ="lock icon"></i>
                <input type="Password" name="Passworde" placeholder="Password" />
              </div>
            </div>
            <div className="column">
      <div className="ui animated fade button" id='btn1' tabIndex="0" onClick={this.handleBack}>
        <div className="visible content">Back</div>
          <div className="hidden content">
            <i className="left arrow icon"></i>
         </div>
        </div>
      </div>
      <div className="ui animated button" tabIndex="0" id="btn2" onClick={this.props.handleNext}>
        <div className="visible content">Login</div>
          <div className="hidden content">
            <i className="sign in icon"></i>
          </div>
        </div>
        </div>
    </form>
    </div>
      </div>
    );
  }
}
