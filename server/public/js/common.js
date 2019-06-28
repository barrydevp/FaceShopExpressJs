let spanCartCount = document.querySelector('span.cart-count');
let quantity = parseInt(spanCartCount.textContent) || 0;

const userLogin = {
	id: '',
	fullname: '',
	avatar: ''
}
if(document.querySelector('a.userLoginId')) {
	userLogin.id = document.querySelector('a.userLoginId').id;
	userLogin.fullname = document.querySelector('span.userLogin-fullname').textContent;
	userLogin.avatar = document.querySelector('img.userLogin-avatar').src;
}
//console.log(userId);
//console.log(userAvatar);

async function acceptFriend() {
	const friendId = this.id;

	try {
		let url = '/api/users/addfr/' + friendId;
		//console.log(url);
		await axios.patch(url);
		let liReq = document.querySelector('li.id-' + friendId);
		let reqCount = document.querySelector('span.count-reqfr');
		reqCount.textContent = parseInt(reqCount.textContent) - 1;
		liReq.remove();
		let divReq = document.querySelector('.profiel-request');
		divReq.innerHTML = '<button class="btn btn-light mr-1"> <i class="fas fa-external-link-square-alt mr-1"></i><span>Follow</span></button><button class="btn btn-light"><i class="fab fa-facebook-messenger mr-1"></i><span>Message</span></button>';
	} catch(err) {
		console.error(err);
	}
}

async function deniedFriend() {
	const friendId = this.id;

	try {
		let url = '/api/users/delreq/friend/' + friendId;
		//console.log(url);
		await axios.patch(url);
		let liReq = document.querySelector('li.id-' + friendId);
		let reqCount = document.querySelector('span.count-reqfr');
		reqCount.textContent = parseInt(reqCount.textContent) - 1;
		liReq.remove();
		let divReq = document.querySelector('.profiel-request');
		divReq.innerHTML = '<button class="btn btn-light mr-3" onclick="addRequestFriend()"><i class="fas fa-user-plus mr-1"></i><span>Add friend</span></button><button class="btn btn-light mr-1"> <i class="fas fa-external-link-square-alt mr-1"></i><span>Follow</span></button><button class="btn btn-light"><i class="fab fa-facebook-messenger mr-1"></i><span>Message</span></button>';
	} catch(err) {
		console.error(err);
	}
}