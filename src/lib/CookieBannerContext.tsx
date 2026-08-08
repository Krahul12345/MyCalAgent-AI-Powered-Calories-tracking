"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

type CookieBannerContextType = {
  isCookieBannerVisible: boolean;
  setCookieBannerVisible: (v: boolean) => void;
};

const CookieBannerContext = createContext<CookieBannerContextType>({
  isCookieBannerVisible: false,
  setCookieBannerVisible: () => {},
});

export function CookieBannerProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [visible, setVisible] = useState(false);

  return (
    <CookieBannerContext.Provider
      value={{
        isCookieBannerVisible: visible,
        setCookieBannerVisible: setVisible,
      }}
    >
      {children}
    </CookieBannerContext.Provider>
  );
}

export function useCookieBanner() {
  return useContext(CookieBannerContext);
}