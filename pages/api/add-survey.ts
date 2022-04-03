// import { NextApiRequest, NextApiResponse } from "next";
// import { addSurvey } from "../../lib/db/add-survey";

// const joinWaitlistHandler = async (
//   req: NextApiRequest,
//   res: NextApiResponse
// ) => {
//   const { survey } = req.body;

//   try {
//     const { error } = await addSurvey({ survey });
//     if (error) throw error;

//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error({
//       data: {
//         survey,
//       },
//       error,
//     });
//     res.status(500).json({
//       success: false,
//     });
//   }
// };

// export default joinWaitlistHandler;
