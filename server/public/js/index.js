let arrArticle = [];

async function getListArticle() {
	try {
		let res = await axios.get('/api/articles/article');
		arrArticle = res.data;
		console.log(res);
	} catch(err) {
		console.error(err);
	}

	if(arrArticle) {
		renderArticle(arrArticle)
	}

}

function renderArticle(arrArticle) {
	let center = document.querySelector('.col-md-6.center');

	center.innerHTML = '<div class="post card gedf-card mb-4"><div class="card-header"><ul class="nav nav-tabs card-header-tabs" id="myTab" role="tablist"><li class="nav-item"><a class="nav-link active" id="posts-tab" data-toggle="tab" href="#posts" role="tab" aria-controls="posts" aria-selected="true">Make a publication</a></li><li class="nav-item"><a class="nav-link" id="images-tab" data-toggle="tab" role="tab" aria-controls="images" aria-selected="false" href="#images">Images</a></li></ul></div><div class="card-body"><div class="tab-content" id="myTabContent"><div class="tab-pane fade show active" id="posts" role="tabpanel" aria-labelledby="posts-tab"><div class="form-group"><input class="form-control mb-2" type="text" placeholder="Title here you can skip!"/><textarea class="form-control" id="message" rows="3" placeholder="What are you thinking?"></textarea></div></div><div class="tab-pane fade" id="images" role="tabpanel" aria-labelledby="images-tab"><div class="form-group"><div class="custom-file"><div class="custom-file-input" id="customFile" type="file">Image</div><label class="custom-file-label" for="customFile">Upload image</label></div></div><div class="py-4"></div></div></div><div class="btn-toolbar justify-content-between"><div class="btn-group"><button class="post-article btn btn-primary" onclick="postArticle.bind(this)()">POST</button></div><div class="btn-group"><button class="btn btn-link dropdown-toggle" id="btnGroupDrop1" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-globe"></i></button><div class="dropdown-menu dropdown-menu-right" aria-labelledby="btnGroupDrop1"><a class="dropdown-item" href="#"><i class="fa fa-globe"></i> Public</a><a class="dropdown-item" href="#"><i class="fa fa-users"></i> Friends</a><a class="dropdown-item" href="#"><i class="fa fa-user"></i> Just me</a></div></div></div></div></div>';

	for(let article of arrArticle) {
		center.innerHTML += createCardArticleText(article);
	}
}

function calculateTime(date1, date2) {
	const diff = Math.abs(date1 - date2);
	const milPerDay = 86400000;
	const milPerHour = 3600000;
	const milPerMin = 60000;
	const milPerSec = 1000;
	//console.log(diff);
	if( diff > milPerDay) {
		return Math.floor(diff / milPerDay) + ' day ago';
	} else {
			if(diff > milPerHour) return Math.floor(diff / milPerHour) + ' hour ago';
			else {
				if(diff > milPerMin) return Math.floor(diff / milPerMin) + ' min ago';
				else return Math.floor(diff / milPerSec) + ' sec ago';
			}
	}
}

async function postArticle() {
	const body = document.querySelector('.post textarea')
	const title = document.querySelector('.post input');
	let data = {
		title: title.value,
		body: body.value || "None!"
	};
	let centerDiv = document.querySelector('.col-md-6.center');

	try {
		let res = await axios.post('/api/articles/article/', data);
		const article = res.data;
		centerDiv.insertBefore(createCardArticleElement(article), centerDiv.childNodes[1]);
		//getListArticle();
	} catch(err) {
		console.error(err);
	}

}

async function postComment() {
	const articleId = this.id;
	const query = '.id-' + articleId + '.article input.add-comment';
	const body = document.querySelector(query);
	const query2 = '.id-' + articleId + '.article ul.list-group';
	const ulListGroup = document.querySelector(query2);
	if(body.value) {
		let data = {
			body: body.value
		};
		try {
			let url = '/api/articles/' + articleId + '/addcomment';
			let res = await axios.patch(url, data);
			const comment = res.data;
			ulListGroup.insertBefore(createLiCommentElement(comment, articleId), ulListGroup.childNodes[1]);
		} catch(err) {
			console.error(err);
		}
	}
}

async function deleteComment() {
	const ids = this.id.split(',');
	const commentId = ids[0];
	const articleId = ids[1];
	const query = 'li.comment.id-' + commentId;
	const licomment = document.querySelector(query);
	if(licomment){
		try {
			const url = '/api/articles/' + articleId + '/delcomment/' + commentId;
			//console.log(url);
			await axios.delete(url);
			licomment.remove();
		} catch(err) {
			console.error(err);
		}
	}
}

async function deletePost() {
	const articleId = this.id;
	const query = '.id-' + articleId + '.article';
	const divArticle = document.querySelector(query);
	if(divArticle){
		try {
			const url = '/api/articles/article/' + articleId;
			//console.log(url);
			await axios.delete(url);
			divArticle.remove();
		} catch(err) {
			console.error(err);
		}
	}
}

function createLiCommentText(comment, article) {
	let commentInnerText = '';
	let dropdownCmt = '';
	if(comment.author._id == user.id) {
		dropdownCmt = '<div class="dropdown"><button class="btn btn-link dropdown-toggle" id="gedf-drop1" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-ellipsis-h"></i></button><div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1"><button id="' + comment._id + '"  class="edit-cmt btn btn-link dropdown-item" onclick="editComment.bind(this)()">Edit</button><button id="' + comment._id + ',' + article._id + '" class="del-cmt btn btn-link dropdown-item" onclick="deleteComment.bind(this)()">Delete</button></div></div>';
	} else if(article._id == user.id) {
			dropdownCmt = '<div class="dropdown"><button class="btn btn-link dropdown-toggle" id="gedf-drop1" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-ellipsis-h"></i></button><div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1"><button id="' + comment._id + ',' + article._id + '" class="del-cmt btn btn-link dropdown-item" onclick="deleteComment.bind(this)()">Delete</button></div></div>';
	}

	commentInnerText = '<li id="' + comment._id + '" class="id-' + comment._id + ' comment list-group-item"><div class="media"><a class="card-link" href="/user/view/' + (article.author._id == user.id ? "" : article.author._id) + '"><img class="rounded-circle mr-3" src="' + comment.author.avatar + '" width="45" alt="..."/></a><div class="media-body"><div class="form-group d-flex justify-content-between align-items-center"><div class="form-control" readonly="readonly"><a class="card-link font-weight-bold" href="/user/view/' + (article.author._id == user.id ? "" : article.author._id) + '">' + comment.author.fullname + '</a> ' + comment.body + '</div>' + dropdownCmt + '</div></div></div></li>';
	return commentInnerText;
}

function createLiCommentElement(comment, articleId) {
	//console.log(comment);
	let commentLiElement = document.createElement("LI");
	commentLiElement.id = comment._id;
	commentLiElement.className = 'id-' + comment._id + ' comment list-group-item';
	let dropdownCmt = '';
	dropdownCmt = '<div class="dropdown"><button class="btn btn-link dropdown-toggle" id="gedf-drop1" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-ellipsis-h"></i></button><div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1"><button id="' + comment._id + '"  class="edit-cmt btn btn-link dropdown-item" onclick="editComment.bind(this)()">Edit</button><button id="' + comment._id + ',' + articleId + '" class="del-cmt btn btn-link dropdown-item" onclick="deleteComment.bind(this)()">Delete</button></div></div>';

	commentLiElement.innerHTML = '<div class="media"><a class="card-link" href="/user/view/"><img class="rounded-circle mr-3" src="' + user.avatar + '" width="45" alt="..."/></a><div class="media-body"><div class="form-group d-flex justify-content-between align-items-center"><div class="form-control" readonly="readonly"><a class="card-link font-weight-bold" href="/user/view/">' + user.fullname + ' </a>' + comment.body + '</div>' + dropdownCmt + '</div></div></div>';
	return commentLiElement;
}

function createCardArticleText(article) {
	let articleInnerText = '';
	let dropdownHead = article.author._id != user.id ? '' : ('<div><div class="dropdown"><button class="btn btn-link dropdown-toggle" id="gedf-drop1" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-ellipsis-h"></i></button><div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1"><button id="' + article._id + '" class="edit-article btn btn-link dropdown-item" onclick="editPost.bind(this)()">Edit</button><button id="' + article._id + '" class="del-article btn btn-link dropdown-item" onclick="deletePost.bind(this)()">Delete</button></div></div></div>');

		let cardHeader = '<div class="card-header"><div class="d-flex justify-content-between align-items-center"><div class="d-flex justify-content-between align-items-center"><div class="mr-2"><a href="/user/view/' + (article.author._id == user.id ? "" : article.author._id) + '"><img class="rounded-circle" width="70" src="' + article.author.avatar + '" alt=""/></a></div><div class="ml-2"><div class="h4 m-0">@ <a class="card-link" href="/user/view/' + (article.author._id == user.id ? "" : article.author._id) + '">' + article.author.fullname + '</a></div><div class="text-muted h7 mb-2" style="font-size: 0.9em;"><i class="far fa-clock"><span> ' + calculateTime(Date.now(), new Date(article.date)) + '</span></i></div></div></div>' + dropdownHead + '</div></div>';

		let cardBody = '<div class="card-body"><h4 class="article-title card-title">' + article.title + '</h5><p class="article-body card-text">' + article.body + '</p></div>';

		let comments = "";
		for(let comment of article.comments) {
			comments += createLiCommentText(comment, article);
		}

		let cardFooter = '<div class="card-footer"><a class="card-link" href="#"><i class="fas fa-thumbs-up"></i> Like</a><a class="card-link" data-toggle="collapse" href="#collapseComment' + article._id + '" role="button" aria-expanded="false" aria-controls="collapseComment' + article._id + '"><i class="fas fa-comment"></i> Comment</a><a class="card-link" href="#"><i class="fas fa-share"></i> Share</a></div><ul class="collapse list-group list-group-flush" id="collapseComment' + article._id + '"><li class="list-group-item"><div class="media"><img class="rounded-circle mr-3" src="' + user.avatar +'" width="45" alt="..."/><div class="media-body"><div class="form-group d-flex justify-content-between align-items-center"><input class="add-comment form-control mr-2" type="text" placeholder="Input comment"/><button id="' + article._id + '" class="btn-addcomment btn btn-link" onclick="postComment.bind(this)()"><i class="fas fa-arrow-circle-up"></i></button></div></div></div></li>' + comments + '</ul>';

		articleInnerText = '<div id="' + article._id + '" class="id-' + article._id + ' article card gedf-card mb-4">' + cardHeader + cardBody + cardFooter + '</div>';

		return articleInnerText;
}

function createCardArticleElement(article) {
	let cardArticleDivElement = document.createElement("DIV");
	cardArticleDivElement.id = article._id;
	cardArticleDivElement.className = 'id-' + article._id + ' article card gedf-card mb-4';
	let dropdownHead = '<div><div class="dropdown"><button class="btn btn-link dropdown-toggle" id="gedf-drop1" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"><i class="fa fa-ellipsis-h"></i></button><div class="dropdown-menu dropdown-menu-right" aria-labelledby="gedf-drop1"><button id="' + article._id + '" class="edit-article btn btn-link dropdown-item" onclick="editPost.bind(this)()">Edit</button><button id="' + article._id + '" class="del-article btn btn-link dropdown-item" onclick="deletePost.bind(this)()">Delete</button></div></div></div>';

		let cardHeader = '<div class="card-header"><div class="d-flex justify-content-between align-items-center"><div class="d-flex justify-content-between align-items-center"><div class="mr-2"><a href="/user/view/"><img class="rounded-circle" width="70" src="' + user.avatar + '" alt=""/></a></div><div class="ml-2"><div class="h4 m-0">@ <a class="card-link" href="/user/view/">' + user.fullname + '</a></div><div class="text-muted h7 mb-2" style="font-size: 0.9em;"><i class="far fa-clock"><span> ' + calculateTime(Date.now(), new Date(article.date)) + '</span></i></div></div></div>' + dropdownHead + '</div></div>';

		let cardBody = '<div class="card-body"><h4 class="article-title card-title">' + article.title + '</h5><p class="article-body card-text">' + article.body + '</p></div>';

		let cardFooter = '<div class="card-footer"><a class="card-link" href="#"><i class="fas fa-thumbs-up"></i> Like</a><a class="card-link" data-toggle="collapse" href="#collapseComment' + article._id + '" role="button" aria-expanded="false" aria-controls="collapseComment' + article._id + '"><i class="fas fa-comment"></i> Comment</a><a class="card-link" href="#"><i class="fas fa-share"></i> Share</a></div><ul class="collapse list-group list-group-flush" id="collapseComment' + article._id + '"><li class="list-group-item"><div class="media"><img class="rounded-circle mr-3" src="' + user.avatar +'" width="45" alt="..."/><div class="media-body"><div class="form-group d-flex justify-content-between align-items-center"><input class="add-comment form-control mr-2" type="text" placeholder="Input comment"/><button id="' + article._id + '" class="btn-addcomment btn btn-link" onclick="postComment.bind(this)()"><i class="fas fa-arrow-circle-up"></i></button></div></div></div></li></ul>';

		cardArticleDivElement.innerHTML =  cardHeader + cardBody + cardFooter ;

		return cardArticleDivElement;
}



function main() {
	getListArticle();
}

main();