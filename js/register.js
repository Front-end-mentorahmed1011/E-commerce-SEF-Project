let Register = document.getElementById("Register")
let firstName = document.getElementById("FirstName")
let LastName = document.getElementById("LastName")
let RegEmail = document.getElementById("RegEmail")
let RegPass = document.getElementById("RegPass")



if(!JSON.parse(localStorage.getItem("Users"))){
    localStorage.setItem("Users", JSON.stringify([]))
}


Register.addEventListener("click", (e)=>{
    e.preventDefault()
    if(firstName.value == "" || LastName.value === "" || RegEmail.value === "" || RegPass.value === ""){
        alert("please fill the data")
    } else {
        
        let users = JSON.parse(localStorage.getItem("Users"))
        let validate = !users.some(user=> user.RegEmail === RegEmail.value);
        
        
       if(!validate){
            alert("The Email is already Existed")
       } else {
        let user = 
        {
            userId: users.length + 1,
            FirstName: firstName.value,
            LastName: LastName.value,
            RegEmail: RegEmail.value,
            RegPass: RegPass.value,
            CartProducts: [],
            FavouriteProducts: [],
        }
        users.push(user)

        localStorage.setItem("Users",(JSON.stringify(users)) )
        setTimeout(()=>{
        window.location = "login.html"
        },1000)
       }

        
    }
})


