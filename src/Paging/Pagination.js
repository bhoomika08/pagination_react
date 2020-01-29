import React from 'react';
import axios from 'axios';
import UserListing from '../View/usersListing';
import './paging.css';

function Pages(props) {
  return (
    <div className="pageEntries">
      <label>Entries per Page:</label>
        <input type="number" value={props.entries} onChange={props.onChange}></input>
    </div>
  );
}

function Paging(props) {
  const pages = [];
  for(let i = 1; i <= props.noOfPages; i++) {
    pages.push(i);
  }
  return (
    <div className="controls pagination">
      <a href="#" onClick={props.goToPreviousPage}>Prev</a>
      {pages.map(page => (
        <a key={page} href="#" className={props.currentPage === page ? 'active' : ''} onClick={() => props.goToPage(page)}>{page}</a>
      ))}
      <a href="#" onClick={props.goToNextPage}>Next</a>
    </div>
  );
}

class Pagination extends React.Component {
  constructor() {
    super();
    this.state = {
      isLoaded: false,
      users: [],
      items: [],
      entries: '',
      noOfPages: 5,
      currentPage: 0,
    };
    this.handleChange = this.handleChange.bind(this);
    this.goToPreviousPage = this.goToPreviousPage.bind(this);
    this.goToPage = this.goToPage.bind(this);
    this.goToNextPage = this.goToNextPage.bind(this);
  }

  componentDidMount() {
    axios.get('assets/users_data.json')
    .then( response => {
      this.setState({
        isLoaded: true,
        entries: this.state.entries,
        items: response.data,
        users: response.data,
      });
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleChange(event) {
    if(event.target.value) {
      this.setState({
        entries: event.target.value,
        currentPage: 1,
        noOfPages: Math.ceil(this.state.items.length / event.target.value),
        users: this.state.items.slice(0, event.target.value)
      });
    } else {
      this.setState({
        entries: event.target.value,
        users: this.state.items,
      });
    }
  }

  goToPreviousPage() {
    if (this.state.currentPage > 1) {
      this.setState({
        currentPage: this.state.currentPage - 1
      }, () => {
          this.goToPage(this.state.currentPage);
      });
    }
  }

  goToPage(pageNum) {
    let start_from = (pageNum - 1) * this.state.entries;
    let end_on = start_from + parseInt(this.state.entries);
    this.setState({
      currentPage: pageNum,
      users: this.state.items.slice(start_from, end_on)
    });
  }

  goToNextPage() {
    if(this.state.currentPage < this.state.noOfPages) {
      this.setState({
        currentPage: this.state.currentPage + 1
      }, () => {
        this.goToPage(this.state.currentPage);
      });
    }
  }

  render() {
    let {
      isLoaded,
      users,
      entries,
      noOfPages,
      currentPage
    } = this.state;
  
    if (!isLoaded) {
     return (<div> Loading... </div>)
    } else {
      if(entries) {
        return (
          <div>
            <UserListing data={users} />
            <Pages entries={entries} onChange={this.handleChange}/>
            <Paging 
              noOfPages={noOfPages}
              currentPage={currentPage}
              goToPreviousPage={this.goToPreviousPage}
              goToPage={(pageNum) => this.goToPage(pageNum)}
              goToNextPage={this.goToNextPage}
            />
          </div>
        );
      } else {
          return (
            <div>
              <UserListing data={users} />
              <Pages entries={entries} onChange={this.handleChange}/>
            </div>
          );
        }
      }
  }   
}

export default Pagination;