function Login() {
    const userRef = useRef()
    const passRef = useRef()
    const doIt = () => {
        console.log("we did it")
        loginUser(userRef.current.value, passRef.current.value)
    }
    function loginUser(username, password) {
        fetch("/api/login", {
            userName: username,
            password: password
        })
        console.log(userName)
            .then((parameter) => {

                debugger
                window.location.replace("/Profile");
                // If there's an error, log the error
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (


        <div className="app">
            <div>
                <h1>Login</h1>
                <input placeholder="username" ref={userRef}></input>
                <input placeholder="password" ref={passRef}></input>
                <br></br>
                <button onClick={() => doIt()}>Login</button>

            </div>
        </div>

    );
}

export default Login; 