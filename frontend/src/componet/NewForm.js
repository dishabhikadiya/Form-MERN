import React from "react";
import Box from "@mui/material/Box";
import { TextField } from "@mui/material";
import "./From.css";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { MuiTelInput } from "mui-tel-input";
import { useEffect, useState } from "react";
import { Country, State, City } from "country-state-city";
import Select from "react-select";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import { DropzoneArea } from "mui-file-dropzone";
const NewForm = () => {
  const [value, setValue] = useState("+91");
  const [selectedCountry, setSelectedCountry] = useState({ country: "" });
  const [selectedState, setSelectedState] = useState({ state: "" });
  const [selectedCity, setSelectedCity] = useState({ city: "" });
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [imageUrl, setImageUrl] = useState([]);
  const timeStampConvertor = (dateString) => {
    const dateOfBirth = new Date(dateString);
    const timestamp = dateOfBirth.getTime();
    return timestamp;
  };
  const [myData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    gender: "",
    hobbies: "",
    dateOfBirth: "",
    age: "",
    pinCode: "",
    address: "",
  });
  console.log("MYDATA", myData);
  const handleChange = (newValue) => {
    setValue(newValue);
  };
  const handleFileChange = (files) => {
    setImageUrl(files);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("name:", name, "value", value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const hobbiesList = [
    { id: 1, label: "cooking", name: "hobbies", value: "cooking" },
    { id: 2, label: "reading", name: "hobbies", value: "reading" },
    { id: 3, label: "travelin", name: "hobbies", value: "travelin" },
  ];

  const handleCheckboxChange = (value) => {
    if (selectedHobbies.includes(value)) {
      setSelectedHobbies(selectedHobbies.filter((item) => item !== value));
    } else {
      setSelectedHobbies([...selectedHobbies, value]);
    }
  };
  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      gender: "",
      hobbies: "",
      dateOfBirth: "",
      age: "",
      pinCode: "",
      address: "",
    });
    setSelectedCountry({ country: "" });
    setSelectedState({ state: "" });
    setSelectedCity({ city: "" });
    setSelectedHobbies([]);
    setImageUrl([]);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("firstName", myData?.firstName);
    formData.append("lastName", myData?.lastName);
    formData.append("email", myData?.email);
    formData.append("phone", value);
    formData.append("gender", myData?.gender);
    formData.append("hobbies", selectedHobbies);
    formData.append("age", myData?.age);
    formData.append("country", selectedCountry?.name);
    formData.append("state", selectedState?.name);
    formData.append("city", selectedCity?.name);
    formData.append("pinCode", myData?.pinCode);
    formData.append("address", myData?.address);
    formData.append("dateOfBirth", timeStampConvertor(myData?.dateOfBirth));
    imageUrl.forEach((images) => {
      formData.append("images", images);
    });
    const requestData = {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
      },
      body: formData,
    };
    try {
      const response = await fetch(
        "http://localhost:4000/api/createForm",
        requestData
      );
      const responseData = await response.json();
      console.log("res", responseData);
      setFormData(responseData);
      resetForm();
    } catch (error) {
      console.error("Error:", error);
    }
  };
  useEffect(() => {
    // console.log(selectedCountry);
    // console.log(selectedCountry?.isoCode);
    // console.log(State?.getStatesOfCountry(selectedCountry?.isoCode));
  }, [selectedCountry]);
  useEffect(() => {
    // console.log(selectedState);
    // console.log(selectedState?.isoCode);
    // console.log(State?.getStatesOfCountry(selectedState?.isoCode));
  }, [selectedState]);
  useEffect(() => {
    // console.log(selectedCity);
    // console.log(selectedCity?.isoCode);
    // console.log(State?.getStatesOfCountry(selectedCity?.isoCode));
  }, [selectedCity]);
  return (
    <form onSubmit={handleSubmit}>
      <Box>
        <h2>~ Studant From</h2>
        <div className="imag">
          <DropzoneArea
            onChange={handleFileChange}
            acceptedFiles={["image/*"]}
          />
        </div>
        <div className="input1">
          Name:&nbsp;&nbsp;
          <TextField
            label="First Name"
            name="firstName"
            id="firstName"
            value={myData.firstName}
            onChange={handleInputChange}
            autoComplete="firstName"
            fullWidth
            margin="normal"
            required
            inputProps={{
              maxLength: 10,
            }}
          />{" "}
          &nbsp;&nbsp;&nbsp;&nbsp;
          <TextField
            label="Last Name"
            name="lastName"
            id="lastName"
            value={myData?.lastName}
            onChange={handleInputChange}
            autoComplete="lastName"
            fullWidth
            margin="normal"
            required
            inputProps={{
              maxLength: 10,
            }}
          />
        </div>
        <div className="redioButton">
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="gender"
            value={myData?.gender}
            onChange={handleInputChange}
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
            />
            <FormControlLabel value="male" control={<Radio />} label="Male" />
          </RadioGroup>
        </div>
        <div className="datePiker">
          {" "}
          Date Of Bith:&nbsp;&nbsp;
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              value={myData?.dateOfBirth}
              onChange={(e) => {
                const temp = { ...myData };
                temp.dateOfBirth = e;
                setFormData(temp);
              }}
            />
          </LocalizationProvider>
        </div>
        <div className="datePiker">
          Email:&nbsp;&nbsp;
          <TextField
            margin="normal"
            required
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
            value={myData?.email}
            onChange={handleInputChange}
          />
        </div>
        <div className="datePiker">
          Age:&nbsp;&nbsp;
          <TextField
            label="Age"
            name="age"
            value={myData?.age}
            onChange={handleInputChange}
            inputProps={{
              maxLength: 2,
            }}
          />
        </div>
        <div className="datePiker">
          Phone: &nbsp;&nbsp;
          <MuiTelInput
            value={value}
            onChange={handleChange}
            inputProps={{
              maxLength: 16,
            }}
          />
        </div>
        <div className="datePiker">
          Address:&nbsp;&nbsp;
          <TextField
            label="Address"
            name="address"
            value={myData?.address}
            onChange={handleInputChange}
            margin="normal"
            required
            multiline
            rows={4}
          />
        </div>
        <div className="datePiker">
          PIN:&nbsp;&nbsp;
          <TextField
            label="PinCode"
            name="pinCode"
            value={myData?.pinCode}
            onChange={handleInputChange}
            inputProps={{
              maxLength: 6,
            }}
          />
        </div>

        <div className="datePiker">
          Location:&nbsp;&nbsp;
          <Select
            options={Country?.getAllCountries()}
            getOptionLabel={(options) => {
              return options["name"];
            }}
            getOptionValue={(options) => {
              return options["name"];
            }}
            value={selectedCountry}
            onChange={(item) => {
              setSelectedCountry(item);
            }}
          />
          <Select
            options={State?.getStatesOfCountry(selectedCountry?.isoCode)}
            getOptionLabel={(options) => {
              return options["name"];
            }}
            getOptionValue={(options) => {
              return options["name"];
            }}
            value={selectedState}
            onChange={(item) => {
              setSelectedState(item);
            }}
          />
          <Select
            options={City?.getCitiesOfState(
              selectedState?.countryCode,
              selectedState?.isoCode
            )}
            getOptionLabel={(options) => {
              return options["name"];
            }}
            getOptionValue={(options) => {
              return options["name"];
            }}
            value={selectedCity}
            onChange={(item) => {
              setSelectedCity(item);
            }}
          />
        </div>
        {/* {console.log("myData +++++++", myData)} */}
        <br />
        {hobbiesList.map((hobby) => (
          <div key={hobby.id}>
            <label>
              <Checkbox
                checked={selectedHobbies.includes(hobby.value)}
                onChange={() => handleCheckboxChange(hobby.value)}
              />
              {hobby.label}
            </label>
          </div>
        ))}
        <br />
        <Button variant="contained" type="submit" className="button1">
          Submit{" "}
        </Button>
      </Box>
    </form>
  );
};

export default NewForm;
