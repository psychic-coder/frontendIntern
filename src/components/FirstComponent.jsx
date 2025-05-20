"use client";

import { useState, useEffect } from "react";
import {
  Bell,
  CheckCheck,
  Filter,
  Search,
  Settings,
} from "lucide-react";
import { motion } from "framer-motion";
import { inboxItems } from "../../data/data";
import { useDispatch, useSelector } from "react-redux";

export default function FirstComponent({ onChatSelect }) {
  const [selectedFilter, setSelectedFilter] = useState("open");
  const [sortBy, setSortBy] = useState("waiting");
  const [isLoading, setIsLoading] = useState(true);

  const dispatch = useDispatch();
  const isDarkMode = useSelector((state) => state.theme.theme === "dark");

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: [0.25, 0.1, 0.25, 1.0],
      },
    }),
  };

  const getPriorityIndicator = (priority) => {
    if (priority === "high") {
      return <div className="w-2 h-2 bg-amber-400 absolute -right-1 -top-1" />;
    }
    return null;
  };

  return (
    <div
      className={`flex flex-col  w-full overflow-hidden border h-full ${
        isDarkMode
          ? "bg-gray-900 border-gray-700 text-white"
          : "bg-gray-50 border-gray-200 text-gray-800"
      }`}
    >
   
      <div
        className={`shadow-md p-5 pb-3 flex justify-between items-center border-b ${
          isDarkMode ? "border-gray-700" : "border-gray-200"
        }`}
      >
        <h1 className="text-lg font-semibold">Your inbox</h1>
        <div className="flex space-x-2">
          {[Search, Bell, Settings].map((Icon, i) => (
            <button
              key={i}
              className={`p-2 rounded-full transition-colors ${
                isDarkMode
                  ? "text-gray-400 hover:text-white hover:bg-gray-800"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
              }`}
            >
              <Icon size={18} />
            </button>
          ))}
        </div>
      </div>

      <div className="flex justify-between items-center px-5 py-3">
        {[selectedFilter, sortBy].map((value, i) => (
          <div className="relative" key={i}>
            <select
              className={`appearance-none ${
                isDarkMode
                  ? "bg-gray-800 border-gray-600 text-white"
                  : "bg-gray-100 border-gray-200 text-gray-700"
              } py-1 pl-3 pr-8 rounded-lg focus:outline-none focus:ring-2 ${
                isDarkMode ? "focus:ring-blue-500" : "focus:ring-blue-400"
              } text-sm font-medium`}
              value={i === 0 ? selectedFilter : sortBy}
              onChange={(e) =>
                i === 0
                  ? setSelectedFilter(e.target.value)
                  : setSortBy(e.target.value)
              }
            >
              {i === 0 ? (
                <>
                  <option value="open">5 Open</option>
                  <option value="all">All messages</option>
                  <option value="unread">Unread</option>
                  <option value="flagged">Flagged</option>
                </>
              ) : (
                <>
                  <option value="waiting">Waiting longest</option>
                  <option value="recent">Most recent</option>
                  <option value="priority">Priority</option>
                </>
              )}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
              <svg
                className={`fill-current h-4 w-4 ${
                  isDarkMode ? "text-white" : "text-gray-700"
                }`}
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
              >
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
              </svg>
            </div>
          </div>
        ))}
      </div>

   
      <div className={`overflow-y-auto flex-grow  `} >
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          </div>
        ) : (
          <ul
            className={`divide-y ${
              isDarkMode ? "divide-gray-700" : "divide-gray-200"
            }`}
          >
            {inboxItems.map((item, index) => (
              <motion.li
                key={item.id}
                custom={index}
                initial="hidden"
                animate="visible"
                onClick={() => onChatSelect(item)}
                variants={itemVariants}
                className={`p-4 transition-colors cursor-pointer relative ${
                  item.isRead
                    ? ""
                    : isDarkMode
                    ? "bg-gray-800"
                    : "bg-blue-50"
                } hover:bg-blue-50 dark:hover:bg-zinc-800`}
              >
                <div className="flex items-start space-x-3">
                  <div className="relative flex-shrink-0">
                    <div
                      className={`w-8 h-8 ${item.avatarColor} rounded-full flex items-center justify-center text-white text-sm font-medium`}
                    >
                      {item.avatar}
                    </div>
                    {getPriorityIndicator(item.priority)}
                    {item.isActive && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-zinc-900"></div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0 hover:text-white">
                    <div className="flex justify-between items-start">
                      <div className="font-medium truncate flex items-center hover:text-white">
                        {item.sender}
                        {item.company && (
                          <span className="ml-1 font-normal text-gray-500 dark:text-zinc-400">
                            • {item.company}
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-500 dark:text-zinc-400 flex items-center">
                        {item.hasAttachment && (
                          <span className="mr-1">
                            <svg
                              className="w-3 h-3"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
                              ></path>
                            </svg>
                          </span>
                        )}
                        {item.time}
                      </div>
                    </div>
                    {item.subtext && (
                      <p className="text-sm text-gray-500 dark:text-zinc-400 truncate mt-0.5">
                        {item.subtext}
                      </p>
                    )}
                    <p className="text-sm text-gray-600 dark:text-zinc-300 mt-1 truncate">
                      {item.message}
                    </p>
                  </div>
                </div>

                {item.id === 2 && (
                  <div className="absolute right-4 bottom-4">
                    <span className="inline-flex h-4 w-4 items-center justify-center rounded-full bg-amber-400 text-xs font-medium text-white">
                      3
                    </span>
                  </div>
                )}
              </motion.li>
            ))}
          </ul>
        )}
      </div>


      <div
        className={`p-3 flex justify-between items-center mt-auto ${
          isDarkMode
            ? "border-gray-700 bg-gray-900"
            : "border-gray-200 bg-white"
        }`}
      >
        {[CheckCheck, Filter].map((Icon, i) => (
          <button
            key={i}
            className={`p-2 rounded-full transition-colors ${
              isDarkMode
                ? "text-gray-400 hover:text-white hover:bg-gray-800"
                : "text-gray-500 hover:text-gray-700 hover:bg-gray-100"
            }`}
          >
            <Icon size={18} />
          </button>
        ))}
      </div>
    </div>
  );
}
