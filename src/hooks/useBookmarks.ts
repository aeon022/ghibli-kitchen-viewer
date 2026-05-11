import { useState, useEffect } from 'react';

const BOOKMARKS_KEY = 'mkt.bookmarks';
const BOOKMARK_LISTS_KEY = 'mkt.bookmarkLists';
const BOOKMARKS_CHANGED_EVENT = 'mkt.bookmarks.changed';

export interface Bookmark {
  planSlug: string;
  recipeId: string;
  recipeTitle: string;
  planTitle: string;
}

export interface BookmarkList {
  id: string;
  name: string;
  bookmarks: Bookmark[];
}

function readJson<T>(key: string, fallback: T): T {
  try {
    const saved = localStorage.getItem(key);
    return saved ? JSON.parse(saved) : fallback;
  } catch {
    return fallback;
  }
}

function sameJson<T>(a: T, b: T) {
  return JSON.stringify(a) === JSON.stringify(b);
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    return readJson<Bookmark[]>(BOOKMARKS_KEY, []);
  });

  const [bookmarkLists, setBookmarkLists] = useState<BookmarkList[]>(() => {
    return readJson<BookmarkList[]>(BOOKMARK_LISTS_KEY, []);
  });

  useEffect(() => {
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
    window.dispatchEvent(new Event(BOOKMARKS_CHANGED_EVENT));
  }, [bookmarks]);

  useEffect(() => {
    localStorage.setItem(BOOKMARK_LISTS_KEY, JSON.stringify(bookmarkLists));
    window.dispatchEvent(new Event(BOOKMARKS_CHANGED_EVENT));
  }, [bookmarkLists]);

  useEffect(() => {
    const syncFromStorage = () => {
      const nextBookmarks = readJson<Bookmark[]>(BOOKMARKS_KEY, []);
      const nextBookmarkLists = readJson<BookmarkList[]>(BOOKMARK_LISTS_KEY, []);
      setBookmarks((prev) => (sameJson(prev, nextBookmarks) ? prev : nextBookmarks));
      setBookmarkLists((prev) => (sameJson(prev, nextBookmarkLists) ? prev : nextBookmarkLists));
    };

    window.addEventListener(BOOKMARKS_CHANGED_EVENT, syncFromStorage);
    window.addEventListener('storage', syncFromStorage);

    return () => {
      window.removeEventListener(BOOKMARKS_CHANGED_EVENT, syncFromStorage);
      window.removeEventListener('storage', syncFromStorage);
    };
  }, []);

  const addBookmark = (bookmark: Bookmark) => {
    setBookmarks((prev) => {
      if (prev.some((b) => b.planSlug === bookmark.planSlug && b.recipeId === bookmark.recipeId)) {
        return prev;
      }
      return [...prev, bookmark];
    });
  };

  const removeBookmark = (planSlug: string, recipeId: string) => {
    setBookmarks((prev) => prev.filter((b) => !(b.planSlug === planSlug && b.recipeId === recipeId)));
  };

  const isBookmarked = (planSlug: string, recipeId: string) => {
    return bookmarks.some((b) => b.planSlug === planSlug && b.recipeId === recipeId);
  };

  const toggleBookmark = (bookmark: Bookmark) => {
    if (isBookmarked(bookmark.planSlug, bookmark.recipeId)) {
      removeBookmark(bookmark.planSlug, bookmark.recipeId);
    } else {
      addBookmark(bookmark);
    }
  };

  // Neue Funktionen für Listen
  const createList = (name: string) => {
    const id = `list-${Date.now()}`;
    setBookmarkLists((prev) => [...prev, { id, name, bookmarks: [] }]);
    return id;
  };

  const deleteList = (id: string) => {
    setBookmarkLists((prev) => prev.filter((list) => list.id !== id));
  };

  const addToList = (listId: string, bookmark: Bookmark) => {
    setBookmarkLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? {
              ...list,
              bookmarks: list.bookmarks.some((b) => b.planSlug === bookmark.planSlug && b.recipeId === bookmark.recipeId)
                ? list.bookmarks
                : [...list.bookmarks, bookmark],
            }
          : list
      )
    );
  };

  const removeFromList = (listId: string, planSlug: string, recipeId: string) => {
    setBookmarkLists((prev) =>
      prev.map((list) =>
        list.id === listId
          ? { ...list, bookmarks: list.bookmarks.filter((b) => !(b.planSlug === planSlug && b.recipeId === recipeId)) }
          : list
      )
    );
  };

  const isInList = (listId: string, planSlug: string, recipeId: string) => {
    const list = bookmarkLists.find((l) => l.id === listId);
    return list ? list.bookmarks.some((b) => b.planSlug === planSlug && b.recipeId === recipeId) : false;
  };

  const toggleInList = (listId: string, bookmark: Bookmark) => {
    if (isInList(listId, bookmark.planSlug, bookmark.recipeId)) {
      removeFromList(listId, bookmark.planSlug, bookmark.recipeId);
    } else {
      addToList(listId, bookmark);
    }
  };

  return {
    bookmarks,
    bookmarkLists,
    addBookmark,
    removeBookmark,
    isBookmarked,
    toggleBookmark,
    createList,
    deleteList,
    addToList,
    removeFromList,
    isInList,
    toggleInList,
  };
}
