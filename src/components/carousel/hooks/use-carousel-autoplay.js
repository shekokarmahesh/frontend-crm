import { useState, useEffect, useCallback } from 'react';

// ----------------------------------------------------------------------

export function useCarouselAutoplay(mainApi) {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClickPlay = useCallback(
    (callback) => {
      const autoplay = mainApi?.plugins()?.autoplay;
      if (!autoplay) return;

      const resetOrStop =
        autoplay.options.stopOnInteraction === false ? autoplay.reset : autoplay.stop;

      resetOrStop();
      callback();
    },
    [mainApi]
  );

  const handleTogglePlay = useCallback(() => {
    const autoplay = mainApi?.plugins()?.autoplay;
    if (!autoplay) return;

    const playOrStop = autoplay.isPlaying() ? autoplay.stop : autoplay.play;
    playOrStop();
  }, [mainApi]);

  useEffect(() => {
    const autoplay = mainApi?.plugins()?.autoplay;
    if (!autoplay) return;

    setIsPlaying(autoplay.isPlaying());
    mainApi
      .on('autoplay:play', () => setIsPlaying(true))
      .on('autoplay:stop', () => setIsPlaying(false))
      .on('reInit', () => setIsPlaying(autoplay.isPlaying()));
  }, [mainApi]);

  return {
    isPlaying,
    onClickPlay: handleClickPlay,
    onTogglePlay: handleTogglePlay,
  };
}
