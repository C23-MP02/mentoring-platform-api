import { OAuth2Client } from "google-auth-library/build/src/auth/oauth2client";
import { v4 as uid } from "uuid";
import { calendarAuth } from "../config/google-calendar/calendar";
import { google, calendar_v3 } from "googleapis";

interface Attendee {
  email: string;
}

export default class GoogleCalendarRepository {
  protected auth: () => Promise<OAuth2Client>;

  constructor() {
    this.auth = calendarAuth;
  }

  /**
   * Creates a new event in Google Calendar.
   *
   * @param startTime The start time of the event in UTC format.
   * @param endTime The end time of the event in UTC format.
   * @param summary The summary or title of the event.
   * @param description The description of the event.
   * @param mentorEmail The email of the mentor.
   * @param menteeEmail An array of emails of the mentees.
   * @returns The created event data.
   */
  async createEvent(
    startTime: string,
    endTime: string,
    summary: string,
    description: string,
    mentorEmail: string,
    menteeEmail: string[]
  ): Promise<calendar_v3.Schema$Event> {
    const auth = await this.auth();
    const calendar = google.calendar({ version: "v3", auth });
    const requestId = uid();

    const attendees: Attendee[] = [
      { email: mentorEmail },
      ...menteeEmail.map((email) => ({ email })),
    ];

    const event: calendar_v3.Schema$Event = {
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

    const res = await calendar.events.insert({
      auth,
      calendarId: "primary",
      conferenceDataVersion: 1,
      sendUpdates: "all",
      requestBody: event,
    });

    return res.data;
  }
}
