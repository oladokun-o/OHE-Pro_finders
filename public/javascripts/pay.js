var expert = localStorage.getItem('expert_job');
$('.expert').append(expert)

$('.back').on('click',()=>{
    window.close()
})
//console.log($('.amount').text())
$('.button').click(function (e) { 
    e.preventDefault();
    $.ajax({
        method: "POST",
        contentType: "application/json; charset=utf-8",
        url: 'https://api.flutterwave.com/v3/payments',
        headers: {"Authorization": "Bearer FLWSECK_TEST-8c3bd46a6862a54dd7cceb3aa16c236e-X",},
        data: {
            "tx_ref":"hooli-tx-1920bbtytty",
            "amount":"100",
            "currency":"NGN",
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
         }
         ,
         success:(response)=>{
             console.log('success:'+response)
         },
         error:(response)=>{
             console.log('error: '+ response.responseJSON.message)
         }
    });
});
$(document).ready(function(e) {
    //e.preventDefault()
    //var select = $('.select-list')
    $.ajax({
        method: 'POST',
        url: '/payment-details',
        success: function(response) {                              
                var amount = response.map((o) => (
                    o.amount
                )),
                    currency = response.map((o) => (
                        o.currency
                    ))
                const expAmount = [].concat(...amount)
                //console.log(jobCollection)
                var expHtml = $.map(expAmount, function (value) {
                    return (value);
                })
                const expCurrency = [].concat(...currency)
                //console.log(jobCollection)
                var expCurrHtml = $.map(expCurrency, function (value) {
                    return (value);
                })
            $('.amount').append(expHtml.join(''))
            $('.dollar').append(expCurrHtml.join(''))
            //console.log(response)
        },
        error: function(response) {
            $('.amount').append(response.responseText)
        }
    })
})
