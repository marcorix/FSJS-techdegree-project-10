import React from 'react';
import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Component imports
import Header from './components/Header';
import NotFound from './components/NotFound';
import Courses from './components/Courses';
import CourseDetail from './components/CourseDetail';

import UserSignIn from './components/UserSignIn';

import UnhandledError from './components/UnhandledError';

// Context and wrapping with context
import withContext from './Context';

const UserSignInWithContext = withContext(UserSignIn);
const HeaderWithContext = withContext(Header);
const CourseDetailWithContext = withContext(CourseDetail);

/**
 * Hold all only the Router Routes and controll context sharing.
 */
function App() {
  return (
    <Router>
      <Route component={HeaderWithContext} />

      <Switch>
        <Route exact path="/" component={Courses} />

        <Route exact path="/courses/:id" component={CourseDetailWithContext} />

        <Route path="/signin" component={UserSignInWithContext} />

        <Route path="/error" component={UnhandledError} />
        <Route path={['/notfound', '']} component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
