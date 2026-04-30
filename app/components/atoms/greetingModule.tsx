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
  useEffect(() => {
    if (key === 0) { setDisplayed(text); return }
    let i = 0
    setDisplayed('')
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i === text.length) clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [key, text, speed])
  return displayed
}

const GreetingModule = () => {
  const [greeting, setGreeting] = useState('Good evening, visitor')
  const [day, setDay] = useState('Monday')
  const [fullTimeText, setFullTimeText] = useState('')
  const [fullDateText, setFullDateText] = useState('')

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

  useEffect(() => {
    const now = new Date()
    const hour = now.getHours()
    setGreeting(getGreeting(hour))
    setDay(now.toLocaleDateString('en-US', { weekday: 'long' }))
    setFullTimeText(
      now.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true })
    )
    const ordinalDay = getOrdinal(now.getDate())
    const month = now.toLocaleDateString('en-US', { month: 'long' })
    const year = now.getFullYear()
    setFullDateText(`${ordinalDay} ${month} ${year}`)
  }, [])

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
