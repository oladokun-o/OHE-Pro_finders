var expert = localStorage.getItem('expert_job');
$('.expert').append(expert)

$('.back').on('click',()=>{
    window.close() || window.history.back()
})
//console.log($('.amount').text())

$('.button').click(function (e) { 
    e.preventDefault();
    $.ajax({
        method: 'POST',
        url: '/make-payment'
    })
    .done((result) => {
        makePayment(result)
    })
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

    $.ajax({
        method: 'POST',
        url: '/subpayment-details',
        success: function(response) {                              
                var vatAmount = response.map((o) => (
                    o.vat
                )),
                    fwVatAmount = response.map((o) => (
                        o.fw_tax
                    ))
                const vat = [].concat(...vatAmount)
                //console.log(jobCollection)
                var expVat = $.map(vat, function (value) {
                    return (value);
                })
                const fw = [].concat(...fwVatAmount)
                //console.log(jobCollection)
                var fwVat = $.map(fw, function (value) {
                    return (value);
                })
                var Denom = 10,
                    vatNenom = expVat.join(''),
                    fwNenom = fwVat.join(''),
                    prePrice = $('.amount').text();

                var prePriceDivided = prePrice/Denom,
                    vatPrice = prePriceDivided*vatNenom,
                    totalVat = vatPrice/100,
                    fwPrice = prePriceDivided*fwNenom,
                    totalFwVat = fwPrice/100,
                    total = totalVat+totalFwVat+parseInt(prePrice);
                    //console.log(totalVat)

            $('.vat-amount').append(totalVat)
            $('.fw-vat-amount').append(totalFwVat)
            $('.total').append(total)
            //console.log(response)
        },
        error: function(response) {
            $('.amount').append(response.responseText)
        }
    })
})

function makePayment(result) {
    let total = document.getElementById("total"),
        currency = document.getElementById('currency'),
        tx_ref =   firstname.charAt(0)+lastname.charAt(0)+result.tx_ref;
        //console.log(tx_ref)
        //console.log(result.tx_ref)
    FlutterwaveCheckout({
        public_key: result.sec_key,
        tx_ref: tx_ref,
        amount: total.innerHTML,
        currency: currency.innerHTML,
        country: "NG",
        payment_options: "card, banktransfer",
        redirect_url: // specified redirect URL
          "https://oprofinder.com/pay",
        meta: {
          consumer_id: userId,
          //consumer_mac: "",
        },
        customer: {
          email: email,
          phone_number: phone,
          name: firstname + ' ' + lastname,
        },
        callback: function (data) {
          console.log(data);
        },
        onclose: function() {
          // close modal
        },
        customizations: {
          title: "Oprofinder",
          description: "Payment for chat session",
          logo: "https://oprofinder.com/images/OHE-Logo.png",
        },
      });
}
