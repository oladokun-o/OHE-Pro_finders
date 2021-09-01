var expert = localStorage.getItem('expert_job');
$('.expert').append(expert)

$('.back').on('click',()=>{
    window.close()
})
console.log($('.amount').text())
$('.button').click(function (e) { 
    e.preventDefault();
    $.ajax({
        method: "POST",
        url: "https://api.flutterwave.com/v3/payments",
        headers: {"Authorization": "Bearer FLWSECK_TEST-8c3bd46a6862a54dd7cceb3aa16c236e-X"},
        data: {
            //"tx_ref":"hooli-tx-1920bbtytty",
            "currency":$('.dollar').text(),
            "amount":$('.amount').val(),
            "redirect_url":"https://webhook.site/9d0b00ba-9a69-44fa-a43d-a82c33c36fdc",
            "payment_options":"card",
            "meta":{
               "consumer_id":23,
               "consumer_mac":"92a3-912ba-1192a"
            },
            "customer":{
               "email":"user@gmail.com",
               "phonenumber":"080****4528",
               "name":"Yemi Desola"
            },
            "customizations":{
               "title":"Pied Piper Payments",
               "description":"Middleout isn't free. Pay the price",
               "logo":"https://assets.piedpiper.com/logo.png"
            }
         },
         success:(response)=>{
             console.log('success:'+response)
         },
         error:(response)=>{
             console.log('error: '+response)
         }
    });
});