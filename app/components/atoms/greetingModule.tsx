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

const useTypewriter = (text: string, trigger: boolean, speed = 40) => {
  const [displayed, setDisplayed] = useState('')
  useEffect(() => {
    if (!trigger) { setDisplayed(''); return }
    let i = 0
    setDisplayed('')
    const interval = setInterval(() => {
      setDisplayed(text.slice(0, i + 1))
      i++
      if (i === text.length) clearInterval(interval)
    }, speed)
    return () => clearInterval(interval)
  }, [trigger, text, speed])
  return displayed
}

const GreetingModule = () => {
  const [greeting, setGreeting] = useState('Good evening, visitor')
  const [day, setDay] = useState('Monday')
  const [fullTimeText, setFullTimeText] = useState('')
  const [fullDateText, setFullDateText] = useState('')

  const [showFullTime, setShowFullTime] = useState(false)
  const [showFullDate, setShowFullDate] = useState(false)

  const displayedTime = useTypewriter(fullTimeText, showFullTime)
  const displayedDate = useTypewriter(fullDateText, showFullDate)

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
        onClick={() => setShowFullTime((prev) => !prev)}
      >
        {showFullTime ? (displayedTime || '…') : greeting}
      </span>
      <span
        className='text-text hover:text-accent transition-all duration-300'
        onClick={() => setShowFullDate((prev) => !prev)}
      >
        {showFullDate ? (displayedDate || '…') : `Happy ${day}`}
      </span>
    </div>
  )
}

export default GreetingModule
