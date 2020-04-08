import React from 'react';
import FormInput from '../form-input/form-input.component.jsx';
import CustomButton from '../custom-button/custom-button.component';
import {signInWithGoogle} from '../../firebase/firebase.util';

import './sign-in.styles.scss';

class SignIn extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleSubmit = event => {
        event.preventDefault();
        this.setState({email: '', password: ''});

    }

    handleChange = event => {
        const {value, name} = event.target;
        this.setState({[name]: value});  // a name valtozoban megkapom hogy a state melyik valtozojaba 
                                        // kell betolteni a value erteket. ezt a meghivasnal maga az
                                        //input tolti fel azzal a name ertekkel amit ott definialtam
    }

    render() {
        return (
            <div className='sign-in'>
                <h2 className='title'> I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={this.handleSubmit}>
                    <FormInput 
                        name="email" 
                        type="email" 
                        label="Email"
                        value={this.state.email} 
                        handleChange={this.handleChange}
                        required />
                    
                    <FormInput 
                        name="password" 
                        type="password" 
                        label="Password"
                        value={this.state.password} 
                        handleChange={this.handleChange}
                        required />
                    <div className='buttons'>
                        <CustomButton type='submit'> Sign in </CustomButton>
                        <CustomButton onClick={signInWithGoogle} isGoogleSignIn={true}>
                            {' '}Sign in with Google{' '}
                        </CustomButton>
                    </div>
                </form>
            </div>
        );

    }

}

export default SignIn;