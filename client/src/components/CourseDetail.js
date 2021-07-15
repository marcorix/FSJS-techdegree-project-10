import React, { useState, useEffect, useContext } from 'react';
import { useParams, Link, useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import Context from '../Context';

// renders an individual course's details
const CourseDetails = () => {
  // data
  const context = useContext(Context.AppContext);
  const signedIn = context.authedUser;

  // url manipulation
  const history = useHistory();
  const { id } = useParams();

  // state variables
  const [course, setCourse] = useState({});
  const [user, setUser] = useState({});

  // calls method to fetch data
  useEffect(() => {
    context.data
      .getCourseDetails(id)
      .then((res) => {
        if (res) {
          setCourse(res);
          setUser(res.User);
        } else {
          history.push('/notfound');
        }
      })
      .catch(() => history.push('/error'));
  }, [id, context.data, history]);

  return (
    <main>
      <div className="actions--bar">
        <div className="wrap">
          {/* removes Update and Delete links if not authorized to
                    perform those actions on this course */}
          {signedIn && signedIn.id === user.id ? (
            <>
              <Link className="button" to={`/courses/${id}/update`}>
                Update Course
              </Link>
              <Link className="button" to={`/courses/${id}/delete`}>
                Delete Course
              </Link>
              <Link className="button button-secondary" to="/">
                Return to List
              </Link>
            </>
          ) : (
            <Link className="button button-secondary" to="/">
              Return to List
            </Link>
          )}
        </div>
      </div>
      <div className="wrap">
        <h2>Course Details</h2>
        <form>
          <div className="main--flex">
            <div>
              <h3 className="course--detail--title">Course</h3>
              <h4 className="course--name">{course.title}</h4>
              <p>By {`${user.firstName} ${user.lastName}`}</p>
              <ReactMarkdown>{course.description}</ReactMarkdown>
            </div>
            <div>
              <h3 className="course--detail--title">Estimated Time</h3>
              <p>{course.estimatedTime}</p>

              <h3 className="course--detail--title">Materials Needed</h3>
              <ReactMarkdown className="course--detail--list">
                {course.materialsNeeded}
              </ReactMarkdown>
            </div>
          </div>
        </form>
      </div>
    </main>
  );
};
export default CourseDetails;
