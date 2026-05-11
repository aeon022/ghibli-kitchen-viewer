import { useState, useEffect } from 'react';

export interface Bookmark {
  planSlug: string;
  recipeId: string;
  recipeTitle: string;
  planTitle: string;
}

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>(() => {
    const saved = localStorage.getItem('mkt.bookmarks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('mkt.bookmarks', JSON.stringify(bookmarks));
  }, [bookmarks]);

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

  return { bookmarks, addBookmark, removeBookmark, isBookmarked, toggleBookmark };
}
