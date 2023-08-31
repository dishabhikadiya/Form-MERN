// import * as React from "react";
// // import AppBar from "@mui/material/AppBar";
// import Box from "@mui/material/Box";
// // import Toolbar from "@mui/material/Toolbar";
// // import IconButton from "@mui/material/IconButton";
// // import Stack from "@mui/material/Stack";
// import Button from "@mui/material/Button";
// // import CssBaseline from "@mui/material/CssBaseline";
// import Container from "@mui/material/Container";
// import Typography from "@mui/material/Typography";
// // import { FileUpload, FileUploadProps } from "./FileUpload/FileUpload";
// // import Modal from "@mui/material/Modal";
// import { TextField } from "@mui/material";
// import { DropzoneArea } from "mui-file-dropzone";
// import { MuiTelInput } from "mui-tel-input";
// import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
// import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
// import { DatePicker } from "@mui/x-date-pickers/DatePicker";
// import Radio from "@mui/material/Radio";
// import RadioGroup from "@mui/material/RadioGroup";
// // import { useNavigate } from "react-router-dom";
// import axios from "axios";
// // import Checkbox from "@mui/material/Checkbox";
// import { useFormik } from "formik";
// import Select from "react-select";
// import csc from "country-state-city";
// import { useState } from "react";
// import "./Details.css";

// import FormControlLabel from "@mui/material/FormControlLabel";
// // import FormGroup from "@mui/material/FormGroup";

// const Form = () => {
//   // const [selectedHobbies, setSelectedHobbies] = useState([]);
//   const [value, setValue] = useState("+91");
//   const [imageUrl, setImageUrl] = useState();
//   const [myData, setData] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     // phone: "",
//     gender: "",
//     hobbies: "",
//     dateOfBirth: "",
//     age: "",
//     // state: "",
//     // city: "",
//     // country: "",
//     pinCode: "",
//     address: "",
//   });
//   const handleFileChange = (event) => {
//     setImageUrl(event.target.files[0]);
//   };

//   // const hobbiesList = [
//   //   { id: 1, label: "cooking", name: "hobbies", value: "cooking" },
//   //   { id: 2, label: "reading", name: "hobbies", value: "reading" },
//   //   { id: 3, label: "travelin", name: "hobbies", value: "travelin" },
//   //   // Add more hobbies here
//   // ];
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   // const handleCheckboxChange = (hobby) => {
//   //   if (selectedHobbies.includes(hobby)) {
//   //     setSelectedHobbies(selectedHobbies.filter((h) => h !== hobby));
//   //   } else {
//   //     if (selectedHobbies.length < 3) {
//   //       setSelectedHobbies([...selectedHobbies, hobby]);
//   //     }
//   //   }
//   // };
//   // console.log("imageurl", imageUrl);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append("images", imageUrl);

//     try {
//       console.log("mydata", myData);
//       const response = await axios.post(
//         "http://localhost:4000/api/createForm",
//         myData
//       );
//       if (response.status === 201) {
//         console.log("Form submitted:", response.data);
//       } else {
//         console.error("Failed to submit form");
//       }
//     } catch (error) {
//       console.error("Error submitting form:", error);
//     }
//   };

//   // const label = { inputProps: { "aria-label": "Checkbox demo" } };
//   const handleChange = (newValue) => {
//     setValue(newValue);
//   };
//   const addressFromik = useFormik({
//     initialValues: {
//       country: "India",
//       state: null,
//       city: null,
//     },
//     onSubmit: (values) => console.log(JSON.stringify(values)),
//   });

//   const countries = csc.getAllCountries();

//   const updatedCountries = countries.map((country) => ({
//     label: country?.name,
//     value: country?.id,
//     ...country,
//   }));
//   const updatedStates = (countryId) =>
//     csc
//       .getStatesOfCountry(countryId)
//       .map((state) => ({ label: state?.name, value: state?.id, ...state }));
//   const updatedCities = (stateId) =>
//     csc
//       .getCitiesOfState(stateId)
//       .map((city) => ({ label: city?.name, value: city?.id, ...city }));

//   const { setFieldValue, setValues } = addressFromik;

//   const stylee = {
//     width: 200,
//   };
//   const styllee = {
//     width: 400,
//   };
//   const style = {
//     position: "absolute",
//     top: "50%",
//     left: "50%",
//     transform: "translate(-50%, -50%)",
//     width: 600,
//     bgcolor: "background.paper",
//     border: "2px solid #000",
//     boxShadow: 24,
//     p: 5,
//   };

//   return (
//     <Box sx={style}>
//       <Container maxWidth="sm">
//         <form onSubmit={handleSubmit}>
//           <Typography variant="h5" gutterBottom>
//             STUDANT FORM
//           </Typography>
//           <Box sx={stylee}>
//             <DropzoneArea
//             //  onChange={handleFileChange}
//             />
//           </Box>
//           <Box sx={styllee}>
//             <TextField
//               label="First Name"
//               name="firstName"
//               id="firstName"
//               value={myData?.firstName}
//               onChange={handleInputChange}
//               autoComplete="firstName"
//               fullWidth
//               margin="normal"
//               required
//               inputProps={{
//                 maxLength: 10,
//               }}
//             />{" "}
//             <TextField
//               label="Last Name"
//               name="lastName"
//               value={myData?.lastName}
//               onChange={handleInputChange}
//               fullWidth
//               margin="normal"
//               required
//               inputProps={{
//                 maxLength: 10,
//               }}
//             />
//             <RadioGroup
//               row
//               aria-labelledby="demo-row-radio-buttons-group-label"
//               name="gender"
//               value={myData?.gender}
//               onChange={handleInputChange}
//             >
//               <FormControlLabel
//                 value="female"
//                 control={<Radio />}
//                 label="Female"
//               />
//               <FormControlLabel value="male" control={<Radio />} label="Male" />
//             </RadioGroup>
//             <ul>
//               <li>Enter Your Date of Birth</li>
//             </ul>
//             <LocalizationProvider
//               dateAdapter={AdapterDayjs}
//               value={myData?.dateOfBirth}
//               onChange={handleInputChange}
//             >
//               <DatePicker />
//             </LocalizationProvider>
//           </Box>
//           <TextField
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Please Enter Your Email Address"
//             name="email"
//             autoComplete="email"
//             autoFocus
//             value={myData?.email}
//             onChange={handleInputChange}
//           />
//           <TextField
//             label="Age"
//             name="age"
//             value={myData?.age}
//             onChange={handleInputChange}
//             inputProps={{
//               maxLength: 2,
//             }}
//           />
//           <MuiTelInput
//             value={value}
//             onChange={handleChange}
//             inputProps={{
//               maxLength: 16,
//             }}
//           />
//           <TextField
//             label="Address"
//             name="address"
//             value={myData?.address}
//             onChange={handleInputChange}
//             fullWidth
//             margin="normal"
//             required
//             multiline
//             rows={4}
//           />
//           <TextField
//             label="PinCode"
//             value={myData?.pinCode}
//             name="pinCode"
//             onChange={handleInputChange}
//             inputProps={{
//               maxLength: 6,
//             }}
//           />
//           <br></br>
//           <br></br>
//           <Select
//             id="country"
//             name="country"
//             label="country"
//             placeholder="Enter Your Country"
//             options={updatedCountries}
//             value={myData?.country}
//             // onChange={(value) => {
//             //   setFieldValue("country", value);
//             //   setFieldValue("state", null);
//             //   setFieldValue("city", null);
//             // }}
//             onChange={(value) => {
//               setValues({ country: value, state: null, city: null }, false);
//               // handleInputChange();
//             }}
//           />
//           <Select
//             id="state"
//             name="state"
//             placeholder="Enter Your State"
//             options={updatedStates(
//               myData?.country ? myData?.country?.value : null
//             )}
//             value={myData?.state}
//             onChange={(value) => {
//               setValues({ state: value, city: null }, false);
//               // handleInputChange();
//             }}
//           />
//           <Select
//             id="city"
//             name="city"
//             placeholder="Enter Your City"
//             options={updatedCities(myData?.state ? myData?.state?.value : null)}
//             value={myData?.city}
//             onChange={(value) => {
//               setFieldValue("city", value);
//               // handleInputChange();
//             }}
//           />
//           <br />
//           {/* {hobbiesList.map((hobby) => (
//             <FormControlLabel
//               key={hobby.id}
//               control={
//                 <Checkbox
//                   checked={selectedHobbies.includes(hobby.id)}
//                   onChange={() => handleCheckboxChange(hobby.id)}
//                 />
//               }
//               label={hobby.label}
//             />
//           ))} */}
//           <br></br>
//           {/* <p>{JSON.stringify(csc.get)}</p> */}
//           <Button sx={stylee} variant="contained" type="submit">
//             Submit
//           </Button>
//         </form>
//       </Container>
//     </Box>
//   );
// };

// export default Form;
