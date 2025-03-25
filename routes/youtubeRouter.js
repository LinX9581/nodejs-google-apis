import * as youtube from "../component/youtube/youtubeSample";
import express from "express";
import config from "../config"; // 假設 config 從某處匯入

const router = express.Router();

// 避免 API 被濫用，設定簡單的身份驗證
const authenticate = (req, res, next) => {
  if (req.headers.authorization !== config.auth.key) {
    return res.status(403).send("Error Code 403: Invalid Key");
  }
  next();
};

const asyncHandler = (fn) => async (req, res, next) => {
  try {
    await fn(req, res, next);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    res.status(500).send("Internal Server Error");
  }
};

router.post("/getVideo", authenticate, asyncHandler(async (req, res) => {
  const { videoId } = req.body;
  res.send(await youtube.getVideo(videoId));
}));

router.post("/getAllVideoDetail", authenticate, asyncHandler(async (req, res) => {
  const { videoId } = req.body;
  res.send(await youtube.getAllVideoDetail(videoId));
}));

router.post("/getPlaylistItem", authenticate, asyncHandler(async (req, res) => {
  const { videoId } = req.body;
  res.send(await youtube.getPlaylistItem(videoId));
}));

router.post("/deleteVideoFromPlaylist", authenticate, asyncHandler(async (req, res) => {
  const { playlistId, itemId } = req.body;
  res.send(await youtube.deleteVideoFromPlaylist(playlistId, itemId));
}));

router.post("/updateVideoStatus", authenticate, asyncHandler(async (req, res) => {
  const { videoId, videoStatus } = req.body;
  res.send(await youtube.updateVideoStatus(videoId, videoStatus));
}));

export default router;