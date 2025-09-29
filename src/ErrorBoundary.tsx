import { Component, type ReactNode } from 'react';

type Props = { fallback?: ReactNode; children?: ReactNode };
type State = { error?: Error };

export default class ErrorBoundary extends Component<Props, State> {
  state: Readonly<State> = {};

  static getDerivedStateFromError(error: Error): State {
    return { error };
  }

  componentDidCatch(error: Error, info: unknown) {
    // z.B. an Logging schicken oder zumindest console.error
    console.error('Plan render error:', error, info);
  }

  render() {
    if (this.state.error) {
      return this.props.fallback ?? (
        <div style={{ padding: 16, color: '#b00' }}>
          <h3>Plan konnte nicht gerendert werden.</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{String(this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children ?? null;
  }
}