'use client'

import React, { useEffect, useState } from 'react'

const getOrdinal = (n: number) => {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return n + (s[(v - 20) % 10] || s[v] || s[0])
}

const getGreeting = (hour: number) => {
  if (hour < 12) return 'Good morning, visitor'
  if (hour < 17) return 'Good afternoon, visitor'
  return 'Good evening, visitor'
}

// key=0 → show text immediately; key>0 → animate on each increment
const useTypewriter = (text: string, key: number, speed = 40) => {
  const [displayed, setDisplayed] = useState(text)
  const [tracked, setTracked] = useState({ key, text })

  // Adjust state during render when inputs change — avoids a synchronous
  // setState inside the effect (react-hooks/set-state-in-effect).
  // See: https://react.dev/reference/react/useState#storing-information-from-previous-renders
  if (tracked.key !== key || tracked.text !== text) {
    setTracked({ key, text })
    setDisplayed(key === 0 ? text : '')
  }

  useEffect(() => {
    if (key === 0) return
    let i = 0
    const interval = setInterval(() => {
      i++
      setDisplayed(text.slice(0, i))
      if (i === text.length) clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [key, text, speed])

  return displayed
}

const GreetingModule = () => {
  const [greeting] = useState(() => getGreeting(new Date().getHours()))
  const [day] = useState(() => new Date().toLocaleDateString('en-US', { weekday: 'long' }))
  const [fullTimeText] = useState(() =>
    new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
  )
  const [fullDateText] = useState(() => {
    const now = new Date()
    return `${getOrdinal(now.getDate())} ${now.toLocaleDateString('en-US', { month: 'long' })} ${now.getFullYear()}`
  })

  const [showFullTime, setShowFullTime] = useState(false)
  const [showFullDate, setShowFullDate] = useState(false)

  const [fullTimeKey, setFullTimeKey] = useState(0)
  const [fullDateKey, setFullDateKey] = useState(0)
  const [greetingKey, setGreetingKey] = useState(0)
  const [dayKey, setDayKey] = useState(0)

  const displayedTime     = useTypewriter(fullTimeText,       fullTimeKey)
  const displayedDate     = useTypewriter(fullDateText,       fullDateKey)
  const displayedGreeting = useTypewriter(greeting,           greetingKey)
  const displayedDay      = useTypewriter(`Happy ${day}`,     dayKey)

  return (
    <div className='flex flex-col text-right font-light text-xs uppercase cursor-pointer
    md:text-sm
    xl:text-base
    '>
      <span
        className='text-text hover:text-accent transition-all duration-300'
        onClick={() => {
          if (showFullTime) {
            setShowFullTime(false)
            setGreetingKey(k => k + 1)
          } else {
            setShowFullTime(true)
            setFullTimeKey(k => k + 1)
          }
        }}
      >
        {showFullTime ? (displayedTime || '…') : (displayedGreeting || '…')}
      </span>
      <span
        className='text-text hover:text-accent transition-all duration-300'
        onClick={() => {
          if (showFullDate) {
            setShowFullDate(false)
            setDayKey(k => k + 1)
          } else {
            setShowFullDate(true)
            setFullDateKey(k => k + 1)
          }
        }}
      >
        {showFullDate ? (displayedDate || '…') : (displayedDay || '…')}
      </span>
    </div>
  )
}

export default GreetingModule
