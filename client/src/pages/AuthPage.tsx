import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import type { ToastState } from '../types/toast.types';
import { login, register } from '../api/auth';
import Toast from '../components/Toast';

export const AuthPage = () => {
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(false);
    const [loader, setLoader] = useState<boolean>(false);
    const [toast, setToast] = useState<ToastState>({
        show: false,
        message: '',
        type: 'success',
    });

    const navigate = useNavigate();

    const handlesSubmit = async (event: React.SubmitEvent) => {
        event.preventDefault();
        setToast({
            show: false,
            message: '',
            type: 'success',
        });

        if (!userName.trim() || !password.trim()) {
            setToast({
                show: true,
                message: 'Please fill in all fields',
                type: 'error',
            });
            return;
        }

        if (password.length < 6) {
            setToast({
                show: true,
                message: 'Password must contain at least 6 characters',
                type: 'error',
            });
            return;
        }

        try {
            if (isLogin) {
                setLoader(true);
                const response = await login(userName, password);

                if (response && response.token) {
                    localStorage.setItem('token', response.token);
                    navigate('/');
                }

                setUserName('');
                setPassword('');
            } else {
                setLoader(true);
                const response = await register(userName, password);

                if (response) {
                    setToast({
                        show: true,
                        message:
                            'You have successfully registered, now log in to your account',
                        type: 'success',
                    });
                    setIsLogin(true);
                    setUserName('');
                    setPassword('');
                }
            }
        } catch (err) {
            let errorMessage = 'Сталася непередбачувана помилка';
            if (axios.isAxiosError(err)) {
                errorMessage =
                    err.response?.data.message || 'Помилка при вході';
            } else {
                console.error('Невідома помилка:', err);
            }
            setToast({
                show: true,
                message: errorMessage,
                type: 'error',
            });
        } finally {
            setLoader(false);
        }
    };

    return (
        <div className="auth-page">
            <div className="auth-page__container">
                <form className="auth-page__form" onSubmit={handlesSubmit}>
                    <div className="auth-page__input-container">
                        <label>Username</label>
                        <input
                            className="auth-page__input"
                            type="text"
                            value={userName}
                            onChange={event => setUserName(event.target.value)}
                        />
                    </div>
                    <div className="auth-page__input-container">
                        <label>password</label>
                        <input
                            className="auth-page__input"
                            type="password"
                            value={password}
                            onChange={event => setPassword(event.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="auth-page__enter-btn"
                        disabled={loader}
                    >
                        {isLogin ? 'Login' : 'Register'}
                    </button>
                    <button
                        type="button"
                        className="auth-page__btn"
                        onClick={event => {
                            event.stopPropagation();
                            setUserName('');
                            setPassword('');
                            setIsLogin(!isLogin);
                        }}
                    >
                        {isLogin
                            ? `Don't have an account? Register`
                            : 'Have an account? Log in'}
                    </button>
                </form>
            </div>
            <Toast
                show={toast.show}
                message={toast.message}
                type={toast.type}
                onClose={() => setToast(prev => ({ ...prev, show: false }))}
            />
        </div>
    );
};

export default AuthPage;
