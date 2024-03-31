// Get the cart element
const cart = document.getElementById('cart');
const cartOverlay = document.getElementById('overlay');
const closeCartBtn = document.querySelector('#cart .close-btn');
const cartItems = document.getElementById('order');
const cartTotal = document.querySelector('#cart .final-price');
const checkoutBtn = document.querySelector('#cart .checkout');
const continueShoppingBtn = document.querySelector('#cart .continue');
const cartCount = document.getElementById('cart-count');

// Initialize the cartProducts array from local storage or as an empty array
let cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];

// Function to save cartProducts to local storage
const saveCartToLocalStorage = () => {
  localStorage.setItem('cartProducts', JSON.stringify(cartProducts));
};

// Open and close the cart
const toggleCart = () => {
  document.body.classList.toggle('show-cart');
};

// Add event listeners
document.querySelector('.cart-icon').addEventListener('click', toggleCart);
closeCartBtn.addEventListener('click', toggleCart);
cartOverlay.addEventListener('click', toggleCart);
continueShoppingBtn.addEventListener('click', toggleCart);

// Add product to cart
const addToCart = (productId) => {
  const existingProduct = cartProducts.find(item => item.id === productId);

  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    const product = getProductById(productId);
    cartProducts.push({ ...product, quantity: 1 });
  }

  saveCartToLocalStorage();
  updateCartIcon();
  renderCart();
  document.body.classList.add('show-cart');
};

// Remove product from cart
const removeFromCart = (productId) => {
  const existingProduct = cartProducts.find(item => item.id === productId);

  if (existingProduct.quantity === 1) {
    cartProducts = cartProducts.filter(item => item.id !== productId);
  } else {
    existingProduct.quantity -= 1;
  }

  saveCartToLocalStorage();
  updateCartIcon();
  renderCart();
};

// Get product details by ID
const getProductById = (productId) => {
  const product = document.getElementById(productId);
  const title = product.querySelector('h2').textContent;
  const description = product.querySelector('p').textContent;
  const price = parseFloat(product.querySelector('.product-price').textContent.replace('$', ''));
  const image = product.querySelector('img').src;

  return { id: productId, title, description, price, image };
};

// Update cart icon count
const updateCartIcon = () => {
  const cartProducts = JSON.parse(localStorage.getItem('cartProducts')) || [];

  const totalItems = cartProducts.reduce((acc, item) => acc + item.quantity, 0);

  cartCount.textContent = totalItems;
};

// Render the cart
const renderCart = () => {
  cartItems.innerHTML = '';
  let total = 0;
  let totalItems = 0;

  if (cartProducts.length === 0) {
    cartItems.innerHTML = '<p class="empty-cart">The cart is empty!</p>';
  } else {
    cartProducts.forEach(product => {
      const productEl = document.createElement('div');
      productEl.classList.add('product');
      productEl.innerHTML = `
        <img src="${product.image}" alt="${product.title}">
        <h4 class="item-title">${product.title}<p class="item-description">${product.description}</p></h4>
        <div class="quantity">
          <span class="minus" onclick="removeFromCart('${product.id}')">&#x2212</span>
          <span class="amount">${product.quantity}</span>
          <span class="plus" onclick="addToCart('${product.id}')">&#x2b</span>
        </div>
        <div class="price">$${product.price * product.quantity}<button class="delete-btn" onclick="deleteProduct('${product.id}')">
            <i class="material-icons">delete</i>
        </button></div>
        `;
      cartItems.appendChild(productEl);
      total += product.price * product.quantity;
      totalItems += product.quantity;
    });
  }

  cartTotal.textContent = `Subtotal (${totalItems} items) : $${total.toFixed(2)}`;
};

// Delete product from cart
const deleteProduct = (productId) => {
  cartProducts = cartProducts.filter(item => item.id !== productId);

  saveCartToLocalStorage();
  updateCartIcon();
  renderCart();
};

// Add event listeners to the "Add to Cart" buttons
const addToCartBtns = document.querySelectorAll('.add-to-cart');
addToCartBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const productId = btn.parentElement.id;
    addToCart(productId);
  });
});

// Handle checkout
checkoutBtn.addEventListener('click', () => {
  if (cartProducts.length === 0) {
    alert('There are no products in the cart.');
  } else {
    window.location.href = 'checkout.html';


    updateCartIcon();
    renderCart();
  }
});

updateCartIcon();
renderCart();
