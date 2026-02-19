import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { homeImages } from '../utils/imageImports'

function Home() {
  const [isContainerVisible, setIsContainerVisible] = useState(false)

  const toggleContainer = () => {
    setIsContainerVisible(!isContainerVisible)
  }

  return (
    <div className="myBox">
      <main className="content">
        <h1 className="title">Ruben Fontes</h1>
        <p id='description'>Front-end Developer in João Pessoa (PB)</p>
        
        <button 
          id="btn" 
          onClick={toggleContainer}
          onMouseOver={(e) => e.target.style.textDecoration = "none"}
          onMouseOut={(e) => e.target.style.textDecoration = "underline"}
        >
          <div className="accordion">
                         <img 
               id="img" 
               src={isContainerVisible ? homeImages.minusIcon : homeImages.plusIcon} 
               alt="toggle"
             /> 
            Let’s work together
          </div>
        </button>
        
        <div id="container" style={{ display: isContainerVisible ? 'block' : 'none' }}>
          <ul>
            <li><a href="https://github.com/RubenFontes" target="_blank" rel="noopener noreferrer">Github</a></li>
            <li><a href="https://br.linkedin.com/in/rubengfontes" target="_blank" rel="noopener noreferrer">Linkedin</a></li>
            <li><Link to="/portfolio">Portfolio</Link></li>
            <li><a href={homeImages.curriculum} download>Resume</a></li>
          </ul>
        </div>
      </main>
    </div>
  )
}

export default Home
