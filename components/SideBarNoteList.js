import { getAllNotes } from '@/lib/redis';
import { sleep } from '@/lib/utils';
import SidebarNoteListFilter from './SidebarNoteListFilter';
import SidebarNoteItemHeader from './SidebarNoteItemHeader';

export default async function SidebarNoteList() {
  console.log('sidebar get note list');
  const notes = await getAllNotes();
  const arr = Object.entries(notes);
  await sleep(3000);

  if (arr.length === 0) {
    return <div className="notes-empty">{'No notes created yet!'}</div>;
  }

  return (
    <SidebarNoteListFilter
      notes={arr.map(([noteId, note]) => {
        const noteData = JSON.parse(note);
        return {
          noteId,
          note: noteData,
          header: (
            <SidebarNoteItemHeader
              title={noteData.title}
              updateTime={noteData.updateTime}
            />
          ),
        };
      })}
    />
  );
}
