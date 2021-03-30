import React from 'react';
import {Field, reduxForm} from 'redux-form';
//reduxForm function has same functionality as connect function

//we want class based component to organise the code because eventually we want helper methods.
class StreamForm extends React.Component {

    renderError({error, touched}) {
        if(touched && error) {
            return (
                <div className = "ui error message">
                    <div className = "header">
                        {error}
                    </div>
                </div>
            );
        }
    }

    // renderInput (formProps) {
    //     // return (
    //     //     <input 
    //     //         onChange={formProps.input.onChange} 
    //     //         value={formProps.input.value} 
    //     //     />
    //     // );
    //     //-----------OR--------

    //     return <input {...formProps.input} />; //It will take all the key values pair and add them as properties ti the input handler.
    // }

    //...........OR............

    //since 'this' wont be defined inside renderInput hance we have to change it into arrow function
    renderInput = ({input, label, meta}) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" />
                {this.renderError(meta)}
            </div>
        ); 
    }

    //handleSubmit is a callback function provided by redux form and we have to call this any time we want to submit that form.
    //this function is in the props.
    onSubmit = (formValues) => {
        // console.log(formValues);//whatever values we have entered in the form
        this.props.onSubmit(formValues);
    }

    render() {
        // console.log(this.props); //tremendous number of props object thanks to redux from
        return (
            <form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
                <Field name="title" component={this.renderInput} label="Enter Title: " />
                <Field name="description" component={this.renderInput} label="Enter Description: " />
                <button className="ui button primary">Submit</button>
            </form>
        );
    }   
}

//validation is going to run the instant the form is rendered on the screen or any time the user interacts with the form
// But we only want to show error after the user attempts to submit the form.
const validate = (formValues) => {
    const errors = {};
    if(!formValues.title) {
        //only ran if user did not enter a title
        errors.title = 'You must enter a title!';
    }
    if(!formValues.description) {
        errors.description = 'You must enter a description!';
    }
    return errors;
};

export default reduxForm({
    form : 'streamForm', //Name of the form is generally whatever purpose of the form is. Redux form will store all the values of the form on a key with this name inside of the form reducer
    validate : validate
})(StreamForm);

