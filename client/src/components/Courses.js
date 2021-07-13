import React, { Component } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

/**
 * A Component to view all courses and a link to create new course.
 */
export default class Courses extends Component {
  state = {
    courses: [],
  };

  componentDidMount() {
    axios
      .get('http://localhost:5000/api/courses')
      .then((response) => {
        const courses = response.data;
        this.setState({ courses });
      })
      .catch((err) => {
        if (err.response.status === 500) {
          this.props.history.push('/error');
        }
      });
  }

  /**
   * Renders course details from the state courses list.
   */
  renderCourses() {
    return this.state.courses.map((course) => (
      <Link
        className="course--module course--link"
        to={`/courses/${course.id}`}
        key={course.id}
      >
        <h2 className="course--label">Course</h2>
        <h3 className="course--title">{course.title}</h3>
      </Link>
    ));
  }

  render() {
    console.log(typeof this.state.courses);
    return (
      <div className="wrap main--grid">
        {this.renderCourses()}
        <Link
          className="course--module course--add--module"
          to="/courses/create"
        >
          <span className="course--add--title">
            <svg
              version="1.1"
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              viewBox="0 0 13 13"
              className="add"
            >
              <polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon>
            </svg>
            New Course
          </span>
        </Link>
      </div>
    );
  }
}
