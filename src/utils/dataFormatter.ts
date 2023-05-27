import {
  MentoringScheduleByMentee,
  MentoringScheduleByMentor,
} from "../typings/mentoring.type";

export function formatMentoringDataFromMentee(
  mentoring: MentoringScheduleByMentee[]
) {
  const formattedMentoring = mentoring.map((data) => ({
    name: data.Mentoring.Mentor.User.name,
    start_time: data.Mentoring.start_time,
    end_time: data.Mentoring.end_time,
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
      name: menteeNames,
      start_time: data.start_time,
      end_time: data.end_time,
      meeting_id: data.meeting_id,
      event_id: data.event_id,
    };
  });

  return formattedMentoring;
}
