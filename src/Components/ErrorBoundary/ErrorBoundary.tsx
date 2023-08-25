import React, {ReactNode} from 'react';
import Link from 'next/link';

interface ErrorBoundaryProps {
    children: ReactNode;
}

interface ErrorBoundaryState {
    hasError: boolean;
}

class ErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
    constructor(props: ErrorBoundaryProps) {
        super(props);
        this.state = { hasError: false };
    }
    static getDerivedStateFromError(error: Error): ErrorBoundaryState {
        return { hasError: true };
    }
    componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
        console.log({ error, errorInfo });
    }
    render(): React.ReactNode {
        if (this.state.hasError) {
            return (
                <div>
                    <h2>Ой, что-то пошло не так!</h2>
                    <button type="button" onClick={() => this.setState({ hasError: false })}>
                        Попробовать еще раз?
                    </button>
                    <Link href="/">Вернуться на главную</Link>
                </div>
            );
        }
        // Возвращаем дочерние компоненты в случае отсутствия ошибки
        return this.props.children;
    }
}

export default ErrorBoundary;
