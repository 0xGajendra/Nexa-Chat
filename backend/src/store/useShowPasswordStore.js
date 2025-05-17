import { create } from "zustand";

const useShowPasswordStore = create((set) => ({
    showPassword: false, // Initial Value
    setShowPassword: (newShowPassword) => set({ showPassword: newShowPassword }), // Updater
}));

export default useShowPasswordStore;