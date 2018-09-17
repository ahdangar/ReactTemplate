import React from 'react';
import Draggable from 'react-draggable';
 
export class Drag extends React.Component {
    constructor(props) {
        super(props);  
        this.handleStop = this.handleStop.bind(this);   
        this.handleStart = this.handleStart.bind(this);       
      } 
      
      handleStart(){
        console.log('position' + this)
      }
    
      handleStop() {
        const targetDiv='preview-pan'
        console.log('position' + this.position)
        document.getElementById(targetDiv).insertAdjacentHTML('beforeend',
        '<div class="form-group"><label for="exampleInputEmail1">Email address</label><input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></div>')
       }
    eventLogger = (e, data) => {
    console.log('Event: ', e);
    console.log('Data: ', data);
  };
 
  render() {
    return (
      <Draggable
        axis="x"
        handle=".handle"      
        defaultPosition={{x: 0, y: 0}}
        position={{ x: 0, y:0 }}
        // grid={[25, 25]}
        onStart={this.handleStart}
        onDrag={this.handleDrag}
        onStop={this.handleStop}>       
        <button type='button' className='btn btn-light mr-1 handle'>I > L</button>
        
      </Draggable>
    );
  }
}