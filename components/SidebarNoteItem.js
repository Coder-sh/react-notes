import SidebarNoteItemContent from './SidebarNoteItemContent';
import SidebarNoteItemHeader from './SidebarNoteItemHeader';

export default function SiderbarNoteItem({ noteId, note }) {
  const { title, content = '', updateTime } = note;
  return (
    <SidebarNoteItemContent
      id={noteId}
      title={title}
      expandedChildren={
        <p className="sidebar-note-excerpt">
          {content.substring(0, 20) || <i>No Content</i>}
        </p>
      }
    >
      <SidebarNoteItemHeader title={title} updateTime={updateTime} />
    </SidebarNoteItemContent>
  );
}
