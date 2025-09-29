import { Component, type ReactNode } from 'react';

export default class ErrorBoundary extends Component<{ fallback?: ReactNode }, { error?: Error }> {
  state = { error: undefined as Error | undefined };
  static getDerivedStateFromError(error: Error) { return { error }; }
  render() {
    if (this.state.error) {
      return this.props.fallback ?? (
        <div style={{ padding: 16, color: '#b00' }}>
          <h3>Plan konnte nicht gerendert werden.</h3>
          <pre style={{ whiteSpace: 'pre-wrap' }}>{String(this.state.error)}</pre>
        </div>
      );
    }
    return this.props.children as ReactNode;
  }
}