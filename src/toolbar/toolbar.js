import React from 'react';

export class Toolbar extends React.Component {
    constructor(props) {
        super(props);
        this.deleteElement = this.deleteElement.bind(this)
        this.editElement=this.editElement.bind(this)
    }
    deleteElement = (event) => {
        const element = this.state.doc.querySelectorAll('.highLight')//document.getElementsByClassName('highLight');
        if (element.length > 0) {
            element[0].parentNode.removeChild(element[0]);
        } else {
            alert('please select elements')
        }
    }

    editElement = (event) => {
        document.getElementById('editBox').classList.remove('d-none');   
        const element = document.getElementsByClassName('highLight');
        const allClass= element[0].classList;
        document.getElementById('currentClass').value= allClass.value
        document.getElementById('tagName').value= element[0].tagName
         
    }

    render() {
        return (
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
        )
    }

    shouldComponentUpdate() {
        return false;
    }
}