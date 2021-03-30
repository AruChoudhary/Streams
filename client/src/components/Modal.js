import React from 'react';
import ReactDOM from 'react-dom';

//anytime we render this, rather then rendering to the direct child of modal component, 
// it will be rendered inside the div with id modal.
const Modal = props => {
    return ReactDOM.createPortal(
        <div 
            onClick={props.onDismiss} 
            className="ui dimmer modals visible active"
        >
            <div 
                onClick={(e) => e.stopPropagation()} 
                className="ui standard modal visible active"
            >
                <div className="header">{props.title}</div>
                <div className="content">
                    {props.content}
                </div>
                <div className="actions">
                    {props.actions}
                </div>
            </div>
        </div>,
        document.querySelector('#modal')   //reference to the div with id of modal in index.html
    );
};

export default Modal;
