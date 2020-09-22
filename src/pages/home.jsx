import React from 'react';
import Search from '../components/search'
import LogoBar from '../components/logobar'
import { Link } from 'react-router-dom'
import logo from '../data/biglogov4.png'
import './home.scss';

function App() {
	return (
  	<div className="App">
			<div className='home-button-wrapper'>
				<div className='button-container'>
					<Link to="/login">
						<button> Login </button>
					</Link>
					<Link to="/register">
						<button> Sign Up </button>
					</Link>
				</div>
			</div>
			<div className='wrapper1'>
				<div className='wrapper2'>
					<div className='logo-container'>
						<img src={logo}/>
					</div>
					<div className='text-container'>
						<p> Find information on Instagram vendors </p>
						<p> Make informed purchases </p>
					</div>
					<Search/>
				</div>
			</div>
    </div>
  )
}

export default App;
