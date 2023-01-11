export interface Profile{
    id: number,
    login: string,
    avatar_url: string,
    html_url: string,
    name : string,
    location: string | null,
    bio: string | null,
    twitter_username: string | null    
    }