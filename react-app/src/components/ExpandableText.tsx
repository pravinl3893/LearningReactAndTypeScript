import React, { useState } from "react";

interface Props {
  text: string;
  maxChars?: number;
}

const ExpandableText = ({ text, maxChars = 100 }: Props) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const displayedText = isExpanded
    ? text
    : text.length > maxChars
      ? text.slice(0, maxChars) + "..."
      : text;
  return (
    <div>
      <p>{displayedText}...</p>
      <button onClick={() => setIsExpanded(!isExpanded)}>
        {isExpanded ? "Read Less" : "Read More"}
      </button>
    </div>
  );
};

export default ExpandableText;
