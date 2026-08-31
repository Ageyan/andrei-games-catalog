import { useState } from 'react';
import axios from 'axios';

import { useFavorite } from '../../context/FavoritesContext';
import type { ToastState } from '../../types/toast.types';
import { login, register } from '../../api/auth';

import Toast from '../common/Toast';
import Loader from '../common/Loader';

interface ModalAuthProps {
    isAuthModal: boolean;
    setIsAuthModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export const ModalAuth = ({ isAuthModal, setIsAuthModal }: ModalAuthProps) => {
    const [userName, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [isLogin, setIsLogin] = useState<boolean>(true);
    const [loader, setLoader] = useState<boolean>(false);
    const [toast, setToast] = useState<ToastState>({
        show: false,
        message: '',
        type: 'success',
    });

    const { setIsAuthenticated } = useFavorite();

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
                    setIsAuthenticated(true);
                    setIsAuthModal(false);
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
            let errorMessage =
                'Error while trying to create/login to an account';
            if (axios.isAxiosError(err)) {
                errorMessage =
                    err.response?.data.message || 'An unknown error occurred';
            } else {
                console.error('An unknown error occurred:', err);
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
        <div
            className={`modal-auth ${isAuthModal ? 'show' : ''}`}
            onClick={() => setIsAuthModal(false)}
        >
            <div
                className="modal-auth__container"
                onClick={e => e.stopPropagation()}
            >
                <button
                    className="modal-auth__close-btn"
                    onClick={() => setIsAuthModal(false)}
                >
                    X
                </button>
                <form className="modal-auth__form" onSubmit={handlesSubmit}>
                    <div className="modal-auth__input-container">
                        <label>Username</label>
                        <input
                            className="modal-auth__input"
                            type="text"
                            value={userName}
                            autoCapitalize="none"
                            autoCorrect="off"
                            autoComplete="off"
                            onChange={event => setUserName(event.target.value)}
                        />
                    </div>
                    <div className="modal-auth__input-container">
                        <label>password</label>
                        <input
                            className="modal-auth__input"
                            type="password"
                            value={password}
                            autoCapitalize="none"
                            autoCorrect="off"
                            autoComplete="off"
                            onChange={event => setPassword(event.target.value)}
                        />
                    </div>
                    <button
                        type="submit"
                        className="modal-auth__enter-btn"
                        disabled={loader}
                    >
                        {loader ? (
                            <Loader btn={true} />
                        ) : isLogin ? (
                            'Login'
                        ) : (
                            'Register'
                        )}
                    </button>
                    <button
                        type="button"
                        className="modal-auth__btn"
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

export default ModalAuth;
