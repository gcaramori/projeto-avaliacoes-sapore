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

        db = client.db('testes')

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
        if (req.originalUrl.split('?')[1] == 'setor=&turno=') {
            db.collection('avaliacoes').find({}, {
                projection: {
                    'pergunta1': 1,
                    'pergunta2': 1,
                    'pergunta3': 1,
                    'pergunta4': 1,
                    'pergunta5': 1,
                    'pergunta6': 1,
                    'pergunta7': 1,
                    'pergunta8': 1,
                    'pergunta9': 1
                }
            }).toArray((err, results) => {
                if (err) return console.log(err)
                var array = []
                var total1 = 0;
                var total2 = 0;
                var total3 = 0;
                var total4 = 0;
                var total5 = 0;

                results.forEach(data => {
                    array.push(data.pergunta1)
                    array.push(data.pergunta2)
                    array.push(data.pergunta3)
                    array.push(data.pergunta4)
                    array.push(data.pergunta5)
                    array.push(data.pergunta6)
                    array.push(data.pergunta7)
                    array.push(data.pergunta8)
                    array.push(data.pergunta9)
                })

                array.forEach(pergunta => {
                    switch (pergunta) {
                        case '1':
                            total1++;
                            break;

                        case '2':
                            total2++;
                            break;
                        case '3':
                            total3++;
                            break;
                        case '4':
                            total4++;
                            break;
                        case '5':
                            total5++;
                            break;
                    }
                })

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
                            <h2> Avaliação geral das perguntas </h2>
                        </span>

                        <canvas id="grafico">
                            
                        </canvas>
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
                                        ${total1},
                                        ${total2},
                                        ${total3},
                                        ${total4},
                                        ${total5}
                                    ],
                                    backgroundColor: [
                                        'rgba(52, 152, 219,1.0)',
                                        'rgba(155, 89, 182,1.0)',
                                        'rgba(192, 57, 43,1.0)'
                                    ]
                                }],
                            },
                            options:{
                            }
                        })  
                    </script>   
                </body>
                
                </html>
                `)
                // res.render('show.ejs', {
                //     data,
                // })

            })
        }
    })

    app.set('view engine', 'ejs')
    app.use(express.static('src'));
    app.use(express.static('src/img'));