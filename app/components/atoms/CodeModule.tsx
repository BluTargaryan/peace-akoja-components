"use client"

import React, { useState } from 'react'
import Button from './Button'
import { MdClose, MdOutlineContentCopy } from 'react-icons/md'

const CodeModule = ( { heading, codeSnippet }: { heading: string, codeSnippet: string } ) => {
  const [copied, setCopied] = useState(false)
  const [isOverlayOpen, setIsOverlayOpen] = useState(false)


  const handleCopy = async () => {
    await navigator.clipboard.writeText(codeSnippet)
    setCopied(true)
    setTimeout(() => setCopied(false), 1500)
  }

  return (
    <div className='flex flex-col gap-2 xl:gap-4'>
      <h4>{heading}</h4>
      <div className='flex flex-col'>
    <div
      className='w-full h-100 p-10 bg-text text-background overflow-y-scroll'
      onDoubleClick={() => setIsOverlayOpen(true)}
    >
        <pre className='w-full text-wrap'>
{codeSnippet}
        </pre>
   
    </div>
    <Button
    content={ <><span>{copied ? "Copied!" : "Copy to clipboard"}</span><MdOutlineContentCopy /></>}
    className='px-10 py-6'
    onClick={handleCopy}
    />

    {isOverlayOpen && (
      <div
        className='fixed inset-0 z-50 bg-text/70 p-4 md:p-10'
        onClick={() => setIsOverlayOpen(false)}
      >
        <div
          className='mx-auto flex h-full w-full max-w-5xl flex-col border-2 border-text bg-background p-6'
          onClick={(event) => event.stopPropagation()}
        >
          <div className='mb-4 flex justify-end gap-4'>
            <Button
              content={
                <>
                  <span>{copied ? "Copied!" : "Copy to clipboard"}</span>
                  <MdOutlineContentCopy />
                </>
              }
              className='px-6 py-3'
              onClick={handleCopy}
            />
            <Button
              content={
                <>
                  <span>Close</span>
                  <MdClose />
                </>
              }
              className='px-6 py-3'
              onClick={() => setIsOverlayOpen(false)}
            />
          </div>
          <div className='h-full overflow-y-auto bg-text p-6 text-background'>
            <pre className='w-full text-wrap'>{codeSnippet}</pre>
          </div>
        </div>
      </div>
    )}
    </div>
    </div>
  )
}

export default CodeModule