import { google } from "googleapis";
import fs from "fs";

// oauth 建立完會有一組 client id 跟 client secret
const OAuth2 = google.auth.OAuth2;
const oauth2Client = new OAuth2(config.googleOauth.clientId, config.googleOauth.clientSecret, config.googleOauth.redirectUrl);

// 執行完 oauth domain 登入帳號後會取得一組 token 再執行以下 function
// getCredentials();
async function getCredentials() {
  try {
    const token = fs.readFileSync("/root/.oauth/oauth.json", "utf8");
    oauth2Client.credentials = JSON.parse(token);
  } catch (error) {
    console.error("無法讀取檔案，請檢查檔案路徑和權限。錯誤訊息:", error.message);
  }
}

google.options({ auth: oauth2Client });
const youtube = google.youtube({
  version: "v3",
  auth: oauth2Client,
});

export async function getVideo(videoId) {
  try {
    let response = await youtube.videos.list({
      part: "id,snippet,contentDetails,liveStreamingDetails,status",
      auth: oauth2Client,
      id: videoId,
      maxResults: 50,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getAllVideoDetail(videoId) {
  try {
    let response = await youtube.videos.list({
      part: "id,snippet,contentDetails,fileDetails,liveStreamingDetails,localizations,player,processingDetails,recordingDetails,statistics,topicDetails,status",
      auth: oauth2Client,
      id: videoId,
      maxResults: 50,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getPlaylistItem(playlistId) {
  try {
    let response = await youtube.playlistItems.list({
      part: "id,snippet,contentDetails,status",
      auth: oauth2Client,
      playlistId: playlistId,
      maxResults: 50,
    });

    let nextPageToken = response.data.nextPageToken;
    let nextPage = "";

    while (nextPageToken != undefined) {
      nextPage = "";
      nextPage = await youtube.playlistItems.list({
        part: "id,snippet,contentDetails,status",
        auth: oauth2Client,
        playlistId: playlistId,
        maxResults: 50,
        pageToken: nextPageToken,
      });
      response.data.items = response.data.items.concat(nextPage.data.items);
      nextPageToken = nextPage.data.nextPageToken;
      console.log(nextPageToken);
      await sleep(2000);
    }
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

export async function deleteVideoFromPlaylist(playlistId, itemId) {
  try {
    let response = await youtube.playlistItems.delete({
      auth: oauth2Client,
      playlistId: playlistId,
      id: itemId,
    });
    return response.status;
  } catch (error) {
    console.log(error);
  }
}

export async function updateVideoStatus(videoId, videoStatus) {
  try {
    const response = await youtube.videos.update({
      part: "id,snippet,status",
      auth: oauth2Client,
      requestBody: {
        id: videoId,
        status: {
          embeddable: true,
          privacyStatus: videoStatus,
        },
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
