import { google } from "googleapis";

const createSheetHandler = async (req, res) => {
  const auth = new google.auth.OAuth2();
  const idToken = ""; // console.log({ idToken });
  auth.setCredentials({
    // id_token: idToken,
    id_token: idToken,
  });

  const sheets = google.sheets({ version: "v4", auth });

  sheets.spreadsheets
    .create({
      requestBody: {
        properties: {
          title: "Hello World!",
        },
      },
    })
    .then((response) => {
      console.log(response.data);
      return res.status(200).json({ response });
    })
    .catch((err) => console.error(err));

  return res.status(200).json({
    message: "Hello World",
  });
};

export default createSheetHandler;
