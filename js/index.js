const cart = document.querySelector(".cart-icon");
const shoppig = document.querySelector(".products-items");
const addANewItmeBtn = document.querySelectorAll(".add-card-btn");
const cartCount = document.querySelector(".count");
const showCart = document.querySelector(".show-cart");
const cartContainer = document.querySelector(".show-cart-itmes");
const cheakoutBtn = document.getElementById("cheakout");
const overlay = document.getElementById("overlay");
let totalPrice = document.querySelector(".total-price");
let incrementItem = document.querySelectorAll(".add");
let decrementItem = document.querySelectorAll(".remove");
let messageIcon = document.querySelector(".message-icon");
const cartItems = [];
let counter = 0;

cart.addEventListener("click", () => {
  showCart.classList.toggle("hidden");
  overlay.classList.add("overlay");
});

cheakoutBtn.addEventListener("click", () => {
  showCart.classList.toggle("hidden");
});

overlay.addEventListener("click", (e) => {
  showCart.classList.add("hidden");
  overlay.classList.remove("overlay");
});

//shwo message icon
window.addEventListener("scroll", (e) => {
  window.scrollY >= 600
    ? messageIcon.classList.remove("hidden")
    : messageIcon.classList.add("hidden");
});

//increment the current item by one
incrementItem.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let currItem = e.target.getAttribute("data-add-item");
    let item = document.querySelector(
      `.products-items #${currItem} .card-count`
    );
    item.innerHTML = Number(item.innerHTML) + 1;
  });
});

//decrement  the current item by one
decrementItem.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let currItem = e.target.getAttribute("data-remove-item");
    let item = document.querySelector(
      `.products-items #${currItem} .card-count`
    );
    if (item.innerHTML != 1) {
      item.innerHTML = Number(item.innerHTML) - 1;
    } else {
      item.innerHTML = 1;
    }
  });
});

totalPrice.innerHTML = 0;
cartCount.innerHTML = counter;

addANewItmeBtn.forEach((btn) => {
  btn.addEventListener("click", (e) => {
    let currentItem = e.target.getAttribute("data-item");
    let card = document.getElementById(currentItem);
    let imgSrc = document
      .querySelector(`#${currentItem} .header img`)
      .getAttribute("src");
    let p = document.querySelector(`#${currentItem} .body p`).innerHTML;
    let size = document.querySelector(`#${currentItem} .size`).innerHTML;
    let price = document.querySelector(`#${currentItem} .new-price`).innerHTML;
    let count = document.querySelector(`#${currentItem} .card-count`).innerHTML;

    let newItem = [currentItem, imgSrc, p, size, price, count];

    //send the item data to  cart
    addToCart(newItem);
  });
});

const addToCart = (array) => {
  let [currentItem, imgSrc, p, size, price, count] = array;
  counter = counter + Number(count);
  cartCount.innerHTML = counter;

  // check if  the item is already in the cart
  let found = cartItems.find((item) => item == currentItem);
  if (found == undefined || found == true) {
    cartItems.push(currentItem);
    let div1 = document.createElement("div");
    div1.className = "cart-item";
    div1.id = currentItem;
    let div2 = document.createElement("div");
    div2.className = "item-content";
    let partOne = document.createElement("div");
    partOne.className = "part-one";
    let spanPartOne = document.createElement("span");
    spanPartOne.className = "delete-btn";

    spanPartOne.innerHTML = `<i class="fas fa-times-circle" data-card= ${currentItem}></i>`;
    let imgPartOne = document.createElement("img");
    imgPartOne.setAttribute("src", imgSrc);

    let details = document.createElement("div");
    details.className = "details";
    let paragrph = document.createElement("p");
    paragrph.innerHTML = p;
    let paragrphSize = document.createElement("p");
    paragrphSize.className = "cart-show-size";
    paragrphSize.innerHTML = size;
    details.append(paragrph);
    details.append(paragrphSize);

    partOne.append(spanPartOne);
    partOne.append(imgPartOne);
    partOne.append(details);

    div2.append(partOne);

    let partTow = document.createElement("div");
    partTow.className = "part-two";
    let quantity = document.createElement("div");
    quantity.innerHTML = `Qty:<span class='quantity'>${count}</span>`;
    let priceDiv = document.createElement("div");

    priceDiv.innerHTML = `<span class='price-sign'>$</span><span class='price'>${price}</span>`;
    partTow.append(quantity);
    partTow.append(priceDiv);
    div2.append(partTow);
    div1.append(div2);

    cartContainer.prepend(div1);
    totalPrice.innerHTML = Number(totalPrice.innerHTML) + Number(price * count);
  } else {
    let currItemQuntity = document.querySelector(
      `.show-cart-itmes #${currentItem} .quantity`
    );
    currItemQuntity.innerHTML = Number(currItemQuntity.innerHTML) + 1;
    console.log(currItemQuntity.innerHTML);
    let currItemPrice = document.querySelector(
      `.show-cart-itmes #${currentItem} .price`
    );
    currItemPrice = Number(currItemPrice.innerHTML * currItemQuntity.innerHTML);
    console.log(currItemPrice);
    totalPrice.innerHTML = Number(totalPrice.innerHTML) + Number(currItemPrice);
  }

  let deletBtn = document.querySelectorAll(".delete-btn");
  deleteItem(deletBtn);
};

//remove item from cart
const deleteItem = (deletBtn) => {
  deletBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      let item = e.target.getAttribute("data-card");
      let itemPrice = document.querySelector(
        `.show-cart-itmes #${item} .price`
      );
      let itemQuantity = document.querySelector(
        `.show-cart-itmes #${item} .quantity`
      );
      totalPrice.innerHTML =
        Number(totalPrice.innerHTML) -
        Number(itemQuantity.innerHTML * itemPrice.innerHTML);
      console.log(itemQuantity.innerHTML);
      counter -= itemQuantity;
      cartCount.innerHTML = counter;

      let removeItem = document.querySelector(`.show-cart-itmes #${item}`);
      removeItem.remove();
    });
  });
};
