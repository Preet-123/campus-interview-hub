
import React, { useState, useEffect } from "react";
import { MessageSquare, Users, Calendar, Clock, User, Upload, FileText, Mic, MicOff, Send } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [selectedSection, setSelectedSection] = useState<null | "gd" | "pi" | "resume" | "liveroom">(null);
  const [selectedGdTopic, setSelectedGdTopic] = useState<string>("");
  const [meetLink, setMeetLink] = useState<string>("");
  const [isDiscussionOpen, setIsDiscussionOpen] = useState(false);
  const [isChatVisible, setIsChatVisible] = useState(false);
  const [gdStartTime, setGdStartTime] = useState<Date | null>(null);
  const [currentTime, setCurrentTime] = useState<Date>(new Date());
  const [isResumeModalOpen, setIsResumeModalOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [tips, setTips] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [isVoiceActive, setIsVoiceActive] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isChatEnabled, setIsChatEnabled] = useState(true);

  const gdData = [
    { id: 1, topic: "Importance of Communication" },
    { id: 2, topic: "Impact of Social Media on Youth" },
    { id: 3, topic: "AI: Boon or Bane?" },
    { id: 4, topic: "Work-Life Balance" },
    { id: 5, topic: "Climate Change and Sustainability" },
  ];

  const generateMeetLink = () => {
    const randomId = Math.random().toString(36).substring(7);
    const url = `https://meet.google.com/${randomId}`;
    setMeetLink(url);
    toast({
      title: "Meet Link Generated",
      description: "Your Google Meet link has been created successfully.",
    });
  };

  const handleSectionChange = (section: "gd" | "pi" | "resume" | "liveroom") => {
    setSelectedSection(section);
    setIsDiscussionOpen(false);
    setSelectedGdTopic("");
    setIsChatVisible(false);
    setIsResumeModalOpen(section === "resume");
  };

  const handleGdTopicChange = (topic: string) => {
    setSelectedGdTopic(topic);
  };

  const handleStartDiscussion = () => {
    if (selectedGdTopic && gdStartTime) {
      setIsChatVisible(true);
      toast({
        title: "Discussion Started",
        description: `GD has started for topic: ${selectedGdTopic}`,
      });
    }
  };

  const handleGdStartTimeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setGdStartTime(new Date(event.target.value));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleResumeUpload = async () => {
    if (!file) {
      toast({
        title: "No File Selected",
        description: "Please upload a resume file",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    // Simulating API call
    setTimeout(() => {
      setTips(
        "1. Add more quantifiable achievements\n2. Improve your skills section with relevant technologies\n3. Make sure your contact information is up to date\n4. Add a concise personal summary"
      );
      setLoading(false);
      toast({
        title: "Resume Analyzed",
        description: "Tips have been generated based on your resume",
      });
    }, 2000);
  };

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = `${username || "You"}: ${message}`;
      setMessages([...messages, newMessage]);
      setMessage("");
    }
  };

  const handleVoiceToggle = () => {
    setIsVoiceActive(!isVoiceActive);
    if (!isVoiceActive) {
      setIsSpeaking(true);
      toast({
        title: "Voice Typing Enabled",
        description: "Start speaking, your voice will be converted to text",
      });
      // Simulate voice typing
      setTimeout(() => setIsSpeaking(false), 5000);
    } else {
      setIsSpeaking(false);
    }
  };

  useEffect(() => {
    // Simulate initial username prompt in a real implementation
    setUsername("Faculty Member");
    
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const isTimeToStartGd = gdStartTime && currentTime >= gdStartTime;

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 via-white to-purple-100">
      {/* Header */}
      <header className="bg-white shadow-md py-4">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="text-indigo-600 font-bold text-2xl">SpeakSpace</div>
          </div>
          <div className="flex items-center gap-4">
            <div className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
              Faculty Portal
            </div>
            <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
              <User size={18} />
            </div>
            <button className="bg-red-500 hover:bg-red-600 text-white px-4 py-1 rounded-md text-sm transition-colors">
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-wrap gap-4 justify-center">
          {/* Discussion Type Cards */}
          <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-3">Discussion Types</h2>
            <p className="text-gray-600 text-sm mb-4">Select the type of discussion you want to create</p>
            <div className="grid grid-cols-2 gap-4">
              <button
                onClick={() => handleSectionChange("gd")}
                className={`flex flex-col items-center justify-center p-6 rounded-lg transition-all ${
                  selectedSection === "gd"
                    ? "bg-indigo-100 border-2 border-indigo-300"
                    : "bg-gray-50 hover:bg-indigo-50"
                }`}
              >
                <MessageSquare className="text-indigo-600 mb-2" size={24} />
                <span className="text-gray-800 font-medium">Group Discussion</span>
              </button>
              <button
                onClick={() => handleSectionChange("pi")}
                className={`flex flex-col items-center justify-center p-6 rounded-lg transition-all ${
                  selectedSection === "pi"
                    ? "bg-indigo-100 border-2 border-indigo-300"
                    : "bg-gray-50 hover:bg-indigo-50"
                }`}
              >
                <User className="text-green-600 mb-2" size={24} />
                <span className="text-gray-800 font-medium">Personal Interview</span>
              </button>
              <button
                onClick={() => handleSectionChange("resume")}
                className={`flex flex-col items-center justify-center p-6 rounded-lg transition-all ${
                  selectedSection === "resume"
                    ? "bg-indigo-100 border-2 border-indigo-300"
                    : "bg-gray-50 hover:bg-indigo-50"
                }`}
              >
                <Upload className="text-blue-600 mb-2" size={24} />
                <span className="text-gray-800 font-medium">Upload Resume & Get Tips</span>
              </button>
              <button
                onClick={() => handleSectionChange("liveroom")}
                className={`flex flex-col items-center justify-center p-6 rounded-lg transition-all ${
                  selectedSection === "liveroom"
                    ? "bg-indigo-100 border-2 border-indigo-300"
                    : "bg-gray-50 hover:bg-indigo-50"
                }`}
              >
                <Users className="text-purple-600 mb-2" size={24} />
                <span className="text-gray-800 font-medium">Live Room</span>
              </button>
            </div>
          </div>

          {/* Upcoming Discussions */}
          <div className="bg-white rounded-xl shadow-md p-6 w-full max-w-md">
            <h2 className="text-xl font-semibold mb-3">Upcoming Discussions</h2>
            <p className="text-gray-600 text-sm mb-4">Your scheduled sessions</p>
            
            <div className="space-y-4">
              <div className="border-l-4 border-indigo-500 pl-4 py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">AI Ethics in Education</h3>
                    <div className="flex items-center mt-1">
                      <span className="bg-indigo-100 text-indigo-800 text-xs px-2 py-1 rounded">Group Discussion</span>
                      <span className="text-gray-500 text-xs ml-2">Apr 15, 2025</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                </div>
              </div>

              <div className="border-l-4 border-green-500 pl-4 py-2">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium">Student Assessment Techniques</h3>
                    <div className="flex items-center mt-1">
                      <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Personal Interview</span>
                      <span className="text-gray-500 text-xs ml-2">Apr 18, 2025</span>
                    </div>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="bg-white rounded-xl shadow-lg p-8 max-w-4xl mx-auto">
          {/* GD Section */}
          {selectedSection === "gd" && (
            <div>
              <h2 className="text-2xl font-bold text-center mb-6">Create New Discussion</h2>
              <p className="text-gray-600 text-center mb-8">Schedule a group discussion session for students</p>
              
              <h3 className="font-medium mb-4">Select Discussion Topic</h3>
              <div className="space-y-3 mb-8">
                {gdData.map((item) => (
                  <div key={item.id} className="flex items-center">
                    <input
                      type="radio"
                      id={`gd-${item.id}`}
                      name="gdTopic"
                      value={item.topic}
                      checked={selectedGdTopic === item.topic}
                      onChange={() => handleGdTopicChange(item.topic)}
                      className="w-4 h-4 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor={`gd-${item.id}`} className="ml-3 text-gray-700">
                      {item.topic}
                    </label>
                  </div>
                ))}
              </div>

              <h3 className="font-medium mb-2">Schedule Discussion</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <div className="relative">
                    <input
                      type="date"
                      className="w-full p-2 pr-10 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      onChange={handleGdStartTimeChange}
                    />
                    <Calendar className="absolute right-3 top-2.5 text-gray-400" size={18} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                  <div className="relative">
                    <input
                      type="time"
                      className="w-full p-2 pr-10 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <Clock className="absolute right-3 top-2.5 text-gray-400" size={18} />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                  <select className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="1 hour">1 hour</option>
                    <option value="30 minutes">30 minutes</option>
                    <option value="45 minutes">45 minutes</option>
                    <option value="1.5 hours">1.5 hours</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Maximum Participants</label>
                  <select className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                    <option value="10 students">10 students</option>
                    <option value="5 students">5 students</option>
                    <option value="15 students">15 students</option>
                    <option value="20 students">20 students</option>
                  </select>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  onClick={handleStartDiscussion}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-md transition-colors"
                >
                  Schedule Group Discussion
                </button>
              </div>

              {isChatVisible && (
                <div className="mt-8 p-4 border rounded-lg">
                  <h3 className="font-bold mb-2">Live Discussion: {selectedGdTopic}</h3>
                  <div className="h-60 overflow-y-auto border p-2 mb-2 rounded">
                    {messages.map((msg, index) => (
                      <div key={index} className="mb-2 p-2 bg-gray-100 rounded">
                        {msg}
                      </div>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Type your message..."
                      className="flex-1 p-2 border rounded"
                    />
                    <button
                      onClick={handleSendMessage}
                      className="bg-indigo-600 text-white p-2 rounded"
                    >
                      <Send size={18} />
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* PI Section */}
          {selectedSection === "pi" && (
            <div>
              <h2 className="text-2xl font-bold text-center mb-6">Create New Discussion</h2>
              <p className="text-gray-600 text-center mb-8">Schedule a personal interview session with a student</p>
              
              <div className="space-y-6">
                <h3 className="font-medium">Interview Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Student</label>
                    <select className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                      <option value="">Select a student</option>
                      <option value="student1">John Doe</option>
                      <option value="student2">Jane Smith</option>
                      <option value="student3">Mark Johnson</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Interview Type</label>
                    <select className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                      <option value="technical">Technical</option>
                      <option value="hr">HR</option>
                      <option value="behavioral">Behavioral</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                    <div className="relative">
                      <input
                        type="date"
                        className="w-full p-2 pr-10 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <Calendar className="absolute right-3 top-2.5 text-gray-400" size={18} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                    <div className="relative">
                      <input
                        type="time"
                        className="w-full p-2 pr-10 border rounded-md focus:ring-indigo-500 focus:border-indigo-500"
                      />
                      <Clock className="absolute right-3 top-2.5 text-gray-400" size={18} />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <select className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500">
                      <option value="30 minutes">30 minutes</option>
                      <option value="45 minutes">45 minutes</option>
                      <option value="1 hour">1 hour</option>
                    </select>
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Interview Notes</label>
                  <textarea 
                    className="w-full p-2 border rounded-md focus:ring-indigo-500 focus:border-indigo-500 h-24"
                    placeholder="Add any specific notes or instructions for this interview"
                  ></textarea>
                </div>
                
                <div className="flex justify-between items-center">
                  <button
                    onClick={generateMeetLink}
                    className="bg-green-600 hover:bg-green-700 text-white font-medium px-4 py-2 rounded-md transition-colors"
                  >
                    Generate Meeting Link
                  </button>
                  
                  <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-6 py-2 rounded-md transition-colors">
                    Schedule Interview
                  </button>
                </div>
                
                {meetLink && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm font-medium text-green-800">Interview Link:</p>
                    <a 
                      href={meetLink} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 underline text-sm break-all"
                    >
                      {meetLink}
                    </a>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Resume Upload Section */}
          {selectedSection === "resume" && (
            <div>
              <h2 className="text-2xl font-bold text-center mb-6">Upload Resume & Get Tips</h2>
              <p className="text-gray-600 text-center mb-8">Upload a resume to receive AI-powered feedback and improvement suggestions</p>
              
              <div className="max-w-md mx-auto">
                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Upload Resume</label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <input
                      type="file"
                      onChange={handleFileChange}
                      className="hidden"
                      id="resume-upload"
                      accept=".pdf,.doc,.docx"
                    />
                    <label
                      htmlFor="resume-upload"
                      className="cursor-pointer flex flex-col items-center"
                    >
                      <Upload className="h-10 w-10 text-gray-400 mb-2" />
                      <span className="text-sm font-medium text-gray-700">
                        {file ? file.name : "Click to upload or drag and drop"}
                      </span>
                      <span className="text-xs text-gray-500 mt-1">PDF, DOC, or DOCX (max 5MB)</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex justify-center">
                  <button
                    onClick={handleResumeUpload}
                    disabled={!file || loading}
                    className={`px-6 py-2 rounded-md font-medium ${
                      !file || loading
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-blue-600 text-white hover:bg-blue-700"
                    } transition-colors`}
                  >
                    {loading ? "Analyzing..." : "Upload & Get Tips"}
                  </button>
                </div>
                
                {tips && (
                  <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
                    <h3 className="font-medium text-blue-800 mb-2">Resume Improvement Tips:</h3>
                    <div className="bg-white p-3 rounded border border-blue-100 max-h-60 overflow-y-auto">
                      <pre className="whitespace-pre-wrap text-sm text-gray-700">{tips}</pre>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Live Room Section */}
          {selectedSection === "liveroom" && (
            <div>
              <h2 className="text-2xl font-bold text-center mb-6">Live Discussion Room</h2>
              <p className="text-gray-600 text-center mb-8">Join or create a real-time discussion session with students</p>
              
              <div className="border rounded-lg overflow-hidden">
                <div className="bg-gradient-to-r from-indigo-500 to-purple-600 text-white p-3 flex justify-between items-center">
                  <h3 className="font-medium">Live Discussion: Campus Interview Preparation</h3>
                  <div className="flex items-center gap-2">
                    <span className="bg-green-500 text-xs px-2 py-1 rounded-full">Active</span>
                    <span className="text-sm">Participants: 5</span>
                  </div>
                </div>
                
                <div className="h-80 overflow-y-auto p-4 bg-gray-50">
                  {messages.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-500">
                      <MessageSquare size={36} className="mb-2 opacity-50" />
                      <p>No messages yet. Start the conversation!</p>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      {messages.map((msg, index) => (
                        <div
                          key={index}
                          className={`max-w-3/4 p-3 rounded-lg ${
                            msg.startsWith(username)
                              ? "bg-indigo-100 ml-auto"
                              : "bg-white border ml-0"
                          }`}
                        >
                          {msg}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="p-3 border-t bg-white">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleVoiceToggle}
                      className={`p-2 rounded-full ${
                        isVoiceActive
                          ? "bg-red-500 text-white"
                          : "bg-gray-200 text-gray-700"
                      }`}
                    >
                      {isVoiceActive ? <MicOff size={18} /> : <Mic size={18} />}
                    </button>
                    <input
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={isSpeaking ? "Listening..." : "Type a message..."}
                      className="flex-1 p-2 border rounded-lg"
                    />
                    <button
                      onClick={handleSendMessage}
                      disabled={!message.trim()}
                      className={`p-2 rounded-full ${
                        !message.trim()
                          ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                          : "bg-indigo-600 text-white hover:bg-indigo-700"
                      }`}
                    >
                      <Send size={18} />
                    </button>
                  </div>
                  {isSpeaking && (
                    <div className="mt-2 text-sm text-center text-indigo-600 animate-pulse">
                      Listening... Speak now
                    </div>
                  )}
                </div>
              </div>
              
              <div className="mt-6 flex justify-between">
                <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium px-4 py-2 rounded-md transition-colors">
                  End Session
                </button>
                <button className="bg-indigo-600 hover:bg-indigo-700 text-white font-medium px-4 py-2 rounded-md transition-colors">
                  Invite Students
                </button>
              </div>
            </div>
          )}
          
          {/* Default Welcome Screen */}
          {!selectedSection && (
            <div className="text-center py-10">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Welcome to Campus Interview Hub</h2>
              <p className="text-gray-600 mb-8 max-w-lg mx-auto">
                Select an option from the discussion types to get started with managing group discussions, 
                personal interviews, resume reviews, or live discussions.
              </p>
              <div className="flex justify-center gap-4 flex-wrap">
                <button
                  onClick={() => handleSectionChange("gd")}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Group Discussion
                </button>
                <button
                  onClick={() => handleSectionChange("pi")}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Personal Interview
                </button>
                <button
                  onClick={() => handleSectionChange("resume")}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Resume Review
                </button>
                <button
                  onClick={() => handleSectionChange("liveroom")}
                  className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors"
                >
                  Live Room
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
