let spanCartCount = document.querySelector('span.cart-count');
let quantity = parseInt(spanCartCount.textContent) || 0;

const user = {
	id: '',
	fullname: '',
	avatar: ''
}
if(document.querySelector('a.userid')) {
	user.id = document.querySelector('a.userid').id;
	user.fullname = document.querySelector('span.user-fullname').textContent;
	user.avatar = document.querySelector('img.user-avatar').src;
}
//console.log(userId);
//console.log(userAvatar);