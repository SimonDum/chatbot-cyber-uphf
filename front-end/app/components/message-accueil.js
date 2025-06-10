"use client";


import { useState } from 'react';
import { Send } from 'lucide-react';

export default function CybersecurityChatInput() {
  const [message, setMessage] = useState('');

  const handleSubmit = () => {
    if (message.trim()) {
      console.log('Question envoyée:', message);
      // Logique d'envoi ici
      setMessage('');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit();
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 100%)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px'
    }}>
      <div style={{
        position: 'relative',
        width: '100%',
        maxWidth: '600px'
      }}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Posez votre question sur la cybersécurité..."
          style={{
            width: '100%',
            padding: '18px 70px 18px 24px',
            border: 'none',
            borderRadius: '50px',
            fontSize: '16px',
            outline: 'none',
            backgroundColor: 'white',
            color: '#333',
            boxShadow: '0 8px 25px rgba(0,0,0,0.15)',
            transition: 'all 0.3s ease',
            boxSizing: 'border-box'
          }}
          onFocus={(e) => {
            e.target.style.boxShadow = '0 12px 30px rgba(0,0,0,0.2)';
            e.target.style.transform = 'translateY(-2px)';
          }}
          onBlur={(e) => {
            e.target.style.boxShadow = '0 8px 25px rgba(0,0,0,0.15)';
            e.target.style.transform = 'translateY(0)';
          }}
        />
        <button
          onClick={handleSubmit}
          disabled={!message.trim()}
          style={{
            position: 'absolute',
            right: '8px',
            top: '50%',
            transform: 'translateY(-50%)',
            backgroundColor: '#4a90e2',
            color: 'white',
            border: 'none',
            borderRadius: '50%',
            width: '48px',
            height: '48px',
            cursor: message.trim() ? 'pointer' : 'not-allowed',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 12px rgba(74, 144, 226, 0.4)',
            opacity: message.trim() ? 1 : 0.5
          }}
          onMouseEnter={(e) => {
            if (message.trim()) {
              e.target.style.backgroundColor = '#357abd';
              e.target.style.transform = 'translateY(-50%) scale(1.05)';
              e.target.style.boxShadow = '0 6px 16px rgba(74, 144, 226, 0.5)';
            }
          }}
          onMouseLeave={(e) => {
            if (message.trim()) {
              e.target.style.backgroundColor = '#4a90e2';
              e.target.style.transform = 'translateY(-50%) scale(1)';
              e.target.style.boxShadow = '0 4px 12px rgba(74, 144, 226, 0.4)';
            }
          }}
        >
          <Send size={20} />
        </button>
      </div>
    </div>
  );
}