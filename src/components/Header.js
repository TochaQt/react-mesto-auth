import logo from "../images/Vector.svg";
import {Switch, Route, Link} from "react-router-dom";

function Header(props) {
    return(
        <header className="header">
            <img className="header__logo" src={logo} alt="Логотип - Mesto Россия"/>
            <div className="header__menu">
                <Switch>
                    <Route path="/mesto-react/sign-up">
                        <Link to="/mesto-react/sign-in" className="header__menu-link">Войти</Link>
                    </Route>
                    <Route path="/mesto-react/sign-in">
                        <Link to="/mesto-react/sign-up" className="header__menu-link">Регистрация</Link>
                    </Route>
                    <Route path="/mesto-react">
                        <p className="header__email">{props.userEmail}</p>
                        <Link to="/mesto-react/sign-in" className="header__menu-link header__menu-link_logout" onClick={props.handleLogout}>Выйти</Link>
                    </Route>
                </Switch>
            </div>
        </header>
    )
}
export default Header;