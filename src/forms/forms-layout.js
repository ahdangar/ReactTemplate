import React, { Component } from 'react';
import DraggableCore from 'react-draggable';

export class FormLayout extends React.Component {  
    constructor(props) {
        super(props);
        this.state = {isToggleOn: true};
        this.insertLayout = this.insertLayout.bind(this)
        this.handleStop=this.handleStop.bind(this)
        this.hlSelected=this.hlSelected.bind(this)
        this.abc=this.abc.bind(this)
       
       // this.onDragStart=this.onDragStart.bind(this)
        this.layout= [
            {name:'1-col', id:1, codesnap:"<div class='row'><div class='col-12 border1' id='onecol' onclick='abc(this)'></div></div>"},
            {name:'2-col', id:2, codesnap:"<div class='row'><div class='col-6 border1'></div><div class='col-6 border1'></div></div>"},            
            {name:'3-col', id:3, codesnap:"<div class='row'><div class='col-4 border1'></div><div class='col-4 border1'></div><div class='col-4 border1'></div></div>"},
            {name:'4-col', id:4, codesnap:"<div class='row'><div class='col-3 border1' id='onecol'></div><div class='col-3 border1' id='onecol'></div><div class='col-3 border1' id='onecol'></div><div class='col-3 border1' id='onecol'></div></div>"},
            {name:'6-col', id:5, codesnap:"<div class='row'><div class='col-2 border1'></div><div class='col-2 border1'></div><div class='col-2 border1'></div><div class='col-2 border1'></div><div class='col-2 border1'></div><div class='col-2 border1'></div></div>"},            
            
        ]
        this.formControls=[
            { id:1, control:'input',codesnap :'<input type="text" class="form-control">'},
            { id:2, control:'checkbox', codesnap:'<br><input type="checkbox"><label class="control-label"> your option</label></br>'},
            { id:3, control:'select', codesnap :'<select class="form-control"><option>Dropdown List</option></select>'},
            { id:4, control:'label', codesnap :'<label class="control-label" >your label</label>'},
            { id:5, control:'radio', codesnap :'<br><input type="radio"><label class="control-label"> your option</label><br>'}
        ]
      }    
      
      abc(a){
          alert(a)
      }
      insertLayout(a) {  
            const isHightlighted=document.getElementsByClassName('highLight')
            if(isHightlighted.length>0){
                isHightlighted[0].insertAdjacentHTML('beforeEnd',this.layout[a].codesnap )     
            } else {
                document.getElementById('preview').insertAdjacentHTML('beforeEnd',this.layout[a].codesnap ) 
            }
            
        
      }
      insertControl(a) {
        const isHightlighted=document.getElementsByClassName('highLight')
        if(isHightlighted.length>0){
            document.getElementsByClassName('highLight')[0].insertAdjacentHTML('beforeEnd',this.formControls[a].codesnap )
        } else {
            alert('Please select target object')
        }
        
     }

     hlSelected(a) {  
         if(a.target.classList[0]==='control-label'){
            a.target.innerHTML="<input type='text' id='editLabel' value='"+ a.target.innerText +"'>"
         }
         const isDiv=a.target.classList[1]
         const isHightlighted = document.getElementsByClassName('highLight')
         if(isDiv === 'border1') {
            const openLable=document.getElementById('editLabel')
            if(openLable!=undefined){
                var newLabel= openLable.value;
                openLable.parentElement.innerHTML=newLabel
   
            } else if(a.target.classList[2]==='highLight') {
                a.target.classList.remove('highLight')
            } else if(isHightlighted.length > 0){              
                    isHightlighted[0].classList.remove('highLight')
                    a.target.classList.add('highLight') 
             } else {
                a.target.classList.add('highLight') 
             }
            
         } 
         
     }

     handleStop(e) {
        debugger;
        console.log(e)
     }

     createControlButtons = () => {
        let button = []
        for (let i = 0; i < this.formControls.length; i++) {         
         button.push(<button key={this.formControls[i].id.toString()} type='button' className='btn btn-light m-rb1' onClick={(e) => this.insertControl(i)}>{this.formControls[i].control}</button>)         
        }
        return button
      }
      createLayoutButtons = () => {
        let Lbutton = []           
        for (let i = 0; i < this.layout.length; i++) {      // (e) => this.insertLayout(i)   
         Lbutton.push(<button key={this.layout[i].id.toString()}  type='button' className='btn btn-light m-rb1' onClick={(e) => this.insertLayout(i)}>{this.layout[i].name}</button>)        
        }
        return Lbutton
      }

    //   abClick() {
    //     document.getElementById('preview-pan').insertAdjacentHTML('beforeend',
    //     '<div class="form-group"><label for="exampleInputEmail1">Email address</label><select class="form-control"><option> Select item</option></select></div>')
    //    }
       
    render(){
       
        return (
            <div className='row'>                
                <div className='col-9' id='preview' onClick={(e) => this.hlSelected(e)}></div> 
                <div className="sidebar-container-secondary  sidebar-container-secondary-toggle">
                    <div className="sidebar">
                        <div className="docs-theming-tabs">
                        <ul className="nav-fill nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link"><div>Toolbar</div></a>
                            </li>
                            <li className="nav-item">
                                <a className="active nav-link"><div>Layouts</div></a>
                            </li>
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active">
                                <div className="p-1">
                                    <div className=" col-6 mb-4">
                                        <h5 className="mb-2">Basic Controls</h5>
                                        <div className="docs-theme-btn-container">
                                        <small>Layout</small> <br/>
                                        { this.createLayoutButtons() } <br/>
                                        <small>Form-controls</small><br/>
                                        { this.createControlButtons() }  
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="tab-pane">
                                <div className="p-3">
                                    <p>Coming Soon</p>
                                </div>
                            </div>
                        </div>
                        </div>
                        </div>
                        </div>                            
                {/* <div className='col-3'>  
                    <div className='col-12'> 
                           
                    </div>
                    <div className='col-12' >                    
                    <small>Form-control</small> <br/>
                                                
                    </div>
                   
                </div> */}

            </div>
    )
}
shouldComponentUpdate() {
    return false;
   }
  }

