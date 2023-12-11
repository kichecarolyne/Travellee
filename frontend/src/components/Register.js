import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

const Register = () => {
  const history = useHistory();

  const [user, setUser] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    cpassword: '',
  });

  const handleInputs = (e) => {
    let namee = e.target.name;
    let value = e.target.value;

    setUser({ ...user, [namee]: value });
  };

  const PostData = async (e) => {
    e.preventDefault();

    const { name, email, phone, password, cpassword } = user;

    if (!name || !email || !phone || !password || !cpassword) {
      window.alert('All fields are required');
      return;
    }

    try {
      const res = await fetch('/adminRegister', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          cpassword,
        }),
      });

      const data = await res.json();

      if (res.status === 201) {
        localStorage.setItem('token', data.token);
        window.alert('Registration Successful');

        history.push('/');
        window.location.reload();
      } else {
        window.alert('Registration Failed');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      window.alert('Registration Failed. Please try again.');
    }
  };

  return (
    <>
      <section>
        <div className="container mt-5">
          <div className="row">
            <div className="col-12 col-md-7 col-sm-6">
              <h1 className="mt-5">Welcome!</h1>
            </div>

            <div className="col-12 col-md-5 col-sm-6">
              <form method="POST" onSubmit={PostData}>
                <div className="form-group">
                  <label htmlFor="companyName">Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={user.name}
                    onChange={handleInputs}
                    placeholder="Enter your name"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={user.email}
                    onChange={handleInputs}
                    placeholder="Enter your Email"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone No.</label>
                  <input
                    type="tel"
                    className="form-control"
                    id="phone"
                    name="phone"
                    value={user.phone}
                    onChange={handleInputs}
                    placeholder="Enter your Phone No."
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    value={user.password}
                    onChange={handleInputs}
                    placeholder="Enter your Password"
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="cpassword">Confirm password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="cpassword"
                    name="cpassword"
                    value={user.cpassword}
                    onChange={handleInputs}
                    placeholder="Confirm password"
                  />
                </div>

                <NavLink to="/login">Already Registered, then Login here!</NavLink>
                <br />
                <br />
                <button type="submit" className="btn btn-primary" id="register" name="register">
                  Register
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
