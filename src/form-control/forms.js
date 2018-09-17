import React, { Component } from 'react';
import Draggable from 'react-draggable';

export class FormControl extends React.Component {  
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};
        this.handleClick = this.handleClick.bind(this);
        this.abClick2=this.abClick.bind(this);
        this.myIframe='http://www.oneadvanced.com'
      }    
      
      handleClick() {
       document.getElementById('preview-pan').insertAdjacentHTML('beforeend',
       '<div class="form-group"><label for="exampleInputEmail1">Email address</label><input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email"></div>')
      }

      abClick() {
        document.getElementById('preview-pan').insertAdjacentHTML('afterBegin',
        '<div class="form-group"><label for="exampleInputEmail1">Email address</label><select class="form-control"><option> Select item</option></select></div>')
       }
       
    render(){
        return (
            <div className='row'>                              
                <div id='preview-pan' className='col-9'></div>                
                <div className='col-3'>
                <Draggable position={{ x: 0, y:0 }}>
                    <button type='button' className='btn btn-light mr-1' onClick={this.handleClick}>I > T</button>
                </Draggable>
                <Draggable position={{ x: 0, y:0 }}>
                    <button type='button' className='btn btn-light mr-1' onClick={this.abClick2}>S > DDL</button>
                </Draggable>
            </div>                
            </div>
    )
}
shouldComponentUpdate() {
    return false;
   }
  }

