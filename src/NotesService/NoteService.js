import axios from "axios";

export class NoteService {
    backend = import.meta.env.VITE_BACKEND_URI;

    async getAllNotes() {
        try {
            return await axios.get(`${this.backend}/api/note`);
        } catch (error) {
            console.log("Error fetching all notes", error.message);
        }
    }
    async addNote({title, noteContent, bookmark}) {
        try {
            return await axios.post(`${this.backend}/api/note/add/`, {
                title: title,
                noteContent: noteContent || "",
                bookmark: bookmark || false,
            });
        } catch (error) {
            console.log("Error adding to DB", error.message);
        }
    }
    async updateNote(noteID, updatedNote) {
        try {
            return await axios.put(`${this.backend}api/note/update/` + noteID, updatedNote);
        } catch (error) {
            console.log("Error updating note in DB", error.message);
        }
    }
    async deleteNote(noteID) {
        try {
            return await axios.delete(`${this.backend}api/note/delete/` + noteID);
        } catch (error) {
            console.log("Error deleting note in DB", error.message);
        }
    }
}

const noteService = new NoteService();
export default noteService;