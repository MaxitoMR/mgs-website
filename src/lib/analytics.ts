import { GA_CONVERSION } from "./constants";

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function gtagReportConversion(url?: string) {
  if (typeof window === "undefined" || !window.gtag) return;

  const callback = () => {
    if (url) window.location.href = url;
  };

  window.gtag("event", "conversion", {
    send_to: GA_CONVERSION,
    event_callback: callback,
  });
}
