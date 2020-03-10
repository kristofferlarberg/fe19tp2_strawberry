import React ,{ Component }from 'react';
import { Link } from 'react-router-dom';
import SignInForm from '../SignIn'
import {SignUpForm} from '../SignUp'
import { AuthUserContext } from '../../Session';
import SignOutButton from '../SignOut';
import * as ROUTES from '../../../constants/routes';
import * as ROLES from '../../../constants/roles';

const instialState = {
    noAccont: true,
    showSignInForm: false
}

class LandingPage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            noAccont: true,
            showSignInForm : false
         }
         this.showSignIn = this.showSignIn.bind(this)
         this.onChangeCheckbox = this.onChangeCheckbox.bind(this)
    }
    componentDidMount () {
        this.setState({...instialState})
    }
    componentWillUnmount () {
        this.setState({noAccont:null,showSignInForm:null})
    }
    showSignIn (event) {
        event.preventDefault();
        if (this.state.showSignInForm) {
            this.setState({ showSignInForm: false })
        } else {
            this.setState({ showSignInForm: true })
        }
    }
    onChangeCheckbox (event)  {
        this.setState({noAccont : event.target.checked})
    }

    render() { 
        const {showSignInForm ,noAccont} = this.state;
        return ( <AuthUserContext.Consumer>
            {authUser =>
                authUser ?
                <div>
                        {authUser.roles[ROLES.ACCESS] ?  <Link to={ROUTES.HOME}>Home</Link> : 
                        <Link to={ROUTES.NO_ACCESS_USER}>No Access</Link>}
                        <SignOutButton />
                </div>
               
            :  <div>
                <h1>Hello and welcome Landing</h1>
                
        <button onClick={this.showSignIn} >{showSignInForm ? 'Not Sign In' : 'Sign in'}</button>
        <div>
            {showSignInForm ? <div>
                {!noAccont ? <SignUpForm />: <SignInForm /> }
                Have Account :<input name='noAccount' type='checkbox' checked={noAccont} onChange={this.onChangeCheckbox} /> 
             </div>
            : null}
        </div>
        </div> 
                }
            </AuthUserContext.Consumer> );
    }
}
 

export default LandingPage;