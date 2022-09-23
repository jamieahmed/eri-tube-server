
function signup(req, res) {
    res.json("you are succuessfully signup")
}

function signin(req, res) {

    res.json("sign In successfully")
}

function googleAuth(req, res) {
    res.json("sign up with google")
}



export { signup, signin, googleAuth }