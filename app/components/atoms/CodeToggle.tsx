"use client";

import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import Button from "./Button";
import CodeModule from "./CodeModule";

const CodeToggle = () => {
  const [showCode, setShowCode] = useState(false);

  return (
    <>
      <Button
        content={
          <>
            <span>Show Code</span>
            <MdKeyboardArrowRight
              className={`transition-transform duration-300 text-xl ${
                showCode ? "rotate-90" : ""
              }`}
            />
          </>
        }
        className="px-10 py-6"
        onClick={() => setShowCode((prev) => !prev)}
      />

      <div
        className={`${showCode ? "h-auto" : "h-0"} overflow-hidden transition-all duration-300`}
      >
        <CodeModule />
      </div>
    </>
  );
};

export default CodeToggle;
