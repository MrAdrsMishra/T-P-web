import React, { useState } from "react";
import {
  Send,
  Search,
  Filter,
  Archive,
  Star,
  Reply,
  MoreVertical,
  ArrowLeft,
} from "lucide-react";

const Queries = () => {
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [replyText, setReplyText] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const messages = [
    {
      id: 1,
      student: "Sarah Smith",
      subject: "Question about JavaScript Test",
      preview:
        "Hi, I had a question about the closure concept in the recent JavaScript test...",
      content:
        'Hi, I had a question about the closure concept in the recent JavaScript test. Could you please explain why my answer was marked incorrect? I thought I understood the concept but apparently not. Here\'s what I answered: "A closure is a function that has access to variables from its outer scope." Thank you for your help!',
      timestamp: "2 hours ago",
      status: "unread",
      priority: "high",
      category: "academic",
    },
    {
      id: 2,
      student: "Mike Johnson",
      subject: "Test Schedule Inquiry",
      preview:
        "Could you please let me know when the next aptitude test will be scheduled?",
      content:
        "Could you please let me know when the next aptitude test will be scheduled? I want to make sure I prepare adequately. Also, will there be any study materials provided beforehand?",
      timestamp: "4 hours ago",
      status: "read",
      priority: "medium",
      category: "schedule",
    },
    {
      id: 3,
      student: "Emily Brown",
      subject: "Technical Issue with Platform",
      preview:
        "I'm experiencing some technical difficulties accessing the coding test section...",
      content:
        "I'm experiencing some technical difficulties accessing the coding test section. Every time I try to submit my code, I get an error message. This has happened multiple times now. Could you please help me resolve this issue?",
      timestamp: "6 hours ago",
      status: "unread",
      priority: "urgent",
      category: "technical",
    },
    {
      id: 1,
      student: "Sarah Smith",
      subject: "Question about JavaScript Test",
      preview:
        "Hi, I had a question about the closure concept in the recent JavaScript test...",
      content:
        'Hi, I had a question about the closure concept in the recent JavaScript test. Could you please explain why my answer was marked incorrect? I thought I understood the concept but apparently not. Here\'s what I answered: "A closure is a function that has access to variables from its outer scope." Thank you for your help!',
      timestamp: "2 hours ago",
      status: "unread",
      priority: "high",
      category: "academic",
    },
    {
      id: 2,
      student: "Mike Johnson",
      subject: "Test Schedule Inquiry",
      preview:
        "Could you please let me know when the next aptitude test will be scheduled?",
      content:
        "Could you please let me know when the next aptitude test will be scheduled? I want to make sure I prepare adequately. Also, will there be any study materials provided beforehand?",
      timestamp: "4 hours ago",
      status: "read",
      priority: "medium",
      category: "schedule",
    },
    {
      id: 3,
      student: "Emily Brown",
      subject: "Technical Issue with Platform",
      preview:
        "I'm experiencing some technical difficulties accessing the coding test section...",
      content:
        "I'm experiencing some technical difficulties accessing the coding test section. Every time I try to submit my code, I get an error message. This has happened multiple times now. Could you please help me resolve this issue?",
      timestamp: "6 hours ago",
      status: "unread",
      priority: "urgent",
      category: "technical",
    },
    {
      id: 4,
      student: "John Doe",
      subject: "Request for Score Review",
      preview:
        "I would like to request a review of my recent verbal test score...",
      content:
        "I would like to request a review of my recent verbal test score. I believe there might have been an error in the grading. I'm particularly concerned about questions 15-20 where I feel my answers were correct but were marked wrong.",
      timestamp: "1 day ago",
      status: "replied",
      priority: "medium",
      category: "academic",
    },
    {
      id: 5,
      student: "Alex Wilson",
      subject: "Study Materials Request",
      preview:
        "Can you recommend some additional study materials for the upcoming coding test?",
      content:
        "Can you recommend some additional study materials for the upcoming coding test? I want to make sure I'm well-prepared, especially for data structures and algorithms. Any specific books or online resources you'd recommend?",
      timestamp: "2 days ago",
      status: "read",
      priority: "low",
      category: "resources",
    },
  ];

  const filteredMessages = messages.filter(
    (message) =>
      message.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status) => {
    switch (status) {
      case "unread":
        return <div className="w-2 h-2 bg-primary-700 rounded-full"></div>;
      case "read":
        return <div className="w-2 h-2 bg-gray-300 rounded-full"></div>;
      case "replied":
        return <Reply className="w-4 h-4 text-green-600" />;
      default:
        return null;
    }
  };

  const handleReply = () => {
    if (replyText.trim()) {
      console.log("Sending reply:", replyText);
      setReplyText("");
      // Here you would typically send the reply to your backend
    }
  };
  return (
    <div className="h-screen flex flex-col box-border p-4">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b">
        <div>
          <h3 className="text-md text-text-secondary">
            Manage student queries and communications
          </h3>
        </div>
        <div className="flex items-center space-x-3">
          <button className="btn-outline flex items-center">
            <Archive className="w-4 h-4 mr-2" /> Archive
          </button>
          <button className="btn-primary flex items-center">
            <Send className="w-4 h-4 mr-2" /> Compose
          </button>
        </div>
      </div>

      <div className="flex-1 relative overflow-y-auto">
        {/* Chat List View */}
        <div
          className={`absolute inset-0 flex flex-col transition-all duration-300 ${
            selectedMessage
              ? "translate-x-[-100%] opacity-0"
              : "translate-x-0 opacity-100"
          }`}
        >
          {/* Search */}
          <div className="p-4 border-b">
            <div className="relative">
              <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search messages..."
                className="form-input pl-10 w-full"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          {/* Chat List */}
          <div className="flex flex-col overflow-y-auto">
            {filteredMessages.map((message) => (
              <div
                key={message.id}
                onClick={() => setSelectedMessage(message)}
                className={`p-2 cursor-pointer hover:bg-gray-100 transition ${
                  selectedMessage?.id === message.id ? "bg-blue-50" : ""
                } border border-neutral-200 rounded-lg`}
              >
                <div className="flex justify-between items-center">
                  <h4 className="text-sm font-semibold text-gray-800 truncate">
                    {message.student}
                  </h4>
                  <span className="text-xs text-gray-400">
                    {message.timestamp}
                  </span>
                </div>
                <p className="text-xs text-gray-500 truncate">
                  {message.preview}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Chat Dialog View */}
        <div
          className={`absolute inset-0 bg-white flex flex-col transition-all duration-300 ${
            selectedMessage
              ? "translate-x-0 opacity-100"
              : "translate-x-full opacity-0"
          }`}
        >
          {selectedMessage && (
            <>
              {/* Chat Header */}
              <div className="flex items-center justify-between border-b p-2">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setSelectedMessage(null)}
                    className="p-2 rounded-lg hover:bg-gray-100"
                  >
                    <ArrowLeft className="w-5 h-5 text-gray-600" />
                  </button>
                  <div>
                    <h2 className="text-lg font-semibold text-text-primary">
                      {selectedMessage.subject}
                    </h2>
                    <p className="text-sm text-gray-500">
                      From: {selectedMessage.student}
                    </p>
                  </div>
                </div>
                <span className="text-xs text-gray-400">
                  {selectedMessage.timestamp}
                </span>
              </div>

              {/* Chat Body */}
              <div className="flex-1 overflow-y-auto p-6">
                <p className="text-gray-800 leading-relaxed whitespace-pre-wrap">
                  {selectedMessage.content}
                </p>
              </div>

              {/* Reply Box */}
              <div className="border-t p-4">
                <textarea
                  className="form-input w-full h-32 resize-none overflow-hidden transition-all duration-300 ease-in-out"
                  placeholder="Type your reply here..."
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  onInput={(e) => {
                    e.target.style.height = "auto";
                    e.target.style.height = `${e.target.scrollHeight}px`;
                  }}
                />

                <div className="flex justify-end space-x-3">
                  <button className="btn-outline">Save Draft</button>
                  <button
                    className="btn-primary flex items-center"
                    onClick={handleReply}
                  >
                    <Send className="w-4 h-4 mr-2" /> Send
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Queries;
