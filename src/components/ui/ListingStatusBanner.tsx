"use client";

import { useSyncExternalStore } from "react";
import { VerificationBadge } from "@/components/trust/VerificationBadge";

const STORAGE_KEY = "tiru-listing-status-banner-dismissed";
const DISMISS_EVENT = "tiru-listing-status-banner-dismiss";

function readIsDismissed(): boolean {
  try {
    return window.localStorage.getItem(STORAGE_KEY) === "1";
  } catch {
    return false;
  }
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener("storage", onStoreChange);
  window.addEventListener(DISMISS_EVENT, onStoreChange);

  return () => {
    window.removeEventListener("storage", onStoreChange);
    window.removeEventListener(DISMISS_EVENT, onStoreChange);
  };
}

function getServerSnapshot(): boolean {
  return false;
}

function dismiss() {
  try {
    window.localStorage.setItem(STORAGE_KEY, "1");
    window.dispatchEvent(new Event(DISMISS_EVENT));
  } catch {
    // Dismissal persistence is a convenience; the banner still hides via the event.
  }
}

export function ListingStatusBanner() {
  const isDismissed = useSyncExternalStore(
    subscribe,
    readIsDismissed,
    getServerSnapshot,
  );

  if (isDismissed) {
    return null;
  }

  return (
    <div className="relative grid gap-3 rounded-2xl border border-border bg-card p-4 sm:grid-cols-2 sm:gap-4">
      <button
        aria-label="Dismiss"
        className="absolute right-3 top-3 flex size-6 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
        onClick={dismiss}
        type="button"
      >
        <svg
          aria-hidden="true"
          className="size-4"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            d="M6 6l12 12M18 6L6 18"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
          />
        </svg>
      </button>

      <div className="flex gap-2 pr-6">
        <VerificationBadge status="community-submitted" />
        <p className="text-sm leading-6 text-muted-foreground">
          <span className="font-semibold text-foreground">
            CS — Community Submitted:
          </span>{" "}
          Information sourced from public social media and community
          platforms. Verify details directly with the provider.
        </p>
      </div>

      <div className="flex gap-2 pr-6">
        <VerificationBadge status="verified" />
        <p className="text-sm leading-6 text-muted-foreground">
          <span className="font-semibold text-foreground">✓ Verified:</span>{" "}
          Confirmed accurate by the Tiru team following direct communication
          with the provider.
        </p>
      </div>
    </div>
  );
}
