import React,{Component} from 'react';
import {Api} from './Api/Api.js';
import axios from 'axios';
import {Modal} from 'react-bootstrap';
import {Button} from 'react-bootstrap';


class AddCategory  extends Component {

  constructor(props){
    super(props);
    this.state = {
      product : this.props.product,
      categoryList : [],
      show: false,
      categoryid : null,
      label : this.props.product.label,
      price :this.props.product.price,
      category : this.props.product.category.id,
    }
    this.handleChange = this.handleChange.bind(this);
    this.confirmChange = this.confirmChange.bind(this);
    this.handleClose = this.handleClose.bind(this);
    this.handleShow = this.handleShow.bind(this);
  }

  confirmChange(){
    let product = this.state.product;
    product.label = this.state.label;
    product.price = this.state.price;
    if(this.props.product.id != null){
        product.category = {
          id : this.state.category
        }
        let url = Api.baseURL + Api.PutDeleteGetProduct + this.props.product.id ;
        console.log(url);
        axios.put(url,product).then(res => {
          //document.location.reload();
         }).catch(error => {
           console.log(error);
         })
    }
    else {
      let url = Api.baseURL + Api.PostProduct + this.state.category;
      axios.post(url,product).then(res => {
        document.location.reload();
        console.log(res);
       }).catch(error => {
         console.log(error);
       })
    }
  }
  componentDidMount(){
   let url = Api.baseURL + Api.PostGetCategory ;
   console.log(url);
   axios.get(url).then(res => {
      console.log(res);
      this.setState({
        categoryList : res.data,
        category : res.data[0].id
      });
    }).catch(error => {
      console.log(error);
    })
  }

  handleChange(event) {
    const target = event.target;
    const value =  target.value;
    const name =   target.name;
    this.setState({
        [name] : value
    })
    console.log(value);
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
    let btn;
    if(this.state.product.id == null){
      btn =  <button type="button" onClick={this.handleShow} className="btn btn-success">Add a Product</button>

    }
    else {
      btn = <Button variant="primary" onClick={this.handleShow}>
                     <span  className="fa fa-edit fa-lg" aria-hidden="true"></span>
                   </Button>;
    }
    return(
         <div>
             {btn}
             <Modal show={this.state.show} onHide={this.handleClose} style={{opacity:1}} animation={true}>
               <Modal.Header closeButton>
               </Modal.Header>
               <Modal.Body>
                        <input name="label" onChange={this.handleChange} value={this.state.label} type="text"  className="form-control-plaintext" id="labal" placeholder="Category.."></input>
                        <input name="price" onChange={this.handleChange} value={this.state.price} type="number"  className="form-control-plaintext" id="price" ></input>
                        <select name="category"  onChange={this.handleChange}>
                          {this.state.categoryList.map((prop,key)=>{
                            return <option value={prop.id}>{prop.label}</option>
                          })}
                        </select>
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
