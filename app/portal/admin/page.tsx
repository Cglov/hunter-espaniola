"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  formatBytes,
  formatDate,
  getSupabase,
  type Delivery,
  type Profile,
} from "@/lib/supabase";

const inputClass =
  "h-11 w-full rounded-xl border border-ink/20 bg-bone px-4 text-sm text-ink placeholder:text-ink-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay";
const primaryBtn =
  "inline-flex h-11 items-center justify-center rounded-full bg-clay px-6 text-sm font-semibold text-bone transition-colors hover:bg-clay-deep disabled:cursor-wait disabled:opacity-60 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay";
const subtleBtn =
  "inline-flex h-9 items-center justify-center rounded-full border border-ink/25 px-4 text-xs font-semibold text-ink transition-colors hover:border-ink hover:bg-ink hover:text-bone disabled:opacity-60";

type DeliveryWithClient = Delivery & { profiles: { email: string } | null };

export default function PortalAdmin() {
  const router = useRouter();
  const [me, setMe] = useState<Profile | null | "loading">("loading");
  const [clients, setClients] = useState<Profile[]>([]);
  const [recent, setRecent] = useState<DeliveryWithClient[]>([]);
  const [clientId, setClientId] = useState("");
  const [title, setTitle] = useState("");
  const [notes, setNotes] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  async function refresh(uid: string) {
    const supabase = getSupabase();
    const [{ data: profs }, { data: rows }] = await Promise.all([
      supabase.from("profiles").select("*").order("created_at"),
      supabase
        .from("deliveries")
        .select("*, profiles!deliveries_client_id_fkey(email)")
        .order("created_at", { ascending: false })
        .limit(20),
    ]);
    setClients(((profs as Profile[]) ?? []).filter((p) => p.id !== uid));
    setRecent((rows as DeliveryWithClient[]) ?? []);
  }

  useEffect(() => {
    const supabase = getSupabase();
    supabase.auth.getSession().then(async ({ data }) => {
      if (!data.session) {
        router.replace("/portal/login");
        return;
      }
      const uid = data.session.user.id;
      const { data: prof } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", uid)
        .single();
      setMe((prof as Profile) ?? null);
      if ((prof as Profile)?.is_admin) await refresh(uid);
    });
  }, [router]);

  async function deliver(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !clientId || me === "loading" || !me) return;
    setBusy(true);
    setError(null);
    setNotice(null);
    const supabase = getSupabase();
    const safeName = file.name.replace(/[^\w.\-]+/g, "_");
    const path = `${clientId}/${Date.now()}-${safeName}`;
    try {
      const { error: upErr } = await supabase.storage
        .from("deliveries")
        .upload(path, file, { contentType: file.type || "video/mp4" });
      if (upErr) throw upErr;
      const { error: insErr } = await supabase.from("deliveries").insert({
        client_id: clientId,
        title: title.trim(),
        notes: notes.trim() || null,
        storage_path: path,
        file_size: file.size,
      });
      if (insErr) {
        await supabase.storage.from("deliveries").remove([path]);
        throw insErr;
      }
      setNotice(`Delivered "${title.trim()}" (${formatBytes(file.size)}).`);
      setTitle("");
      setNotes("");
      setFile(null);
      if (fileRef.current) fileRef.current.value = "";
      await refresh(me.id);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Upload failed.";
      setError(
        /exceeded|too large|413/i.test(msg)
          ? `${msg}. The current storage plan caps single files at 50 MB. Upgrading the Supabase project to Pro raises this into the multi-GB range for full quality masters.`
          : msg,
      );
    } finally {
      setBusy(false);
    }
  }

  async function remove(d: DeliveryWithClient) {
    if (me === "loading" || !me) return;
    setError(null);
    const supabase = getSupabase();
    await supabase.storage.from("deliveries").remove([d.storage_path]);
    const { error } = await supabase.from("deliveries").delete().eq("id", d.id);
    if (error) setError(error.message);
    await refresh(me.id);
  }

  if (me === "loading") {
    return <p className="text-sm text-ink-soft">Loading…</p>;
  }

  if (!me?.is_admin) {
    return (
      <div className="mx-auto max-w-md text-center">
        <h1 className="font-display text-3xl font-extrabold text-ink">
          Pilot access only
        </h1>
        <p className="mt-3 text-sm text-ink-soft">
          This page is where Hunter uploads deliveries. Your films live on
          your own dashboard.
        </p>
        <Link
          href="/portal"
          className="mt-6 inline-block font-semibold text-ink underline underline-offset-4"
        >
          Back to your films
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-ink">
            Deliver a video
          </h1>
          <p className="mt-2 text-sm text-ink-soft">
            Upload the finished film, pick the client, and it lands on their
            dashboard instantly.
          </p>
        </div>
        <Link href="/portal" className={subtleBtn}>
          My dashboard
        </Link>
      </div>

      <form
        onSubmit={deliver}
        className="mt-8 flex max-w-xl flex-col gap-4 rounded-2xl border border-ink/10 bg-bone p-6"
      >
        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
          Client
          <select
            value={clientId}
            onChange={(e) => setClientId(e.target.value)}
            required
            className={inputClass}
          >
            <option value="" disabled>
              Choose a client…
            </option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.full_name ? `${c.full_name} (${c.email})` : c.email}
              </option>
            ))}
          </select>
        </label>
        {clients.length === 0 && (
          <p className="text-xs text-ink-soft">
            No client profiles yet. Clients appear here once they create a
            profile at <span className="font-semibold">/portal/login</span>.
          </p>
        )}

        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
          Title
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Listing film for 1247 Canyon Rim Dr"
            required
            className={inputClass}
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
          Notes for the client (optional)
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            className="w-full rounded-xl border border-ink/20 bg-bone px-4 py-2.5 text-sm text-ink placeholder:text-ink-faint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-clay"
          />
        </label>

        <label className="flex flex-col gap-1.5 text-sm font-medium text-ink">
          Video file
          <input
            ref={fileRef}
            type="file"
            accept="video/*"
            onChange={(e) => setFile(e.target.files?.[0] ?? null)}
            required
            className="text-sm text-ink file:mr-4 file:h-10 file:cursor-pointer file:rounded-full file:border-0 file:bg-ink file:px-5 file:text-sm file:font-semibold file:text-bone hover:file:bg-night"
          />
        </label>
        {file && (
          <p className="text-xs text-ink-soft">
            {file.name} · {formatBytes(file.size)}
          </p>
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

        <button type="submit" disabled={busy || !file} className={primaryBtn}>
          {busy ? "Uploading… keep this tab open" : "Deliver it"}
        </button>
      </form>

      <h2 className="mt-12 font-display text-2xl font-extrabold text-ink">
        Recent deliveries
      </h2>
      {recent.length === 0 ? (
        <p className="mt-3 text-sm text-ink-soft">None yet.</p>
      ) : (
        <ul className="mt-4 flex flex-col gap-3">
          {recent.map((d) => (
            <li
              key={d.id}
              className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ink/10 bg-bone px-5 py-4"
            >
              <div>
                <p className="text-sm font-semibold text-ink">{d.title}</p>
                <p className="mt-0.5 text-xs text-ink-soft">
                  {d.profiles?.email ?? "client"} · {formatDate(d.created_at)}
                  {d.file_size ? ` · ${formatBytes(d.file_size)}` : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={() => remove(d)}
                className={subtleBtn}
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
