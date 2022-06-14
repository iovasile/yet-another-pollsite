import type { NextPage } from "next";
import Head from "next/head";
import { prisma } from "../db/client";
import { trpc } from "../utils/trpc";

const Home: NextPage = (props: any) => {
  const { data, isLoading } = trpc.useQuery(["getAllQuestions"]);

  if (isLoading || !data) return <div>Loading ...</div>;
  console.log(data);

  return <div>{data[0]?.text}</div>;
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
