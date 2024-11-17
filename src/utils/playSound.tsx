export const playSound = (
    e: React.MouseEvent<HTMLElement>,
    soundFile: string | undefined,
    isPlaying: boolean,
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (soundFile && !isPlaying) {
      e.preventDefault();
      setIsPlaying(true); // Update React state
      const sound = new Audio(soundFile);
      sound.play();
      setTimeout(() => {
        setIsPlaying(false); // Reset React state
      }, 2000);
    }
  };
  