import { Song } from "./song";

export type Genre = {
    id: string;
    name: string;
    created_at: string;
    song: Song[];
}