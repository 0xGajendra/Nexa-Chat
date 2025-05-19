import { useChatStore } from "@/store/chatStore";
import React, { useEffect, useRef } from "react";
import ChatHeader from "../ChatHeader/ChatHeader";
import MessageInput from "../MessageInput/MessageInput";
import MessageSkeleton from "../Messages/MessageSkeleton";
import { useAuthStore } from "@/store/authStore";
import { formatMessageTime } from "@/lib/utils";

const ChatContainer = () => {
  const { messages, getMessages, isMessageLoading, selectedUser, subscribeToMessages, unsubscribeFromMessages } =
    useChatStore();
  const { authUser } = useAuthStore();

  const messageEndRef = useRef(null);

  useEffect(() => {
    getMessages(selectedUser._id);

    subscribeToMessages();

    //cleanup function
    return ()=> unsubscribeFromMessages();

  }, [selectedUser._id, getMessages,subscribeToMessages, unsubscribeFromMessages]);

  useEffect(() => {
    if(messageEndRef.current && messages)
        messageEndRef.current.scrollIntoView({behavior: "smooth"});
  }, [messages])
  

  if (isMessageLoading)
    return (
      <div className="flex-1 flex flex-col overflow-auto">
        <ChatHeader />
        <MessageSkeleton />
      </div>
    );

  return (
    <div className="ml-2 w-full flex flex-1  flex-col overflow-auto ">
      <ChatHeader />

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => {
          const isSender = message.senderId === authUser._id;
          const isSelectedUser = message.senderId === selectedUser._id;
          
          return (
            <div
              key={message._id}
              className={`flex items-start space-x-2 w-full ${
                isSelectedUser ? "justify-start" : "justify-end"
              }`}
              ref={messageEndRef}
            >
              {/* Avatar */}
              <div
                className={`shrink-0 size-10 rounded-full border overflow-hidden ${
                  isSelectedUser ? "" : "order-2"
                }`}
              >
                <img
                  src={
                    isSender
                      ? authUser.profilePicture || "/avatar.png"
                      : selectedUser.profilePicture || "/avatar.png"
                  }
                  alt="profile-picture"
                  className="object-cover size-full"
                />
              </div>

              {/* Message Content */}
              <div
                className={`flex flex-col max-w-xs ${
                  isSelectedUser
                    ? "items-start text-left"
                    : "items-end text-right"
                }`}
              >
                {/* Timestamp */}
                <time className="text-xs text-muted-foreground mb-1 opacity-70">
                  {formatMessageTime(message.createdAt)}
                </time>

                {/* Message Bubble */}
                <div
                  className={`px-4 py-2 rounded-lg text-sm break-words ${
                    isSelectedUser
                      ? "bg-muted text-muted-foreground rounded-bl-none"
                      : "bg-primary text-primary-foreground rounded-br-none"
                  }`}
                >
                  {/* Image if exists */}
                  {message.image && (
                    <img
                      src={message.image}
                      alt="Attachment"
                      className="sm:max-w-[200px] rounded-md mb-2"
                    />
                  )}
                  {/* Text if exists */}
                  {message.text && <p className="text-xs">{message.text}</p>}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <MessageInput />
    </div>
  );
};

export default ChatContainer;
