import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import CakeIcon from "@mui/icons-material/Cake";
import PersonIcon from "@mui/icons-material/Person";
import NumbersIcon from "@mui/icons-material/Numbers";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
// import Avatar from "@mui/material/Avatar";
// import Stack from "@mui/material/Stack";
const Details = () => {
  const [forms, setForms] = useState([]);
  const navigate = useNavigate();
  const navigateToAbout = () => {
    navigate("/");
  };
  useEffect(() => {
    fetchForms();
  }, []);
  const fetchForms = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/getAllData");
      setForms(response?.data);
    } catch (error) {
      console.error("Error fetching forms:", error);
    }
  };
  return (
    <div>
      {/* <img src="https://picsum.photos/200/300"></img> */}
      {forms.map((form) => (
        <Accordion key={form._id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              {/* <Stack direction="row" spacing={3} sx={{ marginBottom: 2 }}>
                <Avatar alt="Remy Sharp" src={form?.images} />
                {console.log(form.images)}
              </Stack> */}
              {/* <img src={form.images} height="100px" width="100px"></img> */}
              &nbsp;
              {form?.firstName}&nbsp;
              {form?.lastName}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ bgcolor: "#EEEEEE" }}>
            <Typography>
              <div>
                <ul>
                  <li>{form?.firstName}'s Details</li>
                </ul>
                <hr />
                <ul>
                  <PhoneIcon sx={{ marginBottom: -1 }} />: &nbsp;
                  {form?.phone}
                </ul>
                <ul>
                  <EmailIcon sx={{ marginBottom: -1 }} />: &nbsp;
                  {form?.email}
                </ul>
                <hr />
                <div className="aaaaa">
                  {/* {console.log("image on board :", form?.images)}
                  <ul>
                    <img src={form?.images} alt="img" />
                    {console.log("image==", form.images)}
                  </ul> */}
                  <div className="details">
                    <p>
                      <CreditScoreIcon sx={{ marginBottom: -1 }} />: &nbsp;
                      {form?._id}
                    </p>
                    <PlaceIcon sx={{ marginBottom: -1 }} />: &nbsp;
                    {form?.address},
                    <br /> &nbsp; &nbsp; &nbsp; &nbsp;
                    {form?.city},{form?.state},{form?.country},{form?.pinCode}
                    <p>
                      <CakeIcon sx={{ marginBottom: -1 }} />: &nbsp;
                      {
                        (console.log("date", form?.dateOfBirth),
                        console.log(
                          "new",
                          new Date(form?.dateOfBirth).toLocaleDateString()
                        ))
                      }
                      {new Date(form?.dateOfBirth).toLocaleDateString()}
                    </p>
                    <p>
                      <PersonIcon sx={{ marginBottom: -1 }} />: &nbsp;
                      {form?.gender}
                    </p>
                    <p>
                      <NumbersIcon sx={{ marginBottom: -1 }} />: &nbsp;
                      {form?.age}(Age)
                    </p>
                    <p>
                      <EmojiEmotionsIcon sx={{ marginBottom: -1 }} />: &nbsp;
                      {form?.hobbies}
                    </p>
                  </div>
                </div>
              </div>
            </Typography>
          </AccordionDetails>
        </Accordion>
      ))}
      {/* } */}
      <br />
      <Button
        variant="contained"
        type="submit"
        className="button2"
        onClick={navigateToAbout}
      >
        Create Form
      </Button>
    </div>
  );
};

export default Details;
