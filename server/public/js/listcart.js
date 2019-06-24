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
  const ulListCart = document.querySelector('ul.list-cart');
  let content = "";
  let count = 0;
  for(let cart of carts) { 
    count += cart.count;
    content += '<li class="list-group-item d-flex justify-content-between align-items-center pt-2 pb-0"><blockquote class="blockquote p-0"><p class="h6 mb-0">' + cart.infor.name + '</p><footer class="h6 blockquote-footer">$ ' + Math.floor(cart.infor.price.original * ( 100 - cart.infor.price.sale )) / 100 + '</footer><span class="badge badge-primary badge-pill" style="font-size: 100%;">' + cart.count + '</span></blockquote><button id="' + cart._id + '" class="del-button btn btn-primary btn-sm" type="button">Delete</button></li>'
  }
  ulListCart.innerHTML = content;

  const tagCartCount = document.querySelectorAll('.cart-count');
  tagCartCount[0].textContent = count;
  tagCartCount[1].textContent = count + ' Item in Cart';;

  //- for(tag of tagCartCount) {
  //-   tag.textContent = count + ' Item in Cart';
  //- }
  
  const buttons = document.getElementsByClassName('del-button');

  for(let button of buttons) {
    button.addEventListener('click', removeItem);
  }
}

getListCart();