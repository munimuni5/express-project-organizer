console.log('Hello from app.js');

// $('.delete-link').click(function(e){
//   e.preventDefault();
//   // ajax call that automatically uses method POST
//   $.ajax({
//     url: $(this).attr('href'),
//     method: 'DELETE'
//     //if return successfully
//   }).done(function(data){
//     window.location.href = '/projects';
//   });
// });

$('#delete-category').click(function(e){
  e.preventDefault();
  $.ajax({
    url: $(this).attr('href'),
    method: 'delete'
  }).done(function(response){
    window.location.href = '/category';
  });
});
