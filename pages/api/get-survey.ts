// import { NextApiRequest, NextApiResponse } from "next";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../lib/init-firebase";

// const joinWaitlistHandler = async (
//   req: NextApiRequest,
//   res: NextApiResponse
// ) => {
//   try {
//     const querySnapshot = await getDocs(collection(db, "survey"));
//     let data = [];
//     querySnapshot.forEach((doc) => {
//       // doc.data() is never undefined for query doc snapshots
//       data.push(doc.data());
//     });
//     console.log("data: ", data);

//     res.status(200).json({ success: true, data: data });
//   } catch (error) {
//     console.error({
//       error,
//     });
//     res.status(500).json({
//       success: false,
//     });
//   }
// };

// export default joinWaitlistHandler;
