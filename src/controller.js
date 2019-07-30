var elSetorTurno = $('.setor-turno')
var elPergunta1 = $('.perguntas1')
var elPergunta2 = $('.perguntas2')
var elPergunta3 = $('.perguntas3')
var elPergunta4 = $('.perguntas4')

var posicao = 0

const $inputs = $('.inputs');
$inputs.keyup(function(e) {
    if (this.value.length === this.maxLength) {
        $(this).nextAll('.inputs').first().focus();
    }
});

$('.txtSetor').focus()

$('.btnNextPage').click(function() {
    const $parent = $(this).parent();
    $parent.addClass('hide').removeClass('show');
    $parent.next().addClass('show').removeClass('hide');
    $parent.next().find('input').first().focus();
});

$('.btnNextPage:not(#finalBtn)').click(function() {
    const $parent = $(this).parent();
    $parent.addClass('hide').removeClass('show');
    $parent.next().addClass('show').removeClass('hide');
    $parent.next().find('input').first().focus();
});
$('#finalBtn').click(function() {
    alert('Avaliação cadastrada!');
    $('#formCadastra').submit();
    limpar();
});

$('.btnCadastro').click(function() {
    $('#cadastro').addClass('show')
    $('#listagem').removeClass('show')
})

$('.btnListar').click(function() {
    $('#listagem').addClass('show')
    $('#cadastro').removeClass('show')
})

$('.listar-obs').click(function() {
    window.location = '/listar-obs'
})

$('.listar-obs-turno').click(function() {
    window.location = '/listar-obs-turno' + $('.select-turno').val()
})

$('.select-turno').change(function() {
    if($(this).val() != '') {
        $('.listar-obs').addClass('hide')
        $('.listar-obs-turno').addClass('show')
    }
    else {
        $('.listar-obs').removeClass('hide')
        $('.listar-obs-turno').removeClass('show')
    }
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