var selectList = $('.select-list');

selectList.change(function (e) { 
    e.preventDefault();
    console.log(selectList.val())
    $.ajax({
        type: "GET",
        url: "javascript:void(Tawk_API.toggle())",
        //data: "data",
        //dataType: "dataType",
        //success: function (response) {}
    });
});