import SiderbarNoteItem from './SidebarNoteItem';
import { getAllNotes } from '@/lib/redis';

export default async function SidebarNoteList() {
  console.log('sidebar get note list');
  const notes = await getAllNotes();
  const arr = Object.entries(notes);
  const sleep = (time) => new Promise((resolve) => setTimeout(resolve, time));
  await sleep(3000);

  if (arr.length === 0) {
    return <div className="notes-empty">{'No notes created yet!'}</div>;
  }
  return (
    <ul className="notes-list">
      {arr.map(([noteId, note]) => {
        return (
          <li key={noteId}>
            <SiderbarNoteItem noteId={noteId} note={JSON.parse(note)} />
          </li>
        );
      })}
    </ul>
  );
}
