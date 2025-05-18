import { useChatStore } from "@/store/chatStore";
import React, { useEffect } from "react";
import SidebarSkeleton from "./SideBarSkeleton";
import { Users } from "lucide-react";
import { useAuthStore } from "@/store/authStore";

const Sidebar = () => {
  const { getUsers, users, setSelectedUser, selectedUser, isUsersLoading } =
    useChatStore();
  const { onlineUsers } = useAuthStore();
  const filteredUsers = users;

  useEffect(() => {
    getUsers();
    console.log("done");
  }, [getUsers]);

  if (isUsersLoading) return <SidebarSkeleton />;
  return (
    <aside className="h-full w-20 lg:w-72 border-r border-primary flex flex-col">
      <div className="border-b border-primary w-full p-5">
        <div className="flex items-center gap-2 justify-center">
          <Users className="md:size-3 size-6" />
          <span className="font-medium text-xs hidden lg:block">Contacts</span>
        </div>
        {/* todo- online toggle filter */}
      </div>
      <div className="overflow-y-auto w-full  p-2">
        {filteredUsers.map((user) => (
          <button
            key={user._id}
            onClick={() => setSelectedUser(user)}
            className={`
              max-w-full min-w-[95%] p-2 flex items-center gap-3
  hover:bg-zinc-100 dark:hover:bg-zinc-800 rounded-xl hover:rounded-2xl border hover:scale-102 group transition-all duration-300
  ${
    selectedUser?._id === user._id
      ? "bg-zinc-100 dark:bg-zinc-800 ring-1 ring-zinc-300 dark:ring-zinc-600"
      : ""
  }
            `}
          >
            <div className="relative mx-auto lg:mx-0">
              <img
                src={user.profilePicture || "/avatar.png"}
                alt={user.name}
                className="size-10 object-cover rounded-full group-hover:size-5 transition-all duration-300"
              />
              {onlineUsers.includes(user._id) && (
                <span
                  className="absolute bottom-0 right-0 size-3 bg-green-500 
                  rounded-full ring-2 ring-zinc-900"
                />
              )}
            </div>

            {/* User info - only visible on larger screens */}
            <div className="hidden lg:block text-left min-w-0 ">
              <div className="font-medium truncate group-hover:text-2xl transition-all duration-300">{(user.fullName)}</div>
              <div className="text-sm text-zinc-400">
                {onlineUsers.includes(user._id) ? "Online" : "Offline"}
              </div>
            </div>
          </button>
        ))}

        {filteredUsers.length === 0 && (
          <div className="text-center text-zinc-500 py-4">No online users</div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
