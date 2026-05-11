import React from 'react';
import { useBookmarks } from '../hooks/useBookmarks';

interface Meal {
  id: string;
  title: string;
  desc?: string;
  story?: string;
  ingredients: string[];
  steps: string[];
  target: string;
  isViral?: boolean;
  riceCooker?: { enabled: boolean; program?: string; water?: string; notes?: string };
  remind?: boolean;
  checks: string;
  swaps: string;
  side: string;
}

interface MealCardProps {
  meal: Meal;
  meta: { id: string; title: string };
  cardPanelStyle: React.CSSProperties;
  ImageBanner: React.ComponentType<{ meal: Meal }>;
  tagChip: (text: string) => React.ReactElement;
  viralChip?: () => React.ReactElement;
}

interface BookmarkMenuButtonProps {
  planSlug: string;
  recipeId: string;
  recipeTitle: string;
  planTitle: string;
}

export function BookmarkMenuButton({ planSlug, recipeId, recipeTitle, planTitle }: BookmarkMenuButtonProps) {
  const { isBookmarked, toggleBookmark, bookmarkLists, toggleInList } = useBookmarks();
  const bookmarked = isBookmarked(planSlug, recipeId);
  const [showOptions, setShowOptions] = React.useState(false);

  const bookmark = {
    planSlug,
    recipeId,
    recipeTitle,
    planTitle
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setShowOptions(!showOptions)}
        style={{
          background: bookmarked ? "var(--accent)" : "transparent",
          border: "1px solid var(--border)",
          borderRadius: 8,
          padding: "4px 8px",
          cursor: "pointer",
          fontSize: 16,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: bookmarked ? "#fff" : "var(--text)"
        }}
        title={bookmarked ? "Bookmark entfernen" : "Bookmark hinzufügen"}
      >
        {bookmarked ? "★" : "☆"}
      </button>
      {showOptions && (
        <div style={{
          position: "absolute",
          top: "100%",
          right: 0,
          background: "var(--panel)",
          border: "1px solid var(--border)",
          borderRadius: 8,
          padding: "8px",
          zIndex: 10,
          minWidth: "150px"
        }}>
          <button
            onClick={() => {
              toggleBookmark(bookmark);
              setShowOptions(false);
            }}
            style={{
              display: "block",
              width: "100%",
              textAlign: "left",
              background: bookmarked ? "var(--accent)" : "transparent",
              border: "none",
              padding: "4px 8px",
              cursor: "pointer",
              fontSize: 12,
              color: bookmarked ? "#fff" : "var(--text)",
              borderRadius: 4
            }}
          >
            {bookmarked ? "Aus Merkliste entfernen" : "Zu Merkliste hinzufügen"}
          </button>
          {bookmarkLists.length > 0 && (
            <>
              <hr style={{ margin: "8px 0", border: "none", borderTop: "1px solid var(--border)" }} />
              {bookmarkLists.map((list) => {
                const inList = list.bookmarks.some((b) => b.planSlug === planSlug && b.recipeId === recipeId);
                return (
                  <button
                    key={list.id}
                    onClick={() => {
                      toggleInList(list.id, bookmark);
                      setShowOptions(false);
                    }}
                    style={{
                      display: "block",
                      width: "100%",
                      textAlign: "left",
                      background: inList ? "var(--accent)" : "transparent",
                      border: "none",
                      padding: "4px 8px",
                      cursor: "pointer",
                      fontSize: 12,
                      color: inList ? "#fff" : "var(--text)",
                      borderRadius: 4
                    }}
                  >
                    {list.name} {inList ? "✓" : ""}
                  </button>
                );
              })}
            </>
          )}
        </div>
      )}
    </div>
  );
}

export function SharedMealCard({ meal, meta, cardPanelStyle, ImageBanner, tagChip, viralChip }: MealCardProps) {
  return (
    <div className="meal-card" style={cardPanelStyle} id={`meal-${meal.id}`}>
      <ImageBanner meal={meal} />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 12 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <BookmarkMenuButton
            planSlug={meta.id}
            recipeId={meal.id}
            recipeTitle={meal.title}
            planTitle={meta.title}
          />
          <h3 style={{ margin: 0, lineHeight: 1.3 }}>{meal.title}</h3>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          {meal.isViral && viralChip ? viralChip() : null}
          {tagChip(meal.target)}
          {meal.riceCooker?.enabled ? tagChip("🍚 Reiskocher") : null}
          {meal.remind ? tagChip("💊 Metformin") : null}
        </div>
      </div>
      {meal.desc ? <p style={{ marginTop: 8, color: "var(--muted)", fontStyle: "italic" }}>{meal.desc}</p> : null}
      {meal.story ? <p style={{ marginTop: 4, color: "var(--text)", fontSize: "0.9em" }}>{meal.story}</p> : null}

      <h4>Zutaten (2 Personen)</h4>
      <ul>{meal.ingredients.map((i, idx) => <li key={idx}>{i}</li>)}</ul>

      <h4>Zubereitung</h4>
      <ol>{meal.steps.map((s, idx) => <li key={idx}>{s}</li>)}</ol>

      <div style={{ marginTop: 16, padding: "12px 16px", background: "var(--chip-bg)", borderRadius: 12 }}>
        <p style={{margin:"0 0 4px"}}><strong>Hinweise:</strong> {meal.checks}</p>
        <p style={{margin:"0 0 4px"}}><strong>Austausche:</strong> {meal.swaps}</p>
        <p style={{margin:0}}><strong>Beilage:</strong> {meal.side}</p>
      </div>

      {meal.riceCooker?.enabled ? (
        <div style={{ marginTop: 12 }}>
          <details>
            <summary style={{cursor:"pointer", fontWeight:600}}>Reiskocher-Details</summary>
            <ul style={{marginTop:8}}>
              <li><strong>Programm:</strong> {meal.riceCooker.program}</li>
              <li><strong>Wasser:</strong> {meal.riceCooker.water}</li>
              {meal.riceCooker.notes ? <li><strong>Info:</strong> {meal.riceCooker.notes}</li> : null}
            </ul>
          </details>
        </div>
      ) : null}
    </div>
  );
}
