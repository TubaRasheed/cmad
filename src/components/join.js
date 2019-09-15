import React from 'react';
import f12 from './../img/f12.jpg';
import { FirebaseContext } from './Firebase';
import { withFirebase } from './Firebase';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'recompose';
import * as ROUTES from './../constants/routes';



const SignUpPage = () => (
  <div>
    <FirebaseContext.Consumer>
      {firebase => <SignUpForm firebase={firebase} />}
    </FirebaseContext.Consumer>
  </div>
);


const INITIAL_STATE = {
  username: '',
  email: '',
  passwordOne: '',
  passwordTwo: '',
  error: null,
};


class JoinBase extends React.Component{
  constructor(props){
    super(props);
    this.state = { ...INITIAL_STATE };

  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };



  onSubmit = event => {
    const { username, email, passwordOne } = this.state;

    this.props.firebase
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        // Create a user in your Firebase realtime database
        return this.props.firebase
          .user(authUser.user.uid)
          .set({
            username,
            email,
          });
      })
      .then(authUser => {
        this.setState({ ...INITIAL_STATE });
        this.props.history.push(ROUTES.SECTION);
      })
      .catch(error => {
        this.setState({ error });
      });

    event.preventDefault();
  };
    
    render(){

        const style1 = {
            backgroundImage : `url(${f12})`,
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',    
        }
        const {
          username,
          email,
          passwordOne,
          passwordTwo,
          error,
        } = this.state;

        const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === '' ||
      email === '' ||
      username === '';
  
        return(
            <div>
                <main id="content" className="login-page" role="main" style={style1}>
    
                <section className="container" >
                <div className="login-box">
                <h1 className="sr-only">Join</h1>

                <div className="login-block">
                <h1 className="heading -large" style={{color: "white"}}>Join</h1>
                <div className="btn-pair">
                <SignInFacebook />    
                <br />       
                <SignInGoogle />

                </div>
                </div>

                <div className="login-divider"><span className="small-caps light">or</span></div>

                <div className="login-block">
        <form className="login-form" id="registration-form" role="form" onSubmit= {this.onSubmit}>
        
                <input type="hidden" name="_token" value="BYBUyaaR4EZACIV1AiuESP9QaydNgYDuMR4FFJCI" />
                <div id="vue-registration-form" className="registration"><div className="form__main">
                <div className="form__group is_text">
                <label htmlFor="first_name" className="sr-only">UserName</label> 
                <input id="first_name" name="first_name" type="text" placeholder="User Name" required="required" data-vv-as="First Name" value={this.username} className="" 
                data-vv-scope="__global__" aria-required="true" aria-invalid="false" onChange={this.onChange}  />
                </div> 
                <div className="form__group is_text">
                <label htmlFor="email" className="sr-only">Email</label> <input id="email" name="email" type="email" placeholder="E-Mail Address" required="required" 
                data-vv-as="Email" data-vv-validate-on="blur" value={this.email} className="" data-vv-scope="__global__" aria-required="true" aria-invalid="false" onChange={this.onChange} /> 
                <div id="mailcheckMessage" className="mailcheck-status">
                Did you mean <span>false</span>?
                </div></div>
                <div className="form__group is_text"><label htmlFor="password" className="sr-only">Password</label> 
                <input id="password" name="passwordOne" type="password" placeholder="Password" required="required" data-vv-as="Password" value={this.passwordOne} className="" 
                data-vv-scope="__global__" aria-required="true" aria-invalid="false" onChange={this.onChange} /> </div> <div className="form__group is_text">
                <label htmlFor="password_confirmation" className="sr-only">Confirm Password</label> 
                <input id="password_confirmation" name="passwordTwo" 
                type="password" placeholder="Confirm Password" required="required" data-vv-as="Confirm Password" value={this.passwordTwo} className="" 
                data-vv-scope="__global__" 
                aria-required="false" aria-invalid="false" onChange={this.onChange} /></div></div> 
                <aside className="form__sidebar"><h3>Key Benefits:</h3> 
                <ul className="check-list"><li><span className="iconfont-check-small"></span>Customizable fitness calendar</li> 
                <li><span className="iconfont-check-small"></span>Daily progress tracking</li> <li><span className="iconfont-check-small">
                </span>Favorite workout videos</li>
                <li><span className="iconfont-check-small"></span>24/7 community support</li> 
                <li><span className="iconfont-check-small"></span>Helpful health, nutrition and fitness information</li> 
                <li><span className="iconfont-check-small"></span>and much, much more…</li></ul></aside> 
                <div id="recaptcha-div" className="form__group -has-label recap-div"><div data-callback="onReCaptchaSuccess" 
                id="buzzNoCaptchaId_a31f7deb2c011881c8651b05234f6bb3" data-sitekey="6LcKFQ8UAAAAAGMbPOo5v6IqNqGUjyLj8F9NQWeg" className="g-recaptcha ">
                <div style={{width: "304px", height: "78px"}}><div><iframe 
                src="https://www.google.com/recaptcha/api2/anchor?ar=1&amp;k=6LcKFQ8UAAAAAGMbPOo5v6IqNqGUjyLj8F9NQWeg&amp;co=aHR0cHM6Ly93d3cuZml0bmVzc2JsZW5kZXIuY29tOjQ0Mw..&amp;hl=en&amp;v=v1560753160450&amp;size=normal&amp;cb=tonom6u4wtrd" 
                width="304" height="78" role="presentation" name="a-wzttz0iflufw" frameBorder="0" 
                scrolling="no" sandbox="allow-forms allow-popups allow-same-origin allow-scripts allow-top-navigation allow-modals allow-popups-to-escape-sandbox">
                </iframe></div>
                <textarea id="g-recaptcha-response" name="g-recaptcha-response" className="g-recaptcha-response" 
                style={{width: '250px'}, {height: '40px'}, {border: '1px solid rgb(193, 193, 193)'} ,{margin: '10px 25px'}, 
                {padding: '0px'}, {resize: 'none'}, {display: 'none'}}></textarea></div></div> 
                <span id="recaptcha-error" 
                className="message">Please check box</span></div> <div className="form__actions">
                <button enabled={isInvalid} type="submit" aria-live="polite" className="btn submitting-btn -main"><span>Join</span> 
                  <span className="iconfont-loader"></span></button></div></div>
                {error && <p><strong>{error.message}</strong></p>}

      </form>
   
   <footer className="login-block -Footer">
   <p className="medium light">Already a member? <Link to='signin'>Sign In</Link></p>
    </footer>

    
</div>
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
    event.pretentDefault();
  };

  render() {
    const { error }= this.state;

    return (   
   <form onSubmit={this.onSubmit}>
      <button onClick="clickAndDisable(this)" className="btn -google -clock" type="submit"><span className="iconfont-google"></span>Google</button>
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
      <button onClick="clickAndDisable(this)" className="btn -fbook -block" type="submit"><span className="iconfont-facebook"></span>Facebook</button>
      {error && <p><strong>{error.message}</strong></p>}
      </form>
    );
}
}

const SignUpForm = compose(
  withRouter,
  withFirebase,
)(JoinBase)

const SignInGoogle = compose(
  withRouter,
  withFirebase,
)(SignInGoogleBase);

const SignInFacebook = compose(
  withRouter,
  withFirebase,
)(SignInFacebookBase);


export default SignUpPage;
export { SignUpForm, SignInGoogle, SignInFacebook };