import { Suspense } from 'react';
import Link from 'next/link';
import SidebarSearchField from './SidebarSearchField';
import SidebarNoteList from './SidebarNoteList';
import EditButton from './EditButton';
import NoteListSkeleton from './NoteListSkeleton';
import { useTranslation } from '@/app/i18n';

export default async function SideBar({ lng }) {
  const { t } = await useTranslation(lng);
  return (
    <section className="col sidebar">
      <Link href={'/'} className="link--unstyled">
        <section className="sidebar-header">
          <img
            className="logo"
            src="/logo.svg"
            width="22px"
            height="20px"
            alt=""
            role="presentation"
          />
          <strong>React Notes</strong>
        </section>
      </Link>
      <section className="sidebar-menu" role="menubar">
        <SidebarSearchField lng={lng} />
        <EditButton>{t('new')}</EditButton>
      </section>
      <nav>
        <Suspense fallback={<NoteListSkeleton />}>
          <SidebarNoteList />
        </Suspense>
      </nav>
    </section>
  );
}
