'use client';

import { useState } from 'react';
import NotePreveiw from './NotePreview';
import { useFormStatus } from 'react-dom';

export default function NoteEditor({ noteId, initialTitle, initialBody }) {
  const { pending } = useFormStatus();
  const [title, setTitle] = useState(initialTitle);
  const [body, setBody] = useState(initialBody);
  const isDraft = !noteId;

  return (
    <div className="note-editor">
      <form className="note-editor-form" autoComplete="off">
        <label className="offscreen" htmlFor="note-title-input">
          Enter a title for your note
        </label>
        <input
          id="note-title-input"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label className="offscreen" htmlFor="note-body-input">
          Enter a body for your note
        </label>
        <textarea
          id="note-body-input"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      </form>
      <div className="note-editor-preview">
        <form className="note-editor-menu" role="menubar">
          <button className="note-editor-done" disabled={pending}>
            <img
              src="/checkmark.svg"
              width="14px"
              height="10px"
              alt=""
              role="presentation"
            />
            Done
          </button>
          {!isDraft && (
            <button
              className="note-editor-delete"
              disabled={pending}
              role="menuitem"
            >
              <img
                src="/cross.svg"
                width="10px"
                height="10px"
                alt=""
                role="presentation"
              />
              Delete
            </button>
          )}
        </form>
        <div className="label lbael-preview" role="status">
          Preview
        </div>
        <h1 className="note-title">{title}</h1>
        <NotePreveiw>{body}</NotePreveiw>
      </div>
    </div>
  );
}
