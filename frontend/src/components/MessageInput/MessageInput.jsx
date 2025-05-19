import { useChatStore } from '@/store/chatStore';
import { Image, Send, X } from 'lucide-react';
import React, { useRef, useState } from 'react'
import toast from 'react-hot-toast';

const MessageInput = () => {
  const [text, setText] = useState('');
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);
  const {sendMessage} = useChatStore();

  const handleImageChange = (e)=>{
    const file = e.target.files[0];
    if(!file.type.startsWith("image/")){
      toast.error("Please select an image file");
      return;
    }
    const reader = new FileReader();
    reader.onloadend= ()=>{
      setImagePreview(reader.result);
    }
    reader.readAsDataURL(file);
  }

  const removeImage = (e)=>{
    setImagePreview(null);
    if(fileInputRef.current) fileInputRef.current.value ="";
  }

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if(!text.trim() && !imagePreview) return;
    try {
      await   sendMessage({
        text: text.trim(),
        image: imagePreview,
      })
      //clear form
      setText("");
      setImagePreview(null);
      if(fileInputRef.current) fileInputRef.current.value= "";
    } catch (error) {
      console.error("Failed to send message ", error);
    }
  
    
  }
  return (
    <div className="p-4 w-full">
  {imagePreview && (
    <div className="mb-3 flex items-center gap-2">
      <div className="relative">
        <img
          src={imagePreview}
          alt="Preview"
          className="w-20 h-20 object-cover rounded-lg border border-zinc-700"
        />
        <button
          onClick={removeImage}
          type="button"
          className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-zinc-300 dark:bg-zinc-700 flex items-center justify-center"
        >
          <X className="w-3 h-3 text-black dark:text-white" />
        </button>
      </div>
    </div>
  )}

  <form onSubmit={handleSendMessage} className="flex items-center gap-2">
    <div className="flex-1 flex gap-2 items-center my-auto">
      <input
        type="text"
        className="w-full px-3 py-2 text-sm sm:text-base border border-zinc-300 dark:border-zinc-600 rounded-lg bg-primary-foreground dark:bg-primary-foreground text-zinc-900  placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="Type a message..."
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleImageChange}
      />

      <button
        type="button"
        className={`hidden sm:flex items-center justify-center w-9 h-9 rounded-full cursor-pointer border border-zinc-300 dark:border-zinc-600 
        ${imagePreview ? "text-emerald-500" : "text-zinc-400"}`}
        onClick={() => fileInputRef.current?.click()}
      >
        <Image size={20} />
      </button>
    </div>

    <button
      type="submit"
      disabled={!text.trim() && !imagePreview}
      className={`w-8 h-8 flex items-center justify-center rounded-full cursor-pointer bg-primary hover:bg-secondary text-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-500 `}
    >
      <Send size={15} />
    </button>
  </form>
</div>

  )
}

export default MessageInput
