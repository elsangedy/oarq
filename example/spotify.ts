import { createClient, createAdapter } from "./spotify/index";

const logAdapter = createAdapter(async (req) => {
  console.log(req);
});

const client = createClient(logAdapter);

client.query(["getSeveralTracks", { ids: "1,2" }]);
client.query([
  "getPlaylistsTracks",
  { playlist_id: "1" },
  { offset: 1, additional_types: "2" },
]);
