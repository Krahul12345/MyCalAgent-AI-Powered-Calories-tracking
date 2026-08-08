const PLAY_STORE = "https://play.google.com/store/apps/details?id=com.mycalagent.app";
const APP_STORE  = "https://apps.apple.com/us/app/mycalagent/id6759270828";

interface AppStoreButtonsProps {
  /** "row" = side-by-side (default), "col" = stacked */
  layout?: "row" | "col";
  /** Extra Tailwind classes on the wrapper */
  className?: string;
}

export default function AppStoreButtons({ layout = "row", className = "" }: AppStoreButtonsProps) {
  const wrap = layout === "col"
    ? `flex flex-col gap-3 ${className}`
    : `flex flex-wrap gap-3 items-center ${className}`;

  return (
    <div className={wrap}>

      {/* ── Apple App Store ── */}
      <a
        href={APP_STORE}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download on the App Store"
        className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-black text-white font-semibold hover:bg-zinc-800 transition-colors"
      >
        {/* Official Apple logo */}
        <svg width="22" height="22" viewBox="0 0 814 1000" fill="white" aria-hidden="true">
          <path d="M788.1 340.9c-5.8 4.5-108.2 62.2-108.2 190.5 0 148.4 130.3 200.9 134.2 202.2-.6 3.2-20.7 71.9-68.7 141.9-42.8 61.6-87.5 123.1-155.5 123.1s-85.5-39.5-164-39.5c-76 0-103.7 40.8-165.9 40.8s-105-57.8-155.5-127.4C46 790.9 0 689.3 0 591.8c0-192.1 124.8-293.7 247.4-293.7c65.1 0 119.2 43.1 160.2 43.1 39 0 99.7-45.5 170.7-45.5 27.5 0 108.2 2.6 168.5 80.1zm-225.1-191.5c31.1-36.9 53.1-88.1 53.1-139.3 0-7.1-.6-14.3-1.9-20.1-50.6 1.9-110.8 33.7-147.1 75.8-28.5 32.4-55.1 83.6-55.1 135.5 0 7.8 1.3 15.6 1.9 18.1 3.2.6 8.4 1.3 13.6 1.3 45.4 0 102.5-30.4 135.5-71.3z"/>
        </svg>
        <span className="leading-none">
          <span className="block text-[10px] font-normal opacity-80 leading-none">Download on the</span>
          <span className="block text-base font-bold leading-tight">App Store</span>
        </span>
      </a>

      {/* ── Google Play Store ── */}
      <a
        href={PLAY_STORE}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Download on the Play Store"
        className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-black text-white font-semibold hover:bg-zinc-800 transition-colors"
      >
        {/* Official Google Play four-color logo */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/logos/google-play.svg"
          alt="Google Play"
          width="22"
          height="22"
          style={{ display: "block", width: 22, height: 22 }}
          aria-hidden="true"
        />
        <span className="leading-none">
          <span className="block text-[10px] font-normal opacity-80 leading-none">Download on the</span>
          <span className="block text-base font-bold leading-tight">Play Store</span>
        </span>
      </a>

    </div>
  );
}
