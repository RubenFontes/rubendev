import React, { useState, useEffect, useRef } from 'react'

const MODEL_NAME = 'gemini-3-flash-preview'

function GeminiChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState([
    {
      sender: 'model',
      text: "Hi! Ask about my projects, experience, or availability."
    }
  ])
  const [isLoading, setIsLoading] = useState(false)
  const apiKey = import.meta.env.VITE_GEMINI_API_KEY
  const messagesEndRef = useRef(null)

  const canUseApi = Boolean(apiKey)

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' })
    }
  }, [messages, isOpen])

  const handleToggle = () => {
    setIsOpen((prev) => !prev)
  }

  const buildContentsFromMessages = (allMessages) => {
    return allMessages.map((m) => ({
      role: m.sender === 'user' ? 'user' : 'model',
      parts: [{ text: m.text }]
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()
    const trimmed = input.trim()
    if (!trimmed || !canUseApi || isLoading) return

    const userMessage = { sender: 'user', text: trimmed }
    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/${MODEL_NAME}:generateContent`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-goog-api-key': apiKey
          },
          body: JSON.stringify({
            contents: buildContentsFromMessages(newMessages),
            generationConfig: {
              temperature: 0.9,
              maxOutputTokens: 512
            }
          })
        }
      )

      if (!response.ok) {
        throw new Error(`Erro na API Gemini: ${response.status}`)
      }

      const data = await response.json()
      const candidate = data?.candidates?.[0]
      const parts = candidate?.content?.parts || []
      const modelText = parts.map((p) => p.text).join(' ').trim()

      setMessages((prev) => [
        ...prev,
        {
          sender: 'model',
          text:
            modelText ||
            "Sorry, I couldn't generate a response right now. Please try again in a few moments."
        }
      ])
    } catch (error) {
      console.error(error)
      setMessages((prev) => [
        ...prev,
        {
          sender: 'model',
          text:
            'An error occurred while communicating with the Gemini AI. Please check your connection or try again later.'
        }
      ])
    } finally {
      setIsLoading(false)
    }
  }

  const renderBodyContent = () => {
    if (!canUseApi) {
      return (
        <div className="gemini-chat-messages">
          <div className="gemini-chat-message model">
            <p>
              Para ativar o chat com Gemini, crie um arquivo <code>.env</code> na raiz
              do projeto com a variável{' '}
              <code>VITE_GEMINI_API_KEY</code> definida com sua API key.
            </p>
          </div>
        </div>
      )
    }

    return (
      <>
        <div className="gemini-chat-messages">
          {messages.map((message, index) => (
            <div
              key={index}
              className={`gemini-chat-message ${message.sender}`}
            >
              <p>{message.text}</p>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form className="gemini-chat-input-row" onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter your message..."
            value={input}
            onChange={(event) => setInput(event.target.value)}
            disabled={isLoading}
          />
          <button type="submit" disabled={!input.trim() || isLoading}>
            {isLoading ? 'Sending...' : 'Send'}
          </button>
        </form>
      </>
    )
  }

  return (
    <>
      <button
        type="button"
        className="gemini-chat-button"
        onClick={handleToggle}
        aria-label={isOpen ? 'Fechar chat' : 'Abrir chat'}
      >
        {isOpen ? 'X' : 'AI'}
      </button>

      {isOpen && (
        <section className="gemini-chat-window" aria-label="Chat com IA Gemini">
          <header className="gemini-chat-header">
            <div>
              <h2>AI Assistant</h2>
              <span>English • Portuguese</span>
            </div>
          </header>

          {renderBodyContent()}
        </section>
      )}
    </>
  )
}

export default GeminiChat

