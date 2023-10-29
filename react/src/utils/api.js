async function postToCart(url = '', items = []) {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ items })
  });
  return response.json();
}

export async function addToCart(items = []) {
  try {
    const data = await postToCart('/cart/add.js', items);
    console.log('Post product res', data);
    const updatedCart = await getCart();
    console.log('UPDATED CART', updatedCart);
    return updatedCart;
  } catch (err) {
    console.log('Error adding to cart:', err);
  }
}

export async function getCart() {
  try {
    const cart = await (await fetch('/cart.js')).json();
    return cart;
  } catch (error) {
  }
}

export async function clearCart() {
  try {
    const response = await fetch('/cart/clear.js', { method: 'POST' });
    return response;
  } catch (error) {
    console.log('Clear cart error', error);
  }
}
