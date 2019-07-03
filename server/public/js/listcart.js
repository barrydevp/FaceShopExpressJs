function removeItem() {
  const url = '/api/sessions/deleteincart/' + this.id + '/' + 1;
  axios.delete(url).then((res) => {
    //console.log('delete success!');
    console.log(res);
    const carts = Array.from(res.data);
    render(carts);
  }).catch((err) => {
    console.log(err);
  });
}

async function getListCart() {
  let carts = [];
  //console.log('???');
  try {
    let res = await axios.get('/api/sessions/getlistcart');
    carts = Array.from(res.data);
    //console.log(carts);
  } catch(err) {
    console.error(err);
  }

  render(carts);
}

function render(carts) {
  const divContainer = document.querySelector('.container-fluid.list-cart');
  let count = 0;
  let totalPrice = 0;
  let content = '<div class="col-md-8"><!-- SHIPPING METHOD--><div class="panel panel-default"><div class="panel-heading text-center"><h2>Current Cart</h2></div><div class="panel-body"><table class="table borderless"><thead><tr><td><strong class="cart-count"></strong></td></tr></thead>';
  for(let cart of carts) { 
    let price = (cart.infor.price.original * ( 100 - cart.infor.price.sale )) / 100;
    totalPrice += price * cart.count;
    count += cart.count;
    content += createItem(cart);
  }
  totalPrice = Math.floor(totalPrice * 100) / 100
  content += '</table></div></div></div>';
  let reviewoder = '<div class="col-md-4"><div class="panel panel-default"><div class="panel-heading text-center"><h2>Review Order</h2></div><div class="panel-body"><div><strong>Subtotal (' + count + ' item)</strong><div class="pull-right"><span>$</span><span>' + totalPrice + '</span></div></div><div><small>Shipping</small><div class="pull-right"><span>-</span></div><hr/></div><div><strong>Order Total</strong><div class="pull-right" style="font-size: 30px;"><span>$</span><span>' + totalPrice + '</span></div><hr/></div><button class="btn btn-primary btn-lg btn-block" type="button">Checkout</button></div></div></div>';

  divContainer.innerHTML = '<div class="row">' + reviewoder + content + '</div>';
  const tagCartCount = document.querySelectorAll('.cart-count');
  tagCartCount[0].textContent = count;
  tagCartCount[1].textContent = 'Your Cart: ' + count + ' item';
  quantity = count;
  //- for(tag of tagCartCount) {
  //-   tag.textContent = count + ' Item in Cart';
  //- }
  
  const buttons = document.getElementsByClassName('del-button');

  for(let button of buttons) {
    button.addEventListener('click', removeItem);
  }
}

function createItem(cart) {
  let price = (Math.floor(cart.infor.price.original * ( 100 - cart.infor.price.sale )) / 100);
  let content = '<tr><td><div class="media"><a class="thumbnail pull-left mr-2" href="/cart/view/' + cart._id + '"><img class="media-object" src="' + cart.infor.image + '" style="width: 72px; height: 72px;"/></a><div class="name-cart media-body"><h5 class="media-heading">' + cart.infor.name + '</h5></div></div></td><td class="" style="color: #ec5252;">$' + price + '</td><td class="">' + cart.count + '</td><td class="font-weight-bold" style="color: #ec5252;">$' + Math.floor(price * cart.count * 100) / 100 + '</td><td class=""><a id="' + cart._id + '" class="del-button btn btn-link" type="button"><i class="fas fa-trash" style="color: #ec5252;"></i></a></td></tr>'
  return content;
}

getListCart();