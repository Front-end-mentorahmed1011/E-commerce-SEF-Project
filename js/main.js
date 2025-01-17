// dom elements

const notloggedIn = document.querySelector(".not-logged-in");
const loggedIn = document.querySelector(".logged-in");
const userName = document.getElementById("userName");
const searchBox = document.getElementById("Search_box")
const categoryBox = document.getElementById("Category_box")
const logout = document.getElementById("logout")
const cartBTN = document.querySelector(".cartBTN")
const cartCounter = document.getElementById("cartCounter")
const menu = document.querySelector(".dropdown-menu")
const miniCart = document.querySelector(".Selected_Products")
let Allproducts = document.querySelector(".products");



// factory
let user = JSON.parse(localStorage.getItem("activeUser"));

let products = [
    {
        id:1,
        title: "Dell Laptop",
        image: "./images/Dell XPS 17 (9700) Skins - Full Colour _ Textured Matt Light Blue.jpeg",
        category: "Laptops",
        price: 786
    },
    {
        id:2,
        title: "Lexar SSD",
        image: "./images/Lexar ARMOR 700 Portable SSD 1TB.jpeg",
        category: "Storages",
        price: 120
    },
    {
        id:3,
        title: "Keyboard",
        image: "./images/Keyboard.jpeg",
        category: "Accessories",
        price: 60
    },
    {
        id:4,
        title: "MSI Laptop",
        image: "./images/MSI 15_6_ Raider Gaming Laptop _Intel Core i9-13950HX - 16GB RAM - NVIDIA GeForce RTX 4060 - 1TB SSD in Black _ Nebraska Furniture Mart.jpeg",
        category: "Laptops",
        price: 900
    },
    {
        id:5,
        title: "Microphone",
        image: "./images/microphone.jpeg",
        category: "Accessories",
        price: 100
    },
    {
        id:6,
        title: "HP Laptop",
        image: "./images/Lightly Used 15_6 Rose Gold HP Laptop.jpeg",
        category: "Laptops",
        price: 760
    },
    {
        id:7,
        title: "Crucial SSD",
        image: "./images/SSD Crucial P3 1TB NVMe PCIe M_2 2280 - CT1000P3SSD8.jpeg",
        category: "Storages",
        price: 786
    },
    {
        id:8,
        title: "Gaming headphones",
        image: "./images/Headset.jpeg",
        category: "Accessories",
        price: 50
    },
    {
        id:9,
        title: "Gaming Mouse",
        image: "./images/Logitech.jpeg",
        category: "Accessories",
        price: 100
    },
    {
        id:10,
        title: "Samsung SSD",
        image: "./images/Samsung 980 PCIe®3_0 NVMe®SSD 1TB(MZ-V8V1T0B_AM).jpeg",
        category: "Storages",
        price: 120
    },
    {
        id:11,
        title: "Lenovo laptop",
        image: "./images/image.png",
        category: "Laptops",
        price: 400
    },
    {
        id:12,
        title: "Kingston SSD",
        image: "./images/DISCO DURO SSD KINGSTON 480GB SSDNOW SA400.jpeg",
        category: "Storages",
        price: 250
    }
]


function ShowProducts() {
    let ProductHTML = []; // 
    products.forEach((item) => {
        // Check if the item is already in the cart
        let user = getActiveUser();
        let cartProducts = user?.CartProducts || [];
        let FavouriteProducts = user?.FavouriteProducts || [];
        let isInCart = cartProducts.some(cartItem => cartItem.id === item.id);
        let isInFavourites = FavouriteProducts.some(favouriteItem=> favouriteItem.id === item.id)

        // Render product cards with appropriate button text
        ProductHTML.push(
            `
        <div class="card">
             <img src="${item.image}" class="card-img-top" alt="bagpack" height="60%" width="100%">
             <div class="card-body">
                 <h5 class="card-title">Product: ${item.title}</h5>
                 <h5 class="card-title">Price: ${item.price}$</h5>
                 <h5 class="card-title">Category: ${item.category}</h5>
                 <div class="card-footer">
                     <button class="btn ${isInCart ? "btn-danger" : "btn-primary"}" onclick="toggleCartItem(${item.id}, this)" >
                         ${isInCart ? "Remove from Cart" : "Add to Cart"}
                     </button>
                     <i class="fa-solid fa-heart ${isInFavourites ? "text-danger" : ""}" onclick="toggleFavourites(${item.id}, this)"></i>
                 </div>
             </div>
         </div>
        `
        ) ;

    })
    Allproducts.innerHTML = ProductHTML.join('');
}

function showMenu() {
    let user = getActiveUser(); // Get the active user
    let cart = user?.CartProducts || []; // Safely access the cart
    let products = []; // To store cart items' HTML

    // Hide menu if the cart is empty
    if (cart.length === 0) {
        menu.classList.add("d-none"); // Hide the menu
        return;
    } else {
        menu.classList.remove("d-none"); // Show the menu if not empty
    }

    // Generate HTML for each cart item
    cart.forEach((item) => {
        products.push(`
            <li class="d-flex align-items-center justify-content-between px-3 my-2 bg-white rounded">
                <p class="mb-0 text-primary">${item.title}</p>
                <div class="d-flex align-items-center gap-2">
                    <span class="counts text-dark fs-4">${item.quantity}</span>
                    <button class="btn btn-sm btn-outline-success increment" onclick="increment(${item.id}, event)">+</button>
                    <button class="btn btn-sm btn-outline-danger decrement" onclick="decrement(${item.id}, event)">-</button>
                </div>
            </li>
        `);
    });

    // Render dropdown menu content
    menu.innerHTML = `
        <div class="Selected_Products">
            <ul class="list-unstyled">
                ${products.join("")}
            </ul>
        </div>
        <hr>
        <li>
            <a href="cart.html" class="text-center text-danger" style="display: inline-block; width: 100%;">View All Products</a>
        </li>
    `;
}

function increment(item, event){
    event.stopPropagation()
    let user = getActiveUser()
    let cart = user.CartProducts || [];
  
    let productIndex = cart.findIndex(prod => prod.id == item)
  
    cart[productIndex].quantity += 1
  
    localStorage.setItem("activeUser", JSON.stringify(user)); // Update the user data
    syncActiveUser();
    showMenu()
    
  }

function decrement(item, event){

    event.stopPropagation()
    let user = getActiveUser()
    let cart = user.CartProducts || [];

    let productIndex = cart.findIndex(prod => prod.id == item)

    if (productIndex !== -1){
        cart[productIndex].quantity -= 1
        if(cart[productIndex].quantity < 1){
        cart.splice(productIndex , 1)
        }
    }
    localStorage.setItem("activeUser", JSON.stringify(user)); // Update the user data
    syncActiveUser();
    showMenu();
    ShowProducts()
    cartCounter.textContent = cart.length; // Update cart counter
    
    
    cartCounter.textContent = cart.length; // Update cart counter
}




function syncActiveUser() {
    let activeUser = JSON.parse(localStorage.getItem("activeUser"));
    if (activeUser) {
        let users = JSON.parse(localStorage.getItem("Users")) || [];
        let userIndex = users.findIndex(user => user.userId === activeUser.userId);
        if (userIndex !== -1) {
            users[userIndex] = activeUser; // Update the user's data
            localStorage.setItem("Users", JSON.stringify(users));
        }
    }
}

function getActiveUser() {
    return JSON.parse(localStorage.getItem("activeUser"));
}




// scripts

if(user) // check if there is user or not
    {
    
    userName.textContent = "Welcome " + user.FirstName.toUpperCase();
    loggedIn.classList.add("flex")
    loggedIn.classList.remove("none")
    notloggedIn.classList.add("none")
    notloggedIn.classList.remove("flex")

} else 
    {

    loggedIn.classList.remove("flex")
    loggedIn.classList.add("none")
    notloggedIn.classList.remove("none")
    notloggedIn.classList.add("flex")

}

// logout 
logout.addEventListener("click" , ()=>{
    check = confirm("Are you sure you want to Logout?")
    if(check){
        setTimeout(()=>{
            localStorage.removeItem("activeUser")
            window.location = "login.html"
        },500)
    }
})

ShowProducts() // render all products
showMenu() // show the mini cart menu


cartCounter.textContent = user.CartProducts.length;
function toggleCartItem(item, button) {
    let user = getActiveUser();
    if (!user) {
        setTimeout(() => {
            window.location = "login.html";
        }, 500);
        return;
    }

    let cartProducts = user.CartProducts || [];
    let productIndex = cartProducts.findIndex(cartItem => cartItem.id === item);

    if (productIndex === -1) {
        // Add item to cart
        let product = products.find(product => product.id === item);
        product.quantity = 1
        cartProducts.push(product);
        button.textContent = "Remove from Cart";
        button.classList.add("btn-danger");
        button.classList.remove("btn-primary")
    } else {
        // Remove item from cart
        cartProducts.splice(productIndex, 1);
        button.textContent = "Add to Cart";
        button.classList.remove("btn-danger");
        button.classList.add("btn-primary")
    }

    // Update the user's cart in localStorage
    user.CartProducts = cartProducts;
    localStorage.setItem("activeUser", JSON.stringify(user));

    syncActiveUser()
    showMenu()
    // Optionally update the cart counter
    cartCounter.textContent = cartProducts.length;

    updateButtonStatus(item, button);
}


function updateButtonStatus(item, button) {
        let user = getActiveUser();
        let cartProducts = user.CartProducts || [];
        let productIndex = cartProducts.findIndex(cartItem => cartItem.id === item);
    
        if (productIndex === -1) {
            // If the item is not in the cart, update button to "Add to Cart"
            button.textContent = "Add to Cart";
            button.classList.remove("btn-danger");
            button.classList.add("btn-primary");
        } else {
            // If the item is in the cart, update button to "Remove from Cart"
            button.textContent = "Remove from Cart";
            button.classList.add("btn-danger");
            button.classList.remove("btn-primary");
        }
}


function toggleFavourites(item, icon){
    let user = getActiveUser();
    if(!user){
        setTimeout(()=>{
            window.location = "login.html"
        },500)
    }
    else{
        
        let FavouriteProducts = user.FavouriteProducts || []
        let FavouriteIndex = FavouriteProducts.findIndex(index => index.id == item)

        if(FavouriteIndex === -1){
            let product = products.find(product => product.id === item);
            FavouriteProducts.push(product)
            icon.classList.add("text-danger");
        } else {
            FavouriteProducts.splice(FavouriteIndex , 1)
            icon.classList.remove("text-danger");
        }

        user.FavouriteProducts = FavouriteProducts;
        localStorage.setItem("activeUser", JSON.stringify(user));
        
        syncActiveUser()
    }
}




// search methods


let debounceTimer;
searchBox.oninput = () => {
    const searchValue = searchBox.value.trim();

    // Disable the cart button if there is any input
    cartBTN.disabled = searchValue !== '';
    
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => {
        let filterdHTML = '';
        let searchValue = searchBox.value.toLowerCase();

        // Iterate over products and filter based on the selected category
        for (let i = 0; i < products.length; i++) {
            let productSearch;
            if (categoryBox.value === "Name") {
                productSearch = products[i].title.toLowerCase();
            } else if (categoryBox.value === "Category") {
                productSearch = products[i].category.toLowerCase();
            } else {
                continue; // Skip products if categoryBox value is invalid
            }

            if (productSearch.includes(searchValue)) {
                // Check product status in cart and favourites
                let user = getActiveUser();
                let cartProducts = user?.CartProducts || [];
                let FavouriteProducts = user?.FavouriteProducts || [];
                let isInCart = cartProducts.some(cartItem => cartItem.id === products[i].id);
                let isInFavourites = FavouriteProducts.some(favItem => favItem.id === products[i].id);

                filterdHTML += `
                    <div class="card">
                        <img src="${products[i].image}" class="card-img-top" alt="product" height="60%" width="100%">
                        <div class="card-body">
                            <h5 class="card-title">Product: ${products[i].title}</h5>
                            <h5 class="card-title">Price: ${products[i].price}$</h5>
                            <h5 class="card-title">Category: ${products[i].category}</h5>
                            <div class="card-footer">
                                <button class="btn ${isInCart ? 'btn-danger' : 'btn-primary'}" 
                                    onclick="toggleCartItem(${products[i].id}, this)">
                                    ${isInCart ? 'Remove from Cart' : 'Add to Cart'}
                                </button>
                                <i class="fa-solid fa-heart ${isInFavourites ? 'text-danger' : ''}" 
                                    onclick="toggleFavourites(${products[i].id}, this)"></i>
                            </div>
                        </div>
                    </div>
                `;
            }
        }

        // Update the DOM with the filtered products or a message if no products match
        Allproducts.innerHTML = filterdHTML || '<p>No products match your search.</p>';
    }, 300); // Adjust debounce delay as needed
};






