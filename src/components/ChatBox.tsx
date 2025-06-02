
import { useState, useRef, useEffect } from 'react';
import { useToast } from "@/components/ui/use-toast";
import { MessagesSquare, X, Send, Loader2, Minimize } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { supabase } from '@/integrations/supabase/client';
import { Input } from '@/components/ui/input';

interface Message {
  type: 'user' | 'bot';
  content: string;
}

const ChatBox = () => {
  const [isOpen, setIsOpen] = useState(true); // Start open by default
  const [isMinimized, setIsMinimized] = useState(false);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage('');
    setMessages(prev => [...prev, { type: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      console.log("Sending message to chat-with-avi function:", userMessage);
      const { data, error } = await supabase.functions.invoke('chat-with-avi', {
        body: { message: userMessage }
      });

      console.log("Response from chat-with-avi:", { data, error });
      
      if (error) {
        throw new Error(`Function error: ${error.message}`);
      }

      if (!data || !data.reply) {
        throw new Error('No reply received from Avi');
      }

      setMessages(prev => [...prev, { type: 'bot', content: data.reply }]);
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        variant: "destructive",
        title: "Error",
        description: `Failed to get response from Avi: ${error instanceof Error ? error.message : 'Unknown error'}`,
      });
      // Add an error message in the chat
      setMessages(prev => [...prev, { type: 'bot', content: "Sorry, I'm having trouble connecting right now. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMinimize = () => {
    setIsMinimized(true);
  };

  const handleRestore = () => {
    setIsMinimized(false);
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
    setIsMinimized(false);
  };

  // Show minimized button if chat is minimized
  if (isMinimized) {
    return (
      <Button
        onClick={handleRestore}
        className="fixed bottom-4 right-4 rounded-full p-4 bg-primary text-white shadow-lg hover:bg-primary/90 z-50"
      >
        <MessagesSquare className="w-6 h-6" />
      </Button>
    );
  }

  // Show chat button if not open
  if (!isOpen) {
    return (
      <Button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 rounded-full p-4 bg-primary text-white shadow-lg hover:bg-primary/90 z-50"
      >
        <MessagesSquare className="w-6 h-6" />
      </Button>
    );
  }

  return (
    <div className="fixed top-4 right-4 w-[350px] h-[500px] bg-background rounded-lg shadow-xl flex flex-col border border-border animate-fade-in-up z-50">
      <div className="p-4 bg-primary text-white rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">How can I help you?</h3>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" onClick={handleMinimize} className="text-white hover:text-white/90 h-8 w-8">
            <Minimize className="w-4 h-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={handleClose} className="text-white hover:text-white/90 h-8 w-8">
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-background">
        {messages.length === 0 && (
          <div className="text-center text-muted-foreground mt-8">
            <p>Hi! I'm Avi, your PC hardware and networking specialist.</p>
            <p className="mt-2">How can I help you today?</p>
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                msg.type === 'user'
                  ? 'bg-primary text-primary-foreground'
                  : msg.type === 'bot' 
                    ? 'bg-secondary/20 text-foreground border border-border/30 dark:text-white dark:border-white/10' 
                    : 'bg-muted text-foreground'
              }`}
            >
              {msg.content}
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSubmit} className="p-4 border-t border-border flex gap-2 bg-background">
        <Input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type your message..."
          className="flex-1 bg-background text-foreground border-input"
          disabled={isLoading}
        />
        <Button type="submit" disabled={isLoading} size="icon">
          {isLoading ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Send className="w-4 h-4" />
          )}
        </Button>
      </form>
    </div>
  );
};

export default ChatBox;
