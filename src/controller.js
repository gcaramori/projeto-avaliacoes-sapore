

var elSetorTurno = $('.setor-turno')
var elPergunta1 = $('.perguntas1')
var elPergunta2 = $('.perguntas2')
var elPergunta3 = $('.perguntas3')
var elPergunta4 = $('.perguntas4')

var posicao = 0

$('.txtSetor').focus()

$('.btnNextPage:eq(0)').click(function () {
    if (posicao == 0) {
        $(elSetorTurno).addClass('hide')
        $('.txtPergunta1').focus()
        posicao++;
    }
})

$('.btnNextPage:eq(1)').click(function () {
    if (posicao == 1) {
        jQuery(elPergunta1).addClass('hide')
        $('.txtPergunta4').focus()
        posicao++;
    }
})

$('.btnNextPage:eq(2)').click(function () {
    if (posicao == 2) {
        jQuery(elPergunta2).addClass('hide')
        $('.txtPergunta7').focus()
        posicao++;
    }
})

$('.btnNextPage:eq(3)').click(function () {
    if(posicao == 3) {
        jQuery(elPergunta3).addClass('hide')
        $('.txtObs').focus()
        posicao++;
    }
})

$('.btnNextPage:eq(4)').click(function () {
    if (posicao == 4) {
        alert('Avaliação cadastrada!')
        $('#formCadastra').submit()
        limpar()
        $('.txtSetor').focus()
        jQuery(elSetorTurno).removeClass('hide')
        posicao = 0;
    }
})

$('.btnCadastro').click(function() {
    $('#listagem').removeClass('show')
    $('#cadastro').removeClass('hide')
})

$('.btnListar').click(function() {
    $('#listagem').addClass('show')
    $('#cadastro').addClass('hide')
})

function limpar() {
    $('.txtSetor').val('')
    $('.txtTurno').val('')
    $('.txtPergunta1').val('')
    $('.txtPergunta2').val('')
    $('.txtPergunta3').val('')
    $('.txtPergunta4').val('')
    $('.txtPergunta5').val('')
    $('.txtPergunta6').val('')
    $('.txtPergunta7').val('')
    $('.txtPergunta8').val('')
    $('.txtPergunta9').val('')
}

/*$('#formListar').submit(function (e) {
    e.preventDefault();
    var fd = new FormData($(this)[0]);
    $.ajax({
        url: '/pload',
        data: fd,
        processData: false,
        contentType: false,
        type: 'POST',
        success: function(data){
            console.log(data);
        }
    });
});*/