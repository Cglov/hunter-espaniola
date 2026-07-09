"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { getSupabase } from "@/lib/supabase";

type Mode = "signin" | "signup" | "reset" | "newpassword";

const inputClass =
  "h-11 w-full rounded-xl border border-ink/20 bg-bone px-4 text-sm text-ink placeholder:text-ink-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay";
const primaryBtn =
  "inline-flex h-11 w-full items-center justify-center rounded-full bg-clay px-6 text-sm font-semibold text-bone transition-colors hover:bg-clay-deep disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay";

export default function PortalLoginPage() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  // Already signed in → straight to the dashboard. Arriving from a password
  // recovery email → show the new-password form.
  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) router.replace("/portal");
    });
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY") setMode("newpassword");
    });
    return () => sub.subscription.unsubscribe();
  }, [router]);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    setNotice(null);
    const supabase = getSupabase();
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        router.replace("/portal");
      } else if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { data: { full_name: fullName } },
        });
        if (error) throw error;
        if (data.session) {
          router.replace("/portal");
        } else {
          setNotice(
            "Almost there. Check your email for a confirmation link, then sign in.",
          );
          setMode("signin");
        }
      } else if (mode === "reset") {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/portal/login`,
        });
        if (error) throw error;
        setNotice("Reset link sent. Check your email.");
        setMode("signin");
      } else {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
        router.replace("/portal");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setBusy(false);
    }
  }

  const heading =
    mode === "signup"
      ? "Create your profile"
      : mode === "reset"
        ? "Reset your password"
        : mode === "newpassword"
          ? "Set a new password"
          : "Sign in";

  return (
    <div className="mx-auto max-w-md">
      <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink">
        {heading}
      </h1>
      <p className="mt-3 text-sm text-ink-soft">
        {mode === "signup"
          ? "Set up access so your finished films land here, in full quality, the moment they are ready."
          : "Your delivered films live here. Sign in to watch and download them in full quality."}
      </p>

      <form onSubmit={submit} className="mt-8 flex flex-col gap-4" noValidate>
        {mode === "signup" && (
          <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
            Your name
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              autoComplete="name"
              required
              className={inputClass}
            />
          </label>
        )}
        {mode !== "newpassword" && (
          <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
              required
              className={inputClass}
            />
          </label>
        )}
        {mode !== "reset" && (
          <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
            {mode === "newpassword" ? "New password" : "Password"}
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete={
                mode === "signin" ? "current-password" : "new-password"
              }
              minLength={8}
              required
              className={inputClass}
            />
          </label>
        )}

        {error && (
          <p role="alert" className="rounded-xl bg-clay/10 px-4 py-3 text-sm font-medium text-clay-deep">
            {error}
          </p>
        )}
        {notice && (
          <p role="status" className="rounded-xl bg-ink/5 px-4 py-3 text-sm text-ink">
            {notice}
          </p>
        )}

        <button type="submit" disabled={busy} className={primaryBtn}>
          {busy
            ? "One moment…"
            : mode === "signup"
              ? "Create profile"
              : mode === "reset"
                ? "Send reset link"
                : mode === "newpassword"
                  ? "Save password"
                  : "Sign in"}
        </button>
      </form>

      {mode !== "newpassword" && (
        <div className="mt-6 flex flex-col gap-2 text-sm text-ink-soft">
          {mode !== "signin" && (
            <button
              type="button"
              onClick={() => setMode("signin")}
              className="self-start font-semibold text-ink underline underline-offset-4 hover:text-clay-deep"
            >
              Back to sign in
            </button>
          )}
          {mode === "signin" && (
            <>
              <p>
                First delivery from Hunter?{" "}
                <button
                  type="button"
                  onClick={() => setMode("signup")}
                  className="font-semibold text-ink underline underline-offset-4 hover:text-clay-deep"
                >
                  Create your profile
                </button>
              </p>
              <button
                type="button"
                onClick={() => setMode("reset")}
                className="self-start underline underline-offset-4 hover:text-ink"
              >
                Forgot your password?
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}
