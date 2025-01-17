
const logEmail = document.getElementById("LoginEmail");
const Pass = document.getElementById("LoginPassword");
const Submit = document.getElementById("LoginSubmit");



Submit.onclick = (e) => {
    e.preventDefault();
    if (logEmail.value.trim() === "" || Pass.value.trim() === "") {
        alert("Please fill in the data");
    } else {

        let users = JSON.parse(localStorage.getItem("Users"))
        if(users){
            let user = users.find(user=> user.RegEmail.trim() === logEmail.value.trim() && user.RegPass.trim() === Pass.value.trim())


        if(user){
            localStorage.setItem("activeUser" , JSON.stringify(user))

            setTimeout(()=>{
                window.location = "index.html"
            },1000)
        }
        else {
            alert("Incorrect email or password. Please try again.");
        }
        }
        else{
            alert("DataBase Not Existed Please Register");
        }
    } 
};



