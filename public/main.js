// main.js
var update = document.getElementById('update')

update.addEventListener('click', function () {
  // Send PUT Request here
  var authorName = document.getElementById('txtUpdateAuthorName').value;
  var newQuote = document.getElementById('txtUpdateQuote').value;
  fetch('quotes', {
  	method: 'put',
  	headers: {'Content-Type': 'application/json'},
  	body: JSON.stringify({
  		'name': authorName,
  		'quote': newQuote
  	})
  })
  .then(res=>{
  	if(res.ok) return res.json;
  })
  .then(data=>{
  	console.log(data);
  	window.location.reload();
  });
});

var del = document.getElementById('delete');

/*del.addEventListener('click',function(){
	fetch('quotes',{
		method:'delete',
		headers:{'Content-Type':'application/json'},
		body: JSON.stringify({
			'name': 'Darth Vader'
		})
	})
	.then(res=>{
		if(res.ok) return res.json()
	})
	.then(data=>{
		console.log(data);
		window.location.reload();
	})
});
*/

del.addEventListener('click',function(){
  var name = document.getElementById('txtDeleteAuthorName').value;
  console.log('Trying to delete quote by'+name);
  fetch('quotes',{
    method:'delete',
    headers:{'Content-Type':'application/json'},
    body: JSON.stringify({
      'name': name
    })
  })
  .then(res=>{
    if(res.ok) return res.json()
  })
  .then(data=>{
    console.log(data);
    window.location.reload();
  })
});
