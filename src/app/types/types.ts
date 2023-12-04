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

export interface MazeShowResponse {
    id: string
    image: MazeShowImageResposne
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