// Dom Elements
const cartSection = document.querySelector(".chosen_products")
const resultDom = document.getElementById("result")
const QuantityDom = document.getElementById("Quantity")
const favouriteSection = document.getElementById("favouriteSection")
const swiperPageination = document.querySelector(".swiper-pagination")

let checkingArray = []




logout.addEventListener("click" , ()=>{
  check = confirm("Are you sure you want to Logout?")
  if(check){
      setTimeout(()=>{
          localStorage.removeItem("activeUser")
          window.location = "login.html"
      },500)
  }
})

// to re-use it for any fetch
function getActiveUser() {
  return JSON.parse(localStorage.getItem("activeUser"));
}

// to always update the user data in the Database
function syncActiveUser() {
  let activeUser = getActiveUser();
  if (activeUser) {
      let users = JSON.parse(localStorage.getItem("Users")) || [];
      let userIndex = users.findIndex(user => user.userId === activeUser.userId);
      if (userIndex !== -1) {
          users[userIndex] = activeUser; // Update the user's data
          localStorage.setItem("Users", JSON.stringify(users));
      }
  }
}

// Factory
temp = [          `
            <div class="swiper-slide">
              <div class="card p-4" style="width: 100%; height: 300px;">
                <img src="./images/Logitech.jpeg" class="card-img-top" alt="bagpack" height="60%" width="100%" style="transform: scale(0.9);">
                <div class="card-body d-flex justify-content-between w-100">
                  <div class="desc d-flex align-items-end flex-wrap">
                    <h5 class="card-title w-100 mb-2">Product: Gaming Mouse</h5>
                    <h5 class="card-title w-100 mb-0">Category: Accessories</h5>
                  </div>
                  <div class="card-footer">
                    <i class="fa-solid fa-heart" id="favIcon"></i>
                  </div>
                </div>
              </div>
            </div>
            `
]





function showAddedCart() {
  let user = getActiveUser();
  let carts = user.CartProducts || []; // Safeguard in case there are no cart items
  let products = [];
  
  if (carts.length === 0) {
    cartSection.innerHTML = `<p style="width: 100%; text-align: center" class="text-danger">Your cart is empty.</p>`;
    return; // Early return if no items in the cart
  }
  
  carts.forEach((item) => {
    
    
    products.push(`
      <div class="card mb-3" style="width: 49%; min-height: 200px;">
        <div class="d-flex px-5 h-100 holder">
          <div class="col-md-4 py-4 img-container">
            <img src="${item.image}" class="img-fluid rounded-start">
          </div>
          <div class="col-md-8">
            <div class="card-body d-flex">
              <h5 class="card-title">Product: ${item.title}</h5>
              <h5 class="card-title">Price: ${item.price}$</h5>
              <h5 class="card-title">Category: ${item.category}</h5>
              <div class="counter mt-2">
                <div class="calc">
                  <span class="counts text-dark">${item.quantity}</span>  
                  <!-- Show quantity -->
                  <span class="increment text-success" onclick="increment(${item.id})">+</span>
                  <span class="decrement text-danger" onclick="decrement(${item.id})">-</span>
                </div>
                <button class="btn btn-danger" onclick="removeFromCart(${item.id})">
                  Remove
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    `);
  });
  
  cartSection.innerHTML = products.join('');
}

// /////////////////////////////


function showFavouriteProducts() {
  let user = getActiveUser();
  let favouriteProducts = user.FavouriteProducts || [];
  let Favourites = []; // Collect HTML strings

  // Handle empty state
  if (favouriteProducts.length === 0) {
    favouriteSection.innerHTML = `
      <p style="width: 100%; text-align: center" class="text-danger">
        Your favourites list is empty.
      </p>`;
    favouriteSection.classList.remove("justify-content-center", "gap-5");
    swiperPageination.classList.add("none");
    return;
  }

  // Build favorite products HTML
  favouriteProducts.forEach(item => {
    Favourites.push(`
      <div class="swiper-slide">
        <div class="card p-4" style="width: 100%; height: 300px;">
          <img src="${item.image}" class="card-img-top" alt="${item.title}" height="60%" width="100%" style="transform: scale(0.9);">
          <div class="card-body d-flex justify-content-between w-100">
            <div class="desc d-flex align-items-end flex-wrap">
              <h5 class="card-title w-100 mb-2">Product: ${item.title}</h5>
              <h5 class="card-title w-100 mb-0">Category: ${item.category}</h5>
            </div>
            <div class="card-footer">
              <i class="fa-solid fa-heart text-danger" onclick="removeFromFavourites(${item.id})" id="favIcon-${item.id}"></i>
            </div>
          </div>
        </div>
      </div>
    `);
  });

  // Update the section with favorite products
  favouriteSection.innerHTML = Favourites.join("");

  // Adjust layout and initialize Swiper if needed
  // if (Favourites.length < 4) {
  //   favouriteSection.classList.add("justify-content-center", "gap-5");
  //   swiperPageination.classList.add("none");
  // } else {
  //   favouriteSection.classList.remove("justify-content-center", "gap-5");
  //   swiperPageination.classList.remove("none");
  
    if (!window.swiperInstance) {
      window.swiperInstance = new Swiper('.swiper-container', {
        slidesPerView: getSlidesPerView(),
        spaceBetween: getSpaceBetween(),
        loop: false,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
        },
        breakpoints: {
          // Mobile screens
          320: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          // Tablets
          650: {
            slidesPerView: 3,
            spaceBetween: 30,
          },
          // Small desktops
          1024: {
            slidesPerView: 4,
            spaceBetween: 40,
          },
          // Larger desktops
          1440: {
            slidesPerView: 4,
            spaceBetween: 50,
          }
        }
      });
    } else {
      window.swiperInstance.update();
    }
  
  
  // Function to get default slidesPerView based on window size
  function getSlidesPerView() {
    if (window.innerWidth < 768) {
      return 1;
    } else if (window.innerWidth < 1024) {
      return 2;
    } else if (window.innerWidth < 1440) {
      return 3;
    } else {
      return 4;
    }
  }
  
  // Function to get default spaceBetween based on window size
  function getSpaceBetween() {
    if (window.innerWidth < 768) {
      return 20;
    } else if (window.innerWidth < 1024) {
      return 30;
    } else if (window.innerWidth < 1440) {
      return 40;
    } else {
      return 50;
    }
  }
}




// remove Product from Cart
function removeFromCart(item) {
  let user = getActiveUser();
  let cart = user.CartProducts || [];
  
  // Find the index of the product in the cart
  let productIndex = cart.findIndex(prod => prod.id === item);
  if (productIndex !== -1) {
    cart.splice(productIndex, 1);
    user.CartProducts = cart
    localStorage.setItem("activeUser", JSON.stringify(user)); // Update the user data
    syncActiveUser();
    showAddedCart(); // Refresh cart view
    showResult(resultDom) // refresh result
    showQuantites(QuantityDom) // refresh quantites
  }
}

// remove product from favourites 

function removeFromFavourites(item){
  let user = getActiveUser();
  let favCart = user.FavouriteProducts || [];
  let favIndex = favCart.findIndex(prod => prod.id = item)

  if(favIndex !== -1){
    favCart.splice(favIndex , 1)
    user.FavouriteProducts = favCart
    localStorage.setItem("activeUser" , JSON.stringify(user))
    syncActiveUser();
    showFavouriteProducts();
  }
}

// increase function

function increment(item){
  let user = getActiveUser()
  let cart = user.CartProducts || [];

  let productIndex = cart.findIndex(prod => prod.id == item)

  cart[productIndex].quantity += 1

  localStorage.setItem("activeUser", JSON.stringify(user)); // Update the user data
  syncActiveUser();
  showAddedCart(); // Refresh cart view
  showResult(resultDom) // refresh result
  showQuantites(QuantityDom) // refresh quantites

}


// decrese function

function decrement(item){
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
  showAddedCart(); // Refresh cart view
  showResult(resultDom) // refresh result
  showQuantites(QuantityDom) // refresh quantites

}

function showResult(DOM){
  let user = getActiveUser()
  let cart = user.CartProducts || [];

  let result = 0

  cart.forEach((item)=>{
    result += (item.quantity * item.price)
  })

  let paragraph = DOM.textContent = `Total Price: ${result} $` 
  return paragraph
}

function showQuantites(DOM){
  let user = getActiveUser()
  let cart = user.CartProducts || [];

  let quantity = 0

  cart.forEach((item)=>{
      quantity += item.quantity
  })
  let text = DOM.innerHTML = quantity
  return text
} 


showQuantites(QuantityDom);
showResult(resultDom); // Initial call to render the Total Result
showAddedCart(); // Initial call to render cart items
showFavouriteProducts(); // Initial call to render Favourite items


