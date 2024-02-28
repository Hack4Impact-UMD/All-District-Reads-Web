export type UserType = "ADRAdmin" | "ADRStaff" | "SchoolStaff" | "Parent";

export type User = {
    userId: string,
    name: string,
    email: string,
    userType: UserType,
    schoolId: string,
    schoolDistrictId: string
}