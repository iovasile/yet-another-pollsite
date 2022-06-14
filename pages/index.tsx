import type { NextPage } from "next";
import { prisma } from "../utils/prisma";
import { trpc } from "../utils/trpc";

const Home: NextPage = () => {
  const { data, isLoading } = trpc.useQuery(["questions.get-all"]);

  if (isLoading || !data) return <div>Loading ...</div>;

  return (
    <div>
      {data.map((q) => (
        <p key={q.id}>{q.text}</p>
      ))}
    </div>
  );
};

export default Home;

export const getStaticProps = async () => {
  const questions = await prisma.pollQuestion.findMany();

  return {
    props: {
      questions: JSON.stringify(questions),
    },
  };
};
