import { NextRequest } from "next/server";
import clientPromise from "../../../utils/db";

const client = await clientPromise;
const db = client.db("quiz");

function shuffleAndReturnTop10(array) {
  // Fisher-Yates shuffle algorithm
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }

  // Return the first 10 elements
  return array.slice(0, 10);
}
export const GET = async (req) => {
  try {
    const query = req.nextUrl.searchParams;
    let level = query.get("level");
    level = parseInt(level);
    let questions = await db
      .collection("questions")
      .find({ level: level })
      .toArray();
    questions = shuffleAndReturnTop10(questions);
    return Response.json({ questions });
  } catch (error) {
    return Response.json({ error });
  }
};
