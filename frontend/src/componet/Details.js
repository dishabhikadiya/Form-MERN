import React, { useState, useEffect } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import axios from "axios";
import BadgeIcon from "@mui/icons-material/Badge";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import PlaceIcon from "@mui/icons-material/Place";
import CakeIcon from "@mui/icons-material/Cake";
import PersonIcon from "@mui/icons-material/Person";
import NumbersIcon from "@mui/icons-material/Numbers";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
const Details = () => {
  const [forms, setForms] = useState([]);
  useEffect(() => {
    async function fetchForms() {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/getAllData"
        );
        setForms(response?.data);
      } catch (error) {
        console.error("Error fetching forms:", error);
      }
    }

    fetchForms();
  }, []);

  return (
    <div>
      {forms.map((form) => (
        <Accordion key={form._id}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1a-content"
            id="panel1a-header"
          >
            <Typography>
              <BadgeIcon sx={{ marginBottom: -1 }} />
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
                  <ul>
                    <img src={form?.images} alt={form?.firstName} />
                    {console.log("image==", form.images)}
                  </ul>
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
    </div>
  );
};

export default Details;
