import clientPromise from "@/utils/db";

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
function generateMockData() {
  const objectId = () => Math.floor(Math.random() * 10e12).toString(16);

  // Generate a random question
  const questions = [
    "What is your favorite color?",
    "What is the capital of France?",
    "Who wrote Hamlet?",
    "What is the largest mammal?",
    "What is the chemical symbol for water?",
  ];
  const randomQuestion =
    questions[Math.floor(Math.random() * questions.length)];

  // Generate random answers
  const answers = ["A", "B", "C", "D"];
  const randomAnswers = answers.map(
    (answer) => answer + Math.floor(Math.random() * 100)
  ); // Appending random numbers to make answers distinct

  const mockData = {
    question: randomQuestion,
    answers: randomAnswers,
    correctAnswer: randomAnswers[0],
  };

  return mockData;
}
export const GET = async (req) => {
  try {
    let questions = await db.collection("questions").find({}).toArray();
    questions = shuffleAndReturnTop10(questions);
    // let questions = [];
    // for (let i = 0; i < 20; i++) questions.push(generateMockData());
    return Response.json({ questions });
  } catch (error) {
    return Response.json({ error: "Server Error" });
  }
};
