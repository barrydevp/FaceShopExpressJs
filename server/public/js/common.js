let spanCartCount = document.querySelector('span.cart-count');
let quantity = parseInt(spanCartCount.textContent) || 0;
const user = {
	id: document.querySelector('a.userid').id,
	fullname: document.querySelector('span.user-fullname').textContent,
	avatar: document.querySelector('img.user-avatar').src
}

//console.log(userId);
//console.log(userAvatar);