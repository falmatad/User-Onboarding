import React, {useState, useEffect} from "react";
import axios from "axios";
import { withFormik, Form, Field } from "formik";
import * as Yup from "yup";

const OnBoardingForm = ({values, touched, errors, status}) => {
    const [users, setUsers] = useState([]);
    useEffect(() => {
        status && setUsers(users => [...users, status])
    }, [status])
  return (
    <div className="animal-form">
        <Form>
        <label>Name: </label>
        <Field
            type="text" 
            name="name"
            placeholder = "Name"
         />
         {touched.name && errors.name && (
          <p>{errors.name}</p>
        )}
        <Field
            type="text" 
            name="email"
            placeholder = "Email"
         />
         {touched.email && errors.email && (
          <p>{errors.email}</p>
        )}
        <label>Password</label>
        <Field
            type="text" 
            name="password"
            placeholder = "Password"
        />
        {touched.password && errors.password && (
          <p>{errors.password}</p>
        )}
        <label>Do you accept the term?</label>
        <Field
            type="checkbox" 
            name="terms"
            checked = {values.terms}
        />
        <button type="submit" >Submit!</button>
        </Form>
        {users.map(user => (
        <ul key={user.id}>
          <li>name: {user.name}</li>
          <li>email: {user.email}</li>
          <li>terms: {user.terms}</li>
        </ul>
      ))}
    </div>
  );
};
const FormikOnBoardingForm = withFormik({
    mapPropsToValues({name, email, terms, password}) {
        return {
          name: name || "",
          email: email || "",
          terms: terms || false,
          password: password || ""
        };
      },

    validationSchema: Yup.object().shape({
    name: Yup.string().required("Name is required")
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    email: Yup.string().required("Email is required")
    .email('Invalid email'),
    password: Yup.string().required("Password is required")
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),
    }),

    handleSubmit(values, {setStatus}) { 
        axios.post('https://reqres.in/api/users/', values) 
              .then(res => setStatus(res.data) ) 
              .catch(err => console.log(err.response));
        }
})(OnBoardingForm);
export default FormikOnBoardingForm;
console.log("This is the HOC", FormikOnBoardingForm)