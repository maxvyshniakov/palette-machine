import React from 'react';
import { LEGACY_STORAGE_KEY, STORAGE_KEY } from '../config/constants';

/**
 * Keeps a crash in one tab from blanking the whole app.
 */
export class ErrorBoundary extends React.Component {
  state = { error: null };

  static getDerivedStateFromError(error) {
    return { error };
  }

  componentDidCatch(error, info) {
    console.error(error, info.componentStack);
  }

  componentDidUpdate(prevProps) {
    // Switching tabs clears the error
    if (this.state.error && prevProps.resetKey !== this.props.resetKey) {
      this.setState({ error: null });
    }
  }

  resetSavedConfig = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(LEGACY_STORAGE_KEY);
    } catch {
      // ignore
    }
    window.location.reload();
  };

  render() {
    if (!this.state.error) return this.props.children;

    return (
      <div className="flex-1 flex items-center justify-center p-6">
        <div className="max-w-md space-y-3 text-sm">
          <h2 className="text-base font-semibold">Something went wrong</h2>
          <pre className="p-3 rounded bg-red-500/10 text-red-500 text-xs whitespace-pre-wrap">
            {String(this.state.error?.message || this.state.error)}
          </pre>
          <div className="flex gap-2">
            <button
              onClick={() => this.setState({ error: null })}
              className="px-3 py-1 rounded bg-blue-600 text-white hover:bg-blue-700"
            >
              Try again
            </button>
            <button
              onClick={this.resetSavedConfig}
              className="px-3 py-1 rounded border border-gray-500/40 hover:bg-gray-500/10"
            >
              Reset saved palette
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default ErrorBoundary;
