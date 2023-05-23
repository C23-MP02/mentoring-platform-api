import { OAuth2Client } from "google-auth-library/build/src/auth/oauth2client";

import { v4 as uid } from "uuid";

import { calendarAuth } from "../config/google-calendar/calendar";
import { google } from "googleapis";

interface Attendee {
  email: string;
}

export class GoogleCalendarRepository {
  protected auth: () => Promise<OAuth2Client>;

  constructor() {
    this.auth = calendarAuth;
  }

  async createEvent(
    startTime: string,
    endTime: string,
    summary: string,
    description: string,
    attendees: Attendee[]
  ) {
    const auth = await this.auth();
    const calendar = google.calendar({ version: "v3", auth });
    const requestId = uid();

    const event = {
      summary,
      description,
      start: {
        dateTime: startTime,
        timeZone: "Asia/Jakarta",
      },
      end: {
        dateTime: endTime,
        timeZone: "Asia/Jakarta",
      },
      attendees,
      reminders: {
        useDefault: false,
        overrides: [
          { method: "email", minutes: 24 * 60 },
          { method: "popup", minutes: 10 },
        ],
      },
      conferenceData: {
        createRequest: {
          requestId,
        },
      },
    };

    // TODO
  }
}
