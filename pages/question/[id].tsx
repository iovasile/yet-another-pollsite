import { useRouter } from "next/router";
import { number } from "zod";
import { trpc } from "../../utils/trpc";

const QuestionPage: React.FC = () => {
  const { query } = useRouter();
  const { id } = query;
  const numberID = typeof id === "string" ? parseInt(id) : null;

  if (!numberID) return <div>Invalid ID</div>;
  return <QuestionPageContent id={numberID} />;
};

const QuestionPageContent: React.FC<{ id: number }> = ({ id }) => {
  const { data, isLoading } = trpc.useQuery([
    "questions.get-one",
    {
      id: id,
    },
  ]);

  if (isLoading) return <div>Searching for question #{id}</div>;
  if (!data) return <div>Question #{id} not found</div>;
  else return <div>{data?.text}</div>;
};

export default QuestionPage;
