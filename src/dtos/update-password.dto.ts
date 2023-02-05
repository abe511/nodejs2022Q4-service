
export default interface UpdatePasswordDto {
    readonly oldPassword: string; // previous password
    readonly newPassword: string; // new password
}