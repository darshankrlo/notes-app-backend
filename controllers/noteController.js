const Note = require('../models/Note.js');

const createNote =async (req,res) => {
    try {    const data = req.body;
    const note = await Note.create(data);
    res.status(201).send(note);
    }catch(error){
        res.status(500).send({message: "Error creating note", error: error.message});
    }
}

const getAllNotes = async(req,res) =>{
    try {
        const notes = await Note.find({});
        res.status(200).send(notes);
    }catch(error){
        res.status(500).send({message: "Error fetching notes",error: error.message}
        )
    }
}

const getNoteById = async(req,res) =>{
    try {
        const id = req.params.id;
        const note = await Note.findById(id);
        if(!note){
            return res.status(404).send({message: "Note not found"})
        }
        res.status(200).send(note);
    }catch(error){
        res.status(500).send({message: "Error fetching note", error: error.message})
    }
}

const updateNote = async(req,res) => {
    const id = req.params.id;
    const data = req.body;
    try {
        const updatedNote = await Note.findByIdAndUpdate(id, data, {new: true});
        if(!updatedNote){
            return res.status(404).send({message: "Note not found"})
        }
        res.status(200).send(updatedNote);
    }catch(error){
        res.status(500).send({message: "Error updating note", error: error.message})
    }
}

const deleteNote = async(req,res) => {
    const id = req.params.id;
    try {
        const deletedNote = await Note.findByIdAndDelete(id);
        if(!deletedNote){
            return res.status(404).send({message: "Note not found"});
        }
        res.status(200).send("Note deleted successfully");
    }catch(error){
        res.status(500).send({message: "Error deleting note", error: error.message});
    }
}
exports.createNote = createNote;
exports.getAllNotes = getAllNotes;
exports.getNoteById = getNoteById;
exports.updateNote = updateNote;
exports.deleteNote = deleteNote;