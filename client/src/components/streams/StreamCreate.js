import React from 'react';
import {connect} from 'react-redux';
import {createStream} from '../../actions';
import StreamForm from './StreamForm';

//we want class based component to organise the code because eventually we want helper methods.
class StreamCreate extends React.Component {

    //handleSubmit is a callback function provided by redux form and we have to call this any time we want to submit that form.
    //this function is in the props.
    onSubmit = (formValues) => {
        // console.log(formValues);//whatever values we have entered in the form
        this.props.createStream(formValues);
    }

    render() {
        return (
            <div>
                <h3>Create a stream!</h3>
                <StreamForm onSubmit={this.onSubmit} />
            </div>
        );
    }   
}

export default connect(null, {createStream})(StreamCreate);