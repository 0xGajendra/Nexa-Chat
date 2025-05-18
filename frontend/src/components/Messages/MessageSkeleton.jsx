const MessageSkeleton = () => {
  // Create an array of 6 items for skeleton messages
  const skeletonMessages = Array(6).fill(null);

  return (
    <div className="flex-1 overflow-y-auto p-4 space-y-4">
      {skeletonMessages.map((_, idx) => (
        <div
          key={idx}
          className={`flex items-start gap-2 ${
            idx % 2 === 0 ? "justify-start" : "justify-end"
          }`}
        >
          {/* Avatar Skeleton */}
          <div className="w-10 h-10 rounded-full bg-gray-700 animate-pulse" />

          {/* Message Block */}
          <div className="flex flex-col space-y-1">
            {/* Header Skeleton (name/timestamp) */}
            <div className="h-4 w-16 bg-gray-700 rounded animate-pulse" />

            {/* Message Bubble Skeleton */}
            <div className="bg-primary rounded-lg h-16 w-[200px] animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MessageSkeleton;
