import { google } from 'googleapis'

const createSheetHandler = async (req, res) => {
  try {
    const auth = new google.auth.OAuth2()
    const token = req.body.token
    console.log({ token })
    auth.setCredentials({
      access_token: token,
    })

    const sheets = google.sheets({ version: 'v4', auth })
// import { google } from "googleapis";

// const createSheetHandler = async (req, res) => {
//   try {
//     const auth = new google.auth.OAuth2();

//     auth.setCredentials({
//       // id_token: idToken,
//       id_token: idToken,
//       access_token: token,
//     });

//     const sheets = google.sheets({ version: "v4", auth });

    // const updateSpreadSheetRes = await sheets.spreadsheets.values.append({
    //   spreadsheetId: "1HQaO_WJFlTU1j94iYxNWRUfmY3FudfHBPG9JonjxVjg", // createSpreadSheetRes.data.spreadsheetId,
    //   insertDataOption: "INSERT_ROWS",
    //   valueInputOption: "RAW",
    //   range: "A1:B2",
    //   requestBody: {
    //     range: "A1:B2",
    //     values: [["Question", "Answer", "Data"]],
    //   },
    // });
    const readSpreadsheetRes = await sheets.spreadsheets.values.batchGet({
      spreadsheetId: '1HQaO_WJFlTU1j94iYxNWRUfmY3FudfHBPG9JonjxVjg', // createSpreadSheetRes.data.spreadsheetId,

      ranges: ['Questions'],
    })

    return res.status(200).json({
      message: 'success',
      error: null,
      data: {
        // a: createSpreadSheetRes.data,
        // b: updateSpreadSheetRes.data,
        c: readSpreadsheetRes.data,
      },
    })
  } catch (error) {
    console.log({ error })
    return res.status(200).json({
      message: 'There was an error',
      error,
      response: null,
    })
  }
}

export default createSheetHandler
//     const createSpreadSheetRes = await sheets.spreadsheets.create({
//       requestBody: {
//         properties: {
//           title: "Hello World!",
//         },
//       },
//     });

//     return res.status(200).json({
//       message: "success",
//       error: null,
//       data: createSpreadSheetRes.data,
//     });
//   } catch (error) {
//     return res.status(200).json({
//       message: "There was an error",
//       error,
//       response: null,
//     });
//   }
// };

// export default createSheetHandler;
