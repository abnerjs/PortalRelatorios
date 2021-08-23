import './App.css'
import { BrowserRouter as Router } from 'react-router-dom'
import Main from './pages/login/Main'
import { connect } from 'react-redux'
import Dashboard from './pages/Dashboard'

function whichMain(logged: boolean) {
  return (logged) ? <Dashboard /> : <Main />;
}

const App: React.FC = (props: any) => {
  return (
    <div className="App">
      <Router>
        {whichMain(props.logged)}
      </Router>
    </div>
  );
}

const mapStateToProps = (state: any) => {
  return {
      logged: state.logged.status,
  }
}

export default connect(
  mapStateToProps
)(App)
