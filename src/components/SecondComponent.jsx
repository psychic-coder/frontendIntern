'use client';

import { useState, useEffect, useRef } from 'react';
import { MoreHorizontal, X, Send, Paperclip, Image, ChevronDown, Smile } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTheme } from '../../redux/theme/themeSlice';
import { messageData } from '../../data/data';
import { motion, AnimatePresence } from 'framer-motion';

export default function SecondComponent({ onClose }) {
  const theme = useSelector((state) => state.theme.theme);
  const dispatch = useDispatch();
  const [isDarkMode, setIsDarkMode] = useState(theme === 'dark');
  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const messageEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    setIsDarkMode(theme === 'dark');
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, [theme]);

  const handleThemeToggle = () => {
    dispatch(toggleTheme());
  };

  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    const initialMessages = messageData.slice(-visibleCount);
    setMessages(initialMessages);
  }, [visibleCount]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleCloseWithAnimation = () => {
    setIsClosing(true);
   
    setTimeout(() => {
      onClose();
    }, 400);
  };

  const handleSendMessage = () => {
    if (inputValue.trim()) {
      const newMessage = {
        id: messages.length + 1,
        sender: 'Luis Easton',
        avatar: 'L',
        content: inputValue,
        timestamp: 'now',
        isUser: true,
      };

      setMessages((prev) => [...prev, newMessage]);
      setInputValue('');

      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        setMessages((prev) => [
          ...prev,
          {
            id: prev.length + 1,
            sender: 'Support Agent',
            avatar: 'S',
            content:
              'Thank you for providing that information. I can help process your refund request. Could you please provide your order number?',
            timestamp: 'now',
            isUser: false,
          },
        ]);
      }, 2000);
    }
  };

  const handleScroll = () => {
    const { scrollTop } = messagesContainerRef.current;
    if (scrollTop === 0 && messages.length < messageData.length) {
      setTimeout(() => {
        const moreMessages = messageData.slice(Math.max(0, messageData.length - visibleCount - 5), messageData.length);
        setVisibleCount((prev) => prev + 5);
        setMessages(moreMessages);
      }, 500);
    }
  };

 
  const containerVariants = {
    hidden: { 
      opacity: 0,
      x: 100,
      scale: 0.95
    },
    visible: { 
      opacity: 1, 
      x: 0,
      scale: 1,
      transition: { 
        type: "spring",
        damping: 20, 
        stiffness: 100,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      x: 100,
      scale: 0.95,
      transition: { 
        duration: 0.4, 
        ease: "easeInOut",
        when: "afterChildren",
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const childVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: { 
      y: -10, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const headerVariants = {
    hidden: { y: -50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 150
      }
    },
    exit: { 
      y: -20, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  const toolbarVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 150,
        delay: 0.2
      }
    },
    exit: { 
      y: 20, 
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        className={`flex flex-col h-[100vh] w-full col-span-3 ${
          isDarkMode ? 'bg-gray-900' : 'bg-white'
        } shadow-lg overflow-hidden relative`}
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={containerVariants}
      >
       
        <motion.div 
          className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 z-0 backdrop-blur-sm pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: isClosing ? 1 : 0 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        />

      
        <motion.div
          className={`flex items-center justify-between px-4 py-3 ${
            isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
          } border-b sticky top-0 z-10`}
          variants={headerVariants}
        >
          <motion.div 
            className="flex items-center space-x-3"
            variants={childVariants}
          >
            <motion.div
              className={`w-8 h-8 ${
                isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
              } rounded-full flex items-center justify-center text-white font-medium`}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
            >
              L
            </motion.div>
            <h2 className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>Luis Easton</h2>
          </motion.div>
          <motion.div 
            className="flex items-center space-x-2"
            variants={childVariants}
          >
            <motion.button
              className={`p-1.5 ${
                isDarkMode
                  ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              } rounded-full transition-colors`}
              whileHover={{ scale: 1.1, rotate: 15 }}
              whileTap={{ scale: 0.9 }}
            >
              <MoreHorizontal size={18} />
            </motion.button>
            <motion.button
              onClick={handleCloseWithAnimation}
              className={`ml-1 ${
                isDarkMode ? 'bg-gray-800 hover:bg-gray-700' : 'bg-gray-900 hover:bg-gray-800'
              } text-white py-1 px-3 rounded-lg transition-colors flex items-center text-sm font-medium`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <X size={16} className="mr-1" /> Close
            </motion.button>
          </motion.div>
        </motion.div>

      
        <motion.div
          ref={messagesContainerRef}
          onScroll={handleScroll}
          className={`flex-1 overflow-y-auto p-4 ${isDarkMode ? 'bg-gray-800' : 'bg-gray-50'}`}
          variants={childVariants}
        >
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20, x: message.isUser ? -20 : 20 }}
                animate={{ opacity: 1, y: 0, x: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ 
                  duration: 0.3,
                  delay: index * 0.05
                }}
                className={`flex mb-4 ${message.isUser ? 'justify-start' : 'justify-end'}`}
              >
                {message.isUser && (
                  <motion.div
                    className={`w-8 h-8 ${
                      isDarkMode ? 'bg-indigo-600' : 'bg-indigo-500'
                    } rounded-full flex-shrink-0 flex items-center justify-center text-white mr-2`}
                    whileHover={{ scale: 1.1 }}
                  >
                    {message.avatar}
                  </motion.div>
                )}
                <motion.div 
                  className="max-w-[70%]"
                  whileHover={{ scale: 1.01 }}
                >
                  <motion.div
                    className={`px-4 py-3 rounded-2xl ${
                      message.isUser
                        ? isDarkMode
                          ? 'bg-gray-700 text-gray-200'
                          : 'bg-gray-200 text-gray-800'
                        : isDarkMode
                        ? 'bg-blue-900 text-gray-200'
                        : 'bg-blue-100 text-gray-800'
                    }`}
                    whileTap={{ scale: 0.98 }}
                  >
                    <p className="text-sm">{message.content}</p>
                  </motion.div>
                  <div
                    className={`flex items-center mt-1 text-xs ${
                      isDarkMode ? 'text-gray-400' : 'text-gray-500'
                    } ${message.isUser ? 'justify-start' : 'justify-end'}`}
                  >
                    {message.timestamp}
                    {!message.isUser && message.seen && (
                      <span className={`ml-2 ${isDarkMode ? 'text-green-400' : 'text-green-500'}`}>Seen</span>
                    )}
                  </div>
                </motion.div>
                {!message.isUser && (
                  <motion.div
                    className={`w-8 h-8 ${
                      isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
                    } rounded-full flex-shrink-0 flex items-center justify-center text-white ml-2`}
                    whileHover={{ scale: 1.1 }}
                  >
                    S
                  </motion.div>
                )}
              </motion.div>
            ))}

            {isTyping && (
              <motion.div 
                initial={{ opacity: 0 }} 
                animate={{ opacity: 1 }} 
                className="flex justify-end mb-4"
              >
                <div className="max-w-[70%]">
                  <motion.div
                    className={`px-4 py-3 ${isDarkMode ? 'bg-blue-900' : 'bg-blue-100'} rounded-2xl`}
                    animate={{ 
                      scale: [1, 1.02, 1],
                      transition: { repeat: Infinity, duration: 1.5 }
                    }}
                  >
                    <div className="flex space-x-1">
                      <motion.div
                        className={`w-2 h-2 ${isDarkMode ? 'bg-gray-400' : 'bg-gray-500'} rounded-full`}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity }}
                      ></motion.div>
                      <motion.div
                        className={`w-2 h-2 ${isDarkMode ? 'bg-gray-400' : 'bg-gray-500'} rounded-full`}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      ></motion.div>
                      <motion.div
                        className={`w-2 h-2 ${isDarkMode ? 'bg-gray-400' : 'bg-gray-500'} rounded-full`}
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      ></motion.div>
                    </div>
                  </motion.div>
                </div>
                <motion.div
                  className={`w-8 h-8 ${
                    isDarkMode ? 'bg-blue-600' : 'bg-blue-500'
                  } rounded-full flex-shrink-0 flex items-center justify-center text-white ml-2`}
                  whileHover={{ scale: 1.1 }}
                >
                  S
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
          <div ref={messageEndRef} />
        </motion.div>

       
        <motion.div
          className={`p-3 border-t ${
            isDarkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'
          } sticky bottom-0 z-10`}
          variants={toolbarVariants}
        >
          <motion.div 
            className="flex items-center mb-2"
            variants={childVariants}
          >
            <div className="flex">
              <motion.button
                className={`p-1.5 ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                } rounded-full transition-colors`}
                whileHover={{ scale: 1.15, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Paperclip size={18} />
              </motion.button>
              <motion.button
                className={`p-1.5 ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                } rounded-full transition-colors`}
                whileHover={{ scale: 1.15, rotate: -15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Image size={18} />
              </motion.button>
              <motion.button
                className={`p-1.5 ${
                  isDarkMode
                    ? 'text-gray-300 hover:text-white hover:bg-gray-800'
                    : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
                } rounded-full transition-colors`}
                whileHover={{ scale: 1.15, rotate: 15 }}
                whileTap={{ scale: 0.9 }}
              >
                <Smile size={18} />
              </motion.button>
            </div>
            <div className="ml-auto flex items-center">
              <motion.button
                className={`flex items-center ${
                  isDarkMode ? 'text-gray-300 hover:text-white' : 'text-gray-500 hover:text-gray-700'
                } text-sm`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>Chat</span>
                <ChevronDown size={16} />
              </motion.button>
            </div>
          </motion.div>

          <motion.div
            className={`flex items-center ${
              isDarkMode ? 'bg-gray-700' : 'bg-gray-100'
            } rounded-lg pl-3 pr-1 py-1`}
            whileHover={{ scale: 1.01 }}
            variants={childVariants}
          >
            <input
              type="text"
              placeholder="Type a message..."
              className={`flex-1 bg-transparent outline-none text-sm ${
                isDarkMode ? 'text-gray-100 placeholder-gray-400' : 'text-gray-800 placeholder-gray-500'
              }`}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSendMessage();
              }}
            />
            <motion.button
              onClick={handleSendMessage}
              className={`p-2 rounded-lg ${
                inputValue.trim()
                  ? isDarkMode
                    ? 'text-blue-400 hover:bg-blue-800'
                    : 'text-blue-500 hover:bg-blue-50'
                  : isDarkMode
                  ? 'text-gray-500'
                  : 'text-gray-400'
              } transition-colors ml-1`}
              disabled={!inputValue.trim()}
              whileHover={{ scale: 1.1, rotate: 5 }}
              whileTap={{ scale: 0.9, rotate: 0 }}
            >
              <Send size={18} />
            </motion.button>
          </motion.div>

          <motion.div 
            className={`mt-1 text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}
            variants={childVariants}
          >
            Use ⌘K for shortcuts
          </motion.div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}