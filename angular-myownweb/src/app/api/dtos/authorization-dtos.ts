export interface UserCredentialsDTO {
    email: string;
    username: string;
    password: string;
}

export interface AuthorizationResponseDTO {
    token: string;
    expiration: Date;
}

export interface UserDTO {
    email: string;
    username: string;
}