import { google } from "googleapis";
import { BigQuery } from "@google-cloud/bigquery";

let { client_email, private_key, project_id } = config.google;
const scopes = ["https://www.googleapis.com/auth/spreadsheets"];

const jwt = new google.auth.JWT(client_email, null, private_key, scopes);
jwt.authorize(function (err) {
  if (err) {
    console.log("Google Api Err" + err);
    return;
  }
});

// BigQuery
export const bigquery = new BigQuery({
  projectId: project_id,
  credentials: {
    client_email: client_email,
    private_key: private_key,
  },
});

// Google Sheet
export async function googleSheetAuth() {
  const gsapi = await google.sheets({ version: "v4", auth: jwt });
  return gsapi;
}
