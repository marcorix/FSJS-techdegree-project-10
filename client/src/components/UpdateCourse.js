import React, { useState, useContext, useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ValidationErrors from './ValidationErrors';
import Context from '../Context';

const UpdateCourse = () => {
  const context = useContext(Context.AppContext);
  const signedIn = context.authedUser;

  const history = useHistory();
  const { id } = useParams();

  // required data
  const [title, setTitle] = useState('');
  const [description, setDesc] = useState('');
  const userId = signedIn.id;

  // optional data
  const [estimatedTime, setTime] = useState('');
  const [materialsNeeded, setMaterials] = useState('');

  // errors array for field validation
  const [errors, setErrors] = useState([]);

  // fetches course data
  useEffect(() => {
    context.data.getCourseDetails(id).then((res) => {
      if (!res) {
        history.push('/notfound');
        // only authorized users (courses' creators) can update courses
      } else if (res && res.userId === userId) {
        setTitle(res.title);
        setDesc(res.description);
        setTime(res.estimatedTime);
        setMaterials(res.materialsNeeded);
      } else {
        history.push('/forbidden');
      }
    });
  }, [id, userId, context.data, history]);

  // sets state
  const change = (e) => {
    const value = e.target.value;

    switch (e.target.name) {
      case 'courseTitle':
        setTitle(value);
        break;
      case 'courseDescription':
        setDesc(value);
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const course = {
      title,
      description,
      estimatedTime,
      materialsNeeded,
      userId,
    };

    if (signedIn) {
      // posts data to database
      context.data
        .updateCourse(course, id, signedIn.emailAddress, signedIn.password)
        .then((errors) => {
          if (errors.length) {
            setErrors(errors);
          } else {
            history.push(`/courses/${id}`);
          }
        })
        .catch(() => history.push('/error'));
    }
  };

  // returns user to Course Detail
  const handleCancel = (e) => {
    e.preventDefault();
    history.goBack();
  };

  return (
    <main>
      <div className="wrap">
        <h2>Update Course</h2>
        <ValidationErrors errors={errors} />
        <form onSubmit={handleSubmit}>
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
            Update Course
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </form>
      </div>
    </main>
  );
};
export default UpdateCourse;
