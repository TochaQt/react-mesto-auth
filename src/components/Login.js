import Pass from "./Pass";

function Login(props) {
    return(
        <Pass buttonName={props.buttonName} title={props.title} handleSubmit={props.handleSubmit} isLoading={props.isLoading} />
    )
}

export default Login