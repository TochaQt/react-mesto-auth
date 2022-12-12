import okImg from "../images/Union (2).png"
import notOkImg from "../images/notok.png"

function InfoToolTip(props) {
    return(
        <section className={`popup popup__info ${props.isOpen ? 'popup_opened' : ""}`}>
            <div className="popup__container">
                <div className="popup__form">
                    <img className="popup__info-img" src={props.statusImg ? okImg : notOkImg} alt="Статус" />
                    <p className="popup__info-text">{props.infoText}</p>
                    <button className="popup__close" type="button" onClick={props.onClose}></button>
                </div>
            </div>
        </section>
    )
}

export default InfoToolTip