import { useAuthStore } from '@/store/authStore';
import { useChatStore } from '@/store/chatStore'
import { X } from 'lucide-react';
import React from 'react'

const ChatHeader = () => {

  const {selectedUser, setSelectedUser} = useChatStore();
  const {onlineUsers} = useAuthStore();

  return (
    <div>
          <div className="p-2.5 border-b border-base-300">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          {/* Avatar */}
          <div className="avatar">
            <div className="size-10 rounded-full relative">
              <img src={selectedUser.profilePicture || "/avatar.png"} alt={selectedUser.fullName} />
            </div>
          </div>

          {/* User info */}
          <div>
            <h3 className="font-medium">{selectedUser.fullName}</h3>
            <p className="text-sm text-base-content/70">
              {onlineUsers.includes(selectedUser._id) ? "Online" : "Offline"}
            </p>
          </div>
        </div>

        {/* Close button */}
        <button onClick={() => setSelectedUser(null)} className='group cursor-pointer'>
          <X  className='group-hover:rotate-90 transition-all duration-300'/>
        </button>
      </div>
    </div>

    </div>
  )
}

export default ChatHeader
