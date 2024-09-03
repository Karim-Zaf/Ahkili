import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { IoIosSend, IoMdSend, IoIosChatboxes } from "react-icons/io";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import Image from "next/image";
import Message from "@/components/Message";

interface MessageType {
  type: number;
  message: string;
}

export default function Home() {
  const [ans, setAns] = useState('');
  const [req, setReq] = useState('');
  const [inputValue, setInputValue] = useState('');
  const [messages, setMessages] = useState<MessageType[]>([]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div className="h-full w-full flex flex-col justify-center items-center ">
      <Card className="xl:w-[65%] w-[90%] mt-8">
        <CardHeader className="flex flex-row justify-center items-center bg-slate-50 gap-5 rounded-t-xl">
          <Image alt="logo" src="/favicon.ico" width={50} height={50} />
          <CardTitle className="text-3xl">Ahkili</CardTitle>
        </CardHeader>

        <CardContent className="h-[67vh] overflow-y-auto">
          {messages.length === 0 && (
            <h1 className="text-center text-3xl m-auto h-full w-full flex flex-col justify-center items-center">
              Welcome to Ahkili, Ask me anything!
              <IoIosChatboxes className="mt-7" />
            </h1>
          )}
          {messages.map((message, index) => (
            <Message key={index} type={message.type} message={message.message} />
          ))}
          <div ref={messagesEndRef} />
        </CardContent>

        <CardFooter className="w-full bg-slate-50 pt-4 rounded-b-xl">
          <form
            className="w-full h-[9vh] flex gap-5 justify-center items-center"
            onSubmit={async (e) => {
              e.preventDefault();
              const prev = messages;
              setInputValue('');
              setMessages(prevMessages => [
                ...prevMessages,
                { type: 0, message: req },
                { type: 1, message: '...' },
              ]);
              const res = await fetch('/api/getAnswer?description=' + req);
              const answer = await res.json();
              setAns(answer.output);
              setMessages(prevMessages => [
                ...prevMessages,
                { type: 1, message: answer.output },
              ]);
              setMessages([
                ...prev,
                { type: 0, message: req },
                { type: 1, message: answer.output },
              ]);
            }}
          >
            <Textarea
              className="w-[80%] h-full text-xl resize-none"
              placeholder="Type your message here ..."
              onChange={(e) => {
                setReq(e.target.value);
                setInputValue(e.target.value);
              }}
              value={inputValue}
            />
            <Button variant="default" className="h-full w-24 text-3xl ">
              <IoMdSend />
            </Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  );
}