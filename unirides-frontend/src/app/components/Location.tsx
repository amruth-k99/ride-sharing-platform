import React from "react";

type LocationProp = {
  type: string;
  location: string;
  onChange: (e: string) => void;
};

const Location = (props: LocationProp) => {
  return (
    <div id={props.type}>
      <div>
        <label htmlFor="from" className="text-base font-medium text-gray-900">
          {" "}
          From
        </label>
        <div className="mt-2.5">
          <input
            type="text"
            name=""
            id=""
            placeholder="Enter your full name"
            className="block w-full p-4 text-black placeholder-gray-500 transition-all duration-200 bg-white border border-gray-200 rounded-md focus:outline-none focus:border-blue-600 caret-blue-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Location;
