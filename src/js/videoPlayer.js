import { throttle } from "throttle-debounce";
import Player from "@vimeo/player";

const LOCAL_KEY = "videoplayer-current-time";

const iframe = document.querySelector("iframe");
const player = new Player(iframe);

player.on(
  "timeupdate",
  throttle(1000, (time) => {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(time.seconds));
  }),
);

const rurrenttime = JSON.parse(localStorage.getItem(LOCAL_KEY)) ?? 0;
player.setCurrentTime(rurrenttime);
