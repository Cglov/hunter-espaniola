"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  formatBytes,
  formatDate,
  getSupabase,
  type Delivery,
  type Profile,
} from "@/lib/supabase";

const subtleBtn =
  "inline-flex h-10 items-center justify-center rounded-full border border-ink/25 px-5 text-sm font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bone disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay";
const primaryBtn =
  "inline-flex h-10 items-center justify-center rounded-full bg-clay px-5 text-sm font-semibold text-bone transition-colors hover:bg-clay-deep disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay";

export default function PortalDashboard() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [deliveries, setDeliveries] = useState<Delivery[] | null>(null);
  const [playing, setPlaying] = useState<{ id: string; url: string } | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const supabase = getSupabase();
    let cancelled = false;

    async function load() {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        router.replace("/portal/login");
        return;
      }
      const uid = data.session.user.id;
      const [{ data: prof }, { data: rows, error: dErr }] = await Promise.all([
        supabase.from("profiles").select("*").eq("id", uid).single(),
        supabase
          .from("deliveries")
          .select("*")
          .eq("client_id", uid)
          .order("created_at", { ascending: false }),
      ]);
      if (cancelled) return;
      if (dErr) setError(dErr.message);
      setProfile((prof as Profile) ?? null);
      setDeliveries((rows as Delivery[]) ?? []);
    }

    load();
    const { data: sub } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") router.replace("/portal/login");
    });
    return () => {
      cancelled = true;
      sub.subscription.unsubscribe();
    };
  }, [router]);

  const watch = useCallback(async (d: Delivery) => {
    setError(null);
    const { data, error } = await getSupabase()
      .storage.from("deliveries")
      .createSignedUrl(d.storage_path, 3600);
    if (error || !data) {
      setError(error?.message ?? "Could not load the video.");
      return;
    }
    setPlaying({ id: d.id, url: data.signedUrl });
  }, []);

  const download = useCallback(async (d: Delivery) => {
    setError(null);
    const { data, error } = await getSupabase()
      .storage.from("deliveries")
      .createSignedUrl(d.storage_path, 3600, { download: true });
    if (error || !data) {
      setError(error?.message ?? "Could not start the download.");
      return;
    }
    window.location.assign(data.signedUrl);
  }, []);

  async function signOut() {
    await getSupabase().auth.signOut();
    router.replace("/portal/login");
  }

  if (!deliveries) {
    return <p className="text-sm text-ink-soft">Loading your deliveries…</p>;
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink">
            Your films
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            {profile?.full_name
              ? `Signed in as ${profile.full_name}`
              : "Signed in"}
            {profile?.email ? ` · ${profile.email}` : ""}
          </p>
        </div>
        <div className="flex gap-2">
          {profile?.is_admin && (
            <Link href="/portal/admin" className={primaryBtn}>
              Deliver a video
            </Link>
          )}
          <button type="button" onClick={signOut} className={subtleBtn}>
            Sign out
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" className="mt-6 rounded-xl bg-clay/10 px-4 py-3 text-sm font-medium text-clay-deep">
          {error}
        </p>
      )}

      {deliveries.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-ink/10 bg-bone p-8">
          <p className="font-display text-2xl font-extrabold text-ink">
            Nothing here yet
          </p>
          <p className="mt-2 max-w-md text-sm text-ink-soft">
            When Hunter delivers your films they will appear right here, ready
            to watch and download in full quality. You will get an email the
            moment one lands.
          </p>
        </div>
      ) : (
        <ul className="mt-10 flex flex-col gap-6">
          {deliveries.map((d) => (
            <li
              key={d.id}
              className="rounded-2xl border border-ink/10 bg-bone p-6"
            >
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h2 className="font-display text-xl font-extrabold text-ink">
                    {d.title}
                  </h2>
                  <p className="mt-1 text-xs text-ink-soft">
                    Delivered {formatDate(d.created_at)}
                    {d.file_size ? ` · ${formatBytes(d.file_size)}` : ""}
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => watch(d)}
                    className={subtleBtn}
                  >
                    {playing?.id === d.id ? "Reload" : "Watch"}
                  </button>
                  <button
                    type="button"
                    onClick={() => download(d)}
                    className={primaryBtn}
                  >
                    Download
                  </button>
                </div>
              </div>
              {d.notes && (
                <p className="mt-3 text-sm text-ink-soft">{d.notes}</p>
              )}
              {playing?.id === d.id && (
                <video
                  src={playing.url}
                  controls
                  autoPlay
                  playsInline
                  className="mt-4 aspect-video w-full rounded-xl bg-night"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
