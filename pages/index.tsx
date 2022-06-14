import Link from "next/link";
import { useState } from "react";
import { trpc } from "../utils/trpc";

export default function Home() {
  const { data, isLoading } = trpc.useQuery(["questions.get-all"]);

  return (
    <>
      <QuestionCreator />
      {(isLoading || !data) && <div>Loading questions...</div>}
      {data && (
        <div>
          {data.map((question) => (
            <Link key={question.id} href={`/question/${question.id}`}>
              <p style={{ cursor: "pointer" }}>{question.text}</p>
            </Link>
          ))}
        </div>
      )}
    </>
  );
}

const QuestionCreator: React.FC = () => {
  const client = trpc.useContext();
  const { mutate } = trpc.useMutation(["questions.create"], {
    onSuccess: () => {
      client.invalidateQueries(["questions.get-all"]);
    },
  });

  return (
    <input
      placeholder="Add a question"
      onKeyDown={(event) => {
        if (event.key === "Enter") {
          mutate({
            text: event.currentTarget.value,
          });

          event.currentTarget.value = "";
        }
      }}
      type="text"
    />
  );
};
