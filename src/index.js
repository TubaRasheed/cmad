import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// import App from './App';
import Fitness from './App';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './components/Firebase';
import { Provider } from 'react-redux';
import { createStore , compose} from 'redux';
import { reducer }from './components/Redux/Reducers';

const allStoreEnhancers = compose(
    window.devToolsExtension && window.devToolsExtension()
);

const store = createStore(reducer, allStoreEnhancers); 


// ReactDOM.render(<App />, document.getElementById('root'));
ReactDOM.render(
    <Provider store={ store }>
    <FirebaseContext.Provider value={new Firebase()}>
    <Fitness />
    </FirebaseContext.Provider>
    </Provider>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
