import React from 'react';
import Link from 'next/link';

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props)

        this.state = { hasError: false }
    }
    static getDerivedStateFromError(error) {

        return { hasError: true }
    }
    componentDidCatch(error, errorInfo) {
        console.log({ error, errorInfo })
    }
    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h2>Ой, что то пошло не так!</h2>
                    <button
                        type="button"
                        onClick={() => this.setState({ hasError: false })}
                    >
                        Попробовать еще раз?
                    </button>
                    <Link href={'/'} >Вернуться на главную</Link>
                </div>
            )
        }

        // Return children components in case of no error

        return this.props.children
    }
}

export default ErrorBoundary
