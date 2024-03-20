// @ts-nocheck

import { useState, useEffect } from 'react';
import { useWaku } from "@waku/react";
import { createEncoder, createDecoder } from "@waku/sdk";
import protobuf from 'protobufjs';
import { useLightPush } from "@waku/react";
import { useFilterMessages, useStoreMessages } from "@waku/react";

function Index() {
    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState([]);

    // Update the inputMessage state as the user input changes
    const handleInputChange = (e) => {
        setInputMessage(e.target.value);
    };

    // Create and start a Light Node
    const { node, error, isLoading } = useWaku();

    // Create a message encoder and decoder
    const contentTopic = "/waku-react-guide/1/chat/proto";
    const encoder = createEncoder({ contentTopic });
    const decoder = createDecoder(contentTopic);

    const { push } = useLightPush({ node, encoder });
    const { messages: filterMessages } = useFilterMessages({ node, decoder });
    const { messages: storeMessages } = useStoreMessages({ node, decoder });


    // Create a message structure using Protobuf
    const ChatMessage = new protobuf.Type("ChatMessage")
        .add(new protobuf.Field("timestamp", 1, "uint64"))
        .add(new protobuf.Field("from", 2, "string"))
        .add(new protobuf.Field("to", 3, "string"))
        .add(new protobuf.Field("message", 4, "string"));

    // Send the message using Light Push
    const sendMessage = async () => {
        if (!push || inputMessage.length === 0) return;

        // Create a new message object
        const timestamp = Date.now();
        const protoMessage = ChatMessage.create({
            timestamp: timestamp,
            message: inputMessage
        });

        // Serialise the message and push to the network
        const payload = ChatMessage.encode(protoMessage).finish();
        const { recipients, errors } = await push({ payload, timestamp });

        // Check for errors
        if (errors.length === 0) {
            setInputMessage("");
            console.log("MESSAGE PUSHED");
        } else {
            console.log(errors);
        }
    };

    // Render both past and new messages
    useEffect(() => {
        const allMessages = storeMessages.concat(filterMessages);
        setMessages(allMessages.map((wakuMessage) => {
            if (!wakuMessage.payload) return;
            return ChatMessage.decode(wakuMessage.payload);
        }));
    }, [filterMessages, storeMessages]);

    return (
        <div className="h-screen flex flex-col">
            <div className="flex-grow overflow-y-auto px-4 py-8">
                {messages.map((message, index) => (
                    <div key={index} className="flex flex-col mb-4">
                        <div className="flex justify-between">
                            <span className="text-gray-600 text-sm">{new Date(message.timestamp).toUTCString()}</span>
                        </div>
                        <div className="bg-gray-200 rounded-lg p-3">
                            <span className="text-gray-800">{message.message}</span>
                        </div>
                    </div>
                ))}
            </div>
            <div className="bg-gray-100 p-4">
                <div className="flex items-center">
                    <input
                        type="text"
                        id="message-input"
                        value={inputMessage}
                        onChange={handleInputChange}
                        className="flex-grow mr-4 border border-gray-300 rounded-md p-2 focus:outline-none"
                        placeholder="Type your message..."
                    />
                    <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none" onClick={sendMessage}>Send</button>
                </div>
            </div>
        </div>
    );
}

export default Index;
