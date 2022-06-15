import './App.css';
import './basic/Styles/customComponents.css';
import { HashRouter as Router } from 'react-router-dom';
import Main from './pages/Login';
import { connect } from 'react-redux';
import { default as MainHome } from './pages/Main';
import { AppState } from './store';

function whichMain(logged: boolean) {
  return logged ? <MainHome /> : <Main />;
}

const App: React.FC = (props: any) => {
  return (
    <div className="App">
      <Router>{whichMain(props.logged)}</Router>
    </div>
  );
};

const mapStateToProps = (state: AppState) => {
  return {
    logged: state.session.authenticated && state.session.user?.flgTrocaSenha === "N",
  };
};

export default connect(mapStateToProps)(App);
