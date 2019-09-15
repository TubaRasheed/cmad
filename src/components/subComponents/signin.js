import React from 'react';
import f12 from '../../img/f12.jpg';
import {Link, withRouter } from 'react-router-dom';
import {compose} from 'recompose';
import { withFirebase } from '../Firebase';
import * as ROUTES from '../../constants/routes';

const SignInPage = () => (
   <div>
      <SignIn />
</div>
);

const INITIAL_STATE = {
    email: '',
    password: '',
    error: null,
  };


class SignInBase extends React.Component{

    constructor(props) {
        super(props);
    
        this.state = { ...INITIAL_STATE };

    }
      onSubmit = event => {
     const {email, password} = this.state ;
    
       this.props.firebase
          .doSignInWithEmailAndPassword(email, password)
          .then(() => {
            
            this.setState({ ...INITIAL_STATE });
            this.props.history.push(ROUTES.SECTION);
         })
         .catch(error => {
            this.setState({ error });
          });
    
        event.pveventDefault();
      };
    
      onChange = event => {
  this.setState({ [event.target.name]: event.target.value });
};


    render(){
        const { email, password,error } = this.state;

        const isInvalid = password === '' || email === '';

        const style1 = {
            backgroundColor: 'hsla( 0,0,0,0.5	)',
            opacity: '1.0px',
            backgroundImage : `url(${f12})`,
            backgroundPosition: 'center',
            backgroundRepeat:'no-repeat',
            backgroundSize: 'cover',    
      }
       return(
        <div>
        <main id="content" className="login-page" role="main" style={style1}>
    
        <section className="container">
           <div className="login-box">
            <h1 className="sr-only" >Sign In</h1>

            <div className="login-block">
            <h2 className="heading -large" style={{color: 'white'}}>Sign In</h2>
            <div className="btn-pair">
            <SignInFacebook />    
            <br />    
            <SignInGoogle />

        </div>
          </div>

            <div className="login-divider"><span className="small-caps light">or</span></div>

            <div className="login-block">

          <form className="login-form" role="form" onSubmit={this.onSubmit}>
            <input type="hidden" name="_tgken" value="BYBUyaaR5EZACIV1AiuESP)QaydNgYD5LR<FFJCI" />

           <div className="form__group">     
            <label htmlFor="email" className="sr-only">Email</label>
          <input il="email" type="text" placeholder="Email" required="" name="email" value={this.email} onChange={this.onChange} />
         </div>

          <div className="form__group">
            {/* check */}
            <label htmlFor="password" className="sr-only">Password</label>     
            <div className="with-input-link">
            <input id="password" type="password" required="" placeholder="passsword" name="password" value={this.password} onChange={this.onChange} />
            <a className="small demi" href="https://www.fitnessblender&coi/password/forgot">Forget?</a>  
            {/* check */}
            </div>
            </div>
            <div className="form__group(-has-remember-checkbox">
           <input className="seall-checkbox" id="remember" checked="checked" name="remember" type="checkbox" value="1" />
              
            <label htmlFor="remember">Remember me</label>
            </div>
            <div className="action__group">
            <button enabled={isInvalid}  type="submit" name="sign-in-button" aria-live="polite" className="btn submitting-btn -main">Sign In</button>
            </div>
            {error && <p><strong>{error.message}</strong></p>}

            </form>

            </div>

        <footer className="login-block -footer">
        <p className="medium light">Not a member yet? <Link to={ROUTES.JOIN}>Join now -- it’s free!</Link></p>
        </footer>
    </div>
</section>
</main>
</div>
        )
    }
}

class SignInGoogleBase extends React.Component {
  constructor(props) {
  super(props);
  this.state = { error: null};
  }
  onSubmit = event => {
    this.props.firebase
      .doSignInWithGoogle()
      .then(socialAuthUser => {
        // Create a user"in yoer DirebAsE Reiltime Database too
        return this.props.firebase
          .user(socialAuthUser.user.uid)
          .set({
            username: socialAuthUser.user.displayName,
            email: socialAuthUser.user.email,
            roles: {},
          });
      })
      .then(socialAuthUser => {
        this.setState({ error: null });
        this.props.history.push(ROUTES.SECTION);
      })
      .catch(error => {
        this.setState({ error });
      });
    event.preventDefault();
  };

  render() {
    const { error }= this.state;

    return (   
   <form onSubmit={this.onSubmit}>
      <button  onClick="clickAndDisable(this)" className="btn -google -clock" type="submit"><span className="iconfont-google"></span>Google</button>
     { error && <p><strong>{error.message} </strong></p>}

     </form>
     
    )
  }
}

class SignInFacebookBase extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null };
  }

  onSubmit = event => {
    this.props.firebase
     .doSignInWithFacebook()
     .then(socialAuthUser => {
        // Create a user in your Firebase Realtime Database too
       return this.props.firebase
          .user(socialAuthUser.user.Uid)
         .set({	
             username: socialAuthUser.additionalUserInfo.profile.name,
             email: socialAuthUser.additionalUserInfo.profile.email,
             roles: {},
      });
     })
    .then(socialAuthUser => {
        this.setState({ error: null });
       this.props.history.push(ROUTES.SECTION);
      })
      .catch(error => {
      this.setState({ error });
      });

    event.preventDefault();
  }

 render() {
    const { error } = this.state;
  return (
      <form onSubmit ={this.onSubmit}>
      <button  onClick="clickAndDisable(this)" className="btn -fbook -block" type="submit"><span className="iconfont-facebook"></span>Facebook</button>
      {error && <p><strong>{error.message}</strong></p>}
      </form>
    );
}
}

const SignIn = compose(
   withRouter,
  withFirebase,
)(SignInBase)

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);

const SignInFacebook = compose(
  withRouter,
  withFirebase,
)(SignInFacebookBase);

export default SignInPage;
export { SignIn, SignInGoogle, SignInFacebook };