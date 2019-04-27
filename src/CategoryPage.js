import React,{Component} from 'react';
import {Api} from './Api/Api.js';
import axios from 'axios';
import AddCategory from './AddCategory.js';

class CategoryPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      categoryList : [],
      search : "",
      selected : null
    };
    this.searchCategory = this.searchCategory.bind(this);
    this.deleteCategory = this.deleteCategory.bind(this);
    this.handleChange   = this.handleChange.bind(this);
    this.edit           = this.edit.bind(this);

  }
  componentDidMount(){
   let url = Api.baseURL + Api.PostGetCategory ;
   console.log(url);
   axios.get(url).then(res => {
      console.log(res);
      this.setState({
        categoryList : res.data
      });
    }).catch(error => {
      console.log(error);
    })
  }
  searchCategory(){
    let url = Api.baseURL + Api.SearchCategory + this.state.search ;
    console.log(url);
    axios.get(url).then(res => {
       this.setState({
         categoryList : res.data
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
      [name]: value
    });
  }
  deleteCategory(prop,key){
    let url = Api.baseURL + Api.DeleteUpdateCategory + prop.id ;
    console.log(url);
    axios.delete(url).then(res => {
       let array = this.state.categoryList;
       array.splice(key,1)
       this.setState({
         categoryList : array
       });
     }).catch(error => {
       console.log(error);
     })
  }
  edit(prop,key = null){
    this.setState({
      selected : prop
    })
  }

  render(){
    let defaults = {
      id : null,
      label :""
    }
    return(
      <div className="container" style={{marginTop:"30px",marginLeft:"10px",marginRight:"10px",float:"left",width:"100%"}}>
         <div className="row">
              <h3>Search for a category</h3>
          </div>
           <div className="row">
               <div className="form-inline">
                      <div className="col">
                            <input name="search" onChange={this.handleChange} value={this.state.search} type="text"  className="form-control-plaintext" id="searchfield" placeholder="Category.."></input>
                      </div>
                      <div className="col">
                          <div className="form-inline">
                                  <button type="button" onClick={this.searchCategory} style={{marginRight:"10px"}} className="btn btn-outline-primary">Search</button>
                                  <AddCategory category = {defaults}/>
                          </div>
                      </div>
                </div>
            </div>

            <div className="row" style={{marginTop:"10px"}}>
                <table className="table table-hover table-bordered">
                      <thead className="thead">
                        <tr>
                          <th scope="col">Delete</th>
                          <th scope="col">Modify</th>
                          <th scope="col">Label</th>
                        </tr>
                      </thead>
                      <tbody>
                      {this.state.categoryList.map((prop,key)=>{
                        return <tr key={key}>
                          <td>
                             <button onClick={() => this.deleteCategory(prop,key)} type="button" className="btn btn-default" aria-label="Left Align">
                             <span className="fa fa-trash-o fa-lg" aria-hidden="true"></span>
                             </button>
                         </td>
                          <td>
                              <AddCategory category = {prop}/>
                         </td>
                          <td>{prop.label}</td>
                        </tr>
                      })}
                      </tbody>
                </table>
            </div>
      </div>
    );
  }
}
export default CategoryPage;
