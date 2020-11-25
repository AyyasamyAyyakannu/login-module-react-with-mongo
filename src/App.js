import './App.scss';
import Login from './auth/login';
import Signup from './auth/signup';
import Home from './home';
import { Switch, Route } from 'react-router-dom';
import ProtectRouter from './protect';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Terms from './terms';
import Conditions from './conditions';

function App() {
	return ( 
		<div className="container">
			<div className="row">
				<div className="col-sm-4 offset-sm-4">
					<Switch>
						<Route exact path="/" component={Login} />
						<Route exact path="/login" component={Login} />
						<Route exact path="/signup" component={Signup} />
					</Switch>
				</div>
			</div>
			<div className="row">
				<div className="col-sm-6 offset-sm-3">
					<Switch>
						<ProtectRouter exact path="/home" component={Home} />
					</Switch>
				</div>
			</div>
			<Switch>
				<Route exact path="/terms" component={Terms} />
				<Route exact path="/conditions" component={Conditions} />
			</Switch>
			<ToastContainer />
		</div>
	);
}

export default App;
