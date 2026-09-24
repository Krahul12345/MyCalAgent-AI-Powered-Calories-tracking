"use client";

import { motion } from "framer-motion";
import { useRef, useEffect, useState, useCallback } from "react";
import { Volume2, VolumeX, Maximize, Minimize, Play, Pause } from "lucide-react";
import AppStoreButtons from "@/components/AppStoreButtons";

interface VideoSectionProps {
  compact?: boolean;
}

export default function VideoSection({ compact = false }: VideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Sync React state with native video events so state is always accurate
    const onPlay = () => setIsPlaying(true);
    const onPause = () => setIsPlaying(false);
    video.addEventListener("play", onPlay);
    video.addEventListener("pause", onPause);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Autoplay blocked — user will see play button overlay to start manually
            });
          } else {
            video.pause();
          }
        });
      },
      { threshold: 0.3 }
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.removeEventListener("play", onPlay);
      video.removeEventListener("pause", onPause);
    };
  }, []);

  useEffect(() => {
    const handleFullscreenChange = () => {
      const isFs = !!(
        document.fullscreenElement ||
        (document as Document & { webkitFullscreenElement?: Element }).webkitFullscreenElement ||
        (document as Document & { mozFullScreenElement?: Element }).mozFullScreenElement ||
        (document as Document & { msFullscreenElement?: Element }).msFullscreenElement
      );
      setIsFullscreen(isFs);
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);
    document.addEventListener("webkitfullscreenchange", handleFullscreenChange);
    document.addEventListener("mozfullscreenchange", handleFullscreenChange);
    document.addEventListener("MSFullscreenChange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
      document.removeEventListener("webkitfullscreenchange", handleFullscreenChange);
      document.removeEventListener("mozfullscreenchange", handleFullscreenChange);
      document.removeEventListener("MSFullscreenChange", handleFullscreenChange);
    };
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateProgress = () => {
      const percent = (video.currentTime / video.duration) * 100;
      setProgress(percent || 0);
    };

    video.addEventListener("timeupdate", updateProgress);
    return () => video.removeEventListener("timeupdate", updateProgress);
  }, []);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const togglePlay = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;
    if (video.paused) {
      video.play().catch(() => {});
    } else {
      video.pause();
    }
  }, []);

  const toggleFullscreen = useCallback(async () => {
    const container = containerRef.current;
    const video = videoRef.current;

    if (!container || !video) return;

    type VideoWithFullscreen = HTMLVideoElement & {
      webkitEnterFullscreen?: () => Promise<void>;
      webkitRequestFullscreen?: () => Promise<void>;
      mozRequestFullScreen?: () => Promise<void>;
      msRequestFullscreen?: () => Promise<void>;
    };

    type DocumentWithFullscreen = Document & {
      webkitExitFullscreen?: () => Promise<void>;
      mozCancelFullScreen?: () => Promise<void>;
      msExitFullscreen?: () => Promise<void>;
      webkitFullscreenElement?: Element;
      mozFullScreenElement?: Element;
      msFullscreenElement?: Element;
    };

    const doc = document as DocumentWithFullscreen;
    const vid = video as VideoWithFullscreen;
    const cont = container as HTMLDivElement & {
      webkitRequestFullscreen?: () => Promise<void>;
      mozRequestFullScreen?: () => Promise<void>;
      msRequestFullscreen?: () => Promise<void>;
    };

    try {
      const isCurrentlyFullscreen = !!(
        document.fullscreenElement ||
        doc.webkitFullscreenElement ||
        doc.mozFullScreenElement ||
        doc.msFullscreenElement
      );

      if (!isCurrentlyFullscreen) {
        if (cont.requestFullscreen) {
          await cont.requestFullscreen();
        } else if (cont.webkitRequestFullscreen) {
          await cont.webkitRequestFullscreen();
        } else if (cont.mozRequestFullScreen) {
          await cont.mozRequestFullScreen();
        } else if (cont.msRequestFullscreen) {
          await cont.msRequestFullscreen();
        } else if (vid.webkitEnterFullscreen) {
          await vid.webkitEnterFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (doc.webkitExitFullscreen) {
          await doc.webkitExitFullscreen();
        } else if (doc.mozCancelFullScreen) {
          await doc.mozCancelFullScreen();
        } else if (doc.msExitFullscreen) {
          await doc.msExitFullscreen();
        }
      }
    } catch (err) {
      console.log("Fullscreen error:", err);
    }
  }, []);

  const handleProgressClick = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;

    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percent = clickX / rect.width;
    video.currentTime = percent * video.duration;
  }, []);


  return (
    <section
      id="demo"
      className={`relative px-4 sm:px-6 overflow-hidden scroll-mt-20 ${
        compact ? "py-10 sm:py-12 md:py-14 bg-[#f4faf6]" : "py-12 sm:py-16 md:py-20"
      }`}
    >
      <div className={`${compact ? "max-w-5xl" : "max-w-7xl"} mx-auto`}>
        <motion.div
          initial={compact ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className={`text-center ${compact ? "mb-6 sm:mb-8" : "mb-8 sm:mb-10"}`}
        >
          <h2
            className={`font-bold mb-4 sm:mb-6 ${
              compact ? "text-2xl sm:text-3xl md:text-4xl" : "text-2xl sm:text-3xl md:text-5xl"
            }`}
          >
            See How MyCalAgent <span className="gradient-text">Works</span>
          </h2>
          <p
            className={`text-muted-foreground mx-auto px-4 ${
              compact ? "text-sm sm:text-base max-w-xl" : "text-base sm:text-lg max-w-2xl"
            }`}
          >
            Watch how MyCalAgent helps users log meals, track nutrition, and stay consistent —
            all with minimal effort.
          </p>
        </motion.div>

        {!isFullscreen && (
          <motion.div
            initial={compact ? false : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className={`${compact ? "mb-6 sm:mb-8 gap-3" : "mb-8 sm:mb-10 gap-4"} flex flex-col items-center`}
          >
            <p className="text-sm sm:text-base text-muted-foreground">Download the app</p>
            <div className="relative flex flex-col items-center gap-3">
              <div className={`${compact ? "absolute -inset-4" : "absolute -inset-6"} rounded-3xl bg-gradient-to-br from-emerald-500/20 via-teal-500/10 to-transparent blur-2xl`} />
              <AppStoreButtons className="relative" />
            </div>
          </motion.div>
        )}

        <motion.div
          ref={containerRef}
          initial={compact ? false : { opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className={`relative flex justify-center items-center ${
            isFullscreen ? "fixed inset-0 z-50 bg-black" : ""
          }`}
          onMouseEnter={() => setShowControls(true)}
          onMouseLeave={() => setShowControls(isPlaying ? false : true)}
          onTouchStart={() => setShowControls(true)}
        >
          <div
            className={`relative overflow-hidden ${
              isFullscreen
                ? "w-full h-full max-w-none rounded-none bg-black"
                : `${
                    compact
                      ? "w-[230px] sm:w-[260px] md:w-[300px]"
                      : "w-[280px] sm:w-[320px] md:w-[360px] lg:w-[400px]"
                  } rounded-[2rem] sm:rounded-[2.5rem] bg-background`
            }`}
            style={isFullscreen ? {} : { aspectRatio: "9/19.5" }}
          >
            <video
              ref={videoRef}
              className={`w-full h-full ${
                isFullscreen ? "object-contain" : "object-cover absolute inset-0"
              }`}
              loop
              playsInline
              muted
              autoPlay
              preload="auto"
              poster="/hero-meal-scanner.webp"
              onClick={togglePlay}
            >
              <source
                src="https://kxlkulmuhnnnalnzlftn.supabase.co/storage/v1/object/sign/Videos/MyCalAgent_v11.mp4?token=eyJraWQiOiJzdG9yYWdlLXVybC1zaWduaW5nLWtleV8xOGI0OWExNC04NDE4LTQzZGMtYTEzMi1hNGIyMjQzMDZhNDAiLCJhbGciOiJIUzI1NiJ9.eyJ1cmwiOiJWaWRlb3MvTXlDYWxBZ2VudF92MTEubXA0IiwiaWF0IjoxNzcwODI0MzIzLCJleHAiOjE4MzM4OTYzMjN9.MX5Y9ixrgwxOtzQh9wolk_D5fLRz46nIj1DxM6J3WUs"
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>

            {!isPlaying && (
              <button
                onClick={togglePlay}
                className="absolute inset-0 flex items-center justify-center bg-black/30 backdrop-blur-[2px] z-10 cursor-pointer"
                aria-label="Play video"
              >
                <div
                  className={`rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30 hover:bg-white/30 transition-all duration-300 hover:scale-110 ${
                    isFullscreen ? "w-20 h-20 sm:w-24 sm:h-24" : "w-14 h-14 sm:w-16 sm:h-16"
                  }`}
                >
                  <Play
                    className={`text-white ml-1 ${
                      isFullscreen ? "w-10 h-10 sm:w-12 sm:h-12" : "w-6 h-6 sm:w-8 sm:h-8"
                    }`}
                    fill="white"
                  />
                </div>
              </button>
            )}

            <div
              className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent transition-opacity duration-300 z-10 ${
                showControls || !isPlaying ? "opacity-100" : "opacity-0"
              } ${isFullscreen ? "px-4 sm:px-8 pb-6 sm:pb-10 pt-16" : "px-3 pb-6 sm:pb-8 pt-12"}`}
            >
              <div
                className={`w-full bg-white/20 rounded-full mb-3 cursor-pointer group/progress ${
                  isFullscreen ? "h-2 sm:h-3" : "h-1 sm:h-1.5"
                }`}
                onClick={handleProgressClick}
              >
                <div
                  className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full relative transition-all"
                  style={{ width: `${progress}%` }}
                >
                  <div
                    className={`absolute right-0 top-1/2 -translate-y-1/2 bg-white rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 transition-opacity ${
                      isFullscreen ? "w-4 h-4 sm:w-5 sm:h-5" : "w-2.5 h-2.5 sm:w-3 sm:h-3"
                    }`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className={`flex items-center ${isFullscreen ? "gap-3 sm:gap-4" : "gap-2"}`}>
                  <button
                    onClick={togglePlay}
                    className={`bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all duration-200 ${
                      isFullscreen ? "p-3 sm:p-4" : "p-1.5 sm:p-2"
                    }`}
                    aria-label={isPlaying ? "Pause video" : "Play video"}
                  >
                    {isPlaying ? (
                      <Pause
                        className={`text-white ${
                          isFullscreen ? "w-5 h-5 sm:w-6 sm:h-6" : "w-3.5 h-3.5 sm:w-4 sm:h-4"
                        }`}
                      />
                    ) : (
                      <Play
                        className={`text-white ml-0.5 ${
                          isFullscreen ? "w-5 h-5 sm:w-6 sm:h-6" : "w-3.5 h-3.5 sm:w-4 sm:h-4"
                        }`}
                      />
                    )}
                  </button>

                  <button
                    onClick={toggleMute}
                    className={`bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all duration-200 ${
                      isFullscreen ? "p-3 sm:p-4" : "p-1.5 sm:p-2"
                    }`}
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                  >
                    {isMuted ? (
                      <VolumeX
                        className={`text-white ${
                          isFullscreen ? "w-5 h-5 sm:w-6 sm:h-6" : "w-3.5 h-3.5 sm:w-4 sm:h-4"
                        }`}
                      />
                    ) : (
                      <Volume2
                        className={`text-white ${
                          isFullscreen ? "w-5 h-5 sm:w-6 sm:h-6" : "w-3.5 h-3.5 sm:w-4 sm:h-4"
                        }`}
                      />
                    )}
                  </button>
                </div>

                <button
                  onClick={toggleFullscreen}
                  className={`bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-sm transition-all duration-200 ${
                    isFullscreen ? "p-3 sm:p-4" : "p-1.5 sm:p-2"
                  }`}
                  aria-label={isFullscreen ? "Exit fullscreen" : "Enter fullscreen"}
                >
                  {isFullscreen ? (
                    <Minimize
                      className={`text-white ${
                        isFullscreen ? "w-5 h-5 sm:w-6 sm:h-6" : "w-3.5 h-3.5 sm:w-4 sm:h-4"
                      }`}
                    />
                  ) : (
                    <Maximize
                      className={`text-white ${
                        isFullscreen ? "w-5 h-5 sm:w-6 sm:h-6" : "w-3.5 h-3.5 sm:w-4 sm:h-4"
                      }`}
                    />
                  )}
                </button>
              </div>
            </div>
          </div>
        </motion.div>

        {!isFullscreen && (
          <p className={`text-center text-xs sm:text-sm text-muted-foreground ${compact ? "mt-5 sm:mt-6" : "mt-6 sm:mt-8"}`}>
            Tap to play/pause • Click fullscreen for immersive experience
          </p>
        )}

      </div>
    </section>
  );
}
