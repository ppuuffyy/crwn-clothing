import React, {useState} from 'react';
import FormInput from '../form-input/form-input.component.jsx';
import CustomButton from '../custom-button/custom-button.component';
import {auth, signInWithGoogle} from '../../firebase/firebase.util';

import './sign-in.styles.scss';

const SignIn = () => {
 //   const [email, setEmail] = useState('');
 //   const [password, setPassword] = useState('');
    const [userCredentials, setCredentials] = useState({email: '', password: ''});
    const {email, password} = userCredentials;

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await auth.signInWithEmailAndPassword(email, password);
            this.setState({email: '', password: ''});

        }catch(error){
            console.log(error);
        }
    }

    const handleChange = event => {
        const {value, name} = event.target;
        setCredentials({...userCredentials, [name]: value});  // a name valtozoban megkapom hogy a state melyik valtozojaba 
                                        // kell betolteni a value erteket. ezt a meghivasnal maga az
                                        //input tolti fel azzal a name ertekkel amit ott definialtam
    }


        return (
            <div className='sign-in'>
                <h2 className='title'> I already have an account</h2>
                <span>Sign in with your email and password</span>

                <form onSubmit={handleSubmit}>
                    <FormInput 
                        name="email" 
                        type="email" 
                        label="Email"
                        value={email} 
                        handleChange={handleChange}
                        required />
                    
                    <FormInput 
                        name="password" 
                        type="password" 
                        label="Password"
                        value={password} 
                        handleChange={handleChange}
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

export default SignIn;