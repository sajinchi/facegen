export interface LoginResponse {
    status: number;
    message: string;
    access?: string;
    refresh?: string;

}