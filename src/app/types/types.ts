export interface Show {
    docId?: string,
    id: string,
    title: string,
    mazeId? : string 
}

export type EditSuccess = true
export type EditFailure = false
export type EditCancel = null

export type EditResult = EditSuccess | EditFailure | EditCancel

export interface MazeMultiShowResponse {
    score: number
    show: MazeShowResponse
}

export interface MazeShowResponse {
    id: string
    name: string
    image: MazeShowImageResposne
    summary: string
}

export interface MazeShowImageResposne {
    medium?: string
    original?: string
}

export interface FirebaseConfig {
    apiKey: string
    authDomain: string
    projectId: string
    storageBucket: string
    messagingSenderId: string
    appId: string
    measurementId: string
}

export type FilmPoster = string | null