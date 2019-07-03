$(document).ready(function () {
  // Activate tooltips
  $('[data-toggle="tooltip"]').tooltip();
  // Filter table rows based on searched term
  $("#search").on("keyup", function () {
    var term = $(this).val().toLowerCase();
    $("table tbody.body tr").each(function () {
      $row = $(this);
      var name = $row.find("td:nth-child(3)").text().toLowerCase();
      //console.log(name);
      if (name.search(term) < 0) {
        $row.hide();
      } else {
        $row.show();
      }
    });
  });
});

let curpage = parseInt(window.location.search.substr(6)) || 1;
const perpage = 5;
async function getListFriend(curpage) {
  let arrFriends = [];
  try {
    let res = await axios.get('/api/users/get/friends');
    arrFriends = res.data || [];
    let start = (curpage - 1) * perpage;
    arrFriends = arrFriends.slice(start, start + perpage);
  } catch(err) {
    console.error(err);
  }

  render(arrFriends);
}

function render(arrFriends) {
  const trBody = document.querySelector('tbody.body');
  let content = "";
  arrFriends.forEach((friend, index) => {
    content += '<tr><td>' + (++index) + '</td><td style="width: 22%;"><img width="75px" class="rounded-0" src="' + friend.avatar + '"/></td><td style="width: 22%;"><a class="btn btn-link m-0 p-0" href="/user/' + friend._id + '">' + friend.fullname + '</a></td><td>' + friend.email + '</td><td>Viet Nam</td><td><button class="delete btn btn-outline-danger p-1", id="' + friend._id + '"><i class="material-icons">&#xE872;</i></button></td></tr>';
    //content += '<td><button class="edit btn btn-outline-warning mr-1 p-1" type="button" data-toggle="modal" data-target=".edit' + friend._id + '"><i class="material-icons">&#xE254;</i></button><div class="modal fade edit' + friend._id + '" id="' + friend._id + '" tabindex="-1" role="dialog" aria-labelledby="friendModalLabel" aria-hidden="true"><div class="modal-dialog" role="document"><div class="modal-content"><div class="modal-header"><h5 class="modal-title" id="friendModalLabel">Detail User</h5><button class="close" type="button" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button></div><div class="modal-body"><div class="card float-right" style="width: 18rem;"><ul class="list-group list-group-flush"><li class="list-group-item"><div class="input-group flex-nowrap"><div class="input-group-prepend"><span class="input-group-text" id="addon-wrapping">@</span></div><input class="form-control" type="text" placeholder="' + friend.username + '" aria-label="Username" aria-describedby="addon-wrapping"/></div></li><li class="list-group-item"><div class="input-group flex-nowrap"><div class="input-group-prepend"><span class="input-group-text" id="addon-wrapping">@</span></div><input id="' + friend._id + '" class="form-control email" type="email" placeholder="' + friend.email + '" aria-label="Email" aria-describedby="addon-wrapping"/></div></li></ul><div class="card-body"><a class="card-link" href="#">Card link</a><a class="card-link" href="#">Another link</a></div></div><img class="img-thumbnail" src="' + friend.avatar + '"/></div><div class="modal-footer"><button class="btn-close btn btn-secondary" type="button" data-dismiss="modal">Close</button><button id="' + friend._id + '" class="btn btn-primary btn-send" type="submit">Send message</button></div></div></div></div><button class="delete btn btn-outline-danger p-1", id="' + friend._id + '"><i class="material-icons">&#xE872;</i></button></td></tr>';
  });
  trBody.innerHTML = content;

  const btnSends = document.querySelectorAll('button.btn-send');
  const btnDels = document.querySelectorAll('button.delete');
  const inputEmail = document.querySelectorAll('input.email');

  for(input of inputEmail) {
    input.addEventListener('keyup', changeEmail);
  }

  for(btn of btnSends) {
    btn.addEventListener('click', editData);
  }

  for(btn of btnDels) {
    btn.addEventListener('click', deleteData);
  }
}

async function deleteData() {
  const url = 'api/users/delfr/' + this.id;
  //console.log(url);
  let friends = [];
  try {
    res = await axios.patch(url);
    //friends = res.data;
    //console.log(friends);
  } catch(err) {
    console.error(err);
  }

  getListFriend(curpage);
}    

// async function editData() {
//   const url = 'api/friends/' + this.id;
//   const input = document.querySelectorAll('.edit'+ this.id + ' input');
//   const btnClose = document.querySelector('.edit'+ this.id + ' .btn-close');
//   btnClose.click()
//   let data = { 
//     username : input[0].value || input[0].placeholder, 
//     email: input[1].value || input[1].placeholder
//   }

//   try {
//     await axios.put(url, data);
//   } catch(err) {
//     console.error(err);
//   }

//   getListFriend(curpage);
// }

function changeEmail() {
  reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  const btnSend = document.querySelector('.edit' + this.id + ' .btn-send');
  if(this.value == '' || reg.test(this.value)) {
    btnSend.disabled = false;
  } else {
    btnSend.disabled = true;
  }
}

getListFriend(curpage);