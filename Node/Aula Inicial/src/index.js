const express = require('express')
const axios = require('axios')
//FAKE DATABASE
let graduations = []
//CRIAR O APP
const app = express()

app.use(express.json());

//Create
app.post('/graduation', (req, res) => {
    const { id, name, end_year, classe } = req.body;
    const graduation = { id, name, end_year, classe};
    graduations.push(graduation)
    return res.status(201).json(graduation);
});

//List
app.get('/graduations', (req, res) => {


    const allGraduations = graduations;


    return res.status(200).json(allGraduations)
})

//Find
app.get('/graduation/:graduation_id', (req, res) => {
    const { graduation_id } = req.params;
    const graduation = graduations.find( (graduation) => graduation.id == graduation_id );
    if(!graduation) res.status(404).json("Not Found");
    return res.status(200).json(graduation);
});

//Delete
app.delete('/graduation/:graduation_id', (req, res) => {
    const { graduation_id } = req.params;
    const filteredGraduation = graduations.filter( (graduation) => graduation.id !== graduation_id );
    graduations = filteredGraduation;
    return res.status(204).json("deleted");
});

app.patch('/graduation/:graduation_id', (req, res) => {
    const {name, end_year, classe } = req.body;
    const { graduation_id } = req.params;
    const graduation = graduations.find( (graduation) => graduation.id == graduation_id );
    console.log(graduation);
    graduation.id = graduation.id;
    graduation.name = name ? name : graduation.name;
    graduation.end_year = end_year ? end_year : graduation.end_year;
    graduation.classe = classe ? classe : graduation.classe
    return res.status(200).json(graduation)
});

//Pokemon
app.get('/pokemons', (req, res) => {
   
    axios.get('https://pokeapi.co/api/v2').then(resp => {

    console.log(resp.data);

    return res.status(200).json(resp.data);
    })
})

//geonameId Brasil = 3469034

app.get('/estados', (req, res) => {

    axios.get('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then( resp => {

        const estados = resp.data

        return res.status(200).json(estados);
    })

})

app.get('/cidades/:uf_id', (req, res) => {

    const uf_id = req.params.uf_id;

    const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/'+uf_id+'/municipios/'

    console.log(uf_id)

    axios.get(url).then( resp => {

    const cidades = resp.data

    return res.status(200).json(cidades)

    })
});

//Start Server 

app.listen(3333, () => console.log('server is running'))

