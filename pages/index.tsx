import type { NextPage } from "next";
import Head from "next/head";
import { prisma } from "../db/client";
import { trpc } from "../utils/trpc";

const Home: NextPage = (props: any) => {
  const { data, isLoading } = trpc.useQuery(["hi"]);

  if (isLoading || !data) return <div>Loading ...</div>;
  else return <div>{data.greeting}</div>;
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
