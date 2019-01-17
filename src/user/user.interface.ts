/**
 * User data
 */
export interface UserData {
    /**
     * Username
     */
    username: string;
    /**
     * Email
     */
    email: string;
    /**
     * Personal token
     */
    token: string;
    /**
     * Biography
     */
    bio: string;
    /**
     * User avatar
     */
    image?: string;
}

export interface UserRO {
    user: UserData;
}
