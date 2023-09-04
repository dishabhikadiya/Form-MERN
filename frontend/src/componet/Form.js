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
import { useNavigate } from "react-router-dom";
const NewForm = () => {
  const [value, setValue] = useState("+91");
  const [selectedCountry, setSelectedCountry] = useState({ country: "" });
  const [selectedState, setSelectedState] = useState({ state: "" });
  const [selectedCity, setSelectedCity] = useState({ city: "" });
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [imageUrl, setImageUrl] = useState([""]);
  const [emailError, setEmailError] = useState("");

  const navigate = useNavigate();

  const timeStampConvertor = (dateString) => {
    const dateOfBirth = new Date(dateString);
    const timestamp = dateOfBirth.getTime();
    return timestamp;
  };
  // const showAlert = () => {
  //   alert("Thank you for your submission!");
  //   window.alert("This is an alert message!");
  // };
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
    setImageUrl(files[0]);
    console.log("img", files[0]);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log("name:", name, "value", value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    if (name === "email") {
      const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
      if (!emailPattern.test(value)) {
        setEmailError("Invalid email address");
      } else {
        setEmailError("");
      }
    }
  };
  const hobbiesList = [
    { id: 1, label: "cooking", name: "hobbies", value: "cooking" },
    { id: 2, label: "reading", name: "hobbies", value: "reading" },
    { id: 3, label: "travelin", name: "hobbies", value: "travelin" },
  ];
  const navigateToAbout = () => {
    navigate("/Details");
  };
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
      value: "",
      gender: "",
      hobbies: "",
      dateOfBirth: "",
      age: "",
      pinCode: "",
      address: "",
      imageUrl: "",
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
    formData.append("images", imageUrl);
    console.log("imageUrl[0]", imageUrl);

    // imageUrl.forEach((images) => {
    //   formData.append("images", images);
    // });
    const requestData = {
      method: "POST",
      headers: {
        // "Content-Type": "application/json",
      },
      body: formData,
    };
    try {
      const response = await fetch(
        "http://localhost:3000/api/createForm",
        requestData
      );
      const responseData = await response.json();
      console.log("res", responseData);
      setFormData(responseData);
      resetForm();
    } catch (error) {
      console.error("Error:", error);
    }
    if (!imageUrl) {
      alert("Please select an image.");
      return;
    }
    if (!selectedCountry || !selectedCountry.name) {
      alert("Please select a country.");
      return;
    }

    if (!selectedState || !selectedState.name) {
      alert("Please select a state.");
      return;
    }

    if (!selectedCity || !selectedCity.name) {
      alert("Please select a city.");
      return;
    }
    if (selectedHobbies.length === 0) {
      alert("Please select at least one hobby.");
      return;
    }
    if (!myData.dateOfBirth) {
      alert("Please select a date of birth");
      return;
    }
    // if (!value.phone) {
    //   alert("Please enter the phone number.");
    //   return;
    // }
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
          />
        </div>
        <div className="redioButton">
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="gender"
            value={myData?.gender}
            onChange={handleInputChange}
            required
          >
            <FormControlLabel
              value="female"
              control={<Radio />}
              label="Female"
              required
            />
            <FormControlLabel
              value="male"
              control={<Radio />}
              label="Male"
              required
            />
          </RadioGroup>
        </div>
        <div className="datePiker">
          {" "}
          Date Of Bith:&nbsp;&nbsp;
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              disableFuture
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
            error={!!emailError}
            helperText={emailError}
          />
        </div>
        <div className="datePiker">
          Age:&nbsp;&nbsp;
          <TextField
            label="Age"
            name="age"
            // type="number"
            value={myData?.age}
            onChange={handleInputChange}
            inputProps={{
              maxLength: 2,
            }}
            required
          />
        </div>
        <div className="datePiker">
          Phone: &nbsp;&nbsp;
          <MuiTelInput
            value={value}
            required
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
            value={myData?.pinCode}
            onChange={handleInputChange}
            name="pinCode"
            label="PIN Code"
            variant="outlined"
            type="number"
            required
            InputProps={{
              inputProps: {
                pattern: "[0-9]*",
                maxLength: 6,
              },
            }}
          />
          {/* <PinInput
            length={6}
            initialValue={myData?.pinCode}
            // secret
            // secretDelay={100}
            onChange={handleInputChange}
            type="numeric"
            inputMode="number"
            style={{ padding: "10px" }}
            inputStyle={{ borderColor: "red" }}
            inputFocusStyle={{ borderColor: "blue" }}
            onComplete={(value, index) => {}}
            autoSelect={true}
            regexCriteria={/^[ A-Za-z0-9_@./#&+-]*$/}
          /> */}
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
        &nbsp;&nbsp;&nbsp;
        <Button
          variant="contained"
          type="submit"
          className="button2"
          onClick={navigateToAbout}
        >
          Get Form Details
        </Button>
      </Box>
    </form>
  );
};

export default NewForm;
