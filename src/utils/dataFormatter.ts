import { MentoringScheduleByMentee } from "../typings/mentoring.type";

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
