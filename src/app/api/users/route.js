import clientPromise from "@/utils/db";

const client = await clientPromise;
const db = client.db("quiz");
export const POST = async (req) => {
  try {
    const data = await req.json();
    let user = await db.collection("users").find({ name: data.name }).toArray();
    if (user.length) throw new Error("User exists with that name");
    await db.collection("users").insertOne({ ...data, score: 0 });

    return Response.json({ message: "Successful Registration" });
  } catch (error) {
    return Response.json({ error });
  }
};
export const GET = async (req) => {
  try {
    let users = await db.collection("users").find({}).toArray();

    return Response.json({ users });
  } catch (error) {
    return Response.json({ error: "Server Error" });
  }
};
