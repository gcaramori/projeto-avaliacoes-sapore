const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;

app.use(bodyParser.urlencoded({
    extended: true
}))

const url = 'mongodb://localhost:27017'

MongoClient.connect(url, {
    useNewUrlParser: true
}, (err, client) => {
    if (err) return console.log(err)

    db = client.db('config')

    app.listen(3000, function () {
        console.log('Server running on port 3000')
    })
})

app.get('/', (req, res) => {
    let cursor = db.collection('avaliacoes').find()
    res.render('index.ejs')
})

app.post('/cadastra', (req, res) => {
    db.collection('avaliacoes').insertOne(req.body, (err, result) => {
        if (err) return console.log(err)
        res.redirect('/')
    })
})

app.get('/lista', (req, res) => {
    var filtroSetor =  req.originalUrl.split('?')[1].split('&')[0].split('=')[1].trim()
    var filtroTurno =  req.originalUrl.split('?')[1].split('&')[1].split('=')[1].trim()
    var filtroPergunta =  req.originalUrl.split('?')[1].split('&')[2].split('=')[1].trim()

    db.collection('avaliacoes').aggregate([
        {'$facet' : {
                //bloco todas as respostas
                'pergunta1_sFiltro':[{'$group':{'_id':'$pergunta1','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total','pergunta':'1'}},  
                ],
                'pergunta2_sFiltro':[{'$group':{'_id':'$pergunta2','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total','pergunta':'2'}},  
                ],
                'pergunta3_sFiltro':[{'$group':{'_id':'$pergunta3','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total','pergunta':'3'}},  
                ],
                'pergunta4_sFiltro':[{'$group':{'_id':'$pergunta4','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total','pergunta':'4'}},  
                ],
                'pergunta5_sFiltro':[{'$group':{'_id':'$pergunta5','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total','pergunta':'5'}},  
                ],
                'pergunta6_sFiltro':[{'$group':{'_id':'$pergunta6','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total','pergunta':'6'}},  
                ],
                'pergunta7_sFiltro':[{'$group':{'_id':'$pergunta7','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total','pergunta':'7'}},  
                ],
                'pergunta8_sFiltro':[{'$group':{'_id':'$pergunta8','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total','pergunta':'8'}},  
                ],
                'pergunta9_sFiltro':[{'$group':{'_id':'$pergunta9','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total','pergunta':'9'}},  
                ],

                //bloco com filtro por setor
                'pergunta1_filtroS':[{'$match': {'setor':filtroSetor}},{'$group':{'_id':'$pergunta1','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total'}},  
                ],
                'pergunta2_filtroS':[{'$match': {'setor':filtroSetor}},{'$group':{'_id':'$pergunta2','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total'}},  
                ],
                'pergunta3_filtroS':[{'$match': {'setor':filtroSetor}},{'$group':{'_id':'$pergunta1','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total'}},  
                ],
                'pergunta4_filtroS':[{'$match': {'setor':filtroSetor}},{'$group':{'_id':'$pergunta1','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total'}},  
                ],
                'pergunta5_filtroS':[{'$match': {'setor':filtroSetor}},{'$group':{'_id':'$pergunta1','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total'}},  
                ],
                'pergunta6_filtroS':[{'$match': {'setor':filtroSetor}},{'$group':{'_id':'$pergunta1','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total'}},  
                ],
                'pergunta7_filtroS':[{'$match': {'setor':filtroSetor}},{'$group':{'_id':'$pergunta1','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total'}},  
                ],
                'pergunta8_filtroS':[{'$match': {'setor':filtroSetor}},{'$group':{'_id':'$pergunta1','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total'}},  
                ],
                'pergunta9_filtroS':[{'$match': {'setor':filtroSetor}},{'$group':{'_id':'$pergunta1','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total'}},  
                ],

                //bloco com filtro por turno
                'pergunta1_filtroT':[{'$match': {'setor':filtroSetor}},{'$group':{'_id':'$pergunta1','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total'}},  
                ],
                'pergunta2_filtroT':[{'$match': {'setor':filtroSetor}},{'$group':{'_id':'$pergunta2','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total'}},  
                ],
                'pergunta3_filtroT':[{'$match': {'setor':filtroSetor}},{'$group':{'_id':'$pergunta1','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total'}},  
                ],
                'pergunta4_filtroT':[{'$match': {'setor':filtroSetor}},{'$group':{'_id':'$pergunta1','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total'}},  
                ],
                'pergunta5_filtroT':[{'$match': {'setor':filtroSetor}},{'$group':{'_id':'$pergunta1','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total'}},  
                ],
                'pergunta6_filtroT':[{'$match': {'setor':filtroSetor}},{'$group':{'_id':'$pergunta1','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total'}},  
                ],
                'pergunta7_filtroT':[{'$match': {'setor':filtroSetor}},{'$group':{'_id':'$pergunta1','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total'}},  
                ],
                'pergunta8_filtroT':[{'$match': {'setor':filtroSetor}},{'$group':{'_id':'$pergunta1','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total'}},  
                ],
                'pergunta9_filtroT':[{'$match': {'setor':filtroSetor}},{'$group':{'_id':'$pergunta1','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total'}},  
                ],

                //bloco com filtro por setor e turno
                'pergunta1_filtroST':[{'$match': {'setor':filtroSetor,'turno':filtroTurno}},{'$group':{'_id':'$pergunta1','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total'}},  
                ],
                'pergunta2_filtroST':[{'$match': {'setor':filtroSetor,'turno':filtroTurno}},{'$group':{'_id':'$pergunta2','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total'}},  
                ],
                'pergunta3_filtroST':[{'$match': {'setor':filtroSetor,'turno':filtroTurno}},{'$group':{'_id':'$pergunta1','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total'}},  
                ],
                'pergunta4_filtroST':[{'$match': {'setor':filtroSetor,'turno':filtroTurno}},{'$group':{'_id':'$pergunta1','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total'}},  
                ],
                'pergunta5_filtroST':[{'$match': {'setor':filtroSetor,'turno':filtroTurno}},{'$group':{'_id':'$pergunta1','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total'}},  
                ],
                'pergunta6_filtroST':[{'$match': {'setor':filtroSetor,'turno':filtroTurno}},{'$group':{'_id':'$pergunta1','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total'}},  
                ],
                'pergunta7_filtroST':[{'$match': {'setor':filtroSetor,'turno':filtroTurno}},{'$group':{'_id':'$pergunta1','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total'}},  
                ],
                'pergunta8_filtroST':[{'$match': {'setor':filtroSetor,'turno':filtroTurno}},{'$group':{'_id':'$pergunta1','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total'}},  
                ],
                'pergunta9_filtroST':[{'$match': {'setor':filtroSetor,'turno':filtroTurno}},{'$group':{'_id':'$pergunta1','total': {'$sum': 1}}},{'$project': {'_id':0,'resposta':'$_id','total':'$total'}},  
                ],

            }
        },
        {'$project': {
                'pergunta1_sFiltro': {
                    'pergunta':'$pergunta1_sFiltro'
                },
                'pergunta2_sFiltro': {
                    'pergunta':'$pergunta2_sFiltro'
                },
                'pergunta3_sFiltro': {
                    'pergunta':'$pergunta3_sFiltro'
                },
                'pergunta4_sFiltro': {
                    'pergunta':'$pergunta4_sFiltro'
                },
                'pergunta5_sFiltro': {
                    'pergunta':'$pergunta5_sFiltro'
                },
                'pergunta6_sFiltro': {
                    'pergunta':'$pergunta6_sFiltro'
                },
                'pergunta7_sFiltro': {
                    'pergunta':'$pergunta7_sFiltro'
                },
                'pergunta8_sFiltro': {
                    'pergunta':'$pergunta8_sFiltro'
                },
                'pergunta9_sFiltro': {
                    'pergunta':'$pergunta9_sFiltro'
                },
                'pergunta1_filtroS': {
                    'pergunta':'$pergunta1_filtroS'
                },
                'pergunta2_filtroS': {
                    'pergunta':'$pergunta2_filtroS'
                },
                'pergunta3_filtroS': {
                    'pergunta':'$pergunta3_filtroS'
                },
                'pergunta4_filtroS': {
                    'pergunta':'$pergunta4_filtroS'
                },
                'pergunta5_filtroS': {
                    'pergunta':'$pergunta5_filtroS'
                },
                'pergunta6_filtroS': {
                    'pergunta':'$pergunta6_filtroS'
                },
                'pergunta7_filtroS': {
                    'pergunta':'$pergunta7_filtroS'
                },
                'pergunta8_filtroS': {
                    'pergunta':'$pergunta8_filtroS'
                },
                'pergunta9_filtroS': {
                    'pergunta':'$pergunta9_filtroS'
                },
                'pergunta1_filtroT': {
                    'pergunta':'$pergunta1_filtroT'
                },
                'pergunta2_filtroT': {
                    'pergunta':'$pergunta2_filtroT'
                },
                'pergunta3_filtroT': {
                    'pergunta':'$pergunta3_filtroT'
                },
                'pergunta4_filtroT': {
                    'pergunta':'$pergunta4_filtroT'
                },
                'pergunta5_filtroT': {
                    'pergunta':'$pergunta5_filtroT'
                },
                'pergunta6_filtroT': {
                    'pergunta':'$pergunta6_filtroT'
                },
                'pergunta7_filtroT': {
                    'pergunta':'$pergunta7_filtroT'
                },
                'pergunta8_filtroT': {
                    'pergunta':'$pergunta8_filtroT'
                },
                'pergunta9_filtroT': {
                    'pergunta':'$pergunta9_filtroT'
                },
                'pergunta1_filtroST': {
                    'pergunta':'$pergunta1_filtroST'
                },
                'pergunta2_filtroST': {
                    'pergunta':'$pergunta2_filtroST'
                },
                'pergunta3_filtroST': {
                    'pergunta':'$pergunta3_filtroST'
                },
                'pergunta4_filtroST': {
                    'pergunta':'$pergunta4_filtroST'
                },
                'pergunta5_filtroST': {
                    'pergunta':'$pergunta5_filtroST'
                },
                'pergunta6_filtroST': {
                    'pergunta':'$pergunta6_filtroST'
                },
                'pergunta7_filtroST': {
                    'pergunta':'$pergunta7_filtroST'
                },
                'pergunta8_filtroST': {
                    'pergunta':'$pergunta8_filtroST'
                },
                'pergunta9_filtroST': {
                    'pergunta':'$pergunta9_filtroST'
                },
                'semFiltro': {
                    '$setUnion':['$pergunta1_sFiltro','$pergunta2_sFiltro','$pergunta3_sFiltro','$pergunta4_sFiltro','$pergunta5_sFiltro','$pergunta6_sFiltro','$pergunta7_sFiltro','$pergunta8_sFiltro','$pergunta9_sFiltro']
                },
                'comFiltroSetor': {
                    '$setUnion':['$pergunta1_filtroS','$pergunta2_filtroS','$pergunta3_filtroS','$pergunta4_filtroS','$pergunta5_filtroS','$pergunta6_filtroS','$pergunta7_filtroS','$pergunta8_filtroS','$pergunta9_filtroS']
                },
                'comFiltroTurno': {
                    '$setUnion':['$pergunta1_filtroT','$pergunta2_filtroT','$pergunta3_filtroT','$pergunta4_filtroT','$pergunta5_filtroT','$pergunta6_filtroT','$pergunta7_filtroT','$pergunta8_filtroT','$pergunta9_filtroT']
                },
                'comFiltroSetorTurno': {
                    '$setUnion':['$pergunta1_filtroST','$pergunta2_filtroST','$pergunta3_filtroST','$pergunta4_filtroST','$pergunta5_filtroST','$pergunta6_filtroST','$pergunta7_filtroST','$pergunta8_filtroST','$pergunta9_filtroST']
                }
            }
        }
    ]).toArray((err, results) => {
        if (err) return console.log(err)
        
        var resume = {}
        var titulo = '';

        if (filtroSetor == '' && filtroPergunta == '' && filtroTurno == '') {
            data = results[0].semFiltro
            titulo = 'Avaliação geral das perguntas'
        }
        if (filtroSetor != '' && filtroPergunta == '' && filtroTurno == '') {
            data = results[0].comFiltroSetor
            titulo = 'Avaliação das perguntas filtradas por setor'
        }
        if (filtroSetor != '' && filtroPergunta == '' && filtroTurno != '') {
            data = results[0].comFiltroSetorTurno
            titulo = 'Avaliação das perguntas filtradas por setor e turno'
        }

        if (filtroSetor == '' && filtroPergunta != '' && filtroTurno == '') {
            switch(filtroPergunta) {
                case 'pergunta1':
                    data = results[0].pergunta1_sFiltro[0].pergunta
                    titulo = 'Avaliações da pergunta 1'
                    break;

                case 'pergunta2':
                    data = results[0].pergunta2_sFiltro[0].pergunta
                    titulo = 'Avaliações da pergunta 2'
                    break

                case 'pergunta3':
                    data = results[0].pergunta3_sFiltro[0].pergunta
                    titulo = 'Avaliações da pergunta 3'
                    break;

                case 'pergunta4':
                    data = results[0].pergunta4_sFiltro[0].pergunta
                    titulo = 'Avaliações da pergunta 4'
                    break;

                case 'pergunta5':
                    data = results[0].pergunta5_sFiltro[0].pergunta
                    titulo = 'Avaliações da pergunta 5'
                    break;
                    
                case 'pergunta6':
                    data = results[0].pergunta6_sFiltro[0].pergunta
                    titulo = 'Avaliações da pergunta 6'
                    break;

                case 'pergunta7':
                    data = results[0].pergunta7_sFiltro[0].pergunta
                    titulo = 'Avaliações da pergunta 7'
                    break;

                case 'pergunta8':
                    data = results[0].pergunta8_sFiltro[0].pergunta
                    titulo = 'Avaliações da pergunta 8'
                    break;

                case 'pergunta9':
                    data = results[0].pergunta9_sFiltro[0].pergunta
                    titulo = 'Avaliações da pergunta 9'
                    break;
            }
        }

        if (filtroSetor == '' && filtroPergunta != '' && filtroTurno != '') {
            switch(filtroPergunta) {
                case 'pergunta1':
                    data = results[0].pergunta1_filtroT[0].pergunta
                    titulo = 'Avaliações da pergunta 1 filtrado por turno'
                    break;

                case 'pergunta2':
                    data = results[0].pergunta2_filtroT[0].pergunta
                    titulo = 'Avaliações da pergunta 2 filtrado por turno'
                    break

                case 'pergunta3':
                    data = results[0].pergunta3_filtroT[0].pergunta
                    titulo = 'Avaliações da pergunta 3 filtrado por turno'
                    break;

                case 'pergunta4':
                    data = results[0].pergunta4_filtroT[0].pergunta
                    titulo = 'Avaliações da pergunta 4 filtrado por turno'
                    break;

                case 'pergunta5':
                    data = results[0].pergunta5_filtroT[0].pergunta
                    titulo = 'Avaliações da pergunta 5 filtrado por turno'
                    break;
                    
                case 'pergunta6':
                    data = results[0].pergunta6_filtroT[0].pergunta
                    titulo = 'Avaliações da pergunta 6 filtrado por turno'
                    break;

                case 'pergunta7':
                    data = results[0].pergunta7_filtroT[0].pergunta
                    titulo = 'Avaliações da pergunta 7 filtrado por turno'
                    break;

                case 'pergunta8':
                    data = results[0].pergunta8_filtroT[0].pergunta
                    titulo = 'Avaliações da pergunta 8 filtrado por turno'
                    break;

                case 'pergunta9':
                    data = results[0].pergunta9_filtroT[0].pergunta
                    titulo = 'Avaliações da pergunta 9 filtrado por turno'
                    break;
            }
        }
        
        if (filtroSetor != '' && filtroPergunta != '' && filtroTurno == '') {
            switch(filtroPergunta) {
                case 'pergunta1':
                    data = results[0].pergunta1_filtroS[0].pergunta
                    titulo = 'Avaliações da pergunta 1 filtrado por setor'
                    break;

                case 'pergunta2':
                    data = results[0].pergunta2_filtroS[0].pergunta
                    titulo = 'Avaliações da pergunta 2 filtrado por setor'
                    break

                case 'pergunta3':
                    data = results[0].pergunta3_filtroS[0].pergunta
                    titulo = 'Avaliações da pergunta 3 filtrado por setor'
                    break;

                case 'pergunta4':
                    data = results[0].pergunta4_filtroS[0].pergunta
                    titulo = 'Avaliações da pergunta 4 filtrado por setor'
                    break;

                case 'pergunta5':
                    data = results[0].pergunta5_filtroS[0].pergunta
                    titulo = 'Avaliações da pergunta 5 filtrado por setor'
                    break;
                    
                case 'pergunta6':
                    data = results[0].pergunta6_filtroS[0].pergunta
                    titulo = 'Avaliações da pergunta 6 filtrado por setor'
                    break;

                case 'pergunta7':
                    data = results[0].pergunta7_filtroS[0].pergunta
                    titulo = 'Avaliações da pergunta 7 filtrado por setor'
                    break;

                case 'pergunta8':
                    data = results[0].pergunta8_filtroS[0].pergunta
                    titulo = 'Avaliações da pergunta 8 filtrado por setor'
                    break;

                case 'pergunta9':
                    data = results[0].pergunta9_filtroS[0].pergunta
                    titulo = 'Avaliações da pergunta 9 filtrado por setor'
                    break;
            }
        }

        if (filtroSetor != '' && filtroPergunta != '' && filtroTurno != '') {
            switch(filtroPergunta) {
                case 'pergunta1':
                    data = results[0].pergunta1_filtroST[0].pergunta
                    titulo = 'Avaliações da pergunta 1 filtrado por setor e turno'
                    break;

                case 'pergunta2':
                    data = results[0].pergunta2_filtroST[0].pergunta
                    titulo = 'Avaliações da pergunta 2 filtrado por setor e turno'
                    break

                case 'pergunta3':
                    data = results[0].pergunta3_filtroST[0].pergunta
                    titulo = 'Avaliações da pergunta 3 filtrado por setor e turno'
                    break;

                case 'pergunta4':
                    data = results[0].pergunta4_filtroST[0].pergunta
                    titulo = 'Avaliações da pergunta 4 filtrado por setor e turno'
                    break;

                case 'pergunta5':
                    data = results[0].pergunta5_filtroST[0].pergunta
                    titulo = 'Avaliações da pergunta 5 filtrado por setor e turno'
                    break;
                    
                case 'pergunta6':
                    data = results[0].pergunta6_filtroST[0].pergunta
                    titulo = 'Avaliações da pergunta 6 filtrado por setor e turno'
                    break;

                case 'pergunta7':
                    data = results[0].pergunta7_filtroST[0].pergunta
                    titulo = 'Avaliações da pergunta 7 filtrado por setor e turno'
                    break;

                case 'pergunta8':
                    data = results[0].pergunta8_filtroST[0].pergunta
                    titulo = 'Avaliações da pergunta 8 filtrado por setor e turno'
                    break;

                case 'pergunta9':
                    data = results[0].pergunta9_filtroST[0].pergunta
                    titulo = 'Avaliações da pergunta 9 filtrado por setor e turno'
                    break;
            }
        }
 
 
        for (key in data) {
            if (typeof resume['pergunta'+data[key]['pergunta']] == 'undefined')  resume['pergunta'+data[key]['pergunta']] = {}
            resume['pergunta'+data[key]['pergunta']]['resposta'+data[key]['resposta']] = data[key]['total']

            if (typeof resume['resposta'+data[key]['resposta']] == 'undefined')  resume['resposta'+data[key]['resposta']] = 0
            resume['resposta'+data[key]['resposta']] = resume['resposta'+data[key]['resposta']] + data[key]['total']
        }

        res.send(`
            <!doctype html>
            <html>
            
            <head>
                <title>Cadastro de avaliações</title>
                <meta charset="utf-8">
                <link rel="stylesheet" href="estilos.css">
                <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css"
                    integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
                <link href="https://fonts.googleapis.com/css?family=Roboto+Slab|Bahianita|Lato|Roboto+Slab&display=swap"
                    rel="stylesheet">
                <script src="https://cdn.jsdelivr.net/npm/chart.js@2.8.0"></script>
            </head>
            
            <body>
                <main id="graficos">
                    <h1> Listagem em gráficos </h1>
                    <img src="406dbd6cff60e9a624845c11ff232c8cd00f5e52.jpg">
                    
                    <span class="title">
                        <h2> ${titulo} </h2>
                    </span>
                    <div class="grafico-container">
                        <canvas id="grafico">
                            
                        </canvas>
                    </div>
                </main>
            
                <script>
                    Chart.defaults.global.defaultFontFamily = 'Roboto Slab';
                    let meuGrafico = document.getElementById('grafico').getContext('2d')  
                    let grafico = new Chart(meuGrafico, {
                        type:'pie',
                        data:{
                            labels: ['Muito bom','Bom','Regular','Ruim','Muito ruim'],
                            datasets: [{
                                label:'Avaliações',
                                data:[
                                    ${resume.resposta1},
                                    ${resume.resposta2},
                                    ${resume.resposta3},
                                    ${resume.resposta4},
                                    ${resume.resposta5}
                                ],
                                backgroundColor: [
                                    'rgba(52, 152, 219,1.0)',
                                    'rgba(155, 89, 182,1.0)',
                                    'rgba(192, 57, 43,1.0)',
                                    'rgba(241, 196, 15,1.0)',
                                    'rgba(211, 84, 0,1.0)'
                                ]
                            }],
                        },
                        options:{
                            responsive:true,
                            maintainAspectRatio: true,
                            legend: {
                                display: true,
                                position: "bottom",
                                boxWidth: 60
                            }
                        }
                    })  
                </script>   
            </body>
            
            </html>
            `)

    })

})

app.set('view engine', 'ejs')
app.use(express.static('src'));
app.use(express.static('src/img'));