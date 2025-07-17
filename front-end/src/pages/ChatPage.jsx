import ChatBot from '../components/ChatBot';

const ChatPage = () => {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6 text-center">AI Chat Assistant</h1>
      <ChatBot />
    </div>
  );
};

export default ChatPage;