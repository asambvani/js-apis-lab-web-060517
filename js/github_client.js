//define functions here
var createGist = function(file_name, content, description, token){
  let data = {
    "description": description,
    "public": true,
    "files": {
      [file_name]: {
        "content": content
      }
    }
  }
  $.ajax({
      url: 'https://api.github.com/gists',
      type: 'POST',
      headers:{
        Authorization: `token ${token}`
      },
      dataType: 'json',
      data: JSON.stringify(data)
  }).then(function(){
    myGists("asambvani",token)
  });
};

var myGists = function (username, token){
    $.ajax({
    url: 'https://api.github.com/users/'+username+'/gists',
    type: 'GET',
    headers: {
      Authorization: `token ${token}`
    },
    success: function(response){
      renderGists(response)
    },
  })
};

var bindCreateButton = function() {
  $('form').on('submit', function(event){
    event.preventDefault()
    createGist($('#file_name').val(), $('#content').val(), $('#description').val(), $('#token').val())
  })
};

$(document).ready(function(){
  bindCreateButton();
});


function renderGists(gists){
  gists.forEach(function(gist){
    console.log(gist.description)
    $('body').append(`<p>File Name:${Object.keys(gist.files)[0]} Description: ${gist.description}</p>`)
  })
}
