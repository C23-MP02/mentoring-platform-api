import path from "path";
import { authenticate } from "@google-cloud/local-auth";
import { google } from "googleapis";
import { readFile, writeFile } from "fs/promises";
import { OAuth2Client } from "google-auth-library/build/src/auth/oauth2client";

// If modifying these scopes, delete token.json.
const SCOPES = ["https://www.googleapis.com/auth/calendar"];
// The file token.json stores the user's access and refresh tokens, and is
// created automatically when the authorization flow completes for the first
// time.
const TOKEN_PATH = path.join(process.cwd(), "token.json");
const CREDENTIALS_PATH = path.join(process.cwd(), "credentials.json");

/**
 * Reads previously authorized credentials from the save file.
 *
 * @return {Promise<OAuth2Client|null>}
 */
async function loadSavedCredentialsIfExist(): Promise<OAuth2Client | null> {
  try {
    const content = await readFile(TOKEN_PATH, "utf-8");
    const credentials = JSON.parse(content);
    return google.auth.fromJSON(credentials) as OAuth2Client;
  } catch (err) {
    return null;
  }
}

/**
 * Serializes credentials to a file compatible with GoogleAuth.fromJSON.
 *
 * @param {OAuth2Client} client
 * @return {Promise<void>}
 */
async function saveCredentials(client: OAuth2Client): Promise<void> {
  const content = await readFile(CREDENTIALS_PATH, "utf-8");
  const keys = JSON.parse(content);
  const key = keys.installed || keys.web;
  const payload = JSON.stringify({
    type: "authorized_user",
    client_id: key.client_id,
    client_secret: key.client_secret,
    refresh_token: client.credentials.refresh_token,
  });
  await writeFile(TOKEN_PATH, payload, "utf-8");
}

/**
 * Load or request authorization to call APIs.
 *
 */
async function auth(): Promise<OAuth2Client> {
  let client = await loadSavedCredentialsIfExist();
  if (client) {
    return client;
  }
  client = await authenticate({
    scopes: SCOPES,
    keyfilePath: CREDENTIALS_PATH,
  });
  if (client.credentials) {
    await saveCredentials(client);
  }
  return client;
}

export const calendarAuth = auth;

// const event = {
//   summary: "Test",
//   description: "Testing insert event calendar API",
//   start: {
//     dateTime: "2023-05-24T09:00:00-07:00",
//     timeZone: "Asia/Jakarta",
//   },
//   end: {
//     dateTime: "2023-05-24T17:00:00-07:00",
//     timeZone: "Asia/Jakarta",
//   },
//   attendees: [
//     { email: "fahrelga30@gmail.com" },
//     { email: "tonohartonolee@gmail.com" },
//   ],
//   reminders: {
//     useDefault: false,
//     overrides: [
//       { method: "email", minutes: 24 * 60 },
//       { method: "popup", minutes: 10 },
//     ],
//   },
//   conferenceData: {
//     createRequest: {
//       requestId, // Generate a unique string for each event creation
//     },
//   },
// };

// async function createEvent(auth) {
//   const calendar = google.calendar({ version: "v3", auth });
//   const res = await calendar.events
//     .insert({
//       auth: auth,
//       calendarId: "primary",
//       resource: event,
//       sendUpdates: "all",
//       conferenceDataVersion: 1,
//     })
//     .then((res) => {
//       console.log("Event created: %s", res.data.htmlLink);
//       console.log(res.data);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// calendar().then(createEvent).catch(console.error);

// invoke calendarAuth and export the result
