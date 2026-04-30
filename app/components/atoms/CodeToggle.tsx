"use client";

import { useState } from "react";
import { MdKeyboardArrowRight } from "react-icons/md";
import Button from "./Button";
import CodeModule from "./CodeModule";

const CodeToggle = () => {
  const [showCode, setShowCode] = useState(false);
  const codeSnippet = `
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("World")); // Hello, World!
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("World")); // Hello, World!
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("World")); // Hello, World!
`
  return (
    <>
      <Button
        content={
          <>
            <span>{showCode ? "Hide Code" : "Show Code"}</span>
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
        className={`${showCode ? "h-auto" : "h-0"} overflow-hidden transition-all duration-300 flex flex-col gap-5 xl:gap-10`}
      >
        <CodeModule 
        heading="Component Code"
        codeSnippet={codeSnippet} />
        <CodeModule 
        heading="Usage Example"
        codeSnippet={codeSnippet} />
      </div>
    </>
  );
};

export default CodeToggle;
