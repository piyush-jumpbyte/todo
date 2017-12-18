$('#submit').click(function()
{
    $.ajax({
        url: '/',
        type:'POST',
        data:
        {
            data: data,
        },
        success: function(msg)
        {
            alert('UserName Sent');
        }               
    });
}