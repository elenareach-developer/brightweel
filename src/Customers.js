import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import Button from 'react-bootstrap/lib/Button'
import CustomerDetails from './CustomerDetails'
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
        customerDetails = <CustomerDetails val={this.state.selectedCustomer} date={this.state.selectedCustomerPushed}/>
      }


    return (<div className="addmargin">
      <div className="col-md-3">
        {

          this.state.customerList.map(customer => <Panel bsStyle="info" key={customer.id} className="centeralign">
            <Panel.Heading>
              {customer.full_name}
            </Panel.Heading>
            <Panel.Body>
              <p>{customer.stargazers_count}</p>
              <p><a href={customer.html_url} target="_blank">{customer.html_url}</a></p>
              <p>Last Commite was made {customer.pushed_at}</p>
              <Button bsStyle="info" onClick={() => this.setState({selectedCustomer: customer.full_name, selectedCustomerPushed: customer.pushed_at})}>

                Click to View Last Commite

              </Button>
            </Panel.Body>
            
          </Panel>)
        }
      </div>
      <div className="col-md-6">
        {customerDetails}
      </div>
      
    </div>)
  
  }

}
