import { create } from "zustand";

const useFormDataStore = create((set) => ({
    formData: {
    fullName: "",
    email: "",
    password: "",
  }, // Initial Value
    setFormData: (newFormData) => set({ formData: newFormData }), // Updater
}));

export default useFormDataStore;