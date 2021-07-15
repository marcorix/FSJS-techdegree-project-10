import React, { useState, useEffect, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../Context';

// renders all courses on home "/" route
const Courses = () => {
  const context = useContext(Context.AppContext);

  // url manipulation
  const history = useHistory();

  // state variable
  const [coursesArray, setCoursesArray] = useState([]);

  // calls method to fetch data
  useEffect(() => {
    context.data
      .getCourses()
      .then((data) => setCoursesArray(data))
      .catch(() => history.push('/error'));
  }, [context.data, history]);

  // creates array of html elements
  let courses = coursesArray.map((course, index) => (
    <a
      key={index}
      className="course--module course--link"
      href={`/courses/${course.id}`}
    >
      <h2 className="course--label">Course</h2>
      <h3 className="course--title">{course.title}</h3>
    </a>
  ));

  return (
    <main>
      <div className="wrap main--grid">
        {/* list of courses */}
        {courses}

        {/* new course button */}
        <a
          className="course--module course--add--module"
          href="/courses/create"
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
        </a>
      </div>
    </main>
  );
};

export default Courses;
