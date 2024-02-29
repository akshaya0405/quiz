import { NextResponse } from "next/server";
import clientPromise from "../../../../utils/db";

const client = await clientPromise;
const db = client.db("quiz");

export const POST = async (req) => {
  const data = await req.json();
  try {
    let score = 0;
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
      .updateOne(
        { contact: data.contact },
        { $set: { score: score, submitTime: 120 - data.timeRemaining } }
      );

    return NextResponse.json({ score });
  } catch (error) {
    return NextResponse.json({ error });
  }
};
