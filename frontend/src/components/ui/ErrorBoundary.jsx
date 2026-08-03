import React from 'react';
import { AlertCircle, RefreshCw, Home } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from './Button';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex-1 flex flex-col items-center justify-center h-full min-h-[600px] space-y-4 p-8">
          <AlertCircle size={56} className="text-red-400 mb-2" />
          <h2 className="text-2xl font-bold text-white font-heading">Something went wrong</h2>
          <p className="text-gray-400 text-sm max-w-md text-center bg-white/[0.03] p-4 rounded-xl border border-white/[0.08] font-mono whitespace-pre-wrap mt-4 mb-6">
            {this.state.error?.toString()}
          </p>
          <div className="flex items-center gap-3 mt-6">
            <Button onClick={() => window.location.reload()} icon={RefreshCw} size="md">
              Reload Page
            </Button>
            <Link to="/dashboard">
              <Button variant="ghost" icon={Home} size="md">
                Go to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
