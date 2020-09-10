import React, { Component } from 'react';
import './App.css';
import requestUrl from './configs/requestUrl.json'
import Job from './Job';
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jobList: [],
      searchValue: '',
      editingJob: ''
    }
  }
  componentDidMount() {
    this.fetchData()
  }

  fetchData = () => {
    fetch(requestUrl.url)
      .then(res => res.json())
      .then(result => {
        this.setState({
          jobList: result
        })
      })
  }

  handleScrap = () => {
    fetch(requestUrl.url + "/scrap")
      .then(res => res.json())
      .then(result => {
        this.setState({
          jobList: result
        })
      })
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

  handleOnEdit = (_id) => {
    this.setState(prev => {
      return {
        ...prev,
        editingJob: _id
      }
    })
  }

  handleOnSave = (_id, job) => {
    fetch(requestUrl.url + '/' + _id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(job)
    })
      .then(res => res.json())
      .then(result => {
        this.fetchData()
        this.setState(prev => {
          return {
            ...prev,
            editingJob: ''
          }
        })
      })
  }

  handleOnCancel = () => {
    this.setState(prev => {
      return {
        ...prev,
        editingJob: ''
      }
    })
  }

  handleOnDelete = (job) => {
    const newJob = { ...job, hide: true }
    fetch(requestUrl.url + '/' + job._id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newJob)
    })
      .then(res => res.json())
      .then(result => {
        this.fetchData()
      })
  }

  render() {
    return (
      <div style={styles.container}>
        <div><button onClick={this.handleScrap}>Scrap data</button></div>
        <div>
          <lable>search job title: </lable>
          <input name="search" value={this.state.searchValue} onChange={this.handleSearch} />
          <button onClick={this.handleSearchClick}>Search</button>
        </div>
        <div style={styles.jobList}>
          {this.state.jobList.map(job =>
            <div>
              {!job.hide &&
                <div style={styles.job}>
                  <Job
                    job={job}
                    editing={this.state.editingJob === job._id}
                    onEdit={this.handleOnEdit}
                    onSave={this.handleOnSave}
                    onCancel={this.handleOnCancel}
                    onDelete={this.handleOnDelete}
                  />
                </div>
              }
            </div>
          )}
        </div>
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
  },
  job: {
    flexDirection: 'row'
  }
}

export default App;
