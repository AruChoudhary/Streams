import React from 'react';
import {connect} from 'react-redux';
import {signIn, signOut} from '../actions';

class GoogleAuth extends React.Component{

    //This will initialize the gapi library
    componentDidMount() {
        window.gapi.load('client:auth2',()=>{
            window.gapi.client.init({
                clientId : '450530030743-i75j96078h1dg39q64rhedqlrmrmhr2c.apps.googleusercontent.com',
                scope : 'email'
            }).then(()=>{
                //Only executed once aour entire gapi library is ready to go
                this.auth = window.gapi.auth2.getAuthInstance();
                //Our goal is to find out whether or not user has signed in and print out that authentication status on the screen
                //We update our component level state with isSignedIn
                //this.setState({isSignedIn : this.auth.isSignedIn.get()})
                //Envoking the even listner with the callback function

                //updating auth state in our redux store
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    // onAuthChange = () => {
    //     this.setState({isSignedIn : this.auth.isSignedIn.get()});
    // };

    onAuthChange = (isSignedIn) => {
        if(isSignedIn){
            //we are also passing id of the user that has signed in 
            this.props.signIn(this.auth.currentUser.get().getId());
        }else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        this.auth.signIn();
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };

    renderAuthButton() {
        if(this.props.isSignedIn===null){
            return null;
        } else if(this.props.isSignedIn){
            return (
                <button onClick = {this.onSignOutClick} className="ui red google button">
                    <i className="google icon" />
                    Sign Out
                </button>
            );
        } else {
            return (
                <button onClick = {this.onSignInClick} className="ui red google button">
                    <i className="google icon" />
                    Sign In with Google
                </button>
            );
        }
    }

    render(){
        return(
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {isSignedIn : state.auth.isSignedIn};
}

export default connect(mapStateToProps, {signIn, signOut})(GoogleAuth);