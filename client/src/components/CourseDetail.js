import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

export default class CourseDetail extends Component {
  state = {
    course: null,
  };

  componentDidMount() {
    const courseId = this.props.match.params.id;

    axios
      .get(`http://localhost:5000/api/courses/${courseId}`)
      .then((res) => {
        const course = res.data;
        this.setState({ course });
        if (course === null) {
          this.props.history.push('/notfound');
        }
      })
      .catch((err) => {
        if (err.response.status === 500) {
          this.props.history.push('/error');
        }
      });
  }

  render() {
    if (!this.state.course) {
      return null;
    }
    console.log(this.state.course);
    const { title, estimatedTime, id } = this.state.course;
    const { firstName, lastName } = this.state.course.User;

    return (
      <main>
        <div class="actions--bar">
          <div class="wrap">
            <Link className="button" to={`/courses/${id}/update`}>
              Update Course
            </Link>
            <Link className="button" to={`/courses/${id}/delete`}>
              Delete Course
            </Link>
            <Link className="button" to="/">
              Return to List
            </Link>
          </div>
        </div>
        <div className="wrap">
          <h2>Course Detail</h2>
          <form>
            <div className="main--flex">
              <div>
                <h3 className="course--detail--title">Course</h3>
                <h4 className="course--name">{title}</h4>
                <p>By {firstName + ' ' + lastName}</p>
                {<ReactMarkdown children={this.state.course.description} />}
              </div>
              <div>
                <h3 className="course--detail--title">Estimated Time</h3>
                <p>{estimatedTime}</p>
                <h3 className="course--detail--title">Materials Needed</h3>
                <ul className="course--detail--list">
                  {
                    <ReactMarkdown
                      children={this.state.course.materialsNeeded}
                    />
                  }
                </ul>
              </div>
            </div>
          </form>
        </div>
      </main>
    );
  }
}
