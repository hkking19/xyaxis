import React, { useState,useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { isAuth } from "../../helpers/auth";
import AuthContext from '../../context/auth/AuthContext';
import ErrorContext from '../../context/error/ErrorContext';
import Form from "../../components/Shared/Form/Form";
import Alert from '../../components/Shared/Alert/Alert';
import Auth from "./Auth";

const Signin = () => {
  const [User, setUser] = useState({
    email: "",
    password: "",
  });

  const [SubmitButton, setSubmitButton] = useState({
    ButtonText: "Sign In",
    clicked: false,
    disabled: false,
  });

  const authContext = useContext(AuthContext);
  const { signin } = authContext;

  const errorContext = useContext(ErrorContext);
  const {error } = errorContext;

  const onInputChange = (e) => {
    setUser({ ...User, [e.target.name]: e.target.value });
  };

  const onFormSubmit = async () => {
    const data = {
      email: User.email.trim(),
      password: User.password.trim()
    };
    setSubmitButton({ ButtonText: "Signing In",clicked: true,disabled: true,});
    const res = await signin(data)
    if(res) {
      return setUser({email:'',password:''})
    }else {
      setSubmitButton({ButtonText:'Sign In',clicked:false,disabled:false})
    }
  };

  return (
        <Auth>
        <Form title="Sign In">
      {isAuth() ? <Redirect to="/" /> : null}
      {error.message && <Alert message={error.message} type={error.type}/>}
      <div className="social-login">
        <button>
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
            alt="google"
            width="20"
          />
          <span>Google</span>
        </button>
      </div>
      <div className="login-form">
        <div className="input-group">
          <label>Email</label>
          <input
            type="text"
            placeholder="Email"
            name="email"
            onChange={onInputChange}
          />
        </div>
        <div className="input-group">
          <label>Password</label>
          <input 
              type="password" 
              placeholder="Password" 
              name="password" 
              onChange={onInputChange}
              />
        </div>
        <div className="input-group submit">
          <button
            className="submit-btn"
            disabled={SubmitButton.disabled}
            onClick={onFormSubmit}
          >
            <span>{SubmitButton.ButtonText}</span>
            {SubmitButton.clicked && (
              <img src="/images/tenor.gif" alt="dotdot" />
            )}
          </button>
        </div>
        <footer className="form-footer">
          Forgot Password
          <Link to="/signup">
            <label className="pointer">Don't have an account? Sign Up</label>
          </Link>
        </footer>
      </div>
    </Form>
    </Auth>
  );
};

export default Signin;
