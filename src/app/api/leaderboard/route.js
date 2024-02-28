import clientPromise from "../../../utils/db";

const client = await clientPromise;
const db = client.db("quiz");

export const GET = async (req) => {
  try {
    const users = await db
      .collection("users")
      .find({}, { sort: { score: -1 }, limit: 10 })
      .toArray();

    return Response.json({ users });
  } catch (error) {
    return Response.json({ error });
  }
};
