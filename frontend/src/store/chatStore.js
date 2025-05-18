import { axiosInstance } from "@/lib/axios";
import toast from "react-hot-toast";
import { create } from "zustand";

export const useChatStore = create((set, get ) => ({
  messages: [],
  users: [],
  selectedUser: null,
  isUsersLoading: false,
  isMessageLoading: false,

  getUsers: async () => {
    set({ isUsersLoading: true });
    try {
      const res = await axiosInstance.get("/api/v1/message/users");
      set({ users: res.data });
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      set({ isUsersLoading: false });
    }
  },

  getMessages: async (userId) => {
    set({ isMessageLoading: false });
    try {
        const res = await axiosInstance.get(`/api/v1/message/${userId}`);
        set({ messages: res.data });
    } catch (error) {
        toast.error(error.response.data.message);
    }
    finally{
        set({isMessageLoading: false});
    }
  },

  sendMessage: async(data)=> {
    const {selectedUser, messages} = get();
    try {
      const res = await axiosInstance.post(`/api/v1/message/send/${selectedUser._id}`, data);
      set({messages: [...messages, res.data]});
    } catch (error) {
      toast.error(error.response.data.message);
    }
  }
  ,
  //optimize this later
  setSelectedUser: (selectedUser) => set({selectedUser})
}));
