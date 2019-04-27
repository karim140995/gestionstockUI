import React,{Component} from 'react';
import {Api} from './Api/Api.js';
import axios from 'axios';
import AddProduct from './AddProduct.js';


export default class  ProductPage extends Component {
  constructor(props){
    super(props);

    this.state = {
      productList : []
    };
    this.deleteProduct = this.deleteProduct.bind(this);
  }

  componentDidMount(){
   let url = Api.baseURL + Api.GetProduct ;
   console.log(url);
   axios.get(url).then(res => {
      console.log(res);
      this.setState({
        productList : res.data
      });
    }).catch(error => {
      console.log(error);
    })
  }

  deleteProduct(prop,key){
    let url = Api.baseURL + Api.PutDeleteGetProduct + prop.id ;
    console.log(url);
    axios.delete(url).then(res => {
       let array = this.state.productList;
       array.splice(key,1)
       this.setState({
         productList : array
       });
     }).catch(error => {
       console.log(error);
     })
  }
  render(){
    let defaults = {
      id : null,
      label : null,
      price : null ,
      category : {
        id : null
      }
    };
    return(
      <div>
                  <div className="container" style={{marginTop:"30px",marginLeft:"10px",marginRight:"10px",float:"left",width:"100%"}}>
                      <div className="row">
                                  <button type="button" style={{marginRight:"10px"}} className="btn btn-success"><AddProduct product = {defaults} /></button>
                      </div>

                    <div className="row" style={{marginTop:"10px"}}>
                        <table className="table table-hover table-bordered">
                              <thead className="thead">
                                <tr>
                                  <th scope="col">Delete</th>
                                  <th scope="col">Modify</th>
                                  <th scope="col">Category</th>
                                  <th scope="col">Label</th>
                                  <th scope="col">Price</th>
                                </tr>
                              </thead>
                              <tbody>
                              {this.state.productList.map((prop,key)=>{
                                let categorylabel = (prop.category === null) ?  "NA" : (prop.category.label) ;
                                return <tr key={key}>
                                  <td>   <button onClick={() => this.deleteProduct(prop,key)} type="button" className="btn btn-default" aria-label="Left Align">
                                     <span className="fa fa-trash-o fa-lg" aria-hidden="true"></span>
                                     </button></td>
                                   <td><AddProduct product = {prop} /></td>
                                  <td>{categorylabel}</td>
                                  <td>{prop.label}</td>
                                  <td>{prop.price}</td>
                                    </tr>
                              })}
                              </tbody>
                        </table>
                    </div>
              </div>
      </div>
    );
  }
}
