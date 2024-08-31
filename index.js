let generatedItem = [];
let cartItem = [];

// Generate Function
function generate() {
  document.querySelector("main").innerHTML = "";
  document.querySelector(".cart-items").innerHTML = "";
  cartItem = [];
  generatedItem = [];
  let cartCount = 0;
  for (let j in cartItem) {
    cartCount += cartItem.length;
  }
  document.querySelector(".nav>button").innerHTML = "Cart (" + cartCount + ")";
  const generateCount = document.getElementById("item-count").value;
  for (let i = 1; i <= generateCount; i++) {
    const colorCode = generateColor();
    const itemVal = {
      id: i,
      count: 0,
      color: colorCode,
    };
    generatedItem[i] = itemVal;
    const items = createElements(i);
    document.querySelector("main").appendChild(items);
    const colorDiv = createColorDiv(colorCode);
    document.getElementById(i).appendChild(colorDiv);
    const colorP = createColorP(colorCode);
    document.getElementById(i).appendChild(colorP);
    const cartBtn = createCartBtn(colorCode);
    document.getElementById(i).appendChild(cartBtn);
    const btnElement = createBtnElement(i, generatedItem);
    for (let cart of btnElement) {
      document.getElementById(colorCode).appendChild(cart);
    }
  }
}

// Element Creation
function createElements(i) {
  const item = document.createElement("div");
  item.setAttribute("class", "items");
  item.setAttribute("id", i);
  return item;
}

function createColorDiv(colorCode) {
  const color = document.createElement("div");
  color.setAttribute("class", "color");
  color.style.backgroundColor = colorCode;
  return color;
}

function createColorP(colorCode) {
  const color = document.createElement("p");
  color.innerHTML = colorCode;
  return color;
}

function createCartBtn(colorCode) {
  const cartBtn = document.createElement("div");
  cartBtn.setAttribute("class", "cart-btn");
  cartBtn.setAttribute("id", colorCode);
  return cartBtn;
}

function createBtnElement(i) {
  const add = document.createElement("button");
  add.setAttribute("class", "counter");
  add.setAttribute("onclick", "counterIncrease(this)");
  add.innerHTML = "+";
  add.value = i;
  let count = document.createElement("p");
  count.value = generatedItem[i].count;
  count.setAttribute("id", "count" + i);
  count.innerHTML = generatedItem[i].count;
  const minus = document.createElement("button");
  minus.innerHTML = "-";
  minus.value = i;
  minus.setAttribute("class", "counter");
  minus.setAttribute("onclick", "counterDecrease(this)");
  const addToCart = document.createElement("button");
  addToCart.innerHTML = "ADD TO CART";
  addToCart.setAttribute("id", "add-cart");
  addToCart.value = i;
  addToCart.setAttribute("onclick", "addToCart(this)");
  return [add, count, minus, addToCart];
}

// Color Creation
function generateColor() {
  let hexColor = "#";
  for (let i = 1; i <= 6; i++) {
    hexColor += randHexValue();
  }
  return hexColor;
}

function randHexValue() {
  const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
  let randomIndex = Math.floor(Math.random() * 16);
  return hex[randomIndex];
}

function counterIncrease(i) {
  if (generatedItem[i.value].count < 10) {
    generatedItem[i.value].count += 1;
    let counter = document.getElementById("count" + i.value);
    counter.innerHTML = generatedItem[i.value].count;
    counter.value = generatedItem[i.value].count;
  }
}

function counterDecrease(i) {
  if (generatedItem[i.value].count > 0) {
    generatedItem[i.value].count -= 1;
    let counter = document.getElementById("count" + i.value);
    counter.innerHTML = generatedItem[i.value].count;
    counter.value = generatedItem[i.value].count;
  }
}

function addToCart(i) {
  if (generatedItem[i.value].count > 0) {
    if (!cartItem.includes(generatedItem[i.value])) {
      cartItem.push(generatedItem[i.value]);
      let cartCount = cartItem.length;
      document.querySelector(".nav>button").innerHTML =
        "Cart (" + cartCount + ")";
    }
  }
}

function shopItems() {
  let cartItems = document.querySelector(".cart-items");
  cartItems.style.display = "none";
  document.querySelector(".shop-items").style.display = "inherit";
  let buyMsg = document.querySelector(".buy-msg");
  buyMsg.style.display = "none";
}

function cartItems() {
  let shopItems = document.querySelector(".shop-items");
  shopItems.style.display = "none";
  let cartItems = document.querySelector(".cart-items");
  cartItems.style.display = "inherit";
  let buyMsg = document.querySelector(".buy-msg");
  buyMsg.style.display = "none";
  if (cartItem.length == 0) {
    cartItems.innerHTML = "";
    let emptyMsg = document.createElement("h3");
    emptyMsg.innerHTML = "- No items in Your cart -";
    cartItems.appendChild(emptyMsg);
  } else {
    cartItems.innerHTML = "";
    const cartInfo = document.createElement("div");
    cartInfo.setAttribute("class", "cart-info");
    cartItems.appendChild(cartInfo);
    let info = document.createElement("h4");
    info.innerHTML = "Added Items";
    document.querySelector(".cart-info").appendChild(info);
    const buy = document.createElement("button");
    buy.innerHTML = "Buy Now";
    buy.setAttribute("onclick", "buyItems()");
    document.querySelector(".cart-info").appendChild(buy);
    let cartSection = document.createElement("div");
    cartSection.setAttribute("class", "cart-section");
    cartItems.appendChild(cartSection);
    let cartSec = document.querySelector(".cart-section");
    for (let item of cartItem) {
      const items = document.createElement("div");
      items.setAttribute("class", "items");
      items.setAttribute("id", "c" + item.id);
      cartSec.appendChild(items);
      const colorDiv = document.createElement("div");
      colorDiv.setAttribute("class", "color");
      colorDiv.style.backgroundColor = item.color;
      document.getElementById("c" + item.id).appendChild(colorDiv);
      const colorP = document.createElement("p");
      colorP.innerHTML = item.color;
      document.getElementById("c" + item.id).appendChild(colorP);
      const cartBtn = document.createElement("div");
      cartBtn.setAttribute("class", "cart-btn");
      cartBtn.setAttribute("id", "c" + item.color);
      document.getElementById("c" + item.id).appendChild(cartBtn);
      let i = item.id;
      const btnElement = createRemoveBtn(i, item);
      for (let cart of btnElement) {
        document.getElementById("c" + item.color).appendChild(cart);
      }
    }
  }
}

function createRemoveBtn(i, item) {
  const add = document.createElement("button");
  add.setAttribute("class", "cart-counter");
  add.setAttribute("onclick", "cartIncrease(this)");
  add.innerHTML = "+";
  add.value = i;
  let count = document.createElement("p");
  count.value = item.count;
  count.setAttribute("id", "cart" + i);
  count.innerHTML = item.count;
  const minus = document.createElement("button");
  minus.innerHTML = "-";
  minus.value = i;
  minus.setAttribute("class", "cart-counter");
  minus.setAttribute("onclick", "cartDecrease(this)");
  const removeCart = document.createElement("button");
  removeCart.innerHTML = "Remove";
  removeCart.setAttribute("id", "remove");
  removeCart.value = i;
  removeCart.setAttribute("onclick", "removeCart(this)");
  return [add, count, minus, removeCart];
}

function cartIncrease(i) {
  if (generatedItem[i.value].count < 10) {
    generatedItem[i.value].count += 1;
    let cartCounter = document.getElementById("cart" + i.value);
    cartCounter.innerHTML = generatedItem[i.value].count;
    cartCounter.value = generatedItem[i.value].count;
    let counter = document.getElementById("count" + i.value);
    counter.innerHTML = generatedItem[i.value].count;
    counter.value = generatedItem[i.value].count;
    let cartCount = cartItem.length;
    document.querySelector(".nav>button").innerHTML =
      "Cart (" + cartCount + ")";
  }
}

function cartDecrease(i) {
  if (generatedItem[i.value].count > 1) {
    generatedItem[i.value].count -= 1;
    let cartCounter = document.getElementById("cart" + i.value);
    cartCounter.innerHTML = generatedItem[i.value].count;
    cartCounter.value = generatedItem[i.value].count;
    let counter = document.getElementById("count" + i.value);
    counter.innerHTML = generatedItem[i.value].count;
    counter.value = generatedItem[i.value].count;
    let cartCount = cartItem.length;
    document.querySelector(".nav>button").innerHTML =
      "Cart (" + cartCount + ")";
  }
}

function removeCart(i) {
  cartItem.splice(generatedItem[i.value], 1);
  let cartCount = cartItem.length;
  document.querySelector(".nav>button").innerHTML = "Cart (" + cartCount + ")";
  cartItems();
}

function buyItems() {
  let val = confirm("Do you wish to buy ?");
  if (val == true) {
    let shopItems = document.querySelector(".shop-items");
    shopItems.style.display = "none";
    let cartItems = document.querySelector(".cart-items");
    cartItems.style.display = "none";
    let buy = document.querySelector(".buy-msg");
    buy.style.display = "inherit";
    buy.innerHTML = "";
    document.querySelector(".cart-items").innerHTML = "";
    cartItem = [];
    let cartCount = cartItem.length;
    document.querySelector(".nav>button").innerHTML =
      "Cart (" + cartCount + ")";
    let buyMsg = document.createElement("h3");
    buyMsg.innerHTML = "- Successfully Purchased -";
    document.querySelector(".buy-msg").appendChild(buyMsg);
  } else {
    return;
  }
}
