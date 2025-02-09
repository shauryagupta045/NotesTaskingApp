const NoteModel = require("../Models/Note");

const getNotes = async (req, res) => {
    try {
        const notes = await NoteModel.find({ user: req.user._id }).sort({ createdAt: 1 });
        res.status(200).json({ notes, success: true });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

const addNote = async (req, res) => {
    try {
        const { text } = req.body;
        const note = new NoteModel({ text, user: req.user._id });
        await note.save();
        res.status(201).json({ message: "Note added successfully", success: true, note });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

const deleteNote = async (req, res) => {
    try {
        const { id } = req.params;
        const note = await NoteModel.findById(id);
        if (!note) {
            return res.status(404).json({ message: "Note not found", success: false });
        }
        if (note.user.toString() !== req.user._id.toString()) {
            return res.status(403).json({ message: "Unauthorized", success: false });
        }
        await NoteModel.findByIdAndDelete(id);
        res.status(200).json({ message: "Note deleted successfully", success: true });
    } catch (err) {
        res.status(500).json({ message: "Internal server error", success: false });
    }
};

module.exports = {
    getNotes,
    addNote,
    deleteNote
};