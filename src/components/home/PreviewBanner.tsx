"use client";

import { useState } from "react";

export function PreviewBanner() {
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  return (
    <div className="bg-amber-50 border-b border-amber-200 px-4 py-2.5">
      <div className="max-w-5xl mx-auto flex items-start gap-3">
        <span className="mt-0.5 text-amber-600 text-sm shrink-0" aria-hidden="true">
          ⚠
        </span>
        <p className="text-sm text-amber-800 flex-1">
          <strong>Public preview.</strong> Listings on this page are
          illustrative only and may not reflect current availability. Do not
          rely on this data for medical decisions.
        </p>
        <button
          onClick={() => setDismissed(true)}
          aria-label="Dismiss preview notice"
          className="shrink-0 text-amber-600 hover:text-amber-800 text-sm font-medium leading-5 transition-colors"
        >
          Dismiss
        </button>
      </div>
    </div>
  );
}
