import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import './styles/globals.scss'
import './styles/popup.scss'
import App from './pages/home';
import Product from './components/product'
import WriteReview from './pages/writereview'
import Vendor from './pages/vendor'
import Login from './pages/login'
import Register from './pages/register'
import NavBar from './components/navbar'
import LogoBar from './components/logobar'
import AddVendor from './pages/addvendor'
import PassReset from './pages/reset_password'
import ViewUser from './pages/view_user'
import ReqReset from './pages/req_reset_password'
import ManageAccount from './pages/manage_account'
import DoesntExist from './pages/doesntexist'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

const addNavbar = (Component) => {

	return class extends React.Component {
    	UNSAFE_componentWillReceiveProps(nextProps) {}

    	render() {
      		return (
        		<div className='nav-container'>
          			<NavBar/>
          			<Component {...this.props}/>
        		</div>)
    	}
	}
}

const addLogobar = (Component) => {
	return class extends React.Component {
    	UNSAFE_componentWillReceiveProps(nextProps) {}

    	render() {
      		return (
        		<div>
          			<LogoBar/>
          			<Component {...this.props}/>
        		</div>)
    	}
	}
}

const shown = (
	<Router>
    <div>
      <Switch>
        <Route exact path='/' component={App}/>
        <Route path='/products' component={Product}/>
      	<Route path='/vendor/:vendorID/:page?' component={addNavbar(Vendor)}/>
      	<Route path='/writereview' component={addLogobar(WriteReview)}/>
      	<Route path='/login' component={addLogobar(Login)}/>
    		<Route path='/register' component={addLogobar(Register)}/>
    		<Route path='/addvendor' component={addNavbar(AddVendor)}/>
		    <Route path='/reset' component={addLogobar(PassReset)}/>
				<Route path='/user/:userID' component={addNavbar(ViewUser)}/>
				<Route path='/reqreset' component={addLogobar(ReqReset)}/>
				<Route path='/account' component={ManageAccount}/>
				<Route path='*' component={addLogobar(DoesntExist)}/>
      </Switch>
    </div>
	</Router>
)

window.addEventListener('popstate', function(event) {
	window.location.reload()
})

ReactDOM.render(shown, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
