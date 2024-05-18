'use client';
import { useSearchParams } from 'next/navigation';
import SidebarNoteItemContent from './SidebarNoteItemContent';

export default function SidebarNoteListFilter({ notes }) {
  const searchParams = useSearchParams();
  const searchText = searchParams.get('p');
  return (
    <ul className="notes-list">
      {notes.map((noteItem) => {
        const { noteId, note, header } = noteItem;
        if (
          !searchText ||
          note.title.toLowerCase().includes(searchText.toLowerCase())
        ) {
          return (
            <li key={noteId}>
              <SidebarNoteItemContent
                id={noteId}
                title={note.title}
                expandedChildren={
                  <p className="sidebar-note-excerpt">
                    {note.content.substring(0, 20) || <i>No Content</i>}
                  </p>
                }
              >
                {header}
              </SidebarNoteItemContent>
            </li>
          );
        }
      })}
    </ul>
  );
}
