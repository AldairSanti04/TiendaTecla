let chai = require('chai');
let chaiHttp = require('chai-http');
const expect = require('chai').expect;

chai.use(chaiHttp);
const url= 'http://localhost:3000';

describe('Testeado el endpoint de CRUD usuarios: ',()=>{

    describe('Testeado CREAR usuario:',()=>{
        it('Deberia obtener un ok', (done) => {
            chai.request(url)
                .get('/create')
                .end( function(err,res){
                    console.log(res.body)
                    expect(res).to.have.status(200);
                    done();
                });
        });
    
    });
    
    describe.only('Testeado GUARDAR usuario: ',()=>{
        it('Deberia insertar un nuevo usuario', (done) => {
            chai.request(url)
                .post('/save')
                .send({id:4, nombres: "josue", apellidos: "soto", email: "sue@gmail.com", usuario:"jo", pass:"123", tipo_usuario:1})
                .end( function(err,res){
                    console.log(res.body)
                    expect(res).to.have.status(200);
                    done();
                });
        });
        it('Deberia recibir un error', (done) => {
            chai.request(url)
                .post('/save')
                .send({id:1, 
                    nombres: "josue", 
                    apellidos: "Soto", 
                    email: "sue@gmail.com", 
                    usuario:"josu", 
                    pass:"123", 
                    tipo_usuario:1 
                })
                .end( function(err,res){
                    console.log(res.body)
                    expect(res).to.have.status(500);
                    done();
                });
        });
    });

    describe.only('Obtener todos los usuarios: ',()=>{
        it('Deberia obtener todos los usuarios', (done) => {
            chai.request(url)
                .get('/')
                .end( function(err,res){
                    console.log(res.body)
                    expect(res).to.have.status(200);
                    done();
                });
        });
    
    });

    // describe('Testeando BUSCAR usuario para poderlo modificar: ',()=>{
    //     it('dberia obtener el usuario con el id 1', (done) => {
    //         chai.request(url)
    //             .get('/edit/1')
    //             .end( function(err,res){
    //                 console.log(res.body)
    //                 expect(res.body).to.have.property('id').to.be.equal(1);
    //                 expect(res).to.have.status(200);
    //                 done();
    //             });
    //     });
    
    // });

    // describe('Testeado ACTUALIZAR usuario: ',()=>{
    //     it('Deberia actualizar un nuevo usuario', (done) => {
    //         chai.request(url)
    //             .post('/update')
    //             // .type('form')
    //             .send({id:1, nombres: "aldair", apellidos: "rufino", email: "alda@gmail.com", usuario:"alda", pass:"123", tipo_usuario:2})
    //             .end( function(err,res){
    //                 console.log(res.body)
    //                 expect(res).to.have.status(200);
    //                 done();
    //             });
    //     });
    //     it('Deberia recibir un error', (done) => {
    //         chai.request(url)
    //             .post('/update')
    //             .send({id:1, nombres: "aldair", apellidos: "rufino", email: "alda@gmail.com", usuario:"josu", pass:"123", tipo_usuario:2})
    //             .end( function(err,res){
    //                 console.log(res.body)
    //                 expect(res).to.have.status(500);
    //                 done();
    //             });
    //     });
    // });

    // describe('Testeado ELIMINA usuario: ',()=>{

    //     it('Deberia eliminar al usuario con el id 1', (done) => {
    //         chai.request(url)
    //             .get('/')
    //             .end( function(err,res){
    //                 console.log(res.body)
    //                 expect(res.body).to.have.lengthOf(2);
    //                 expect(res).to.have.status(200);
    //                 chai.request(url)
    //                     .del('/delete/1')
    //                     .end( function(err,res){
    //                         console.log(res.body)
    //                         expect(res).to.have.status(200);
    //                         chai.request(url)
    //                             .get('/')
    //                             .end( function(err,res){
    //                                 console.log(res.body)
    //                                 expect(res.body).to.have.lengthOf(1);
    //                                 expect(res.body[0]).to.have.property('id').to.be.equal(0);
    //                                 expect(res).to.have.status(200);
    //                                 done();
    //                         });
    //                     });
    //             });
    //     });
    
    // });

    

});