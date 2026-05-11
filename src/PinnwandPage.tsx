import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { useBookmarks, BookmarkList, Bookmark } from './hooks/useBookmarks';
import { useLang } from './App';

export function PinnwandPage({ plans }: { plans: any[] }) {
  const { lang } = useLang();
  const { bookmarkLists, createList, deleteList, removeFromList } = useBookmarks();
  const [newListName, setNewListName] = useState('');

  const totalBookmarks = useMemo(
    () => bookmarkLists.reduce((sum, list) => sum + list.bookmarks.length, 0),
    [bookmarkLists]
  );

  const handleCreateList = (event: React.FormEvent) => {
    event.preventDefault();
    const name = newListName.trim();
    if (!name) return;
    createList(name);
    setNewListName('');
  };

  const getPlanTitle = (bookmark: Bookmark) => {
    const plan = plans.find((p) => p.slug === bookmark.planSlug);
    return plan?.meta?.title ?? bookmark.planTitle;
  };

  return (
    <div className="main-inner pinboard-page">
      <header className="pinboard-header">
        <div>
          <h1>{lang === 'de' ? 'Pinnwand' : 'Pinboard'}</h1>
          <p>
            {bookmarkLists.length} {lang === 'de' ? 'Listen' : 'lists'} · {totalBookmarks}{' '}
            {lang === 'de' ? 'Rezepte' : 'recipes'}
          </p>
        </div>
        <Link className="pinboard-header-link" to="/bookmarks">
          <span aria-hidden="true">★</span>
          {lang === 'de' ? 'Merkliste' : 'Bookmarks'}
        </Link>
      </header>

      <form className="pinboard-create" onSubmit={handleCreateList}>
        <input
          type="text"
          value={newListName}
          onChange={(e) => setNewListName(e.target.value)}
          placeholder={lang === 'de' ? 'Neue Liste' : 'New list'}
        />
        <button type="submit">{lang === 'de' ? 'Erstellen' : 'Create'}</button>
      </form>

      {bookmarkLists.length === 0 ? (
        <section className="pinboard-empty">
          <div className="pinboard-empty-icon" aria-hidden="true">☆</div>
          <h2>{lang === 'de' ? 'Noch keine Pinnwände' : 'No pinboards yet'}</h2>
          <p>{lang === 'de' ? 'Erstelle eine Liste und sammle Rezepte nach Thema.' : 'Create a list and collect recipes by theme.'}</p>
        </section>
      ) : (
        <section className="pinboard-grid">
          {bookmarkLists.map((list: BookmarkList) => (
            <article key={list.id} className="pinboard-list">
              <div className="pinboard-list-head">
                <div>
                  <h2>{list.name}</h2>
                  <span>
                    {list.bookmarks.length} {lang === 'de' ? 'Rezepte' : 'recipes'}
                  </span>
                </div>
                <button
                  type="button"
                  className="pinboard-delete-list"
                  onClick={() => deleteList(list.id)}
                  title={lang === 'de' ? 'Liste löschen' : 'Delete list'}
                  aria-label={lang === 'de' ? `${list.name} löschen` : `Delete ${list.name}`}
                >
                  ×
                </button>
              </div>

              {list.bookmarks.length === 0 ? (
                <p className="pinboard-list-empty">
                  {lang === 'de' ? 'Noch keine Rezepte in dieser Liste.' : 'No recipes in this list yet.'}
                </p>
              ) : (
                <ul className="pinboard-recipes">
                  {list.bookmarks.map((bookmark: Bookmark) => (
                    <li key={`${bookmark.planSlug}-${bookmark.recipeId}`}>
                      <Link to={`/plan/${bookmark.planSlug}#meal-${bookmark.recipeId}`}>
                        <strong>{bookmark.recipeTitle}</strong>
                        <span>{getPlanTitle(bookmark)}</span>
                      </Link>
                      <button
                        type="button"
                        onClick={() => removeFromList(list.id, bookmark.planSlug, bookmark.recipeId)}
                        title={lang === 'de' ? 'Aus Liste entfernen' : 'Remove from list'}
                        aria-label={lang === 'de' ? `${bookmark.recipeTitle} entfernen` : `Remove ${bookmark.recipeTitle}`}
                      >
                        ×
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </section>
      )}
    </div>
  );
}
