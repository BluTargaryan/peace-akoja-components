"use client"

import React, { useState } from 'react'
import Button from './Button'
import { MdOutlineContentCopy } from 'react-icons/md'

const CodeModule = () => {
  const [copied, setCopied] = useState(false)
  const codeSnippet = `
function greet(name) {
  return "Hello, " + name + "!";
}

console.log(greet("World")); // Hello, World!
`

  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className='flex flex-col'>
    <div className='w-full h-100 p-10 bg-text text-background overflow-y-scroll'>
        <pre className='w-full text-wrap'>
{codeSnippet}
        </pre>
   
    </div>
    <Button
    content={ <><span>{copied ? "Copied!" : "Copy to clipboard"}</span><MdOutlineContentCopy /></>}
    className='px-10 py-6'
    onClick={handleCopy}
    />
    </div>
  )
}

export default CodeModule