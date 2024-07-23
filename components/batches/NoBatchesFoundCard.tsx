import React from "react";

const NoBatchesFoundCard = () => {
  return (
    <div className="flex flex-col space-y-3">
      <div className="space-y-2">
        <p className="text-3xl font-bold">Oh no!</p>
        <p className="text-lg text-gray-500">
          We couldn't find any batches for you. Maybe you should create one?
        </p>
      </div>
      {/* <div className="flex justify-center">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
          type="button"
        >
          Create a Batch
        </button>
      </div> */}
    </div>
  );
};

export default NoBatchesFoundCard;
