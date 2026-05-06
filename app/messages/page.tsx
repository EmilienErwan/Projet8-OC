"use client";

import Link from "next/link";
import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { useEffect, useRef } from "react";

const conversations = Array.from({ length: 8 }, (_, index) => ({
  id: index + 1,
  user: "Utilisateur",
  time: "11:04 am",
  preview: "Bonjour, votre appartement est-il disp...",
  unread: index < 3,
}));


const messages = [
  { id: 1, fromMe: false, text: "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?" },
  { id: 2, fromMe: false, text: "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?" },
  { id: 3, fromMe: true, text: "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?" },
  { id: 4, type: "date", text: "03 Septembre 2025" },
  { id: 5, fromMe: false, text: "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?" },
  { id: 6, fromMe: true, text: "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?" },
  { id: 7, fromMe: false, text: "Bonjour, votre appartement est-il disponible pour le week-end du 12 au 14 octobre ?" },
];

export default function MessagesPage() {
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const [selectedConversation, setSelectedConversation] = useState<number | null>(null);
  const [newMessage, setNewMessage] = useState("");

  const showDetail = selectedConversation !== null;

  function sendMessage(event: React.FormEvent) {
    event.preventDefault();

    if (!newMessage.trim()) return;

    alert("Message envoyé !");
    setNewMessage("");
  }
  useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [selectedConversation]);

  return (
    <section className={`messages-page ${showDetail ? "show-detail" : ""}`}>
      <aside className="messages-sidebar">
        <Link href="/" className="back-link">
          ← Retour
        </Link>

        <h1>Messages</h1>

        <div className="conversation-list">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              className="conversation-item"
              onClick={() => setSelectedConversation(conversation.id)}
            >
              <span className="conversation-avatar" />

              <span className="conversation-content">
                <strong>{conversation.user}</strong>
                <small>{conversation.preview}</small>
              </span>

              <span className="conversation-meta">
                <small>{conversation.time}</small>
                {conversation.unread && <span className="unread-dot" />}
              </span>
            </button>
          ))}
        </div>
      </aside>

      <article className="chat-panel">
        <button className="mobile-back-chat" onClick={() => setSelectedConversation(null)}>
          ← Retour
        </button>

        <div className="chat-messages">
          {messages.map((message) =>
            "type" in message ? (
              <div key={message.id} className="date-separator">
                <span>{message.text}</span>
              </div>
            ) : (
              <div
                key={message.id}
                className={`message-row ${message.fromMe ? "from-me" : "from-other"}`}
              >
                {!message.fromMe && <span className="message-avatar" />}

                <div>
                  <p className="message-meta">Utilisateur • 11:04pm</p>
                  <p className="message-bubble">{message.text}</p>
                </div>

                {message.fromMe && <span className="message-avatar" />}
              </div>
            )
          )}
          <div ref={messagesEndRef} />
        </div>

        <form className="message-form" onSubmit={sendMessage}>
          <input
            value={newMessage}
            onChange={(event) => setNewMessage(event.target.value)}
            placeholder="Envoyer un message"
            aria-label="Envoyer un message"
          />

          <button type="submit" aria-label="Envoyer">
            <ArrowUp size={18} />
          </button>
        </form>
      </article>
    </section>
  );
}