import React from 'react'
import { useState } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Contact from './components/Contact'
import Loader from './components/Loader'
import { useEffect } from 'react'

function App() {
const [isLoading, setIsLoading] = useState(true)
useEffect(() => {
    setTimeout(() => {
        setIsLoading(false)
    }, 4000)})

  return isLoading ? <Loader/> :
    <>
    <Navbar/>
    <Hero/>
    <Projects/>
    <Contact/>
</>  
}
    


export default App
