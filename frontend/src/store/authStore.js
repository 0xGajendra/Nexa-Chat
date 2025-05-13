import { axiosInstance } from '@/lib/axios';
import {create} from 'zustand';

export const useAuthStore = create((set)=> ({
    authUser: null,
    isCheckingAuth: true,
    isSigningUp: false,
    isLogingin: false,
    isUpdatingProfile: false,

    checkAuth: async ()=> {
        try {
           const response = await axiosInstance.get("/api/v1/auth/check-auth");
           set({authUser: response.data});
        } catch (error) {
            console.log("Error in checkAuth:", error);
            
            set({authUser: null})
        }
        finally{
            set({isCheckingAuth: false});
        }
    },
    
    signup: async()=>{

    },
}))