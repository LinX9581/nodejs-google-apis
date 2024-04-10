import * as youtube from "../component/youtube/youtubeSample";
import express from "express";

const router = express.Router();

router.post("/getVideo", async function (req, res) {
  if (req.headers.authorization == config.auth.key) {
    let videoId = req.body.videoId;
    let response = await youtube.getVideo(videoId);
    res.send(response);
  } else {
    res.send("Error Code 403 : Invalid Key");
  }
});

router.post("/getAllVideoDetail", async function (req, res) {
  if (req.headers.authorization == config.auth.key) {
    let videoId = req.body.videoId;
    let response = await youtube.getAllVideoDetail(videoId);
    res.send(response);
  } else {
    res.send("Error Code 403 : Invalid Key");
  }
});

router.post("/getPlaylistItem", async function (req, res) {
  if (req.headers.authorization == config.auth.key) {
    let videoId = req.body.videoId;
    let response = await youtube.getPlaylistItem(videoId);
    res.send(response);
  } else {
    res.send("Error Code 403 : Invalid Key");
  }
});

router.post("/deleteVideoFromPlaylist", async function (req, res) {
  if (req.headers.authorization == config.auth.key) {
    let playlistId = req.body.playlistId;
    let itemId = req.body.itemId;
    let response = await youtube.deleteVideoFromPlaylist(playlistId, itemId);
    res.send(response);
  } else {
    res.send("Error Code 403 : Invalid Key");
  }
});

router.post("/updateVideoStatus", async function (req, res) {
  if (req.headers.authorization == config.auth.key) {
    let videoId = req.body.videoId;
    let videoStatus = req.body.videoStatus;
    let response = await youtube.updateVideoStatus(videoId, videoStatus);
    res.send(response);
  } else {
    res.send("Error Code 403 : Invalid Key");
  }
});

export default router;
