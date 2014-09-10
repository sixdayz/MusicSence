$(document).ready(function(){


    $('.new_list').click(function(){

        $('.modal_new_list').fadeIn();

    });
    $('.close_modal').click(function(){

        $('.modal_new_list').fadeOut();
    });

    $('.like').click(function(){

        $('.dislike i').css({'color':'rgb(233,233,233)','borderColor':'rgb(233,233,233)'});
        $('.like i').css({'color':'#67fddb','borderColor':'#67fddb'});
        $('.rate').css({'color':'#67fddb'}).html('You like this song');
    });

    $('.dislike').click(function(){

          $('.like i').css({'color':'rgb(233,233,233)','borderColor':'rgb(233,233,233)'});
         $('.dislike i').css({'color':'#ff7d7d','borderColor':'#ff7d7d'});
         $('.rate').css({'color':'#ff7d7d'}).html('You dislike this song');

    });

    $('.play').click(function(){

        $('.play').html('<i class="fa fa-pause"></i>');
    });

    $('.heart').click(function(){

        $('.heart i').css({'color':'rgb(249,139,118)','borderColor':'rgb(249,139,118)'});
    });
});

