class ReadData extends React.Component{
    constructor(props){
   super(props)
   this.state={
       data: []
   }
}
   async componentDidMount() {
       let data1 = await GetApi('http://localhost:8000')
       this.setState({
           data: data1
       })
    }
    Delete= id => { 
        GetApi('http://localhost:8000/'+id, {method: "DELETE"}).then(() => { 
            alert('sucess')
            location.reload()
        })
    }
    render(){ 
        let arr = this.state.data
        let data = arr.map((x, index) => { 
            return (
                <tr key={index}>
                    <td>{index+1}</td>
                    <td>{x.name_product}</td>
                    <td>{x.price}</td>
                    <td><button className="btn btn-primary">Edit</button></td>
                    <td><button className="btn btn-danger" onClick={this.Delete.bind(this,x.id)}>Delete</button></td>
                </tr>
        )
    })
        return (
            
            <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>No</th>
                            <th>Name Product</th>
                            <th>Price</th>
                            <th colSpan="2" className="text-center">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data}
                    </tbody>
            </table>
            
        )
    }
}

class AddData extends React.Component{ 
    constructor(props){ 
        super(props)
        this.state = { 
            val_product: "",
            val_price: "" 
        }
    }
    NameProduct = (e) => { 
        this.setState({
            val_product: e.target.value
        })
    }
    Price = (e) => { 
        this.setState({
            val_price: e.target.value
        })
    }
    Add = (e) => { 
    
        const data = {name_product: this.state.val_product, price: this.state.val_price}
        GetApi('http://localhost:8000', {
            method: "POST", 
            body: JSON.stringify(data)
        }).then(response => { 
            console.log(response)
            if(response.detail){ 
              alert('error')
            }
        })
    }
    render(){ 
        return (
            <div className="card mt-4">
                <div className="card-header">
                    Add Data
                </div>
                <div className="card-body">
                <form onSubmit={this.Add}> 
                <div className="form-group">
                    <label>Name Product</label>
                            <input type="text" className="form-control"  onChange={this.NameProduct}/>
            </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" id="product" className="form-control" onChange={this.Price} />
            </div>  
            <button type="submit" className="btn btn-primary mt-2">Submit</button>
                </form>
                </div>
            </div>
        )
    }
}
class  Data extends React.Component{
    constructor(props){ 
    super(props)
    this.state = { 
        ff: false
}
    }
    Add = (e) => {
        this.setState({ 
            ff: true
        })
        e.preventDefault();
    }
    render(){
        let d =this.state.ff
        return (
            <div> 
                {d ? 
                    <AddData /> 
                    :
                    <div>
                        <button className="btn btn-primary mt-4 mb-4" 
                        onClick={this.Add.bind(this)}>Add Data</button>
                        <ReadData /> 
                    </div>
            }
            </div>
        )
    }
    }




