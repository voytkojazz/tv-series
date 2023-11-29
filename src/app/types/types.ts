export interface Show {
    docId?: string,
    id: string,
    title: string
}

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