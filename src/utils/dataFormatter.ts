import {
  MentoringScheduleByMentee,
  MentoringScheduleByMentor,
} from "../typings/mentoring.type";
import { timeManipulation } from "./dateFunctions";

export function formatMentoringDataFromMentee(
  mentoring: MentoringScheduleByMentee[]
) {
  const formattedMentoring = mentoring.map((data) => ({
    mentoring_id: data.mentoring_id,
    name: data.Mentoring.Mentor.User.name,
    // TODO: remove the hardcode, only for demo purpose
    start_time: timeManipulation(data.Mentoring.start_time, 7),
    end_time: timeManipulation(data.Mentoring.end_time, 7),
    meeting_id: data.Mentoring.meeting_id,
    event_id: data.Mentoring.event_id,
  }));

  return formattedMentoring;
}

export function formatMentoringDataFromMentor(
  mentoring: MentoringScheduleByMentor[]
) {
  const formattedMentoring = mentoring.map((data) => {
    const menteeNames = data.Mentoring_Attendee.map(
      (attendee) => attendee.Mentee.User.name
    ).join(", ");

    return {
      mentoring_id: data.id,
      name: menteeNames,
      // TODO: remove the hardcode, only for demo purpose
      start_time: timeManipulation(data.start_time, 7),
      end_time: timeManipulation(data.end_time, 7),
      meeting_id: data.meeting_id,
      event_id: data.event_id,
    };
  });

  return formattedMentoring;
}
