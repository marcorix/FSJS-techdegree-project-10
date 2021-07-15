import React, { useState, useEffect, useContext } from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import ValidationErrors from './ValidationErrors';
import Context from '../Context';

const DeleteCourse = () => {
  const context = useContext(Context.AppContext);
  const signedIn = context.authedUser;

  const history = useHistory();
  const { id } = useParams();

  // set variables
  const [title, setTitle] = useState('');
  const [errors, setErrors] = useState([]);

  // fetches course data for:
  useEffect(() => {
    context.data.getCourseDetails(id).then((res) => {
      if (!res) {
        history.push('/notfound');
        // only authorized users (courses' creators) can delete courses
      } else if (res && res.userId !== signedIn.id) {
        history.push('/forbidden');
      } else {
        setTitle(res.title);
      }
    });
  }, [id, signedIn.id, context.data, history]);

  const submit = (e) => {
    e.preventDefault();

    context.data
      .deleteCourse(id, signedIn.emailAddress, signedIn.password)
      .then((errors) => {
        if (errors.length) {
          setErrors(errors);
        } else {
          history.push('/');
        }
      })
      .catch(() => history.push('/error'));
  };

  // returns user to previous page (course details)
  const cancel = (e) => {
    e.preventDefault();
    history.goBack();
  };

  return signedIn ? (
    <div className="wrap">
      <h1>{title}</h1>
      <h2>Are you sure you want to delete this course?</h2>
      <ValidationErrors errors={errors} />
      <form onSubmit={submit}>
        <button className="button" type="submit">
          Delete
        </button>
        <button className="button button-secondary" onClick={cancel}>
          Cancel
        </button>
      </form>
    </div>
  ) : (
    <Redirect to="/signin" />
  );
};
export default DeleteCourse;
