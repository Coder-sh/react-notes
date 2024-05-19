'use client';
import { usePathname, useRouter } from 'next/navigation';
import { useTransition } from 'react';
import { useTranslation } from '@/app/i18n/client';

const Spinner = ({ active = true }) => {
  return (
    <div
      className={['spinner', active && 'spinner--active'].join(' ')}
      role="progressbar"
      aria-busy={active ? 'true' : false}
    />
  );
};

export default function SidebarSearchField({ lng }) {
  const { t } = useTranslation(lng, 'basic');
  const { replace } = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const handleSearch = (term) => {
    const params = new URLSearchParams(location.search);
    if (term) {
      params.set('p', term);
    } else {
      params.delete('p');
    }
    startTransition(() => {
      replace(`${pathname}?${params.toString()}`);
    });
  };
  return (
    <div className="search" role="search">
      <label className="offscreen" htmlFor="sidebar-search-input">
        Search for a note by title
      </label>
      <input
        id="sidebar-search-input"
        placeholder={t('search')}
        type="text"
        onChange={(e) => handleSearch(e.target.value)}
      />
      <Spinner active={isPending} />
    </div>
  );
}
