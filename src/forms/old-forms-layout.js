import React from 'react';

import axios from 'axios'

export class FormLayout extends React.Component {  
    constructor(props) {
        super(props);
        this.state = { frameSrc:'/snippet/welcome/index.html',doc:null};
        this.insertLayout = this.insertLayout.bind(this)
        this.handleStop=this.handleStop.bind(this)
        this.hlSelected=this.hlSelected.bind(this)
        this.addControlToPreview=this.addControlToPreview.bind(this)
        this.deleteElement=this.deleteElement.bind(this)
        this.onFrameLoad = this.onFrameLoad.bind(this)
        
        this.layout= [
            {name:'Row', id:1, path:"/snippet/row/index.html"},            
            {name:'Col', id:2, path:"/snippet/collumn/index.html"},            
            {name:'Card', id:3, path:"/snippet/card/index.html"},
            {name:'Form', id:4, path:"/snippet/form/index.html"}            
        ]
        this.formControls=[                       
            { id:2, path:"/snippet/form-controls/checkbox/index.html", control:'Checkbox', controlType:'form'},
            { id:3, path:"/snippet/form-controls/dropdown/index.html", control:'Select', controlType:'form'},
            { id:4, path:"/snippet/form-controls/password/index.html", control:'Password', controlType:'form'},
            { id:5, path:"/snippet/form-controls/radio/index.html", control:'Radio', controlType:'form'},
            { id:6, path:"/snippet/form-controls/text-area/index.html", control:'Text-area', controlType:'form'},
            { id:7, path:"/snippet/form-controls/textbox/index.html", control:'Textbox', controlType:'form'}
            // { id:8, path:"/snippet/table/index.html", control:'Table', controlType:'all'}
        ]
        this.appShells=[
            { id:1, path:"/snippet/app-shells/compact-navbar-with-bottom-navigation/html/index.html", control:'Compact-Btm-Nav', controlType:'all'},
            { id:2, path:"/snippet/app-shells/navbar-with-bottom-navigation/html/index.html", control:'Btm-Nav', controlType:'all'},
            { id:3, path:"/snippet/app-shells/navbar-with-bottom-navigation-and-secondary-sidebar/html/index.html", control:'btm-side-nav', controlType:'form'}
        ]
      } 

      onFrameLoad (e) {        
          const doc=e.target.contentWindow.document          
          doc.addEventListener('click',this.hlSelected)
       this.setState({
        doc
       }) 
       
      }

      insertAppShell(a){        
          document.getElementById('Myiframe').src=a;
        // this.setState({
        //  frameSrc:a
        // })   
        // console.log(this.state.frameSrc)    
      }

      componentDidMount(){
          this.setState({
              frameSrc:'about:blank'
          })
      }

      insertLayout(a) {            
        const isAppShell=this.state.doc.querySelectorAll('#demo-content')
        const isHightlighted=this.state.doc.querySelectorAll('.highLight')
        if(isAppShell.length>0){
            axios
            .get(process.env.PUBLIC_URL + this.layout[a].path, { responseType: 'text' })
            .then((response) => {
              const html = response.data               
              if(isHightlighted.length>0){
                isHightlighted[0].insertAdjacentHTML('beforeEnd',html )     
            } else {                
                isAppShell[0].insertAdjacentHTML('beforeEnd',html)
                isAppShell[0].classList.add('w-100')
            } 
            })
        }else{
            alert('Select app shell before adding layout')
        }
      }

    //   insertLayout(a) {  
    //     const isHightlighted=document.getElementsByClassName('highLight')
    //     axios
    //     .get(process.env.PUBLIC_URL + this.layout[a].path, { responseType: 'text' })
    //     .then((response) => {
    //       const html = response.data               
    //       if(isHightlighted.length>0){
    //         isHightlighted[0].insertAdjacentHTML('beforeEnd',html )     
    //     } else {
    //         document.getElementById('preview').insertAdjacentHTML('beforeEnd',html ) 
    //     }
    //     })
    //   }

      insertControl(a) {
        const isHightlighted=this.state.doc.querySelectorAll('.highLight')
        const temp=a
        if(isHightlighted.length>0 ){
            axios
            .get(process.env.PUBLIC_URL + this.formControls[a].path, { responseType: 'text' })
            .then((response) => {
              const html = response.data               
              this.addControlToPreview(html,temp)
            })            
        } else {
            alert('Please select target object')
        }
        
     }
     addControlToPreview(html,a){
        const isHightlighted=this.state.doc.querySelectorAll('.highLight')
        if(isHightlighted.length>0 && this.formControls[a].controlType==='all'){
            this.state.doc.querySelectorAll('.highLight')[0].insertAdjacentHTML('beforeEnd',html )        
        } else if(isHightlighted.length>0 && this.formControls[a].controlType==='form') {
            if(isHightlighted[0].classList[0]==='form'){
                this.state.doc.querySelectorAll('.highLight')[0].insertAdjacentHTML('beforeEnd',html )
            } else {
                alert("Please insert form before using form controls")
            }
        } else {
            alert('Please select target object')
        }
     }

     deleteElement = (event) => {
        var element = this.state.doc.querySelectorAll('.highLight')
        if(element.length>0){
            element[0].parentNode.removeChild(element[0]);
        } else{
            alert('please select elements')
        }       
      }

     

    editElement = (event) => {
        document.getElementById('editBox').classList.remove('d-none');   
        const element = this.state.doc.querySelectorAll('.highLight')
        const allClass= element[0].classList;
        document.getElementById('currentClass').value= allClass.value
        document.getElementById('tagName').value= element[0].tagName
         
    }
    //   hlSelected(a) {  
    //     if(a.target.classList[0]==='control-label'){
    //        a.target.innerHTML="<input type='text' class='editLabel' value='"+ a.target.innerText +"'>"
    //     } else if(a.target.classList[0]==='help-block'){
    //         if(document.getElementsByClassName('highLight').length>0){
    //             document.getElementsByClassName('highLight')[0].classList.remove('highLight')
    //         }
    //        a.target.classList.add('highLight') 
    //     } 
    //    //  else if (a.target.tagName ==='TD' || a.target.tagName==='TH'){
    //    //     const otherEditable = document.getElementsByClassName('editLabel')
    //    //     if(otherEditable.length>0){
    //    //         var newLabel= otherEditable[0].value;
    //    //         otherEditable[0].parentElement.innerHTML=newLabel
    //    //     }
    //    //    a.target.innerHTML="<input type='text' class='editLabel' value='"+ a.target.innerText +"'>"
    //    //  } 
    //     const isDiv=a.target.classList[1]  
    //     const isForm=a.target.classList[0]      
    //     const isHightlighted = document.getElementsByClassName('highLight')
    //     const openLable=document.getElementsByClassName('editLabel')
    //     if(isDiv === 'border1' || isForm ==='form') {           
    //        if(openLable.length>0){
    //            for (let i = 0; i < openLable.length; i++) {         
    //                var newLabel= openLable[i].value;
    //                openLable[i].parentElement.innerHTML=newLabel  
    //               }
               
    //        } else if(a.target.classList[3]==='highLight') {
    //            a.target.classList.remove('highLight')
    //        } else if(isHightlighted.length > 0){              
    //                isHightlighted[0].classList.remove('highLight')
    //                a.target.classList.add('highLight') 
    //         } else {
    //            a.target.classList.add('highLight') 
    //         }
           
    //     } 
        
    // } 
     hlSelected(a) {  
         if(a.target.classList[0]==='control-label'){
            a.target.innerHTML="<input type='text' class='editLabel' value='"+ a.target.innerText +"'>"
         } else if(a.target.classList[0]==='help-block'){
             if(this.state.doc.querySelectorAll('.highLight')[0].length>0){
                this.state.doc.querySelectorAll('.highLight')[0].classList.remove('highLight')
             }
            a.target.classList.add('highLight') 
         } 
        //  else if (a.target.tagName ==='TD' || a.target.tagName==='TH'){
        //     const otherEditable = document.getElementsByClassName('editLabel')
        //     if(otherEditable.length>0){
        //         var newLabel= otherEditable[0].value;
        //         otherEditable[0].parentElement.innerHTML=newLabel
        //     }
        //    a.target.innerHTML="<input type='text' class='editLabel' value='"+ a.target.innerText +"'>"
        //  } 
         const isDiv=a.target.classList[1]  
         const isForm=a.target.classList[0]      
         const isHightlighted = this.state.doc.querySelectorAll('.highLight')
         const openLable=this.state.doc.querySelectorAll('.editLabel')
         if(isDiv === 'border1' || isForm ==='form') {           
            if(openLable.length>0){
                for (let i = 0; i < openLable.length; i++) {         
                    var newLabel= openLable[i].value;
                    openLable[i].parentElement.innerHTML=newLabel  
                   }
                
            } else if(a.target.classList[3]==='highLight') {
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

     createAppShellButton = () => {
        let button = []
        for (let i = 0; i < this.appShells.length; i++) {         
         button.push(<button key={this.appShells[i].id.toString()} type='button' className='btn btn-light m-rb1' onClick={(e) => this.insertAppShell(this.appShells[i].path)}>{this.appShells[i].control}</button>)         
        }
        return button
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
    render(){       
        return (
            <React.Fragment>
            <div className="jumbotron w-100 jumbotron-fluid bg-white text-dark border-bottom px-2 pb-2 mb-0">
           
            <div className='ml-auto icon-bar d-none d-lg-flex'>
                <a className='d-flex mr-2 align-items-center' role='button' onClick={this.deleteElement}>
                <svg className="icon bg-danger" width="20" height="20">
                <use xlinkHref="#delete" href="#delete"></use>
              </svg> </a>
                <a className='d-flex mr-2 align-items-center' role='button' onClick={this.editElement}>  
                <svg className="icon bg-info" width="20" height="20">
                <use xlinkHref="#edit_property" href="#edit_property"></use>
              </svg> </a> 
              <a className='d-flex mr-2 align-items-center' role='button' onClick={this.editElement}>  
                <svg className="icon bg-dark" width="20" height="20">
                <use xlinkHref="#move" href="#move"></use>
              </svg> </a> 
              <a className='d-flex mr-2 align-items-center' role='button' onClick={this.editElement}>  
                <svg className="icon" width="20" height="20">
                <use xlinkHref="#sort" href="#sort"></use>
              </svg> </a> 
              <div id='editBox' className='card w-50 d-none'>
                <div className='row'>
                    <div className='col-3'>
                        <label>Classes</label>
                        <input type='text' value='' id='currentClass'/>
                    </div>
                    <div className='col-3'>
                        <label>TagName</label>
                        <input type='text' value='' id='tagName'/>
                    </div>
                    <div className='col-2'>
                        <label>Hide</label><br />
                        <input type='checkbox' value='' id='hide'/>
                    </div>
                    <div className='col-3'>
                        <label>Edit</label><br />
                        <input type='text' value='' id='tagName2'/>
                    </div>
                </div>
                
              </div>
            </div>    
            
            </div>  
            <section>
                <div className="main-inner p-4">                         
                <div className='row'>  
                                            
                <div className='col-9' id='preview' onClick={(e) => this.hlSelected(e)} onKeyPress={this.handleKeyPress}>
               
                <iframe className='embed-responsive-item d-block ml-auto mr-auto' src={this.state.frameSrc} id='Myiframe' frameBorder='0'
          width='100%' height='500'  onLoad={this.onFrameLoad} />
                </div> 
                <div className="sidebar-container-secondary  sidebar-container-secondary-toggle">
                    <div className="sidebar">
                        <div className="docs-theming-tabs">
                        <ul className="nav-fill nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link"><div>Toolbar</div></a>
                            </li> 
                            <li className="nav-item">
                                <a className="nav-link"><div>App Shells</div></a>
                            </li>                             
                        </ul>
                        <div className="tab-content">
                            <div className="tab-pane active">
                                <div className="p-1">
                                    <div className=" col-6 mb-4">
                                        <h5 className="mb-2">Basic Controls</h5>
                                        <div className="docs-theme-btn-container">  
                                        <small>Application Shells</small><br />
                                        { this.createAppShellButton() }
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

            </div>
                </div>
            </section>
            </React.Fragment>
    )
}
shouldComponentUpdate() {
    return false;
   }
  }

