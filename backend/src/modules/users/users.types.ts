export type UpdateProfileData = {
    username?: string;
    bio?: string;
    tag?: string;
    currentPassword?: string;
    newPassword?: string;
};

export interface TagParams {
    tag: string;
}
