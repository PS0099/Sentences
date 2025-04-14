import React from 'react';

const ScoreSummary = ({ userAnswers }) => {
  const results = userAnswers?.map((item) => ({
    prompt: item.question,
    response: item.selectedAnswers.join(' '),
    correctAnswers: item.correctAnswers.join(' '),
    correct: item.isCorrect,
    score: `${item.score}/${item.correctAnswers.length * 10}`,
  })) || [];

  const calculateOverallScore = () => {
    if (results.length === 0) return 0;
    const total = results.reduce((acc, item) => acc + parseInt(item.score), 0);
    return Math.round(total / results.length);
  };

  const correctCount = results.filter((item) => item.correct).length;

  return (
    <div className="w-[895px] mx-auto mt-10 border border-gray-300 p-6 rounded-md bg-white shadow-md">
      <div className="flex flex-col items-center mb-8">
        <div className="w-[100px] h-[100px] rounded-full bg-green-500 flex items-center justify-center text-white text-[32px] font-bold">
          {calculateOverallScore()}
        </div>
        <p className="text-[20px] font-semibold text-gray-700 mt-2">Overall Score</p>
        <p className="text-sm text-gray-600">
          {correctCount} out of {results.length} responses were correct
        </p>
        <p className="text-center text-gray-600 mt-4">
          While you correctly formed several sentences, there are a couple of areas where improvement is needed.
          Pay close attention to sentence structure and word placement to ensure clarity and correctness.
          Review your responses below for more details.
        </p>
        <button className="mt-4 border px-6 py-2 rounded-md text-blue-600 border-blue-600 hover:bg-blue-50">
          Go to Dashboard
        </button>
      </div>

      <hr className="border-t border-dotted mb-4" />

      <div className="space-y-6">
        {results.map((item, index) => (
          <div
            key={index}
            className={`relative p-4 rounded-md border border-dashed shadow-sm backdrop-blur-sm bg-opacity-30 ${
              item.correct ? 'bg-green-100/30 border-green-400' : 'bg-red-100/30 border-red-400'
            }`}
          >
            <div className="flex justify-between mb-2">
              <p className="text-gray-800 font-semibold">Prompt</p>
              <p className="text-gray-600">{item.score}</p>
            </div>
            <p className="mb-2 text-gray-700">{item.prompt}</p>

            <p className={`mt-3 font-semibold ${item.correct ? 'text-green-700' : 'text-red-700'}`}>
              Your response {item.correct ? 'Correct' : 'Incorrect'}
            </p>
            <p className={`mt-1 p-2 rounded-md ${item.correct ? 'bg-green-200/30' : 'bg-red-200/30'}`}>
              {item.response}
            </p>

            {!item.correct && (
              <>
                <p className="mt-1 text-sm text-gray-700">
                  Correct Answer: <span className="font-semibold">{item.correctAnswers}</span>
                </p>
                <p className="mt-2 text-sm italic text-red-600">
                  Hint: Pay attention to word order and structure for clarity.
                </p>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScoreSummary;
