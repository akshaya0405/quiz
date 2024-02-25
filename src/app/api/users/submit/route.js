import clientPromise from "../../../../utils/db";

const client = await clientPromise;
const db = client.db("quiz");

export const POST = async (req) => {
  try {
    let score = 0;
    const data = await req.json();
    for (let i = 0; i < 10; i++) {
      let question = data.questions[i];
      if (
        question.markedAnswer &&
        question.correctAnswer === question.markedAnswer
      )
        score++;
    }

    await db
      .collection("users")
      .updateOne({ contact: data.contact }, { $set: { score: score } });

    return Response.json({ score });
  } catch (error) {
    return Response.json({ error });
  }
};
