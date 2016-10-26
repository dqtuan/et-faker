(function($) {
	$(document).ready (function () {
    var max_fields      = 15;
    var wrapper         = $(".input_fields_wrap");
    var add_button      = $(".add_field_button");
    var x = 0;
    $(add_button).click(function(e){
      e.preventDefault();
      if(x < max_fields){
        x++;
        $(wrapper).append('<div class="row cf-row"><div class="col-md-8"><input class="form-control custom-field" type="text" placeholder="custom_field_name|custom_field_value"></div><div class="col-md-4 remove-cf"><a href="#" class="remove_field"><span class="glyphicon glyphicon-remove" aria-hidden="true"></span></a></div></div>'); 
      }
    });
    $(wrapper).on("click",".remove_field", function(e){
      e.preventDefault(); $(this).parent('div').parent('div').remove(); x--;
    })
		$('#add-post').click(function(){
			var post_type = $('#post_type').val(),
				  count_post = $('#count_post').val();
      var custom_field = new Array();
      $('.custom-field').each(function (index, value) {
        custom_field.push($(this).attr('value'));
      });
			var data = {
            'action': 'et_faker_add_post',
            'post_type': post_type,
            'custom_field' : custom_field,
      };
      for (var i = 0; i < count_post; i++) {
        jQuery.ajax({
          type: "POST",
          url: 'http://localhost/et-faker/wp-admin/admin-ajax.php',
          data: data,
          action: 'et_faker_add_post',
          beforeSend : function(xhr, opts){
            $('#log').html("<p style='color:red;'>Start...Please wait few minutes...</p><br>");
            $('#log').css("display","block");
          },
          success: function(res) {
            if(res.success){
              var result = '';
              $.each(res.data, function( key, value ) {
                result += '<a target="_blank" href="' +value['url']+ '">' +value['title']+ '</a><br>';
              });
              $('#log').append(result);
            }else{
              $('#log').append('False');
            }
          }
        });
      }
		});
	});
}(jQuery));