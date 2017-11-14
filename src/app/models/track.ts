export interface Track {
  kind: string;
  id: number;
  created_at: string;
  user_id: number;
  duration: number;
  commentable: boolean;
  state: string;
  original_content_size: number;
  last_modified: string;
  sharing: string;
  tag_list: string;
  permalink: string;
  streamable: boolean;
  embeddable_by: string;
  downloadable: boolean;
  purchase_url: string;
  label_id: number;
  purchase_title: string;
  genre: string;
  title: string;
  description: string;
  label_name: string;
  release: string;
  track_type: string;
  key_signature: string;
  isrc: string;
  video_url: string;
  bpm: string;
  release_year: string;
  release_month: string;
  release_day: string;
  original_format: string;
  license: string;
  uri: string;
  attachments_uri: string;
  permalink_url: string;
  artwork_url: string;
  waveform_url: string;
  stream_url: string;
  playback_count: number;
  download_count: number;
  favoritings_count: number;
  comment_count: number;
  reposts_count: number;
  tracks: Track;
}
