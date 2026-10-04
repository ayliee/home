"use client";

import { useEffect, useRef, useState } from "react";
import Reveal from "./Reveal";
import {
  DISCORD_ID,
  activityImage,
  avatarUrl,
  msToClock,
  statusMeta,
  type LanyardData,
} from "@/lib/lanyard";

type SocketPayload = {
  op: number;
  t?: "INIT_STATE" | "PRESENCE_UPDATE";
  d: LanyardData | { heartbeat_interval: number } | Record<string, LanyardData>;
};

export default function Presence() {
  const [data, setData] = useState<LanyardData | null>(null);
  const [error, setError] = useState(false);
  const [now, setNow] = useState(() => Date.now());
  const heartbeat = useRef<ReturnType<typeof setInterval> | null>(null);

  // ticking clock for the Spotify / activity elapsed time
  useEffect(() => {
    const t = setInterval(() => setNow(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  useEffect(() => {
    let socket: WebSocket | null = null;
    let retry: ReturnType<typeof setTimeout> | null = null;
    let closed = false;

    // REST fallback for networks that block websockets
    const poll = async () => {
      try {
        const r = await fetch(`https://api.lanyard.rest/v1/users/${DISCORD_ID}`);
        const j = await r.json();
        if (j?.success) {
          setData(j.data as LanyardData);
          setError(false);
        } else setError(true);
      } catch {
        setError(true);
      }
    };

    const connect = () => {
      try {
        socket = new WebSocket("wss://api.lanyard.rest/socket");
      } catch {
        void poll();
        return;
      }

      socket.onopen = () => {
        socket?.send(
          JSON.stringify({ op: 2, d: { subscribe_to_id: DISCORD_ID } }),
        );
      };

      socket.onmessage = (ev) => {
        const msg = JSON.parse(ev.data as string) as SocketPayload;

        if (msg.op === 1) {
          const interval = (msg.d as { heartbeat_interval: number })
            .heartbeat_interval;
          if (heartbeat.current) clearInterval(heartbeat.current);
          heartbeat.current = setInterval(
            () => socket?.send(JSON.stringify({ op: 3 })),
            interval,
          );
        }

        if (msg.op === 0 && (msg.t === "INIT_STATE" || msg.t === "PRESENCE_UPDATE")) {
          setData(msg.d as LanyardData);
          setError(false);
        }
      };

      socket.onerror = () => void poll();
      socket.onclose = () => {
        if (heartbeat.current) clearInterval(heartbeat.current);
        if (!closed) retry = setTimeout(connect, 5000);
      };
    };

    connect();

    return () => {
      closed = true;
      if (heartbeat.current) clearInterval(heartbeat.current);
      if (retry) clearTimeout(retry);
      socket?.close();
    };
  }, []);

  const status = data ? statusMeta[data.discord_status] : statusMeta.offline;
  const name =
    data?.discord_user.display_name ||
    data?.discord_user.global_name ||
    data?.discord_user.username ||
    "—";

  const custom = data?.activities.find((a) => a.type === 4);
  const game = data?.activities.find((a) => a.type !== 4 && a.name !== "Spotify");

  const spotify = data?.spotify ?? null;
  const spStart = spotify?.timestamps.start ?? 0;
  const spEnd = spotify?.timestamps.end ?? 0;
  const spProgress =
    spotify && spEnd > spStart
      ? Math.min(100, Math.max(0, ((now - spStart) / (spEnd - spStart)) * 100))
      : 0;

  return (
    <section id="presence" className="scroll-mt-24 py-10 sm:py-14">
      <Reveal>
        <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-1">
          <h2 className="section-title">Live Presence</h2>
          <span
            className="relative flex h-2 w-2"
            role="img"
            aria-label={`Discord status: ${status.label}`}
            title={status.label}
          >
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-70"
              style={{ backgroundColor: status.color }}
            />
            <span
              className="relative inline-flex h-2 w-2 rounded-full"
              style={{ backgroundColor: status.color }}
            />
          </span>
        </div>
        <div className="rule mt-2" />
      </Reveal>

      <Reveal delay={0.06}>
        <div className="mt-8 grid gap-5 md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          {/* identity card */}
          <div className="-rotate-1 rounded-[3px] bg-white p-4 shadow-polaroid transition-transform duration-500 hover:rotate-0 sm:p-5">
            <div className="flex items-center gap-4">
              <div className="relative shrink-0">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={
                    data
                      ? avatarUrl(data.discord_user)
                      : "https://cdn.discordapp.com/embed/avatars/0.png"
                  }
                  alt={name}
                  width={72}
                  height={72}
                  className="h-16 w-16 rounded-2xl bg-paper2 object-cover sm:h-[72px] sm:w-[72px]"
                />
                <span
                  className="absolute -bottom-1 -right-1 h-5 w-5 rounded-full border-[3px] border-white"
                  style={{ backgroundColor: status.color }}
                  title={status.label}
                />
              </div>

              <div className="min-w-0">
                <p className="truncate font-hand text-2xl leading-tight">{name}</p>
                <p className="truncate font-mono text-[0.68rem] uppercase tracking-[0.16em] text-muted">
                  {data ? `@${data.discord_user.username}` : "connecting…"}
                </p>
                <p className="mt-1 font-mono text-[0.68rem] text-muted">
                  {status.label}
                  {data?.active_on_discord_mobile ? " · mobile" : ""}
                  {data?.active_on_discord_desktop ? " · desktop" : ""}
                  {data?.active_on_discord_web ? " · web" : ""}
                </p>
              </div>
            </div>

            {custom ? (
              <p className="mt-4 border-t border-line/70 pt-3 font-mono text-xs leading-relaxed text-ink/80">
                {custom.emoji?.name ? `${custom.emoji.name} ` : ""}
                {custom.state}
              </p>
            ) : null}

            {error && !data ? (
              <p className="mt-4 border-t border-line/70 pt-3 font-mono text-[0.68rem] text-muted">
                Presence unavailable. This preview blocks external requests, open
                the site in a browser tab to see it live.
              </p>
            ) : null}
          </div>

          {/* activity card */}
          <div className="rotate-1 rounded-[3px] bg-white p-4 shadow-polaroid transition-transform duration-500 hover:rotate-0 sm:p-5">
            {spotify ? (
              <div className="flex gap-4">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={spotify.album_art_url}
                  alt={spotify.album}
                  width={80}
                  height={80}
                  className="h-20 w-20 shrink-0 rounded-lg object-cover"
                />
                <div className="min-w-0 flex-1">
                  <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-[#1DB954]">
                    Listening to Spotify
                  </p>
                  <p className="mt-1 truncate font-hand text-xl leading-tight">
                    {spotify.song}
                  </p>
                  <p className="truncate font-mono text-[0.68rem] text-muted">
                    {spotify.artist}
                  </p>

                  <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-line">
                    <div
                      className="h-full rounded-full bg-[#1DB954] transition-[width] duration-1000 ease-linear"
                      style={{ width: `${spProgress}%` }}
                    />
                  </div>
                  <div className="mt-1 flex justify-between font-mono text-[0.58rem] text-muted">
                    <span>{msToClock(now - spStart)}</span>
                    <span>{msToClock(spEnd - spStart)}</span>
                  </div>
                </div>
              </div>
            ) : game ? (
              <div className="flex gap-4">
                {activityImage(game) ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={activityImage(game) as string}
                    alt={game.name}
                    width={80}
                    height={80}
                    className="h-20 w-20 shrink-0 rounded-lg object-cover"
                  />
                ) : (
                  <div className="grid h-20 w-20 shrink-0 place-items-center rounded-lg bg-paper2 font-hand text-3xl">
                    {game.name.slice(0, 1)}
                  </div>
                )}
                <div className="min-w-0">
                  <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-muted">
                    Currently active
                  </p>
                  <p className="mt-1 truncate font-hand text-xl leading-tight">
                    {game.name}
                  </p>
                  {game.details ? (
                    <p className="truncate font-mono text-[0.68rem] text-muted">
                      {game.details}
                    </p>
                  ) : null}
                  {game.state ? (
                    <p className="truncate font-mono text-[0.68rem] text-muted">
                      {game.state}
                    </p>
                  ) : null}
                  {game.timestamps?.start ? (
                    <p className="mt-2 font-mono text-[0.6rem] text-muted">
                      {msToClock(now - game.timestamps.start)} elapsed
                    </p>
                  ) : null}
                </div>
              </div>
            ) : (
              <div className="flex h-full min-h-[96px] flex-col justify-center">
                <p className="font-mono text-[0.58rem] uppercase tracking-[0.2em] text-muted">
                  Current activity
                </p>
                <p className="mt-1 font-hand text-xl text-ink/70">
                  {data ? "Nothing playing right now" : "Fetching presence…"}
                </p>
              </div>
            )}
          </div>
        </div>
      </Reveal>
    </section>
  );
}
