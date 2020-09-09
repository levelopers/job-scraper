import React, { Component } from 'react';
import './App.css';
import requestUrl from './configs/requestUrl.json'
import Job from './Job';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jobList: [],
      searchValue: ''
    }
  }
  componentDidMount() {
    fetch(requestUrl.url + '/scrap').then(res => {
      fetch(requestUrl.url)
        .then(res => res.json())
        .then(result => {
          console.log(result);
          this.setState({
            jobList: result
          })
        })
    })
  }

  handleSubmitTags = (tags) => {
    // fetch(requestUrl.url)
    //   .then(res => res.json())
    //   .then(result => {
    //     console.log(result);
    //     this.setState({
    //       jobList: result
    //     })
    //   })
  }

  handleSearch = (e) => {
    const value = e.target.value
    this.setState(prev => {
      return {
        ...prev,
        searchValue: value
      }
    })
  }
  handleSearchClick = () => {
    fetch(requestUrl.url + `?title=${this.state.searchValue}`)
      .then(res => res.json())
      .then(result => {
        this.setState({
          jobList: result
        })
      })
  }

  handleOnEdit = () => {

  }

  handleOnSave = (_id, job) => {
    console.log(_id, job);
    fetch(requestUrl.url + '/' + _id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: { job }
    })
      .then(res => res.json())
      .then(result => {
        console.log(result);
      })
  }
  render() {

    return (
      <div style={styles.container}>
        <div>
          <lable>search job title: </lable>
          <input name="search" value={this.state.searchValue} onChange={this.handleSearch} />
          <button onClick={this.handleSearchClick}>Search</button>
        </div>
        <ul style={styles.jobList}>
          {this.state.jobList.map(job =>
            <li>
              <Job
                job={job}
                editing={true}
                onEdit={this.handleOnEdit}
                onSave={this.handleOnSave}
                submitTags={this.handleSubmitTags}
              />
            </li>
          )}
        </ul>
      </div>
    );
  }
}

var styles = {
  container: {
    padding: 30,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
  jobList: {
    border: '1px solid black',
    margin: 30
  }
}

export default App;
