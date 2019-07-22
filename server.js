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
    var sep = req.originalUrl.split('?');
    var valueSetor = '';
    var valueTurno = '';
    var match = {'$match': {
        '$and' : [                            
            ]
        }                    
    };
    var group = {'$group' : {
        '_id' : [],
        'total' : {'$sum' : 1}
        }   
    };

    if (sep.length > 1) {
        var dois = sep[1].split('&');

        var setorTmp = dois[0].split('=');

        if (setorTmp.length>1) valueSetor = setorTmp[1];
    
        var turnoTmp = dois[1].split('=');

        if (turnoTmp.length>1) valueTurno = turnoTmp[1];

        var perguntaTmp = dois[2].split('=');

        if (perguntaTmp.length>1) valuePergunta = perguntaTmp[1];

        if (valueSetor.length > 0) {
            match.$match.$and.push({'setor':valueSetor});
        }
        if (valueTurno.length > 0) {
            match.$match.$and.push({'turno':valueTurno});
        }

        if (valuePergunta.length > 0) {
            group.$_id.push({'_id':'$pergunta' + valuePergunta});
        }

    }
    
        db.collection('avaliacoes').aggregate([           
        {'$project' : {
                '_id':0,
                'pergunta1':'$_id',
                'total':'$total'
            }
        }
        ]).toArray((err, results) => {
            if (err) return console.log(err)
            console.log(results)
            
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
})

app.set('view engine', 'ejs')
app.use(express.static('src'));
app.use(express.static('src/img'));