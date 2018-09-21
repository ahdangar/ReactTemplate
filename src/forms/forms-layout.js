import React from 'react'
import axios from 'axios'
import Draggable from 'react-draggable'
import '../App.css'
// import { read } from 'fs';

export class FormLayout extends React.Component {  
    constructor(props) {
        super(props)
        this.insertLayout = this.insertLayout.bind(this)
        this.highlightlSelected=this.highlightlSelected.bind(this)
        this.addControlToPreview=this.addControlToPreview.bind(this)
        this.deleteElement=this.deleteElement.bind(this)
        this.onFrameLoad = this.onFrameLoad.bind(this)
        this.closeProperty=this.closeProperty.bind(this)
        this.getData=this.getData.bind(this)
        this.state = {
            frameSrc:'/snippet/welcome/index.html',
            doc:null,
            ready: false,
            viewData: null,
            layoutData:null,
            controlData:null,
            filteredData: null,
            query: null
          }
      }
    
    loadData () {
        return axios
          .get('/static/app-shells.json')
          .then((response) => {
            return response.data
          })
      }  

    loadLayout () {
        return axios
          .get('/static/layouts.json')
          .then((response) => {
            return response.data
          })
      }  

    loadControls () {
        return axios
          .get('/static/controls.json')
          .then((response) => {
            return response.data
          })
      }  

    onFrameLoad (e) {        
          const doc=e.target.contentWindow.document          
          doc.addEventListener('click',this.highlightlSelected)
       this.setState({
        doc
       }) 
    }

    insertAppShell(a){ 
        this.setState({
            frameSrc:a.path.replace('/public','')
        })      
    }

    insertLayout(item) {            
        const isAppShell=this.state.doc.querySelectorAll('#demo-content')
        const isHightlighted=this.state.doc.querySelectorAll('.highLight')
        if(isAppShell.length>0){
            axios
            .get(process.env.PUBLIC_URL + item.path.replace('/public',''), { responseType: 'text' })
            .then((response) => {
              const html = response.data               
              if(isHightlighted.length>0){
                isHightlighted[0].insertAdjacentHTML('beforeEnd',html )     
            } else {  
                if(isAppShell[0].innerText.indexOf('Page content goes here')!== -1){
                    isAppShell[0].innerText=''
                }                
                isAppShell[0].insertAdjacentHTML('beforeEnd',html)
                isAppShell[0].classList.add('w-100')
            } 
            })
        }else{
            alert('Select app shell before adding layout')
        }
      }

    insertControl(item) {
        const isHightlighted=this.state.doc.querySelectorAll('.highLight')
        const temp=item
        if(isHightlighted.length>0 ){
            axios
            .get(process.env.PUBLIC_URL + item.path.replace('/public',''), { responseType: 'text' })
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
        if(isHightlighted.length>0 && a.type==='all'){
            this.state.doc.querySelectorAll('.highLight')[0].insertAdjacentHTML('beforeEnd',html )        
        } else if(isHightlighted.length>0 && a.type ==='form') {
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
        const element = this.state.doc.querySelectorAll('.highLight')
        const allClass= element[0].classList;
        document.getElementById('currentClass').value= allClass.value
        document.getElementById('tagName').value= element[0].tagName         
    }

    closeProperty(){
        document.querySelectorAll('#editBox')[0].classList.toggle('d-none')
    }
   
    highlightlSelected(a) {       
        if(a.target.classList[0]==='help-block'){
             if(this.state.doc.querySelectorAll('.highLight')[0].length>0){
                this.state.doc.querySelectorAll('.highLight')[0].classList.remove('highLight')
             }
            a.target.classList.add('highLight')
            this.editElement(a)
        } 
         const isDiv=a.target.classList[1]  
         const isForm=a.target.classList[0]      
         const isHightlighted = this.state.doc.querySelectorAll('.highLight')        
         if(isDiv === 'border1' || isForm ==='form') {           
            if(a.target.classList[2]==='highLight') {
                a.target.classList.remove('highLight')
            } else if(isHightlighted.length > 0){              
                    isHightlighted[0].classList.remove('highLight')
                    a.target.classList.add('highLight') 
                    this.editElement(a)
            } else {
                a.target.classList.add('highLight')
                this.editElement(a)
            }            
        }          
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
    getData () {
        return this.state.viewData
      }

    componentDidMount () {
        this.loadData().then((d) => {          
          this.setState({
            viewData:d
          })
          this.loadLayout().then((f)=> {
              this.setState({
                  layoutData:f
              })
            this.loadControls().then((g) => {
                this.setState({
                   controlData:g,
                   ready:true
                })
            })
          })
         
        })
      }

    render(){       
        if (this.state.ready) {
        return (           
            <React.Fragment>
                <div className="jumbotron w-100 jumbotron-fluid bg-white text-dark border-bottom px-2 pb-2 mb-0">           
                    <div className='ml-auto icon-bar d-lg-flex'>
                        <a className='d-flex mr-2 align-items-center' role='button' onClick={this.deleteElement}>
                            <svg className="icon bg-danger" width="20" height="20">
                                <use xlinkHref="#delete" href="#delete"></use>
                            </svg> 
                        </a>
                        <a className='d-flex mr-2 align-items-center' role='button' onClick={this.closeProperty}>  
                            <svg className="icon bg-info" width="20" height="20">
                                <use xlinkHref="#edit_property" href="#edit_property"></use>
                            </svg> 
                        </a> 
                        <a className='d-flex mr-2 align-items-center' role='button' onClick={this.editElement}>  
                            <svg className="icon bg-dark" width="20" height="20">
                                <use xlinkHref="#move" href="#move"></use>
                            </svg> 
                        </a> 
                        <a className='d-flex mr-2 align-items-center' role='button' onClick={this.editElement}>  
                            <svg className="icon" width="20" height="20">
                                <use xlinkHref="#sort" href="#sort"></use>
                            </svg> 
                        </a> 
                        <Draggable defaultPosition={{x: 0, y: 0}}>
                        <div id='editBox' className='card w-50'>
                            <div className='card-header pl-1 pr-1 pt-0 pb-0'>Property<button type="button" onClick={this.closeProperty} className="close" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>
                            <div className='card-body p-1'>
                                <div className='row'>
                                    <div className='col-lg-3 '>
                                        <label>Classes</label>
                                        <input className='input-sm w-100' type='text' value='' id='currentClass'/>
                                    </div>
                                    <div className='col-lg-3'>
                                        <label>TagName</label>
                                        <input className='input-sm w-75'type='text' value='' id='tagName'/>
                                    </div>
                                    <div className='col-lg-2'>
                                        <label>Hide</label><br />
                                        <input type='checkbox' value='' id='hide'/>
                                    </div>
                                    <div className='col-lg-3'>
                                        <label>Href</label><br />
                                        <input className='input-sm w-100' type='text' value='' id='tagName2'/>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </Draggable>
                    </div>            
                </div>  
                <section>
                <div className="main-inner p-4">                         
                    <div className='row'>                                            
                        <div className='col-lg-9 p-0 order-lg-1 bg-secondary border template-builder-preview' id='preview' onClick={(e) => this.highlightlSelected(e)} onKeyPress={this.handleKeyPress}>
                            <iframe className='embed-responsive-item d-block ml-auto mr-auto' src={this.state.frameSrc} frameBorder='0'
                            width='100%' height='800' title='test' style={this.state.frameStyle} onLoad={this.onFrameLoad} id='Myiframe'/>
                           
                        </div>
                        <div className="sidebar-container-secondary p-1 sidebar-container-secondary-toggle">
                            <div className="sidebar">
                                <h5 className='mb-0'>Application Shells</h5><br />
                                
                                {this.getData().map((item, i) => (
                                    <button key={i} type='button' className='btn btn-light m-rb1' onClick={(e) => this.insertAppShell(item)} title={item.name}>
                                    <svg className="icon" width="20" height="20">
                                        <use xlinkHref="#web_design" href="#web_design"></use>
                                    </svg> 
                                    </button>
                                    ))}
                                <h5 className='mb-0'>Layout</h5> <br/>
                                {this.state.layoutData.map((item, i) => (
                                    <button key={i} type='button' className='btn btn-light m-rb1' onClick={(e) => this.insertLayout(item)} title={item.name}>
                                    <svg className="icon" width="20" height="20">
                                        <use xlinkHref= {'#'+ item.name} href={'#'+item.name}></use>
                                    </svg> 
                                    </button>
                                    ))}
                                <h5 className='mb-0'>Form-controls</h5><br/>
                               
                                                       
                                     {this.state.controlData.map((item, i) => (
                                    <button key={i} type='button' className='btn btn-light m-rb1' onClick={(e) => this.insertControl(item)} title={item.name}>
                                    <svg className="icon" width="20" height="20">
                                        <use xlinkHref= {'#'+ item.name} href={'#'+item.name}></use>
                                    </svg> 
                                    </button>
                                    ))}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            </React.Fragment>
    )
}
else {
    return(<div>Loading</div>)
}
}
shouldComponentUpdate() {
    return true;
   }
  }

