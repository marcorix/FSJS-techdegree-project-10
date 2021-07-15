export default class Data {
  // api request, returns fetched data
  api(path, method = 'GET', body = null, reqAuth = false, creds = null) {
    const apiBaseUrl = 'http://localhost:5000/api';
    const url = apiBaseUrl + path;
    const options = {
      method,
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    };

    if (body !== null) {
      options.body = JSON.stringify(body);
    }

    if (reqAuth) {
      const encodedCreds = btoa(`${creds.emailAddress}:${creds.password}`);
      options.headers['Authorization'] = `Basic ${encodedCreds}`;
    }

    return fetch(url, options);
  }

  // GET request method for listing all existing courses
  async getCourses() {
    const res = await this.api('/courses', 'Get');

    if (res.status === 200) {
      return res.json().then((data) => data);
    } else if (res.status === 400) {
      return null;
    } else {
      throw new Error();
    }
  }

  // GET request method for an individual course's details
  async getCourseDetails(id) {
    const res = await this.api(`/courses/${id}`, 'Get');

    if (res.status === 200) {
      return res.json().then((data) => data);
    } else if (res.status === 400) {
      return null;
    } else {
      throw new Error();
    }
  }

  // GET request method for retrieving an existing user's information.
  // for sign-in authentication and route authorization
  async getUser(emailAddress, password) {
    const res = await this.api('/users', 'Get', null, true, {
      emailAddress,
      password,
    });

    if (res.status === 200) {
      return res.json().then((data) => {
        console.log(data);
        return data;
      });
    } else if (res.status === 401) {
      return null;
    } else {
      throw new Error();
    }
  }

  // POST request method creates a new user
  async createUser(user) {
    const res = await this.api('/users', 'Post', user);

    if (res.status === 201) {
      return [];
    } else if (res.status === 400) {
      return res.json().then((data) => data.errors);
    } else {
      throw new Error();
    }
  }

  // POST  method , creates a new course.

  async createCourse(course, emailAddress, password) {
    const res = await this.api('/courses', 'Post', course, true, {
      emailAddress,
      password,
    });

    if (res.status === 201) {
      return [];
    } else if (res.status === 400) {
      return res.json().then((data) => data.errors);
    } else {
      throw new Error();
    }
  }

  // PUT request method for updating and individual course's information.
  // available only to authenticated AND authorized users
  async updateCourse(course, courseId, emailAddress, password) {
    const res = await this.api(`/courses/${courseId}`, 'Put', course, true, {
      emailAddress,
      password,
    });

    if (res.status === 204) {
      return [];
    } else if (res.status === 400) {
      return res.json().then((data) => data.errors);
    } else {
      throw new Error();
    }
  }

  // DELETE request method for deleting a course from the database.
  // available only to authenticated AND authorized users.
  async deleteCourse(courseId, emailAddress, password) {
    const res = await this.api(`/courses/${courseId}`, 'Delete', null, true, {
      emailAddress,
      password,
    });

    if (res.status === 204) {
      return [];
    } else if (res.status === 400) {
      return res.json().then((data) => data.errors);
    } else {
      throw new Error();
    }
  }
}
