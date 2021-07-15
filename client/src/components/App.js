import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Component imports
import Header from './Header';
import NotFound from './NotFound';
import Courses from './Courses';
import CourseDetail from './CourseDetail';
import CreateCourse from './CreateCourse';
import UpdateCourse from './UpdateCourse';
import DeleteCourse from './DeleteCourse';
import UserSignIn from './UserSignIn';
import UserSignOut from './UserSignOut';
import UserSignUp from './UserSignUp';
import Forbidden from './Forbidden';
import PrivateRoute from './PrivateRoute';
import UnhandledError from './UnhandledError';

// Main Component
function App() {
  return (
    <Router>
      <Header />

      <Switch>
        <Route exact path="/" component={Courses} />
        <PrivateRoute path="/courses/create" component={CreateCourse} />
        <Route exact path="/courses/:id" component={CourseDetail} />
        <PrivateRoute path="/courses/:id/update" component={UpdateCourse} />
        <PrivateRoute path="/courses/:id/delete" component={DeleteCourse} />
        <Route path="/signin" component={UserSignIn} />
        <Route path="/signup" component={UserSignUp} />
        <Route path="/signout" component={UserSignOut} />
        <Route path="/forbidden" component={Forbidden} />
        <Route path="/error" component={UnhandledError} />
        <Route component={NotFound} />
      </Switch>
    </Router>
  );
}

export default App;
