import { Route, RouterMap } from "./runtime";

export type LinkedTrackObject = { external_urls?: ExternalUrlObject; href?: string; id?: string; type?: string; uri?: string }
export type TrackRestrictionObject = { reason?: string }
export type AlbumRestrictionObject = { reason?: "market" | "product" | "explicit" }
export type EpisodeRestrictionObject = { reason?: string }
export type ArtistObject = { external_urls?: ExternalUrlObject; followers?: FollowersObject; genres?: string[]; href?: string; id?: string; images?: ImageObject[]; name?: string; popularity?: number; type?: "artist"; uri?: string }
export type SimplifiedArtistObject = { external_urls?: ExternalUrlObject; href?: string; id?: string; name?: string; type?: "artist"; uri?: string }
export type PlayHistoryObject = { track?: SimplifiedTrackObject; played_at?: string; context?: ContextObject }
export type PlaylistTrackObject = { added_at?: string; added_by?: PlaylistUserObject; is_local?: boolean; track?: TrackObject | EpisodeObject }
export type CurrentlyPlayingObject = { context?: ContextObject; timestamp?: number; progress_ms?: number; is_playing?: boolean; item?: TrackObject | EpisodeObject; currently_playing_type?: string }
export type CurrentlyPlayingContextObject = { device?: DeviceObject; repeat_state?: string; shuffle_state?: string; context?: ContextObject; timestamp?: number; progress_ms?: number; is_playing?: boolean; item?: TrackObject | EpisodeObject; currently_playing_type?: string; actions?: DisallowsObject }
export type DisallowsObject = { interrupting_playback?: boolean; pausing?: boolean; resuming?: boolean; seeking?: boolean; skipping_next?: boolean; skipping_prev?: boolean; toggling_repeat_context?: boolean; toggling_shuffle?: boolean; toggling_repeat_track?: boolean; transferring_playback?: boolean }
export type ErrorObject = { status: number; message: string }
export type PlayerErrorObject = { status?: number; message?: string; reason?: PlayerErrorReasons }
export type PlayerErrorReasons = "NO_PREV_TRACK" | "NO_NEXT_TRACK" | "NO_SPECIFIC_TRACK" | "ALREADY_PAUSED" | "NOT_PAUSED" | "NOT_PLAYING_LOCALLY" | "NOT_PLAYING_TRACK" | "NOT_PLAYING_CONTEXT" | "ENDLESS_CONTEXT" | "CONTEXT_DISALLOW" | "ALREADY_PLAYING" | "RATE_LIMITED" | "REMOTE_CONTROL_DISALLOW" | "DEVICE_NOT_CONTROLLABLE" | "VOLUME_CONTROL_DISALLOW" | "NO_ACTIVE_DEVICE" | "PREMIUM_REQUIRED" | "UNKNOWN"
export type PrivateUserObject = { country?: string; display_name?: string; email?: string; explicit_content?: ExplicitContentSettingsObject; external_urls?: ExternalUrlObject; followers?: FollowersObject; href?: string; id?: string; images?: ImageObject[]; product?: string; type?: string; uri?: string }
export type PublicUserObject = { display_name?: string | null; external_urls?: ExternalUrlObject; followers?: FollowersObject; href?: string; id?: string; images?: ImageObject[]; type?: "user"; uri?: string }
export type AudioAnalysisObject = { meta?: { analyzer_version?: string; platform?: string; detailed_status?: string; status_code?: number; timestamp?: number; analysis_time?: number; input_process?: string }; track?: { num_samples?: number; duration?: number; sample_md5?: string; offset_seconds?: number; window_seconds?: number; analysis_sample_rate?: number; analysis_channels?: number; end_of_fade_in?: number; start_of_fade_out?: number; loudness?: Loudness; tempo?: Tempo; tempo_confidence?: number; time_signature?: TimeSignature; time_signature_confidence?: number; key?: Key; key_confidence?: number; mode?: Mode; mode_confidence?: number; codestring?: string; code_version?: number; echoprintstring?: string; echoprint_version?: number; synchstring?: string; synch_version?: number; rhythmstring?: string; rhythm_version?: number }; bars?: TimeIntervalObject[]; beats?: TimeIntervalObject[]; sections?: SectionObject[]; segments?: SegmentObject[]; tatums?: TimeIntervalObject[] }
export type TimeIntervalObject = { start?: number; duration?: number; confidence?: number }
export type SectionObject = { start?: number; duration?: number; confidence?: number; loudness?: number; tempo?: number; tempo_confidence?: number; key?: number; key_confidence?: number; mode?: number; mode_confidence?: number; time_signature?: TimeSignature; time_signature_confidence?: number }
export type SegmentObject = { start?: number; duration?: number; confidence?: number; loudness_start?: number; loudness_max?: number; loudness_max_time?: number; loudness_end?: number; pitches?: number[]; timbre?: number[] }
export type TimeSignature = number
export type Tempo = number
export type Loudness = number
export type Key = number
export type Mode = number
export type AudioFeaturesObject = { acousticness?: number; analysis_url?: string; danceability?: number; duration_ms?: number; energy?: number; id?: string; instrumentalness?: number; key?: Key; liveness?: number; loudness?: Loudness; mode?: Mode; speechiness?: number; tempo?: Tempo; time_signature?: TimeSignature; track_href?: string; type?: "audio_features"; uri?: string; valence?: number }
export type SimplifiedTrackObject = { artists?: SimplifiedArtistObject[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_urls?: ExternalUrlObject; href?: string; id?: string; is_playable?: boolean; linked_from?: LinkedTrackObject; restrictions?: TrackRestrictionObject; name?: string; preview_url?: string; track_number?: number; type?: string; uri?: string; is_local?: boolean }
export type DevicesObject = { devices?: DeviceObject[] }
export type DeviceObject = { id?: string | null; is_active?: boolean; is_private_session?: boolean; is_restricted?: boolean; name?: string; type?: string; volume_percent?: number | null }
export type CursorObject = { after?: string }
export type CursorPagingObject = { href?: string; items?: {}[]; limit?: number; next?: string; cursors?: CursorObject; total?: number }
export type PagingObject = { href: string; items: {}[]; limit: number; next: string | null; offset: number; previous: string | null; total: number }
export type RecommendationsObject = { seeds: RecommendationSeedObject[]; tracks: SimplifiedTrackObject[] }
export type RecommendationSeedObject = { afterFilteringSize?: number; afterRelinkingSize?: number; href?: string; id?: string; initialPoolSize?: number; type?: string }
export type SavedAlbumObject = { added_at?: string; album?: AlbumObject }
export type SavedTrackObject = { added_at?: string; track?: TrackObject }
export type SavedEpisodeObject = { added_at?: string; episode?: EpisodeObject }
export type SavedShowObject = { added_at?: string; show?: SimplifiedShowObject }
export type TuneableTrackObject = { acousticness?: number; danceability?: number; duration_ms?: number; energy?: number; instrumentalness?: number; key?: Key; liveness?: number; loudness?: Loudness; mode?: Mode; popularity?: number; speechiness?: number; tempo?: Tempo; time_signature?: TimeSignature; valence?: number }
export type PlaylistObject = { collaborative?: boolean; description?: string | null; external_urls?: ExternalUrlObject; followers?: FollowersObject; href?: string; id?: string; images?: ImageObject[]; name?: string; owner?: PlaylistOwnerObject; public?: boolean; snapshot_id?: string; tracks?: PagingObject; type?: string; uri?: string }
export type SimplifiedPlaylistObject = { collaborative?: boolean; description?: string; external_urls?: ExternalUrlObject; href?: string; id?: string; images?: ImageObject[]; name?: string; owner?: PlaylistOwnerObject; public?: boolean; snapshot_id?: string; tracks?: PlaylistTracksRefObject; type?: string; uri?: string }
export type PlaylistTracksRefObject = { href?: string; total?: number }
export type PlaylistUserObject = { external_urls?: ExternalUrlObject; followers?: FollowersObject; href?: string; id?: string; type?: "user"; uri?: string }
export type PlaylistOwnerObject = PlaylistUserObject & { display_name?: string | null }
export type CategoryObject = { href: string; icons: ImageObject[]; id: string; name: string }
export type TrackObject = { album?: SimplifiedAlbumObject; artists?: ArtistObject[]; available_markets?: string[]; disc_number?: number; duration_ms?: number; explicit?: boolean; external_ids?: ExternalIdObject; external_urls?: ExternalUrlObject; href?: string; id?: string; is_playable?: boolean; linked_from?: TrackObject; restrictions?: TrackRestrictionObject; name?: string; popularity?: number; preview_url?: string; track_number?: number; type?: string; uri?: string; is_local?: boolean }
export type EpisodeObject = EpisodeBase & { show: SimplifiedShowObject }
export type SimplifiedEpisodeObject = EpisodeBase & {}
export type EpisodeBase = { audio_preview_url: string; description: string; html_description: string; duration_ms: number; explicit: boolean; external_urls: ExternalUrlObject; href: string; id: string; images: ImageObject[]; is_externally_hosted: boolean; is_playable: boolean; language?: string; languages: string[]; name: string; release_date: string; release_date_precision: "year" | "month" | "day"; resume_point: ResumePointObject; type: "episode"; uri: string; restrictions?: EpisodeRestrictionObject }
export type ResumePointObject = { fully_played?: boolean; resume_position_ms?: number }
export type ShowBase = { available_markets: string[]; copyrights: CopyrightObject[]; description: string; html_description: string; explicit: boolean; external_urls: ExternalUrlObject; href: string; id: string; images: ImageObject[]; is_externally_hosted: boolean; languages: string[]; media_type: string; name: string; publisher: string; type: "show"; uri: string }
export type ShowObject = ShowBase & { episodes: PagingObject }
export type SimplifiedShowObject = ShowBase & {}
export type AlbumBase = { album_type: "album" | "single" | "compilation"; total_tracks: number; available_markets: string[]; external_urls: ExternalUrlObject; href: string; id: string; images: ImageObject[]; name: string; release_date: string; release_date_precision: "year" | "month" | "day"; restrictions?: AlbumRestrictionObject; type: "album"; uri: string }
export type SimplifiedAlbumObject = AlbumBase & { album_group?: "album" | "single" | "compilation" | "appears_on"; artists: SimplifiedArtistObject[] }
export type AlbumObject = AlbumBase & { artists?: ArtistObject[]; tracks?: PagingObject }
export type ContextObject = { type?: string; href?: string; external_urls?: ExternalUrlObject; uri?: string }
export type CopyrightObject = { text?: string; type?: string }
export type ExternalIdObject = { isrc?: string; ean?: string; upc?: string }
export type ExternalUrlObject = { spotify?: string }
export type FollowersObject = { href?: string | null; total?: number }
export type ImageObject = { url: string; height: number | null; width: number | null }
export type ExplicitContentSettingsObject = { filter_enabled?: boolean; filter_locked?: boolean }
export type UnauthorizedResponse = { error: ErrorObject }
export type ForbiddenResponse = { error: ErrorObject }
export type TooManyRequestsResponse = { error: ErrorObject }
export type ManyAlbumsResponse = { albums: AlbumObject[] }
export type ManyDevicesResponse = { devices: DeviceObject[] }
export type PagedAlbumsResponse = { albums: PagingObject }
export type PagedCategoriesResponse = { categories: PagingObject }
export type PagedPlaylistsAndMessageResponse = { albums?: PagingObject; message: string }
export type PagedPlaylistsResponse = { albums?: PagingObject; message?: string }
export type CursorPagedArtistsResponse = { artists: CursorPagingObject }
export type CursorPagingResponse = CursorPagingObject
export type ManyArtistsResponse = { artists: ArtistObject[] }
export type ManyAudioFeaturesResponse = { audio_features: AudioFeaturesObject[] }
export type ManyEpisodesResponse = { episodes: EpisodeObject[] }
export type ManyGenresResponse = { genres: string[] }
export type OneEpisodeResponse = EpisodeObject
export type OneAlbumResponse = AlbumObject
export type ArrayOfImagesResponse = ImageObject[]
export type OnePrivateUserResponse = PrivateUserObject
export type OnePublicUserResponse = PublicUserObject
export type OneTrackResponse = TrackObject
export type OneShowResponse = ShowObject
export type OneCategoryResponse = CategoryObject
export type OnePlaylistResponse = PlaylistObject
export type OneAudioFeaturesResponse = AudioFeaturesObject
export type OneAudioAnalysisResponse = AudioAnalysisObject
export type OneArtistResponse = ArtistObject
export type ManyTracksResponse = { tracks: TrackObject[] }
export type ManySimplifiedShowsResponse = { shows: SimplifiedShowObject[] }
export type PagingObjectResponse = PagingObject
export type SearchItemsResponse = { tracks?: PagingObject; artists?: PagingObject; albums?: PagingObject; playlists?: PagingObject; shows?: PagingObject; episodes?: PagingObject }
export type OneRecommendationsResponse = RecommendationsObject
export type ArrayOfBooleansResponse = boolean[]
export type OneCurrentlyPlayingResponse = CurrentlyPlayingContextObject
export type OneCurrentlyPlayingTrackResponse = CurrentlyPlayingContextObject
export type PlaylistSnapshotIdResponse = { snapshot_id?: string }

export type QueriesRoutes = {
  "getAnAlbum": Route<{ id: string }, { market?: string } | undefined, undefined, OneAlbumResponse>,
  "getMultipleAlbums": Route<undefined, { ids: string; market?: string }, undefined, ManyAlbumsResponse>,
  "getAnAlbumsTracks": Route<{ id: string }, { market?: string; limit?: number; offset?: number } | undefined, undefined, PagingObjectResponse>,
  "getAnArtist": Route<{ id: string }, undefined, undefined, OneArtistResponse>,
  "getMultipleArtists": Route<undefined, { ids: string }, undefined, ManyArtistsResponse>,
  "getAnArtistsAlbums": Route<{ id: string }, { include_groups?: string; market?: string; limit?: number; offset?: number } | undefined, undefined, PagingObjectResponse>,
  "getAnArtistsTopTracks": Route<{ id: string }, { market?: string } | undefined, undefined, ManyTracksResponse>,
  "getAnArtistsRelatedArtists": Route<{ id: string }, undefined, undefined, ManyArtistsResponse>,
  "getAShow": Route<{ id: string }, { market?: string } | undefined, undefined, OneShowResponse>,
  "getMultipleShows": Route<undefined, { market?: string; ids: string }, undefined, ManySimplifiedShowsResponse>,
  "getAShowsEpisodes": Route<{ id: string }, { market?: string; limit?: number; offset?: number } | undefined, undefined, PagingObjectResponse>,
  "getAnEpisode": Route<{ id: string }, { market?: string } | undefined, undefined, OneEpisodeResponse>,
  "getMultipleEpisodes": Route<undefined, { ids: string; market?: string }, undefined, ManyEpisodesResponse>,
  "getTrack": Route<{ id: string }, { market?: string } | undefined, undefined, OneTrackResponse>,
  "getSeveralTracks": Route<undefined, { market?: string; ids: string }, undefined, ManyTracksResponse>,
  "search": Route<undefined, { q: string; type: "album" | "artist" | "playlist" | "track" | "show" | "episode"[]; market?: string; limit?: number; offset?: number; include_external?: "audio" }, undefined, SearchItemsResponse>,
  "getCurrentUsersProfile": Route<undefined, undefined, undefined, OnePrivateUserResponse>,
  "getPlaylist": Route<{ playlist_id: string }, { market?: string; fields?: string; additional_types?: string } | undefined, undefined, OnePlaylistResponse>,
  "getPlaylistsTracks": Route<{ playlist_id: string }, { market?: string; fields?: string; limit?: number; offset?: number; additional_types?: string } | undefined, undefined, PagingObjectResponse>,
  "getAListOfCurrentUsersPlaylists": Route<undefined, { limit?: number; offset?: number } | undefined, undefined, PagingObjectResponse>,
  "getUsersSavedAlbums": Route<undefined, { limit?: number; offset?: number; market?: string } | undefined, undefined, PagingObjectResponse>,
  "checkUsersSavedAlbums": Route<undefined, { ids: string }, undefined, ArrayOfBooleansResponse>,
  "getUsersSavedTracks": Route<undefined, { market?: string; limit?: number; offset?: number } | undefined, undefined, PagingObjectResponse>,
  "checkUsersSavedTracks": Route<undefined, { ids: string }, undefined, ArrayOfBooleansResponse>,
  "getUsersSavedEpisodes": Route<undefined, { market?: string; limit?: number; offset?: number } | undefined, undefined, PagingObjectResponse>,
  "checkUsersSavedEpisodes": Route<undefined, { ids: string }, undefined, ArrayOfBooleansResponse>,
  "getUsersSavedShows": Route<undefined, { limit?: number; offset?: number } | undefined, undefined, PagingObjectResponse>,
  "checkUsersSavedShows": Route<undefined, { ids: string }, undefined, ArrayOfBooleansResponse>,
  "getUsersTopArtistsAndTracks": Route<{ type: string }, { time_range?: string; limit?: number; offset?: number } | undefined, undefined, PagingObjectResponse>,
  "getUsersProfile": Route<{ user_id: string }, undefined, undefined, OnePublicUserResponse>,
  "getListUsersPlaylists": Route<{ user_id: string }, { limit?: number; offset?: number } | undefined, undefined, PagingObjectResponse>,
  "getFeaturedPlaylists": Route<undefined, { country?: string; locale?: string; timestamp?: string; limit?: number; offset?: number } | undefined, undefined, PagedPlaylistsAndMessageResponse>,
  "getCategories": Route<undefined, { country?: string; locale?: string; limit?: number; offset?: number } | undefined, undefined, PagedCategoriesResponse>,
  "getACategory": Route<{ category_id: string }, { country?: string; locale?: string } | undefined, undefined, OneCategoryResponse>,
  "getACategoriesPlaylists": Route<{ category_id: string }, { country?: string; limit?: number; offset?: number } | undefined, undefined, PagedPlaylistsResponse>,
  "getPlaylistCover": Route<{ playlist_id: string }, undefined, undefined, ArrayOfImagesResponse>,
  "getNewReleases": Route<undefined, { country?: string; limit?: number; offset?: number } | undefined, undefined, PagedAlbumsResponse>,
  "getFollowed": Route<undefined, { type: "artist"; after?: string; limit?: number }, undefined, CursorPagedArtistsResponse>,
  "checkCurrentUserFollows": Route<undefined, { type: "artist" | "user"; ids: string }, undefined, ArrayOfBooleansResponse>,
  "checkIfUserFollowsPlaylist": Route<{ playlist_id: string }, { ids: string }, undefined, ArrayOfBooleansResponse>,
  "getSeveralAudioFeatures": Route<undefined, { ids: string }, undefined, ManyAudioFeaturesResponse>,
  "getAudioFeatures": Route<{ id: string }, undefined, undefined, OneAudioFeaturesResponse>,
  "getAudioAnalysis": Route<{ id: string }, undefined, undefined, OneAudioAnalysisResponse>,
  "getRecommendations": Route<undefined, { limit?: number; market?: string; seed_artists: string; seed_genres: string; seed_tracks: string; min_acousticness?: number; max_acousticness?: number; target_acousticness?: number; min_danceability?: number; max_danceability?: number; target_danceability?: number; min_duration_ms?: number; max_duration_ms?: number; target_duration_ms?: number; min_energy?: number; max_energy?: number; target_energy?: number; min_instrumentalness?: number; max_instrumentalness?: number; target_instrumentalness?: number; min_key?: number; max_key?: number; target_key?: number; min_liveness?: number; max_liveness?: number; target_liveness?: number; min_loudness?: number; max_loudness?: number; target_loudness?: number; min_mode?: number; max_mode?: number; target_mode?: number; min_popularity?: number; max_popularity?: number; target_popularity?: number; min_speechiness?: number; max_speechiness?: number; target_speechiness?: number; min_tempo?: number; max_tempo?: number; target_tempo?: number; min_time_signature?: number; max_time_signature?: number; target_time_signature?: number; min_valence?: number; max_valence?: number; target_valence?: number }, undefined, OneRecommendationsResponse>,
  "getRecommendationGenres": Route<undefined, undefined, undefined, ManyGenresResponse>,
  "getInformationAboutTheUsersCurrentPlayback": Route<undefined, { market?: string; additional_types?: string } | undefined, undefined, OneCurrentlyPlayingResponse | void>,
  "getAUsersAvailableDevices": Route<undefined, undefined, undefined, ManyDevicesResponse>,
  "getTheUsersCurrentlyPlayingTrack": Route<undefined, { market?: string; additional_types?: string } | undefined, undefined, void>,
  "getRecentlyPlayed": Route<undefined, { limit?: number; after?: number; before?: number } | undefined, undefined, CursorPagingResponse>,
  "getAvailableMarkets": Route<undefined, undefined, undefined, { markets?: string[] }>,
};

export type MutationsRoutes = {
  "changePlaylistDetails": Route<{ playlist_id: string }, undefined, { name?: string; public?: boolean; collaborative?: boolean; description?: string }, void>;
  "addTracksToPlaylist": Route<{ playlist_id: string }, { position?: number; uris?: string } | undefined, { uris?: string[]; position?: number }, PlaylistSnapshotIdResponse>;
  "reorderOrReplacePlaylistsTracks": Route<{ playlist_id: string }, { uris?: string } | undefined, { uris?: string[]; range_start?: number; insert_before?: number; range_length?: number; snapshot_id?: string }, PlaylistSnapshotIdResponse>;
  "removeTracksPlaylist": Route<{ playlist_id: string }, undefined, { tracks: { uri?: string }[]; snapshot_id?: string }, PlaylistSnapshotIdResponse>;
  "saveAlbumsUser": Route<undefined, { ids: string }, { ids?: string[] }, void>;
  "removeAlbumsUser": Route<undefined, { ids: string }, { ids?: string[] }, void>;
  "saveTracksUser": Route<undefined, { ids: string }, { ids?: string[] }, void>;
  "removeTracksUser": Route<undefined, { ids: string }, { ids?: string[] }, void>;
  "saveEpisodesUser": Route<undefined, { ids: string }, { ids?: string[] }, void>;
  "removeEpisodesUser": Route<undefined, { ids: string }, { ids?: string[] }, void>;
  "saveShowsUser": Route<undefined, { ids: string }, void, void>;
  "removeShowsUser": Route<undefined, { ids: string; market?: string }, void, void>;
  "createPlaylist": Route<{ user_id: string }, undefined, { name: string; public?: boolean; collaborative?: boolean; description?: string }, OnePlaylistResponse>;
  "followPlaylist": Route<{ playlist_id: string }, undefined, { public?: boolean }, void>;
  "unfollowPlaylist": Route<{ playlist_id: string }, undefined, void, void>;
  "uploadCustomPlaylistCover": Route<{ playlist_id: string }, undefined, void, void>;
  "followArtistsUsers": Route<undefined, { type: "artist" | "user"; ids: string }, { ids: string[] }, void>;
  "unfollowArtistsUsers": Route<undefined, { type: "artist" | "user"; ids: string }, { ids?: string[] }, void>;
  "transferAUsersPlayback": Route<undefined, undefined, { device_ids: string[]; play?: boolean }, void>;
  "startAUsersPlayback": Route<undefined, { device_id?: string } | undefined, { context_uri?: string; uris?: string[]; offset?: {}; position_ms?: number }, void>;
  "pauseAUsersPlayback": Route<undefined, { device_id?: string } | undefined, void, void>;
  "skipUsersPlaybackToNextTrack": Route<undefined, { device_id?: string } | undefined, void, void>;
  "skipUsersPlaybackToPreviousTrack": Route<undefined, { device_id?: string } | undefined, void, void>;
  "seekToPositionInCurrentlyPlayingTrack": Route<undefined, { position_ms: number; device_id?: string }, void, void>;
  "setRepeatModeOnUsersPlayback": Route<undefined, { state: string; device_id?: string }, void, void>;
  "setVolumeForUsersPlayback": Route<undefined, { volume_percent: number; device_id?: string }, void, void>;
  "toggleShuffleForUsersPlayback": Route<undefined, { state: boolean; device_id?: string }, void, void>;
  "addToQueue": Route<undefined, { uri: string; device_id?: string }, void, void>;
};

export const routerQueriesMap: RouterMap<QueriesRoutes>

export const routerMutationsMap: RouterMap<MutationsRoutes>
