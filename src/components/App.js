import React, {useState, useEffect} from "react";
import Header from "./Header";
import Main from "./Main";
import Footer from "./Footer";
import ImagePopup from "./ImagePopup";
import {api} from "../utils/Api";
import CurrentUserContext from "../contexts/CurrentUserContext";
import EditProfilePopup from "./EditProfilePopup";
import EditAvatarPopup from "./EditAvatarPopup";
import AddPlacePopup from "./AddPlacePopup";
import DeletePlacePopup from "./DeletePlacePopup";
import ProtectedRoute from "./ProtectedRoute";
import {Route, Switch, withRouter} from "react-router-dom";
import Register from "./Register";
import Login from "./Login";
import InfoToolTip from "./InfoToolTip";
import {authorize, checkAuth, register} from "../utils/Auth";

function App(props) {

    const [isEditProfilePopupOpen, setEditProfilePopupOpen] = useState(false);
    const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = useState(false);
    const [isAddPlacePopupOpen, setAddPlacePopupOpen] = useState(false);
    const [isDeletePlacePopupOpen, setDeletePlacePopupOpen] = useState(false);
    const [isInfoToolTipOpen, setInfoToolTipOpen] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const [currentUser, setCurrentUser] = useState({});
    const [cards, setCards] = useState([]);
    const [loading, setLoading] = useState(false);
    const [cardToDelete, setCardToDelete] = useState({});
    const [loggedIn, setLoggedIn] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const [infoText, setInfoText] = useState('');
    const [statusImg, setStatusImg] = useState(true);

    useEffect(() => {

        checkEmail();

    }, []);

    function checkEmail() {
        checkAuth()
            .then((data) => {
                setUserEmail(data.data.email)

            })
            .then(() => {
                Promise.all([api.setProfileInfo(), api.getInitialCards()])
                    .then(([user, cards]) =>{
                        setCurrentUser(user)
                        return cards
                    })
                    .then((cards) => {
                        setCards(cards)
                    })
                    .catch((err) => {
                        console.log(err)
                    })
            })
            .then(() => {
                setLoggedIn(true)
                props.history.push("/mesto-react/")
            })
            .catch((err) => {
                console.log(err)
            })
    }

    function handleEditAvatarClick () {
        setEditAvatarPopupOpen(true);
    }

    function handleEditProfileClick() {
        setEditProfilePopupOpen(true);
    }

    function handleEditPlaceClick() {
        setAddPlacePopupOpen(true);
    }

    function handleCardClick(card) {
        setSelectedCard(card)
    }

    function closeAllPopups() {
        setEditAvatarPopupOpen(false);
        setEditProfilePopupOpen(false);
        setAddPlacePopupOpen(false);
        setDeletePlacePopupOpen(false);
        setSelectedCard(null);
        setInfoToolTipOpen(false);
    }

    function handleUpdateUser(data) {

        setLoading(true);

        api.editProfile(data)
            .then((data) => {
                setCurrentUser(data);
            })
            .then(() => {
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false);
            })
    }

    function handleUpdateAvatar(data) {

        setLoading(true);

        api.editAvatar(data)
            .then((data) => {
                setCurrentUser(data);
            })
            .then(() => {
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false);
            })
    }

    function handleCardLike(card) {

        const isLiked = card.likes.some(i => i._id === currentUser._id);

        if (!isLiked) {
            api.setLike(card._id)
                .then((data) => {
                    setCards((state) => state.map((c) => c._id === card._id ? data : c));
                })
                .catch((err) => {
                    console.log(err)
                })
        }
        else {
            api.deleteLike(card._id)
                .then((data) => {
                    setCards((state) => state.map((c) => c._id === card._id ? data : c));
                })
                .catch((err) => {
                    console.log(err)
                })
        }
    }

    function handleCardDelete(card) {

        setDeletePlacePopupOpen(true)

        setCardToDelete(card)
    }

    function handleAddCard(data) {

        setLoading(true);

        api.addCard(data)
            .then((data) => {
                setCards([data, ...cards])
            })
            .then(() => {
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false);
            })
    }

    function handleDeleteCard(card) {

        setLoading(true);

        api.deleteCard(card._id)
            .then((data) => {
                setCards((data) => data.filter((c) => c._id !== card._id));
        })
            .then(() => {
                closeAllPopups();
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setLoading(false);
            })
    }

    function handleRegister(email, password) {

        setLoading(true);

        register(password, email)
            .then(() => {

                setInfoText("Вы успешно зарегистрировались!");
                setStatusImg(true);
                setInfoToolTipOpen(true)
                props.history.push("/mesto-react/sign-in")

            })
            .catch((err) => {

                setInfoText(`Что-то пошло не так! Попробуйте ещё раз.`);
                setStatusImg(false);
                setInfoToolTipOpen(true)

            })
            .finally(() => {
                setLoading(false);
            })
    }

    function handleLogin(email, password) {

        setLoading(true);

        authorize(password, email)
            .then((data) => {
                localStorage.setItem('token', data.token);
            })
            .then(() => {
                checkEmail();
            })
            .catch(() => {

                setInfoText("Неверный Email или пароль");
                setStatusImg(false);
                setInfoToolTipOpen(true);

            })
            .finally(() => {
                setLoading(false);
            })
    }

    function handleLogout() {

        localStorage.removeItem('token');

        props.history.push("/mesto-react/sign-in")
    }

  return (
      <CurrentUserContext.Provider value={currentUser}>
          <div className="page">
            <Header userEmail={userEmail} handleLogout={handleLogout} />
              <Switch>
                  <ProtectedRoute exact path="/mesto-react/"
                                  loggedIn={loggedIn}
                                  component={Main}
                                  onEditProfile={handleEditProfileClick}
                                  onAddPlace={handleEditPlaceClick}
                                  onEditAvatar={handleEditAvatarClick}
                                  onCardClick={handleCardClick}
                                  cards={cards}
                                  onCardLike={handleCardLike}
                                  onCardDelete={handleCardDelete} />
                  <Route path="/mesto-react/sign-up">
                      <Register buttonName={loading ? "Регистрация..." : "Зарегистрироваться"}
                                title={"Регистрация"}
                                handleSubmit={handleRegister}
                                isLoading={loading}
                      />
                  </Route>
                  <Route path="/mesto-react/sign-in">
                      <Login buttonName={loading ? "Вход..." : "Войти"}
                             title={"Вход"}
                             handleSubmit={handleLogin}
                             isLoading={loading}
                      />
                  </Route>
              </Switch>
            <Footer />
            <EditProfilePopup
                isOpen={isEditProfilePopupOpen}
                onClose={closeAllPopups}
                onUpdateUser={handleUpdateUser}
                isLoading={loading}
            />
            <EditAvatarPopup
                isOpen={isEditAvatarPopupOpen}
                onClose={closeAllPopups}
                onUpdateAvatar={handleUpdateAvatar}
                isLoading={loading}
            />
            <AddPlacePopup
                isOpen={isAddPlacePopupOpen}
                onClose={closeAllPopups}
                onAddCard={handleAddCard}
                isLoading={loading}
            />
            <DeletePlacePopup
                isOpen={isDeletePlacePopupOpen}
                onClose={closeAllPopups}
                onDeleteCard={handleDeleteCard}
                isLoading={loading}
                card={cardToDelete}
            />
            <ImagePopup card={selectedCard} onClose={closeAllPopups} />
            <InfoToolTip isOpen={isInfoToolTipOpen}
                         statusImg={statusImg}
                         infoText={infoText}
                         onClose={closeAllPopups}
            />
          </div>
      </CurrentUserContext.Provider>
  );
}
export default withRouter(App);
