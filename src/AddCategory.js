import React,{Component} from 'react';
import {Api} from './Api/Api.js';
import axios from 'axios';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';


class AddCategory  extends Component {

  constructor(props){
    super(props);
    this.state = {
      category : this.props.category,
      show: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.confirmChange = this.confirmChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  confirmChange(){
    if(this.props.category.id != null){
        let url = Api.baseURL + Api.DeleteUpdateCategory + this.props.category.id ;
        axios.put(url,this.props.category).then(res => {
          document.location.reload();
         }).catch(error => {
           console.log(error);
         })
    }
    else {
      let url = Api.baseURL + Api.PostGetCategory;
      axios.post(url,this.state.category).then(res => {
        document.location.reload();
       }).catch(error => {
         console.log(error);
       })
    }
  }

  handleChange(event) {
    const target = event.target;
    const value =  target.value;
    const name =   target.name;
    let category = this.state.category;
    category.label = value;
    this.setState({
        category : category
    })
    console.log(this.state.category);

  }

  handleClose() {
  this.setState({ show: false });
  }

  handleShow() {
    this.setState({
      show: true
    });
    console.log(this.state.show);
  }
  render(){
    let button;
    if(this.state.category.id == null){
      button =  <button type="button" onClick={this.handleShow} className="btn btn-outline-success">Add</button>
    }
    else {
      button = <Button variant="primary" onClick={this.handleShow}>
                     <span  className="fa fa-edit fa-lg" aria-hidden="true"></span>
                   </Button>;
    }
    return(
         <div>
             {button}
             <Modal show={this.state.show} onHide={this.handleClose} style={{opacity:1}} animation={true}>
               <Modal.Header closeButton>
               </Modal.Header>
               <Modal.Body>
                        <input name="label" onChange={this.handleChange} value={this.state.category.label} type="text"  className="form-control-plaintext" id="searchfield" placeholder="Category.."></input>
                </Modal.Body>
               <Modal.Footer>
                 <Button variant="secondary" onClick={this.handleClose}>
                   Close
                 </Button>
                 <Button variant="primary" onClick={this.confirmChange}>
                   Save Changes
                 </Button>
               </Modal.Footer>
             </Modal>
        </div>
    );
  }
}
export default AddCategory;
