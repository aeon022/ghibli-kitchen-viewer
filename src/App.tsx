import { Routes, Route, Navigate, Link, useParams, useNavigate } from 'react-router-dom';
import { plans, type PlanIndexItem } from './planLoader';

function PlanPage() {
  const { id } = useParams();
  const nav = useNavigate();

  if (!plans.length) return <div style={{ padding: 16 }}>Keine Pläne gefunden.</div>;

  const idx = Math.max(
    0,
    plans.findIndex((p: PlanIndexItem) => p.id === id)
  );
  const current = plans[idx] ?? plans[0];
  const Prev = plans[idx + 1]; // älter
  const Next = plans[idx - 1]; // neuer
  const Cmp = current.Component;

  return (
    <div style={{ padding: 16 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 12 }}>
        <button onClick={() => Prev && nav(`/plan/${Prev.id}`)} disabled={!Prev}>← Älter</button>
        <button onClick={() => Next && nav(`/plan/${Next.id}`)} disabled={!Next}>Neuer →</button>
        <h1 style={{ margin: 0, marginLeft: 12, fontSize: 18 }}>{current.title}</h1>
      </div>
      <Cmp />
    </div>
  );
}

export default function App() {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', minHeight: '100vh' }}>
      <aside style={{ borderRight: '1px solid #ddd', padding: 12, overflow: 'auto' }}>
        <h3 style={{ marginTop: 0 }}>GhibliKitchen Pläne</h3>
        <ol style={{ paddingLeft: 18 }}>
          {plans.map((p: PlanIndexItem) => (
            <li key={p.id} style={{ marginBottom: 6 }}>
              <Link to={`/plan/${p.id}`}>{p.startDate} — {p.title}</Link>
            </li>
          ))}
        </ol>
      </aside>
      <main>
        <Routes>
          <Route
            path="/"
            element={plans.length ? <Navigate to={`/plan/${plans[0].id}`} replace /> : <div style={{ padding: 16 }}>Keine Pläne vorhanden.</div>}
          />
          <Route path="/plan/:id" element={<PlanPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}

