import React, {Component} from 'react';
import GitRepoDetails from './GitRepoDetails'
import axios from 'axios'




export default class Customers extends Component {

  constructor(props) {
    super(props)
    this.state = {
      selectedCustomer: null,
      selectedCustomerPushed:null
    }
  }

  //function which is called the first time the component loads
  componentDidMount() {
    this.getCustomerData();
  }

  //Function to get the Repo Data from git
  getCustomerData() {
    axios.get('https:/api.github.com/search/repositories?q=stars:1..*&sort=stars&order=desc&page=1&per_page=100').then(response => {
      this.setState({customerList: response.data.items})
    })
  };
  
 

  render() {
    
    if (!this.state.customerList)
      return (<p>Loading data</p>)

    let customerDetails;  
      if(this.state.selectedCustomer==null){
        customerDetails = ""
      }else{
        customerDetails = <GitRepoDetails val={this.state.selectedCustomer} date={this.state.selectedCustomerPushed}/>
      }


    return (<div className="columnacont">
      <div className="mixtogran">
        <div className ="card">
        
        {

          this.state.customerList.map(customer => <div key={customer.id} className="cardContainer">
            
              <h1>{customer.full_name}</h1>
                <h4 className = "star"><span className="fa fa-star checked"></span><span className="fa fa-star checked"></span><span className="fa fa-star checked"></span>{customer.stargazers_count}</h4>
                <h4><a href={customer.html_url} target="_blank">{customer.html_url}</a></h4>
                <h3>Last Commite was made <b>{customer.pushed_at}</b></h3>
                <button className="btn" onClick={() => this.setState({selectedCustomer: customer.full_name, selectedCustomerPushed: customer.pushed_at})}><i className="fa fa-folder"> Commits for the last day </i></button>
            </div>
            
          )
        }
        </div>
      
      </div>
      <div className="mixtopetit">
        {customerDetails}
      </div>
      
    </div>)
  
  }

}
