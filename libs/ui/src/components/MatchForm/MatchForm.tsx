import React, { FC, useState } from "react";

export enum MatchResult {
  LEFT_WIN = "LEFT_WIN",
  RIGHT_WIN = "RIGHT_WIN",
  DRAW = "DRAW",
}

interface MatchFormProps {
  callback: (
    adversaire1: string,
    adversaire2: string,
    result: MatchResult
  ) => Promise<Response>;
}

const MatchForm: FC<MatchFormProps> = (props) => {
  const { callback } = props;
  const [adversaire1, setadversaire1] = useState("");
  const [adversaire2, setadversaire2] = useState("");
  const [result, setResult] = useState<MatchResult>(MatchResult.LEFT_WIN);

  const resetForm = () => {
    setadversaire1("");
    setadversaire2("");
    setResult(MatchResult.LEFT_WIN);
  };

  return (
    <form
      data-testid="MatchForm"
      className="flex flex-col justify-center mb-4 gap-4 p-2 border border-gray-300 rounded-md"
      onSubmit={(evt) => {
        evt.preventDefault();
        callback(adversaire1, adversaire2, result).then((res) => {
          if (res.ok) {
            resetForm();
          } else {
            // TODO: toast error
            console.error("Error while posting match result");
          }
        });
      }}
    >
      <div className="flex justify-between">
        <div className="flex flex-col justify-between items-center mb-4 gap-4 p-2">
          <input
            type="checkbox"
            className="transform scale-150"
            checked={result === MatchResult.LEFT_WIN}
            onChange={() => setResult(MatchResult.LEFT_WIN)}
          />
          <span className="text-xl">Adversaire A</span>
          <input type="text" className="border border-gray-300 rounded-md" value={adversaire1} onChange={(evt) => setadversaire1(evt.target.value)} />
        </div>
        <div className="flex flex-col justify-start align-item mb-4 gap-4 p-2 w-[100px]">
          <input
            type="checkbox"
            className="transform scale-150"
            checked={result === MatchResult.DRAW}
            onChange={() => setResult(MatchResult.DRAW)}
          />
        </div>
        <div className="flex flex-col justify-between items-center mb-4 gap-4 p-2">
          <input
            type="checkbox"
            className="transform scale-150"
            checked={result === MatchResult.RIGHT_WIN}
            onChange={() => setResult(MatchResult.RIGHT_WIN)}
          />
          <span className="text-xl">Adversaire B</span>
          <input type="text" className="border border-gray-300 rounded-md" value={adversaire2} onChange={(evt) => setadversaire2(evt.target.value)} />
        </div>
      </div>
      <button
        type="submit"
        className="bg-blue-600 hover:bg-blue-800 text-white px-4 py-2 rounded-md"
      >
        Déclarer le match
      </button>
    </form>
  );
};

export default MatchForm;
