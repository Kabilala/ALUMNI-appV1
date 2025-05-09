import React, { useState, useEffect } from "react";
import { navigate } from "gatsby";
import Layout from "../components/Layout";
import Button from "../components/Button";
import { useAuth } from "../context/AuthContext";

const Chats = () => {
  const { currentUser, loading } = useAuth();
  const [activeChat, setActiveChat] = useState(null);
  const [message, setMessage] = useState("");
  const [isMobile, setIsMobile] = useState(false);
  
  // Conversations factices
  const [conversations, setConversations] = useState([
    {
      id: 1,
      contact: {
        id: 101,
        name: "Marie Laurent",
        image: null,
        lastSeen: "il y a 5 min"
      },
      messages: [
        { id: 1, text: "Bonjour, comment vas-tu ?", sender: "them", time: "10:30" },
        { id: 2, text: "Très bien merci ! Et toi ?", sender: "me", time: "10:32" },
        { id: 3, text: "Bien aussi. Je voulais te demander si tu serais disponible pour un café la semaine prochaine ?", sender: "them", time: "10:35" },
        { id: 4, text: "Bien sûr, avec plaisir ! Quand es-tu libre ?", sender: "me", time: "10:40" }
      ],
      unread: 0
    },
    {
      id: 2,
      contact: {
        id: 102,
        name: "Thomas Petit",
        image: null,
        lastSeen: "en ligne"
      },
      messages: [
        { id: 1, text: "Salut ! J'ai vu que tu travaillais chez Tech Solutions maintenant.", sender: "me", time: "Hier" },
        { id: 2, text: "Oui c'est ça ! Je suis développeur backend là-bas depuis 6 mois.", sender: "them", time: "Hier" },
        { id: 3, text: "Super ! Comment ça se passe ?", sender: "me", time: "Hier" }
      ],
      unread: 1
    },
    {
      id: 3,
      contact: {
        id: 103,
        name: "Jean Dupont",
        image: null,
        lastSeen: "il y a 2h"
      },
      messages: [
        { id: 1, text: "Bonjour, je suis intéressé par ton parcours professionnel. Pourrais-tu me parler de ton expérience en tant que développeur frontend ?", sender: "them", time: "Lun" },
        { id: 2, text: "Bien sûr, avec plaisir ! Que voudrais-tu savoir plus précisément ?", sender: "me", time: "Lun" }
      ],
      unread: 0
    }
  ]);

  // Détecter les appareils mobiles
  useEffect(() => {
    const checkIfMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Vérifier au chargement initial
    checkIfMobile();
    
    // Ajouter un event listener pour les changements de taille
    window.addEventListener("resize", checkIfMobile);
    
    // Nettoyer l'event listener
    return () => window.removeEventListener("resize", checkIfMobile);
  }, []);
  
  // Rediriger si l'utilisateur n'est pas connecté
  useEffect(() => {
    if (!loading && !currentUser) {
      navigate("/login");
    }
  }, [currentUser, loading]);
  
  // Définir le premier chat comme actif par défaut
  useEffect(() => {
    if (conversations.length > 0 && !activeChat && !isMobile) {
      setActiveChat(conversations[0]);
    }
  }, [conversations, activeChat, isMobile]);
  
  const handleSendMessage = () => {
    if (!message.trim()) return;
    
    const updatedConversations = conversations.map(conv => {
      if (conv.id === activeChat.id) {
        const newMessage = {
          id: Date.now(),
          text: message,
          sender: "me",
          time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };
        
        return {
          ...conv,
          messages: [...conv.messages, newMessage]
        };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setMessage("");
    
    // Mettre à jour le chat actif
    const updatedActiveChat = updatedConversations.find(conv => conv.id === activeChat.id);
    setActiveChat(updatedActiveChat);
  };
  
  const handleChatSelect = (conversation) => {
    // Marquer comme lu
    const updatedConversations = conversations.map(conv => {
      if (conv.id === conversation.id) {
        return { ...conv, unread: 0 };
      }
      return conv;
    });
    
    setConversations(updatedConversations);
    setActiveChat(conversation);
  };
  
  const goBackToList = () => {
    setActiveChat(null);
  };
  
  if (loading) {
    return (
      <Layout>
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-darkslategray-100"></div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="py-8 md:py-12">
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-comfortaa font-bold text-darkslategray-100 mb-2">
            Messages
          </h1>
          <p className="text-smi md:text-mini text-dimgray">
            Échangez avec vos contacts du réseau alumni
          </p>
        </div>
        
        <div className="bg-whitesmoke rounded-xl overflow-hidden h-[32rem] flex">
          {/* Liste des conversations (toujours visible sur desktop, visible uniquement sans chat actif sur mobile) */}
          {(!isMobile || !activeChat) && (
            <div className="w-full md:w-1/3 border-r border-gainsboro-200 overflow-y-auto">
              <div className="p-4 border-b border-gainsboro-200">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Rechercher une conversation..."
                    className="w-full px-3 py-2 pr-8 rounded-3xs border border-gainsboro-100 focus:outline-none focus:ring-1 focus:ring-darkslategray-100 text-sm"
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 absolute right-3 top-2.5 text-dimgray"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </div>
              </div>
              
              {conversations.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 p-4 text-center">
                  <div className="text-3xl mb-2">💬</div>
                  <p className="text-darkslategray-100 font-medium mb-2">
                    Aucune conversation
                  </p>
                  <p className="text-sm text-dimgray mb-4">
                    Commencez à discuter avec vos contacts en recherchant des alumni
                  </p>
                  <Button
                    variant="outline"
                    size="small"
                    onClick={() => navigate("/search")}
                  >
                    Rechercher des contacts
                  </Button>
                </div>
              ) : (
                conversations.map((conversation) => (
                  <div
                    key={conversation.id}
                    className={`border-b border-gainsboro-200 cursor-pointer ${
                      activeChat?.id === conversation.id ? "bg-gainsboro-200" : "hover:bg-gainsboro-200"
                    }`}
                    onClick={() => handleChatSelect(conversation)}
                  >
                    <div className="p-3 flex items-center">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gainsboro-100 rounded-full flex items-center justify-center text-lg text-darkslategray-100 font-bold mr-3">
                          {conversation.contact.name.charAt(0)}
                        </div>
                        {conversation.contact.lastSeen === "en ligne" && (
                          <div className="absolute bottom-0 right-3 w-3 h-3 bg-green-500 rounded-full border-2 border-whitesmoke"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center mb-1">
                          <span className="font-medium text-darkslategray-100 truncate">
                            {conversation.contact.name}
                          </span>
                          <span className="text-xs text-dimgray">
                            {conversation.messages.length > 0
                              ? conversation.messages[conversation.messages.length - 1].time
                              : ""}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <p className="text-sm text-dimgray truncate max-w-[70%]">
                            {conversation.messages.length > 0
                              ? conversation.messages[conversation.messages.length - 1].text
                              : ""}
                          </p>
                          {conversation.unread > 0 && (
                            <span className="bg-darkslategray-100 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                              {conversation.unread}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
          
          {/* Zone de conversation (visible sur desktop, visible uniquement avec chat actif sur mobile) */}
          {(!isMobile || activeChat) && (
            <div className="w-full md:w-2/3 flex flex-col">
              {activeChat ? (
                <>
                  {/* En-tête de la conversation */}
                  <div className="p-3 border-b border-gainsboro-200 flex items-center bg-white">
                    {isMobile && (
                      <button
                        onClick={goBackToList}
                        className="mr-2 text-dimgray hover:text-darkslategray-100"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15 19l-7-7 7-7"
                          />
                        </svg>
                      </button>
                    )}
                    <div className="w-10 h-10 bg-gainsboro-100 rounded-full flex items-center justify-center text-lg text-darkslategray-100 font-bold mr-3">
                      {activeChat.contact.name.charAt(0)}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-darkslategray-100">
                        {activeChat.contact.name}
                      </div>
                      <div className="text-xs text-dimgray">
                        {activeChat.contact.lastSeen}
                      </div>
                    </div>
                    <button className="text-dimgray hover:text-darkslategray-100">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                        />
                      </svg>
                    </button>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-4 bg-gainsboro-200 bg-opacity-30">
                    {activeChat.messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`mb-4 flex ${
                          msg.sender === "me" ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`max-w-[70%] rounded-t-xl p-3 ${
                            msg.sender === "me"
                              ? "bg-darkslategray-100 text-white rounded-bl-xl"
                              : "bg-white text-darkslategray-100 rounded-br-xl"
                          }`}
                        >
                          <div className="text-sm mb-1">{msg.text}</div>
                          <div className={`text-xs ${
                            msg.sender === "me" ? "text-gray-300" : "text-dimgray"
                          } text-right`}>
                            {msg.time}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Zone de saisie */}
                  <div className="p-3 border-t border-gainsboro-200 bg-white">
                    <div className="flex">
                      <button className="text-dimgray hover:text-darkslategray-100 mr-2">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                          />
                        </svg>
                      </button>
                      <input
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Tapez votre message..."
                        className="flex-1 bg-gainsboro-200 bg-opacity-30 rounded-3xs px-3 py-2 focus:outline-none focus:ring-1 focus:ring-darkslategray-100"
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            handleSendMessage();
                          }
                        }}
                      />
                      <button
                        className="ml-2 text-darkslategray-100 hover:text-black disabled:text-dimgray"
                        onClick={handleSendMessage}
                        disabled={!message.trim()}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-6 w-6"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                          />
                        </svg>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-4 text-center">
                  <div className="text-5xl mb-4">💬</div>
                  <h3 className="text-lg font-medium text-darkslategray-100 mb-2">
                    Sélectionnez une conversation
                  </h3>
                  <p className="text-sm text-dimgray max-w-md">
                    Choisissez une conversation dans la liste pour commencer à discuter ou recherchez un contact.
                  </p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
};

export default Chats;