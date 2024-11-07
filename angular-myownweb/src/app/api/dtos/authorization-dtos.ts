export interface UserCredentialsDTO {
    email: string;
    username: string;
    password: string;
}

export interface UserCredentialsUsernameDTO {
    username: string;
    password: string;
}

export interface UserCredentialsEmailDTO {
    email: string;
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

export interface ClaimDTO{
    claimType: string;
    userName: string;
}