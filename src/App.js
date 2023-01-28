
import './App.css';

import React, { Component } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import LoadingBar from 'react-top-loading-bar'
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
} from "react-router-dom";

export default class App extends Component {

  pageSize = 5;

  state = {
    progress:0
  }
  setProgress = (progress)=>{
    this.setState({progress: progress})
  }
  render() {
    return (
      <div>
        <LoadingBar
        color='red'
        height={3}
        progress={this.state.progress}
        
      />
        <NavBar />
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<News setProgress = {this.setProgress} pageSize={this.pageSize} country="in" category="General"/>} />
        <Route path="/business" element={<News setProgress = {this.setProgress} pageSize={this.pageSize} country="in" category="Business"/>} />
        <Route path="/entertainment" element={<News setProgress = {this.setProgress} pageSize={this.pageSize} country="in" category="Entertainment"/>} />
        <Route path="/health" element={<News setProgress = {this.setProgress} pageSize={this.pageSize} country="in" category="Health"/>} />
        <Route path="/science" element={<News setProgress = {this.setProgress} pageSize={this.pageSize} country="in" category="Science"/>} />
        <Route path="/sports" element={<News setProgress = {this.setProgress} pageSize={this.pageSize} country="in" category="Sports"/>} />
        <Route path="/technology" element={<News setProgress = {this.setProgress} pageSize={this.pageSize} country="in" category="Technology"/>} />
        
      </Routes>
      </BrowserRouter>
    
        
      </div>
    )
  }
}


