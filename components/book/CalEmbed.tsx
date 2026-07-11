"use client";

import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useState } from "react";
import { SITE } from "@/lib/site";

/**
 * Inline Cal.com booking calendar for the 15-minute intro call.
 *
 * TODO(hunter): in Cal.com, create the "intro-call" event type (15 min),
 * install the Stripe app on that event with a $10 charge, and enable manual
 * refunds from the dashboard so each hold can be returned after the call.
 */
const CAL_NAMESPACE = "intro-call";
const CAL_LINK = "apexvisuals/intro-call";
const BRAND_COLOR = "#a3492a"; // clay — matches --color-clay in globals.css

type EmbedStatus = "loading" | "ready" | "failed";

export function CalEmbed() {
  const [status, setStatus] = useState<EmbedStatus>("loading");

  useEffect(() => {
    let cancelled = false;

    (async () => {
      const cal = await getCalApi({ namespace: CAL_NAMESPACE });
      if (cancelled) return;

      cal("ui", {
        theme: "light",
        hideEventTypeDetails: false,
        cssVarsPerTheme: {
          light: { "cal-brand": BRAND_COLOR },
          dark: { "cal-brand": BRAND_COLOR },
        },
      });

      cal("on", {
        action: "linkReady",
        callback: () => setStatus("ready"),
      });
      cal("on", {
        action: "linkFailed",
        callback: () => setStatus("failed"),
      });
    })();

    // If the ready event never arrives but nothing failed either, lift the
    // curtain rather than hide a working calendar behind the loading state.
    const failsafe = window.setTimeout(() => {
      setStatus((s) => (s === "loading" ? "ready" : s));
    }, 10000);

    return () => {
      cancelled = true;
      window.clearTimeout(failsafe);
    };
  }, []);

  return (
    <div
      className={`relative w-full ${
        status === "failed" ? "min-h-[360px]" : "min-h-[560px] md:min-h-[700px]"
      }`}
    >
      <Cal
        namespace={CAL_NAMESPACE}
        calLink={CAL_LINK}
        config={{ theme: "light" }}
        className="h-full w-full"
        style={{ width: "100%", height: "100%", overflow: "auto" }}
      />

      <div
        aria-hidden={status === "ready"}
        className={`absolute inset-0 flex items-center justify-center bg-bone transition-opacity duration-500 ${
          status === "ready" ? "opacity-0" : "opacity-100"
        } ${status === "failed" ? "" : "pointer-events-none"}`}
      >
        {status === "failed" ? (
          <div className="max-w-sm px-6 text-center">
            <p className="font-medium text-ink">The calendar didn&rsquo;t load.</p>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              Email{" "}
              <a
                href={`mailto:${SITE.email}`}
                className="font-medium text-clay underline decoration-clay/30 underline-offset-4 hover:text-clay-deep"
              >
                {SITE.email}
              </a>{" "}
              and we&rsquo;ll set a time directly.
            </p>
          </div>
        ) : (
          <div
            role="status"
            className="flex flex-col items-center gap-3 text-ink-soft"
          >
            <span className="relative flex h-2.5 w-2.5" aria-hidden="true">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-clay/60" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-clay" />
            </span>
            <p className="text-sm">Loading the calendar&hellip;</p>
          </div>
        )}
      </div>
    </div>
  );
}
