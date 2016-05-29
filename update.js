$('#formUpdate').submit(function () {
    return false;
});

$('#insertUpdate').click(function () {  
$.post(
        $('#formUpdate').attr('action')
        , $('#formUpdate :input').serializeArray()
        , function (result) {
            $('#result').html(result);
        }
    );
});