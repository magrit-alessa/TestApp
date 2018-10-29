$(document).ready(function(){

  var url="http://www.filltext.com/?rows=100&id=%7Bnumber%7C1000%7D&firstName=%7BfirstName%7D&delay=3&lastName=%7BlastName%7D&email=%7Bemail%7D&phone=%7Bphone%7C(xxx)xxx-xx-xx%7D&adress=%7BaddressObject%7D&description=%7Blorem%7C32%7D";

  $("#loading").hide();

  $.ajax({
    url,
    type: "GET",
    async : true,
    dataType: "json",
    cache: false,
    success: createTable,
    errror: function (jqXHR, textStatus, errorThrown) {
      console.log(jqXHR);
      console.log(textStatus);
      console.log(errorThrown);
    },
     beforeSend: function () {
         $('#loading').show();
     },
     complete: function () {
         $("#loading").hide();
     }
  });

  function createTable(data){
    var td = '';
    $.each(data, function(key, value){

      td+='<tr class="items">';
      td+='<td class="id">'+ value.id+'</td>';
      td+='<td class = "firstName" >'+ value.firstName+'</td>';
      td+='<td class = "lastName">'+ value.lastName+'</td>';
      td+='<td class = "email">'+ value.email+'</td>';
      td+='<td class = "phone">'+ value.phone+'</td>';
      td+='<td class="adress"><ul>';
      td+='<li class="streetAddress">'+ value.adress.streetAddress+'</li>';
      td+='<li class="city">'+value.adress.city+'</li>';
      td+='<li class="state">'+value.adress.state+'</li>';
      td+='<li class="zip">'+value.adress.zip+'</li>';
      td+='</td></ul>';
      td+='<td class="description">'+ value.description+'</td>';
      td+='</tr>';
    });

    $('#table>tbody').append(td);
    $('.items').on('click', card);
    pagination();

  }

  function pagination(){
    var limit=50;
    $(".items:gt("+(limit-1)+")").hide();

      var itemlength = $('.items').length;
      var pages = Math.round(itemlength/limit);
      $('.pagination li').on('click',function(){
        if($(this).hasClass('active')){
          return false;
        }else{
          var currentPage = parseInt($(this).text());
          $('.pagination li').removeClass('active');
          $(this).addClass('active');
          $('#table .items').hide();
          var grandTotal = limit*currentPage;
          for(var i = grandTotal - limit; i< grandTotal; i++){
            $('.items:eq('+i+')').show();
          }
        }
  })
}
function card(){

 var name = $(this).find('.firstName').text() +" "+$(this).find('.lastName').text();
 var description = $(this).find('.description').text();
 var streetAddress = $(this).find('.streetAddress').text();
 var city = $(this).find('.city').text();
 var state = $(this).find('.state').text();
 var zip = $(this).find('.zip').text();

 var card = '<div class="card"><div class="card-body">';
     card+= '<p class="card-title"> Выбран пользователь: '+name+'</p>';
     card+= '<p> Описание: <br> '+description+'</p>';
     card+= '<p> Адрес проживания: '+streetAddress+'</p>';
     card+= '<p> Город: '+city+'</p>';
     card+= '<p>Провинция/штат: '+state+'</p>';
     card+= '<p>Индекс: '+zip+'</p>';
     card+= '</div></div>';
 $('.container').append(card);
};


 $('th').click(function(){
   var table = $(this).parents('table').eq(0);
   var rows = table.find('tr:gt(0)').toArray().sort(comparer($(this).index()));
    this.asc = !this.asc;

     if (!this.asc){
       rows = rows.reverse();
     }

       for (var i = 0; i < rows.length; i++){
         table.append(rows[i]);
       }

           if($(this).hasClass('up')){
             $(this).removeClass('up');
             $(this).addClass('down');
           }else if($(this).hasClass('down')){
             $(this).removeClass('down');
             $(this).addClass('up');
           }else{
             $('th').removeClass();
             $(this).addClass('up');
           }

})
function comparer(index) {
   return function(a, b) {
       var valA = getCellValue(a, index),
           valB = getCellValue(b, index);
       return $.isNumeric(valA) && $.isNumeric(valB) ? valA - valB : valA.toString().localeCompare(valB);
   }
}
function getCellValue(row, index){
 return $(row).children('td').eq(index).text();
}

// $('#table tr').on('click',


 $('#button').on('click', function(){
  $('#table').children('tbody').children('tr').each(function(){
      var match = false;
      $(this).children('td').each(function(){
        if($(this).text() == $('input').val()){
          match = true;
        }
        if(match){
          $(this).parent().show();
        }else{
          $(this).parent().hide();
        }
      })
    })
 });


});
