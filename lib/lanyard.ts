export const DISCORD_ID = "544047377540186114";

export type LanyardActivity = {
  id: string;
  name: string;
  type: number;
  state?: string;
  details?: string;
  application_id?: string;
  timestamps?: { start?: number; end?: number };
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
  emoji?: { id?: string; name?: string; animated?: boolean };
};

export type LanyardData = {
  discord_user: {
    id: string;
    username: string;
    global_name?: string | null;
    display_name?: string | null;
    avatar: string | null;
    discriminator: string;
  };
  discord_status: "online" | "idle" | "dnd" | "offline";
  active_on_discord_desktop: boolean;
  active_on_discord_mobile: boolean;
  active_on_discord_web: boolean;
  listening_to_spotify: boolean;
  spotify: {
    track_id: string;
    song: string;
    artist: string;
    album: string;
    album_art_url: string;
    timestamps: { start: number; end: number };
  } | null;
  activities: LanyardActivity[];
};

export const statusMeta: Record<
  LanyardData["discord_status"],
  { label: string; color: string }
> = {
  online: { label: "Online", color: "#23A55A" },
  idle: { label: "Idle", color: "#F0B232" },
  dnd: { label: "Do not disturb", color: "#F23F43" },
  offline: { label: "Offline", color: "#80848E" },
};

export function avatarUrl(user: LanyardData["discord_user"], size = 128) {
  if (!user.avatar) {
    const i = (Number(user.discriminator) || 0) % 5;
    return `https://cdn.discordapp.com/embed/avatars/${i}.png`;
  }
  const ext = user.avatar.startsWith("a_") ? "gif" : "png";
  return `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${ext}?size=${size}`;
}

/** Discord activity asset ids can be mp:external/... proxies or raw app assets. */
export function activityImage(act: LanyardActivity) {
  const img = act.assets?.large_image;
  if (!img) return null;
  if (img.startsWith("mp:external/")) {
    return `https://media.discordapp.net/external/${img.slice("mp:external/".length)}`;
  }
  if (img.startsWith("spotify:")) {
    return `https://i.scdn.co/image/${img.slice("spotify:".length)}`;
  }
  if (act.application_id) {
    return `https://cdn.discordapp.com/app-assets/${act.application_id}/${img}.png`;
  }
  return null;
}

export function msToClock(ms: number) {
  if (ms < 0) ms = 0;
  const total = Math.floor(ms / 1000);
  const h = Math.floor(total / 3600);
  const m = Math.floor((total % 3600) / 60);
  const s = total % 60;
  const pad = (n: number) => String(n).padStart(2, "0");
  return h > 0 ? `${h}:${pad(m)}:${pad(s)}` : `${m}:${pad(s)}`;
}
