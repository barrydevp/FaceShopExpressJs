async function renderTrending() {
  // get list data
  let data = [];
  try {
    const res = await axios.get('/api/drugs/getlisttrend');
    data = res.data;
    //console.log(data);
  } catch (err) {
    console.error(err);
  }

  // render top trend
  if(data){
    //console.log('???');
    const row = document.querySelectorAll('.item.carousel-item .row');
    
    for(let i = 0; i < 3; i++) {
      let content = "";
      row[i].innerHTML = '';
      for(let j = 0; j < 4; j++) {
        content += '<div class="col-sm-3"><div class="thumb-wrapper"><div class="img-box"><a href="/cart/view/' + data[i + j]._id + '"><img class="img-responsive img-fluid" src="' + data[i + j].image + '" alt="" style="width: 160px; height: 160px"/></a></div><div class="thumb-content"><h4 class="text-truncate">' + data[i + j].name + '</h4><p class="item-price">';

        content += data[i + j].price.sale ? ('<strike>$' + data[i + j].price.original + '</strike><span class="font-weight-bold">$' + Math.floor(data[i + j].price.original * ( 100 - data[i + j].price.sale ) / 100) + '</span>') : ('<span class="font-weight-bold">$' + data[i + j].price.original + '</span>');

        content += '</p><div class="star-rating"><ul class="list-inline"><li class="list-inline-item"><i class="fas fa-star"></i></li><li class="list-inline-item"><i class="fas fa-star"></i></li><li class="list-inline-item"><i class="fas fa-star"></i></li><li class="list-inline-item"><i class="fas fa-star"></i></li><li class="list-inline-item"><i class="far fa-star"></i></li></ul></div><button id="' + data[i + j]._id + '", class="btn btn-primary", onclick="addToCart.bind(this)()">Add to Cart</a></div></div></div>';

      }
      
      row[i].innerHTML += content;
    }
  }
}

const btns = document.querySelectorAll('button.btn-add');
// for(btn in btns) {
//   btn.addEventListener('onclick', addToCart);
// }

async function addToCart() {
  //console.log('api/sessions/addtocart/' + this.id + '/' + 1);
  try {
    let count = 1;
    const res = await axios.put('/api/sessions/addtocart/' + this.id + '/' + count);
    //console.log(data);
    const carts = res.data.cart;
    //console.log(carts);
    quantity += count;
    spanCartCount.textContent = quantity;
  } catch(err) {
    console.error(err);
  }
}

async function renderList() {
  let data = [];
  try {
    const res = await axios.get('/api/drugs/get');
    data = res.data;
    console.log(data);
  } catch (err) {
    console.error(err);
  }

  // render top trend
  if(data){
    //console.log('???');
    const row = document.querySelector('.row.pb-4');
    
    row.innerHTML = '';
    for(let i = 0; i < 9; i++) {
      content += '<div class="col-sm-4 mt-4"><div class="thumb-wrapper"><a href="/cart/view/' + data[i]._id + '"><img class="img-responsive img-fluid" src="' + data[i].image + '" alt="" style="width: 280px; height: 280px;"/></a><div class="thumb-content"><h5 class="card-title text-truncate">' + data[i].name + '</h5><p class="card-text text-truncate">' + data[i].description + '</p><p class="item-price"></p></div></div></div>';

      content += data[i].price.sale ? ('<strike class="mr-2">$' + data[i].price.original + '</strike><span class="font-weight-bold">$' + Math.floor(data[i].price.original * ( 100 - data[i].price.sale ) / 100) + '</span>') : ('<span class="font-weight-bold">$' + data[i].price.original + '</span>');

      content += '<p></p><div class="star-rating"><ul class="list-inline"><li class="list-inline-item"><i class="fa fa-star"></i></li><li class="list-inline-item"><i class="fa fa-star"></i></li><li class="list-inline-item"><i class="fa fa-star"></i></li><li class="list-inline-item"><i class="fa fa-star"></i></li><li class="list-inline-item"><i class="fa fa-star-o"></i></li></ul></div><button class="btn-add btn btn-primary" id' + data[i]._id + '" onclick="addToCart.bind(this)()">Add to Cart</button>';

    }
    
    row.innerHTML += content;
  }
}

renderTrending();