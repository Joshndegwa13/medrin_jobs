import React from "react";

const JobDetailsList = ({ title, data, dataKey }) => {
  if (!data || !Array.isArray(data) || data.length === 0) return null;

  return (
    <div className="mt-6">
      <h2 className="font-bold text-black text-l">{title}</h2>
      <ul className="list-disc pl-5">
        {data.map((item, index) => (
          <li key={index} className="text-gray-700 mt-2">
            {item[dataKey]}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default JobDetailsList;
