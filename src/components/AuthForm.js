import {Link} from "react-router-dom";
import React from "react";

function AuthForm(props) {
    const [password, setPassword] = React.useState('')
    const [email, setEmail] = React.useState('')

    function handleEmailChange(e) {
        setEmail(e.target.value);
    }

    function handlePasswordChange(e) {
        setPassword(e.target.value);
    }

    function handleSubmit(e) {
        e.preventDefault(e);

        props.handleSubmit(email, password);
    }

    return(
        <form className="auth__form" onSubmit={handleSubmit}>
            <h2 className="auth__title">{props.title}</h2>
            <input
                className="auth__input"
                onChange={handleEmailChange}
                value={email || ''}
                name="email"
                required minLength="2"
                maxLength="200"
                id="email"
                placeholder="Email"
                type="email"
            />
            <input
                className="auth__input"
                onChange={handlePasswordChange}
                value={password || ''}
                name="password"
                required minLength="2"
                maxLength="200"
                id="password"
                type="password"
                placeholder="Пароль"
            />
            <button type="submit" className="auth__button" disabled={props.isLoading}>{props.buttonName}</button>
            <p className={props.title==="Регистрация" ? "auth__text" : "auth__text_disabled"}>
                Уже зарегистрированы? <Link to="/mesto-react/sign-in" className="auth__link">Войти</Link>
            </p>
        </form>
    )
}

export default AuthForm