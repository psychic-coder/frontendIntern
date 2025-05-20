"use client";
import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FiSend, FiMessageSquare, FiMoon, FiSun } from 'react-icons/fi';
import { IoMdHelp } from 'react-icons/io';
import { RiRefund2Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/theme/themeSlice';

const suggestedQuestions = [
  { id: 1, text: "How do I get a refund?", icon: <RiRefund2Fill className="mr-2" /> },
  { id: 2, text: "What's my account balance?", icon: <IoMdHelp className="mr-2" /> },
  { id: 3, text: "How to contact support?", icon: <FiMessageSquare className="mr-2" /> }
];

export default function ThirdComponent() {
  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.theme === 'dark');
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [showInitialMessage, setShowInitialMessage] = useState(true);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleSendMessage = () => {
    if (inputValue.trim() === '') return;
    const newMessage = { text: inputValue, isUser: true };
    setMessages([...messages, newMessage]);
    setInputValue('');
    setShowSuggestions(false);
    setShowInitialMessage(false);
    setTimeout(() => {
      const response = generateAIResponse(inputValue);
      setMessages(prev => [...prev, { text: response, isUser: false }]);
    }, 800);
  };

  const generateAIResponse = (question) => {
    const lowerQuestion = question.toLowerCase();
    if (lowerQuestion.includes('refund')) {
      return "Refunds can be processed within 30 days of purchase. Please visit our Returns Center to initiate a refund request.";
    } else if (lowerQuestion.includes('contact') || lowerQuestion.includes('support')) {
      return "You can contact our support team 24/7 at support@example.com or call +1 (555) 123-4567.";
    } else if (lowerQuestion.includes('account')) {
      return "For account-related questions, please check the Account Settings section or contact our support team.";
    } else {
      return "I'm here to help! Could you please provide more details about your question?";
    }
  };

  const handleSuggestionClick = (question) => {
    setInputValue(question);
  };

  return (
    <div className={`w-full flex flex-col min-h-screen ${isDarkMode ? 'bg-gray-900 text-gray-100' : 'bg-gray-50 text-gray-900'}`}>
      <header className={`py-4 px-6 shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <h1 className="text-xl font-bold flex items-center">
            <FiMessageSquare className="mr-2 text-blue-500" />
            Fin AI Copilot
          </h1>
          <button
            onClick={() => dispatch(toggleTheme())}
            className={`p-2 rounded-full ${isDarkMode ? 'bg-gray-700 text-yellow-300' : 'bg-gray-200 text-gray-700'}`}
          >
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </button>
        </div>
      </header>

      <main className="flex-grow p-4 max-w-4xl mx-auto w-full overflow-y-auto flex flex-col items-center justify-center">
        {showInitialMessage && messages.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center px-4 py-8"
          >
            <h2 className="text-xl font-extrabold mb-2">Hi, I'm Fin AI Copilot</h2>
            <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Ask me anything about this conversation.
            </p>
          </motion.div>
        )}

        <div className={`space-y-4 w-full ${showInitialMessage && messages.length === 0 ? 'hidden' : ''}`}>
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-2 ${
                    message.isUser
                      ? isDarkMode
                        ? 'bg-blue-600 text-white'
                        : 'bg-blue-500 text-white'
                      : isDarkMode
                      ? 'bg-gray-700'
                      : 'bg-white border border-gray-200'
                  }`}
                >
                  {message.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </main>

      <footer className={`sticky bottom-0 w-full ${isDarkMode ? 'bg-gray-900' : 'bg-[#f9fafb]'}`}>
        {showSuggestions && messages.length <= 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className={`px-4 pt-4 pb-2 max-w-4xl mx-auto ${showInitialMessage && messages.length === 0 ? '' : 'hidden'}`}
          >
            <div className=" pt-4 w-full">
              <h3 className={`text-sm mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>Suggested</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2">
                {suggestedQuestions.map((q) => (
                  <motion.button
                    key={q.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSuggestionClick(q.text)}
                    className={`flex items-center px-4 py-2 rounded-lg text-sm ${
                      isDarkMode
                        ? 'bg-gray-700 hover:bg-gray-600'
                        : 'bg-white border border-gray-200 hover:bg-gray-50'
                    }`}
                  >
                    {q.icon}
                    {q.text}
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div className={`p-4  ${isDarkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="max-w-4xl mx-auto">
            <div className="relative flex">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Ask a question..."
                className={`flex-grow py-3 px-4 rounded-xl focus:outline-none focus:ring-2 ${
                  isDarkMode
                    ? 'bg-gray-700 text-white focus:ring-blue-500'
                    : 'bg-white focus:ring-blue-400'
                }`}
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className={`absolute right-2 top-1/2 transform -translate-y-1/2 p-2 rounded-full ${
                  inputValue.trim()
                    ? 'bg-blue-500 text-white'
                    : isDarkMode
                    ? 'bg-gray-600 text-gray-400'
                    : 'bg-gray-300 text-gray-500'
                }`}
              >
                <FiSend />
              </motion.button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}