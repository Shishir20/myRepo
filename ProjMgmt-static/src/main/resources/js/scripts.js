var link_div_map = {
    'nav_a_home': 'main_div_home',
    'nav_a_regscreen':'main_div_regscreen',
    'nav_a_otpval':'main_div_otpval',
    'nav_a_otpsuc':'main_div_otpsuc',
    'nav_a_regselr':'main_div_regselr',
    'nav_a_regbuyr':'main_div_regbuyr',
    'nav_a_selrhome':'main_div_selrhome',
    'nav_a_buyrhome':'main_div_buyrhome'
 };

$(document).ready(function() {
    _init();
});

function  _init(){

var initialLoadLinkId = 'nav_a_home';
$('div[id^="main_div_"]').hide();
$('#'+link_div_map[initialLoadLinkId]).show();
$('#'+initialLoadLinkId).addClass('highlight');

$('.main_nav_grp_cls').each(function( index ) {
  var id = this.id;
  $('#'+this.id).unbind('click').bind('click', function(){
  $('.main_nav_grp_cls').removeClass('highlight');
  $('#'+this.id).addClass('highlight');
  $('div[id^="main_div"]').hide();
  $('#'+link_div_map[id]).show();
});
});


/********** Clicking of done button after entering phone number ***********/
$('#main_div_home .done_button').unbind('click').bind('click', function(){
  var countryCode = $('#main_div_home .num_digit2').val();
  var phoneNum = $('#main_div_home .num_digit10').val();
//  alert('phoneNum='+phoneNum);

  $.ajax({
     url: '/medplus/restservice/getRandom4DigitOtp/'+$('#main_div_home .num_digit10').val(),
     type: 'GET',
     data: {
        format: 'json'
     },
     dataType: 'json',
     error: function() {
       alert('error');
     },
     success: function(data) {
     $('#otp_resp_code').val(data);
     $('.main_nav_grp_cls').removeClass('highlight');
       $('#nav_a_otpval').addClass('highlight');
       $('.main_div_grp_class').hide();
       $('#'+link_div_map['nav_a_otpval']).show();
       $('#main_div_otpval .mob_otp_txt').html('Enter the OTP code for : '+countryCode+'-'+phoneNum);
       //$('#main_div_otpval .num_digit4').val(data);
     }
  });

});

$('#main_div_otpval .done_button').unbind('click').bind('click', function(){
  var enteredOtp = $('#main_div_otpval .num_digit4').val();
  var otp_resp_code = $('#otp_resp_code').val();

  console.log('enteredOtp='+enteredOtp+', otp_resp_code='+otp_resp_code);

  if(enteredOtp == otp_resp_code){
    console.log('otp matched....');
    $('#otp_err_msg').html('Otp Matched!!').removeClass('error_msg').addClass('success_msg');
    setTimeout(showOtpConfirmationScreen, 1500);
  }else{
    console.log('otp mis-matched....');
    $('#otp_err_msg').html('Otp Mismatch!!').removeClass('success_msg').addClass('error_msg');
  }

});
}

function showOtpConfirmationScreen(){
    $('.main_nav_grp_cls').removeClass('highlight');
    $('#nav_a_otpsuc').addClass('highlight');
    $('.main_div_grp_class').hide();
    $('#'+link_div_map['nav_a_otpsuc']).show();
}