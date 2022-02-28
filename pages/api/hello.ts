import { google } from "googleapis";

const createSheetHandler = async (req, res) => {
  try {
    const auth = new google.auth.OAuth2();
    const token = req.body.token;
    console.log({ token });
    auth.setCredentials({
      access_token: token,
    });

    const sheets = google.sheets({ version: "v4", auth });

    const createSpreadSheetRes = await sheets.spreadsheets.create({
      requestBody: {
        properties: {
          title: "Inquire Sheet",
        },
        sheets: [
          {
            properties: {
              sheetId: 0,
              title: "Questions",
            },
          },
        ],
      },
    });

    return res.status(200).json({
      message: "success",
      error: null,
      data: createSpreadSheetRes.data,
    });
  } catch (error) {
    return res.status(200).json({
      message: "There was an error",
      error,
      response: null,
    });
  }
};

export default createSheetHandler;
