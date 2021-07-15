import React, { useState, useContext } from 'react';
import { useHistory } from 'react-router-dom';
import Context from '../Context';
import ValidationErrors from './ValidationErrors';

const CreateCourse = () => {
  const history = useHistory();

  // data
  const context = useContext(Context.AppContext);
  const signedIn = context.authedUser;

  // required data
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const userId = signedIn.id;

  // optional data
  const [estimatedTime, setTime] = useState('');
  const [materialsNeeded, setMaterials] = useState('');

  // errors array for field validation
  const [errors, setErrors] = useState([]);

  // sets state from the input fields
  const change = (e) => {
    const value = e.target.value;

    switch (e.target.name) {
      case 'courseTitle':
        setTitle(value);
        break;
      case 'courseDescription':
        setDescription(value);
        break;
      case 'estimatedTime':
        setTime(value);
        break;
      case 'materialsNeeded':
        setMaterials(value);
        break;
      default:
        return;
    }
  };

  const submit = (e) => {
    e.preventDefault();

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };

    // check if user is authenticated
    if (signedIn) {
      // posts data to database
      context.data
        .createCourse(course, signedIn.emailAddress, signedIn.password)
        .then((errors) => {
          if (errors.length) {
            setErrors(errors);
          } else {
            context.data.getCourses().then((courses) => {
              let newCourse = courses[courses.length - 1];
              history.push('/courses/' + newCourse.id);
            });
          }
        })
        .catch(() => history.push('/error'));
    }
  };

  // returns user to home "/" route
  const cancel = (e) => {
    e.preventDefault();
    history.push('/');
  };
  return (
    <main>
      <div className="wrap">
        <h2>Create Course</h2>
        <ValidationErrors errors={errors} />
        <form onSubmit={submit}>
          <div className="main--flex">
            <div>
              <label>Course Title</label>
              <input
                id="courseTitle"
                name="courseTitle"
                type="text"
                onChange={change}
                value={title}
              />

              <p>By {`${signedIn.firstName} ${signedIn.lastName}`}</p>

              <label>Course Description</label>
              <textarea
                id="courseDescription"
                name="courseDescription"
                onChange={change}
                value={description}
              ></textarea>
            </div>
            <div>
              <label>Estimated Time</label>
              <input
                id="estimatedTime"
                name="estimatedTime"
                type="text"
                onChange={change}
                value={estimatedTime}
              />

              <label>Materials Needed</label>
              <textarea
                id="materialsNeeded"
                name="materialsNeeded"
                onChange={change}
                value={materialsNeeded}
              ></textarea>
            </div>
          </div>
          <button className="button" type="submit">
            Create Course
          </button>
          <button className="button button-secondary" onClick={cancel}>
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};
export default CreateCourse;
