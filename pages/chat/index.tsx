// @ts-nocheck

import { useState, useEffect } from 'react';
import { useWaku } from "@waku/react";
import { createEncoder, createDecoder } from "@waku/sdk";
import protobuf from 'protobufjs';
import { useLightPush } from "@waku/react";
import { useFilterMessages, useStoreMessages } from "@waku/react";
import { Button } from '../../@/components/ui/button';
import { Input } from '../../@/components/ui/input';

function ChatBubble({ message, isSent }) {
    return (
        <div className={`flex flex-col mb-4 ${isSent ? 'items-end' : 'items-start'}`}>
            <div className="flex justify-between">
                <span className='text-gray-600 text-sm'>
                    {isSent ? "You" : message.from}
                </span>
                <span className="text-gray-600 text-sm">
                    {message.from}
                </span>
                <span className="text-gray-600 text-sm">{new Date(message.timestamp).toUTCString()}</span>
            </div>
            <div className={`bg-${isSent ? 'blue' : 'gray'}-300 rounded-lg p-3 max-w-[70%]`}>
                <span className={`text-${isSent ? 'white' : 'gray'}-800`}>{message.message}</span>
            </div>
        </div>
    );
}

function Index() {
    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const { node, error, isLoading } = useWaku();
    const contentTopic = "/waku-react-guide/1/chat/proto";
    const encoder = createEncoder({ contentTopic });
    const decoder = createDecoder(contentTopic);
    const { push } = useLightPush({ node, encoder });
    const { messages: filterMessages } = useFilterMessages({ node, decoder });
    const { messages: storeMessages } = useStoreMessages({ node, decoder });
    const ChatMessage = new protobuf.Type("ChatMessage")
        .add(new protobuf.Field("timestamp", 1, "uint64"))
        .add(new protobuf.Field("from", 2, "string"))
        .add(new protobuf.Field("to", 3, "string"))
        .add(new protobuf.Field("message", 4, "string"));

    const sendMessage = async () => {
        if (!push || inputMessage.length === 0) return;
        const timestamp = Date.now();
        const protoMessage = ChatMessage.create({
            timestamp: timestamp,
            message: inputMessage
        });
        const payload = ChatMessage.encode(protoMessage).finish();
        const { recipients, errors } = await push({ payload, timestamp });
        if (errors.length === 0) {
            setInputMessage("");
            console.log("MESSAGE PUSHED");
        } else {
            console.log(errors);
        }
    };

    useEffect(() => {
        const allMessages = storeMessages.concat(filterMessages);
        setMessages(allMessages.map((wakuMessage) => {
            if (!wakuMessage.payload) return;
            return ChatMessage.decode(wakuMessage.payload);
        }));
    }, [filterMessages, storeMessages]);

    return (
        <div className="h-full flex flex-col relative top-14 justify-between ">
            <div className="flex-grow overflow-y-auto px-4 py-8 overscrl">
                {messages.map((message, index) => (
                    <ChatBubble key={index} message={message} isSent={message.from === 'senderID'} />
                ))}
            </div>
            <div className="fixed bottom-0 w-full backdrop-blur-xl p-4">
                <div className="flex items-center">
                    <Input
                        type="text"
                        id="message-input"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        className="flex-grow mr-4 border border-gray-300 rounded-md p-2 focus:outline-none "
                        placeholder="Type your message..."
                    />
                    <Button className="px-4 py-2  focus:outline-none" onClick={sendMessage}>Send</Button>
                </div>
            </div>
        </div>
    );
}

export default Index;
