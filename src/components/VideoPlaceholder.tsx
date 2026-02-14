import { Play } from "lucide-react";

const VideoPlaceholder = () => {
  return (
    <div className="w-full h-full bg-muted flex flex-col items-center justify-center text-muted-foreground group cursor-pointer hover:bg-muted/80 transition-colors">
      <div className="w-16 h-16 rounded-full bg-background/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
        <Play className="w-8 h-8 fill-foreground text-foreground ml-1" />
      </div>
      <p className="font-medium">Video Placeholder</p>
      <p className="text-sm opacity-70">Add your video here</p>
    </div>
  );
};

export default VideoPlaceholder;
