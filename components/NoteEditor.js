'use client';

import { useState } from 'react';
import NotePreview from '@/components/NotePreview';
import SaveButton from '@/components/SaveButton';
import DeleteButton from '@/components/DeleteButton';
import { deleteNote, saveNote } from '@/actions';

const initialState = {
  message: null,
};
export default function NoteEditor({ noteId, initialTitle, initialBody }) {
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const [messages, setMessages] = useState(initialState);
  const isDraft = !noteId;

  const savesNote = async (formData) => {
    const result = await saveNote(formData);
    setMessages(result);
  };

  return (
    <div className="note-editor">
      <form className="note-editor-form" autoComplete="off">
        <div className="note-editor-menu" role="menubar">
          <input type="hidden" name="noteId" value={noteId} />
          <SaveButton formAction={savesNote} />
          <DeleteButton isDraft={isDraft} formAction={deleteNote} />
        </div>
        <div className="note-editor-menu">
          {messages?.message}
          {messages.errors && messages.errors[0].message}
        </div>
        <label className="offscreen" htmlFor="note-title-input">
          Enter a title for your note
        </label>
        <input
          id="note-title-input"
          type="text"
          name="title"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
          }}
        />
        <label className="offscreen" htmlFor="note-body-input">
          Enter the body for your note
        </label>
        <textarea
          name="body"
          value={body}
          id="note-body-input"
          onChange={(e) => setBody(e.target.value)}
        />
      </form>
      <div className="note-editor-preview">
        <div className="label label--preview" role="status">
          Preview
        </div>
        <h1 className="note-title">{title}</h1>
        <NotePreview>{body}</NotePreview>
      </div>
    </div>
  );
}
