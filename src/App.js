import React, { Component } from 'react';
import './App.css';

class App extends Component {

  constructor(props){
    super(props);
    this.state={
      title: 'React TODO App with CRUD Functionalities',
      act: 0,
      index: '',
      datas: []
    }
  } 

  componentDidMount(){
    this.refs.task.focus();
  }

  fSubmit = (e) =>{
    e.preventDefault();
    console.log('try');

    let datas = this.state.datas;
    let task = this.refs.task.value;

    if(this.state.act === 0){   //new
      let data = {
        task
      }
      datas.push(data);
    }else{                      //update
      let index = this.state.index;
      datas[index].task = task;
    }    

    this.setState({
      datas: datas,
      act: 0
    });

    this.refs.myForm.reset();
    this.refs.task.focus();
  }

  fRemove = (i) => {
    let datas = this.state.datas;
    datas.splice(i,1);
    this.setState({
      datas: datas
    });

    this.refs.myForm.reset();
    this.refs.task.focus();
  }

  fEdit = (i) => {
    let data = this.state.datas[i];
    this.refs.task.value = data.task;

    this.setState({
      act: 1,
      index: i
    });

    this.refs.task.focus();
  }  

  render() {
    let datas = this.state.datas;
    return (
      <div className="App">
        <h2>{this.state.title}</h2>
        <form ref="myForm" className="myForm">
          <input type="text" ref="task" placeholder="Input Task" className="formField" />
          <button onClick={(e)=>this.fSubmit(e)} className="myButton">Add Task </button>
        </form>
        <pre>
          {datas.map((data, i) =>
            <li key={i} className="myList">
              {i+1}. {data.task}
             <button onClick={()=>this.fRemove(i)} className="myListButton">Remove </button>
             <button onClick={()=>this.fEdit(i)} className="myListButton">Update </button>
            </li>
          )}
        </pre>
      </div>
    );
  }
}

export default App;