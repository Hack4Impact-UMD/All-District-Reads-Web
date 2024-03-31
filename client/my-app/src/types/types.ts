export type UserType = "ADRAdmin" | "ADRStaff" | "SchoolStaff" | "Parent";

export type ReadingSchedule = {
    scheduleId: string;
    schoolDistrictId: string;
    createdBy: string;
    bookId: string;
    chapterIds: string[];
};