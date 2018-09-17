import React, { Component } from 'react';
import './App.css';

export class AppDragDropDemo extends Component {
    state = {
        tasks: [
            {name:"Input",category:"complete", bgcolor: "yellow", codesnap:'<input type="text">'},
            {name:"Dropdown", category:"complete", bgcolor:"pink", codesnap:'<select class="form-control"><option>Select option</option></select>' },
            {name:"Label", category:"complete", bgcolor:"skyblue", codesnap:'<label class="control-label">Your label</label>'}
          ]
    }

    onDragStart = (ev, id) => {
        console.log('dragstart:',id);
        ev.dataTransfer.setData("id", id);
    }

    onDragOver = (ev) => {
        ev.preventDefault();
    }
   

    onDrop = (ev, cat) => {
       let id = ev.dataTransfer.getData("id");
       
       let tasks = this.state.tasks.filter((task) => {
           if (task.name == id) {
               task.category = cat;
           }          
           return task;
       });
      
       this.setState({
           ...this.state,
           tasks
       });
    }

    render() {
        var tasks = {
            wip: [],
            complete: []
        }

        this.state.tasks.forEach ((t) => {
            if(t.category==='complete'){
                tasks[t.category].push( 
                    <div key={t.name} 
                    onDragStart = {(e) => this.onDragStart(e, t.name)}
                    draggable
                    className="draggable"                   
                    > <button className='btn btn-light'>{t.name}</button>
                    </div>)
            } else {

           
            tasks[t.category].push(                
                <div dangerouslySetInnerHTML={{__html: t.codesnap}}> 
                </div>
            );
            tasks['complete'].push( 
                <div key={t.name} 
                onDragStart = {(e) => this.onDragStart(e, t.name)}
                draggable
                className="draggable"                   
                > <button className='btn btn-light'>{t.name}</button>
                </div>)
        }
        });

        return (
            <div className="container-drag row">                
                <div className="wip col-9"  id='abc'
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>{this.onDrop(e, "wip")}}>
                    <span className="task-header">WIP</span>
                    {tasks.wip}
                </div>
                <div className="droppable col-3" 
                    onDragOver={(e)=>this.onDragOver(e)}
                    onDrop={(e)=>this.onDrop(e, "complete")}>
                     <span className="task-header">COMPLETED</span>
                     {tasks.complete}
                </div>


            </div>
        );
    }
}
