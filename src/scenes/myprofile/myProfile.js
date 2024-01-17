import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { Grid } from "@mui/material";
import { Avatar } from "@mui/material";
import Userimage from "../../assets/flogo.jpeg"
import Form from 'react-bootstrap/Form';
// import FileUpload from 'react-material-file-upload';
import React, { useState } from 'react';

const MyProfileForm = () => {

 
  
  const [contact, setContactNo] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const isNonMobile = useMediaQuery("(min-width:600px)");

  const handleFormSubmit = (values) => {
    console.log(values);
  };
  let FirstName, lastName, UserName, Email;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    const parsedData = JSON.parse(value);
    UserName = parsedData.data.username;
    FirstName = parsedData.data.first_name;
    lastName = parsedData.data.last_name;
    Email = parsedData.data.email;
  }
  const USERNAME = UserName;
  const FIRSTNAME = FirstName;
  const LASTNAME = lastName;
  const EMAIL = Email;
  const [firstName, setFirstName] = useState(FIRSTNAME);
  const [username, setUserName] = useState(USERNAME);
  const [lastname, setLastName] = useState(LASTNAME);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState(EMAIL);

  return (
    <Box m="20px">
      <Header title="My Profile" subtitle="Edit Your Profile" />

      <Formik
        onSubmit={handleFormSubmit}
        initialValues={initialValues}
        validationSchema={checkoutSchema}
      >
        {({
          values,
          errors,
          touched,
          handleBlur,
          handleChange,
          handleSubmit,
        }) => (
          <form onSubmit={handleSubmit}>
            <Box
              display="grid"
              gap="30px"
              gridTemplateColumns="repeat(4, minmax(0, 1fr))"
              sx={{
                "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
              }}
            >
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="UserName"
                onBlur={handleBlur}
                // onChange={handleChange}
                // value={values.address1}
                name="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}

                error={!!touched.username && !!errors.username}
                helperText={touched.username && errors.username}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}

                // onChange={handleChange}
                // value={FIRSTNAME}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="First Name"
                onBlur={handleBlur}
                value={lastname}
                onChange={(e) => setLastName(e.target.value)}

                // onChange={handleChange}
                // value={FIRSTNAME}
                name="firstName"
                error={!!touched.firstName && !!errors.firstName}
                helperText={touched.firstName && errors.firstName}
                sx={{ gridColumn: "span 2" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="UserName"
                onBlur={handleBlur}
                // onChange={handleChange}
                // value={values.address1}
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}

                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 2" }}
              />
              <Form.Group controlId="formFile" className="mb-3"  >
                <Form.Control type="file" style={{ width: '508px', marginTop: '4%', backgroundColor: '#323848', color: '#fff' }} />
              </Form.Group>

              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                onBlur={handleBlur}
                // onChange={handleChange}
                // value={values.contact}
                // value={contact}
                onChange={(e) => setContactNo(e.target.value)}
                name="contact"
                // error={!!touched.contact && !!errors.contact}
                // helperText={touched.contact && errors.contact}
                sx={{ gridColumn: "span 4" }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
                onBlur={handleBlur}
                // onChange={handleChange}
                // value={values.address1}
                name="address1"
                // value={address}
                onChange={(e) => setAddress(e.target.value)}

                // error={!!touched.address1 && !!errors.address1}
                // helperText={touched.address1 && errors.address1}
                sx={{ gridColumn: "span 4" }}
              />
              


              {/* <Grid item xs={6} style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'flex-end' }}>
            <Avatar alt="Doctor Image" src={Userimage} variant='rounded' sx={{ width: 70, height: 70 }} />
         </Grid> */}
            </Box>
            <Box display="flex" justifyContent="end" mt="20px">
              <Button type="submit" color="secondary" variant="contained">
                Save Details
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

const phoneRegExp =
  /^((\+[1-9]{1,4}[ -]?)|(\([0-9]{2,3}\)[ -]?)|([0-9]{2,4})[ -]?)*?[0-9]{3,4}[ -]?[0-9]{3,4}$/;

const checkoutSchema = yup.object().shape({
  firstName: yup.string().required("required"),
  lastName: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  contact: yup
    .string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("required"),
  address1: yup.string().required("required"),
  address2: yup.string().required("required"),
});
const initialValues = {
  firstName: JSON.stringify(localStorage.getItem("first_name")),
  lastName: JSON.stringify(localStorage.getItem("last_name")),
  email: JSON.stringify(localStorage.getItem("email")),
  contact: "",
  address1: "",
  username : JSON.stringify(localStorage.getItem("username")),
};

export default MyProfileForm;
