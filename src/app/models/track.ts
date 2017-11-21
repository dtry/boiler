import { Map, Record } from 'immutable';

export interface TrackData {
  artwork_url: string;
  duration: number;
  favoritings_count?: number;
  id: number;
  likes_count?: number;
  permalink_url: string;
  playback_count: number;
  stream_url: string;
  streamable: boolean;
  title: string;
  user: {
    avatar_url: string;
    id: number;
    permalink_url: string;
    username: string;
  };
  user_favorite?: boolean;
  waveform_url: string;
}

export interface Track extends Map<string,any> {
  artworkUrl: string;
  duration: number;
  id: number;
  liked: boolean;
  likesCount: number;
  permalinkUrl: string;
  playbackCount: number;
  streamable: boolean;
  streamUrl: string;
  title: string;
  userId: number;
  username: string;
  userPermalinkUrl: string;
  waveformUrl: string;
}

export const TrackRecord = Record({
  artworkUrl: null,
  duration: null,
  id: null,
  liked: null,
  likesCount: null,
  permalinkUrl: null,
  playbackCount: null,
  streamable: null,
  streamUrl: null,
  title: null,
  userId: null,
  username: null,
  userPermalinkUrl: null,
  waveformUrl: null
});

export function createTrack(data: TrackData): Track {
  return new TrackRecord({
    artworkUrl: trackImageUrl(data),
    duration: data.duration,
    id: data.id,
    liked: !!data.user_favorite,
    likesCount: data.favoritings_count || data.likes_count || 0,
    permalinkUrl: data.permalink_url,
    playbackCount: data.playback_count || 0,
    streamable: data.streamable,
    streamUrl: data.streamable ? streamUrl(data.stream_url) : null,
    title: formatTrackTitle(data.title),
    userId: data.user.id,
    username: data.user.username,
    userPermalinkUrl: data.user.permalink_url
  }) as Track;
}

const EN_DASH = String.fromCharCode(8211);

function formatTrackTitle(title: string): string {
  if (!title) return '';

  return title.replace(/-/g, EN_DASH);
}

function streamUrl(url: string): string {
  return `${url}?${'client_id=0U89KnefZ29oWNFitwxnMmKoGkGazKaF'}`;
}

function trackImageUrl(trackData: TrackData, size: string =  't500x500.jpg'): string {
  let url: string = trackData.artwork_url || trackData.user.avatar_url;

  return url.replace('large.jpg', size);
}
