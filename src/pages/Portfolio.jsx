import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { portfolioImages } from '../utils/imageImports'
import OptimizedImage from '../components/OptimizedImage'
import '../styles/Portfolio.css'

function Portfolio() {
  // Preload das primeiras 3 imagens críticas
  useEffect(() => {
    const criticalImages = [
      portfolioImages.mockupMinerva,
      portfolioImages.sima,
      portfolioImages.mockupPex
    ]
    
    criticalImages.forEach(src => {
      const link = document.createElement('link')
      link.rel = 'preload'
      link.as = 'image'
      link.href = src
      document.head.appendChild(link)
    })
  }, [])

  const projects = [
    {
      id: 0,
      title: "Minerva",
      description: "Production scenario optimizer for Bayer.",
      tech: "React | TypeScript | Next.js | Nest | AWS",
      image: portfolioImages.mockupMinerva,
      link: ""
    },
    {
      id: 1,
      title: "Sima Engenharia",
      description: "Low code app for equipment management.",
      tech: "Figma | Power Apps | Power Fx (lang)",
      image: portfolioImages.sima,
      link: ""
    },
/*     {
      id: 2,
      title: "Moodle PEX",
      description: "Redesign and Front-end for Distance Learning App (UFPB).",
      tech: "Figma | HTML | CSS | JS | PHP",
      image: portfolioImages.mockupPex,
      link: "https://pex.sead.ufpb.br/login/index.php"
    }, */
    {
      id: 3,
      title: "Moodle Classes",
      description: "Redesign and Front-end for Distance Learning App (UFPB).",
      tech: "Figma | HTML | CSS | JS | PHP",
      image: portfolioImages.mockupClasses,
      link: "https://classes.sead.ufpb.br/login/index.php"
    },
    {
      id: 4,
      title: "ONE alpha",
      description: "Management system for Bayer.",
      tech: "JS | jQuery | AJAX | Bootstrap | Sharepoint",
      image: portfolioImages.bayer33,
      link: ""
    },
/*     {
      id: 5,
      title: "ClinPet",
      description: "SPA for veterinary clinics",
      tech: "Angular | TypeScript",
      image: portfolioImages.clinpet,
      link: "https://github.com/RubenFontes/clinpet"
    },
    {
      id: 6,
      title: "UFPB Labs",
      description: "Web design project for UFPB laboratory pages.",
      tech: "Figma | Adobe XD",
      image: portfolioImages.laboratoriosUfpb,
      link: "https://www.behance.net/gallery/159902271/Labs-UFPB"
    }, */
    {
      id: 7,
      title: "Chatbot Dorinha",
      description: "EaD support chatbot (UFPB).",
      tech: "NodeJS | ExpressJS | DialogFlow | HTML | CSS",
      image: portfolioImages.dorinhaChatbot,
      link: "https://github.com/RubenFontes/dialogflow-messenger-integration"
    },
/*     {
      id: 8,
      title: "Todo App",
      description: "Web task manager.",
      tech: "NodeJS | MySQL | Sequelize | Handlebars",
      image: portfolioImages.todoApp,
      link: "https://github.com/RubenFontes/todo-app"
    },
    {
      id: 9,
      title: "ArtStage",
      description: "Website for publishing artistic works.",
      tech: "Figma | WordPress | Elementor | PHP | MySQL",
      image: portfolioImages.artStage,
      link: "https://github.com/RubenFontes/ArtStage"
    },
    {
      id: 10,
      title: "Pedido Expresso",
      description: "SPA with data persistence.",
      tech: "Vue | Node.js | Selenium",
      image: portfolioImages.mockupVue,
      link: "https://github.com/RubenFontes/pulcher-code-challenge"
    }, */
    {
      id: 11,
      title: "Advocatta EJ",
      description: "Web design project for the junior company Advocatta.",
      tech: "Figma | Adobe XD",
      image: portfolioImages.advocatta,
      link: "https://advocatta.org"
    },
/*     {
      id: 12,
      title: "JHR Agro",
      description: "Web design project for JHR Agro farm landing page.",
      tech: "Figma | Adobe XD",
      image: portfolioImages.jhrAgro,
      link: "https://jhragro.com"
    }  */
  ]

  useEffect(() => {
    const handleAnimation = () => {
      const elementos = document.querySelectorAll(".animacao")
      
      elementos.forEach((elemento) => {
        const rect = elemento.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
          elemento.classList.add("animated")
        } else {
          elemento.classList.remove("animated")
        }
      })
    }

    window.addEventListener("load", handleAnimation)
    window.addEventListener("scroll", handleAnimation)

    return () => {
      window.removeEventListener("load", handleAnimation)
      window.removeEventListener("scroll", handleAnimation)
    }
  }, [])

  const handleFigureHover = (figureId, isHovering) => {
    const figcaption = document.getElementById(`figcaption-${figureId}`)
    if (figcaption) {
      figcaption.style.display = isHovering ? "none" : "block"
    }
  }

  return (
    <main className="portfolio-page">
      <div className="animacao portfolio-back-wrap">
        <Link to="/" className="portfolio-back" aria-label="Voltar ao início">
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M12 19l-7-7 7-7"/>
          </svg>
          <span>Voltar</span>
        </Link>
      </div>
    
      <header className="animacao">
        <h1>Projects</h1>
        <p>A sample of my main dev works.<br/>
          For Design works, visit: <a href="https://www.behance.net/rbenf">Ruben Fontes on <span id="linkbehance">Behance</span></a>
        </p>
      </header>
    
      <section className="gallery" id="gallery">
        {projects.map((project) => (
          <article key={project.id} className="animacao">
            <figure id={`figure-${project.id}`}>
              {project.link ? (
                <a href={project.link} target="_blank" rel="noopener noreferrer">
                  <OptimizedImage 
                    src={project.image} 
                    alt={project.title} 
                    className="gallery-image"
                    priority={project.id < 3}
                    onMouseOver={() => handleFigureHover(project.id, true)}
                    onMouseOut={() => handleFigureHover(project.id, false)}
                  />
                </a>
              ) : (
                <OptimizedImage 
                  src={project.image} 
                  alt={project.title} 
                  className="gallery-image"
                  priority={project.id < 3}
                  onMouseOver={() => handleFigureHover(project.id, true)}
                  onMouseOut={() => handleFigureHover(project.id, false)}
                />
              )}
              <figcaption id={`figcaption-${project.id}`}>
                <p><strong>{project.title}</strong>: {project.description}<br/></p>
                <p>{project.tech}</p>
              </figcaption>
            </figure>
          </article>
        ))}
      </section>
    </main>
  )
}

export default Portfolio
