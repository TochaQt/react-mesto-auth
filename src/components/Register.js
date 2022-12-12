import AuthForm from "./AuthForm";

function Register(props) {
    return(
        <AuthForm buttonName={props.buttonName} title={props.title} handleSubmit={props.handleSubmit} isLoading={props.isLoading} />
    )
}

export default Register