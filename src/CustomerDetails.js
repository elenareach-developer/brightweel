import React, {Component} from 'react';
import Panel from 'react-bootstrap/lib/Panel'
import axios from 'axios'

//This Component is a child Component of Customers Component
export default class CustomerDetails extends Component {

  constructor(props) {
    super(props);
    this.state = {
      customerDetails:null
    }
  }

  //Function which is called when the component loads for the first time
  componentDidMount() {
    this.getCustomerDetails(this.props.val, this.props.date)
  }

  //Function which is called whenver the component is updated
  componentDidUpdate(prevProps) {

    //get Customer Details only if props has changed
    if (this.props.val !== prevProps.val) {
      this.getCustomerDetails(this.props.val, this.props.date)
    }
  }

  //Function to Load the list of commits for the last day fromthe last commite.
  getCustomerDetails(full_name, date) {

    let dayBefore = new Date(date);
        dayBefore.setDate(dayBefore.getDate() - 1);

    let gitLink = "https:/api.github.com/repos/" + full_name +"/commits?since=" + dayBefore.toISOString();

    axios.get(gitLink).then(response => {
      this.setState({customerDetails: response.data})
      console.log(this.state.customerDetails)
    })
  };

  render() {
    if (!this.state.customerDetails)
      return (<p>Loading Data</p>)
    if (this.state.customerDetails.length === 0)
      return(<p>No new commits</p>)
    var commits = this.state.customerDetails.map(commits=>{
      return (
            <Panel>
                  <Panel.Heading>
                    <Panel.Title componentClass="h3">{commits.commit.author.name}</Panel.Title>
                  </Panel.Heading>
                  <Panel.Body>
                    <p>{commits.commit.author.date}</p>
                    <p>{commits.commit.message}</p>
                  </Panel.Body>
            </Panel>
          )
    })
    return (<div>{commits}</div>)
  }
}
