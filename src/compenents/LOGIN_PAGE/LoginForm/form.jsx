import React, { useState } from "react";
import styled from "styled-components";
import NavigationItem from "../../Navbar/navItem.jsx";
import Checkbox from "./checkbox.jsx";
import { Formik } from "formik";
import axios from "axios";

// The Input Form & Submit Buttons
const StyledForm = styled.form`
  width: 690px;
  display: flex;
  flex-direction: column;
  align-items: center;

  :focus {
    outline: none;
  }

  label {
    min-height: 26px;
  }
`;
const StyledInput = styled.input`
  width: 489px;
  height: 40px;
  border: 2px solid #f6b26b;
  border-radius: 30px;
  margin-bottom: 16px;
  padding-left: 20px;
  font-size: 30px;
  text-color: #f6b26b;

  &::placeholder {
    color: #b0b0b0;
    line-height: 30px;
    font-weight: 300;
    font-size: 30px;
    padding-top: 20px;
  }

  :focus {
    outline: none;
  }
`;
const StyledButton = styled.button`
  width: 305px;
  height: 62px;
  background-color: #f6b26b;
  color: #fff;
  border-radius: 31px;
  border-color: #f6b26b;
  font-size: 25px;
  font-weight: 700;
  margin-top: 52px;

  :hover {
    background-color: #f6a56b;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  :focus {
    outline-color: #fbc575;
  }
`;
const StyledText = styled.p`
  font-size: 20px;
  color: #636363;
  font-weight: 500;
  margin: 64px 0px 5px 0px;
`;
const ErrorText = styled.p`
  font-size: 16pt;
  color: #ff0000;
  font-weight: 300;
  margin: 0px;
`;
const AltLink = styled(NavigationItem)`
  text-decoration: underline;
  padding: 0px;
  margin-left: 0;
`;
const BottomFormDiv = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  width: 500px;
  judtify-content: space-between;
`;

const LoginForm = () => {
  const handleSubmit = async (values) => {
    let loginInfo = new FormData();
    loginInfo.set("username", values.username);
    loginInfo.set("password", values.password);

    console.log(loginInfo);

    axios
      .post(
        "https://foodprint-prod.herokuapp.com/api/users/login",
        loginInfo
      )
      .then((response) => {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  // Checkbox state
  const [checked, setChecked] = useState(false);

  return (
    <div className="loginContainer">
      <Formik
        // Setup initial values
        initialValues={{ username: "", password: "" }}
        // Submission handler
        onSubmit={handleSubmit}
        validate={(values) => {
          let errors = {};
          if (!values.username) {
            errors.username = "Please enter your username";
            console.log(errors);
          } else {
            errors.username = undefined;
          }

          // VALIDATION OF PASSWORD
          if (!values.password) {
            errors.password = "A password is required";
            console.log(errors);
          } else {
            errors.password = undefined;
          }

          if (errors.username == undefined && errors.password == undefined) {
            errors = false;
          }
          return errors;
        }}
        render={({
          touched,
          errors,
          values,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <StyledForm onSubmit={handleSubmit}>
            <label>
              {touched.username && errors.username && (
                <ErrorText>{errors.username}</ErrorText>
              )}
            </label>
            <StyledInput
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.username}
            />

            <label>
              {touched.password && errors.password && (
                <ErrorText>{errors.password}</ErrorText>
              )}
            </label>
            <StyledInput
              type="password"
              name="password"
              placeholder="Password"
              onChange={handleChange}
              onBlur={handleBlur}
              value={values.password}
              border={touched.password && errors.password && "2px solid red"}
            />
            <BottomFormDiv>
              <label>
                <Checkbox
                  checked={checked}
                  onChange={(event) =>
                    setChecked(
                      { checked: event.target.checked },
                      console.log(checked)
                    )
                  }
                />
                <span>Remember Me</span>
              </label>

              <AltLink
                className="forgotPass"
                label="Forgot Password?"
              ></AltLink>
            </BottomFormDiv>

            <StyledButton type="submit" disabled={isSubmitting}>
              Login
            </StyledButton>
            <StyledText>Don't have an account?</StyledText>
            <AltLink className="register" label="Sign Up"></AltLink>
          </StyledForm>
        )}
      />
    </div>
  );
};

export default LoginForm;
