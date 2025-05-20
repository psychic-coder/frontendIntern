'use client';

import React, { useState, useEffect } from 'react';
import FirstComponent from '../components/FirstComponent';
import SecondComponent from '../components/SecondComponent';
import ThirdComponent from '../components/ThirdComponent';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

const Home = () => {
  const [selectedChat, setSelectedChat] = useState(null);
  const [showChat, setShowChat] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setIsTransitioning(true);
    setTimeout(() => {
      setShowChat(true);
      setIsTransitioning(false);
    }, 100);
  };

  const handleCloseChat = () => {
    setShowChat(false);
  };

  const theme = useSelector((state) => state.theme.theme);
  

  const thirdComponentRef = React.useRef(null);
  
  return (
    <div className={`h-screen w-full grid ${theme === 'dark' ? 'bg-gray-900' : 'bg-white'} ${showChat ? 'grid-cols-3' : 'grid-cols-2'} grid-flow-col overflow-hidden relative transition-all duration-500`}>
     
      <AnimatePresence>
        {isTransitioning && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-10 bg-gradient-to-r from-blue-500/5 to-purple-500/5 backdrop-blur-sm pointer-events-none"
            transition={{ duration: 0.3 }}
          />
        )}
      </AnimatePresence>


      <motion.div 
        layout 
        transition={{ 
          type: "spring", 
          stiffness: 100, 
          damping: 20
        }}
        className="col-span-1"
      >
        <FirstComponent onChatSelect={handleChatSelect} />
      </motion.div>
      
   
      <AnimatePresence mode="wait">
        {showChat ? (
          <>
          
            <SecondComponent onClose={handleCloseChat} />
            
           
            <motion.div
              key="third-with-chat"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ 
                type: "spring", 
                stiffness: 100, 
                damping: 20,
                delay: 0.2 
              }}
              className="col-span-1"
            >
            
              {thirdComponentRef.current ? 
                React.cloneElement(thirdComponentRef.current) : 
                <ThirdComponent ref={(el) => {
                 
                  if (!thirdComponentRef.current) {
                    thirdComponentRef.current = <ThirdComponent />;
                  }
                }} />
              }
            </motion.div>
          </>
        ) : (
          <motion.div
            key="third-full"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 100, 
              damping: 20 
            }}
            className="col-span-1"
          >
           
            {thirdComponentRef.current ? 
              React.cloneElement(thirdComponentRef.current) : 
              <ThirdComponent ref={(el) => {
             
                if (!thirdComponentRef.current) {
                  thirdComponentRef.current = <ThirdComponent />;
                }
              }} />
            }
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;