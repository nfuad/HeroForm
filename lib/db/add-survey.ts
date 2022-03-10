import { addDoc, collection, Timestamp } from "firebase/firestore";
import { db } from "../init-firebase";

type Params = {
  survey: object;
};

type Returns = {
  error: unknown;
};

export const addSurvey = async (params: Params): Promise<Returns> => {
  const { survey } = params;
  const timestamp = Timestamp.now();

  try {
    await addDoc(collection(db, "survey"), {
      survey,
      createdAt: timestamp,
    });

    return { error: null };
  } catch (error) {
    return { error };
  }
};
