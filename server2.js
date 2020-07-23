MATERIA = 'quimica'
NUM_PAGINAS = 613
TABELA = 'quimica2'


// const http = require('http')
// const PORT = 3000

/// DB
const Sequelize = require("sequelize")
const sequelize = new Sequelize('questoes', 'root', 'MyDB#627#363', {
    host: "localhost",
    dialect: "mysql"
}) //banco, usuario, senha, objeto-json

sequelize.authenticate().then(function() {
    console.log("Deu pa conectar com o banco de dados, irruuu")
}).catch(function(error) {
    console.log("Deu pa conectar nao:", error)
})

/// creating the Quimica Table Model
const Tabela = sequelize.define(TABELA, {
    id_questao: {
        type: Sequelize.INTEGER,
        primaryKey: true,
    },
    pagina: {
        type: Sequelize.INTEGER
    },
    ano: {
        type: Sequelize.STRING
    },
    tipo: {
        type: Sequelize.STRING
    },
    vestibular: {
        type: Sequelize.STRING
    },
    assunto: {
        type: Sequelize.STRING
    },
    subAssunto: {
        type: Sequelize.STRING
    },
    enunciado: {
        type: Sequelize.TEXT
    },
    enunciadoCorrigido: {
        type: Sequelize.TEXT
    },
    alternativas: {
        type: Sequelize.TEXT
    },
    resposta: {
        type: Sequelize.TEXT
    },
    imagens: {
        type: Sequelize.TEXT
    },
    nImagens: {
        type: Sequelize.INTEGER
    },
    classificada: {
        type: Sequelize.INTEGER
    },
    temSubAssunto: {
        type: Sequelize.INTEGER
    },
},
{
    freezeTableName: true // Model tableName will be the same as the model name
})

//////////////////////////////////////////////////////////////// MICHEL CORRIGE FUNCTION


// corrige = (enunciado,resposta,vestibular,assunto,subAssunto)=>{
//     // [A] || Alternativa C.|| (A) resposta...||A.|| A 
//     let isAlternativa = true;
//     let enunciadoCorrigido;
//     let respostaCorrigida;
//     let vestibularCorrigido;
//     let a,b,c,d,e;
//     let aIndex,bIndex,cIndex,dIndex, eIndex;
//     let AIndex,BIndex,CIndex,DIndex,EIndex;
//     let hifenIndex;
//     let dimResposta
//     let tipo;
//     hifenIndex = vestibular.lastIndexOf('-');
//     if(hifenIndex!=-1){
//         vestibularCorrigido = vestibular.substring(0,hifenIndex);
//         ano= vestibular.substring(1+hifenIndex);
//     }
//     else{
//         vestibularCorrigido="";
//         ano="";
//     }
    
//     resposta = resposta.trim();
//     dimResposta = resposta.length;
//     if(dimResposta>=16){
//         isAlternativa = false;
//         respostaCorrigida = resposta;
//         enunciadoCorrigido = enunciado;       
//     }
//     else if (resposta.match(/[[A]]/)||resposta.match(/Alternativa A./)||resposta.match(/A./)){
//         respostaCorrigida = 'A';
//     }
//     else if(resposta.match(/[[B]]/)||resposta.match(/Alternativa B./)||resposta.match(/B./)){
//         respostaCorrigida = 'B';
//     }
//     else if(resposta.match(/[[C]]/)||resposta.match(/Alternativa C./)||resposta.match(/C./)){
//         respostaCorrigida = 'C';
//     }
//     else if(resposta.match(/[[D]]/)||resposta.match(/Alternativa D./)||resposta.match(/D./)){
//         respostaCorrigida = 'D';
//     }
//     else if(resposta.match(/[[E]]/)||resposta.match(/Alternativa E./)||resposta.match(/E./)){
//         respostaCorrigida = 'E';
//     }
//     else{
//         isAlternativa = false;
//         respostaCorrigida = resposta;
//         enunciadoCorrigido = enunciado;
//     }
//     if(isAlternativa){

            
//             aIndex=enunciado.lastIndexOf("a)");
//             bIndex=enunciado.lastIndexOf("b)");
//             cIndex=enunciado.lastIndexOf("c)");
//             dIndex=enunciado.lastIndexOf("d)");
//             eIndex=enunciado.lastIndexOf("e)");
//             AIndex = enunciado.lastIndexOf("(A)");
//             BIndex = enunciado.lastIndexOf("(B)");
//             CIndex = enunciado.lastIndexOf("(C)");
//             DIndex = enunciado.lastIndexOf("(D)");
//             EIndex = enunciado.lastIndexOf("(E)");
//             if(aIndex!=-1&&bIndex!=-1&&cIndex!=-1&&dIndex!=-1&&eIndex!=-1&&(eIndex>dIndex&&dIndex>cIndex&&cIndex>bIndex&&bIndex>aIndex)){
//                 enunciadoCorrigido = enunciado.substring(0,aIndex);
//                 a=enunciado.substring(aIndex+2,bIndex).trim();
//                 b=enunciado.substring(bIndex+2,cIndex).trim();
//                 c=enunciado.substring(cIndex+2,dIndex).trim();
//                 d=enunciado.substring(dIndex+2,eIndex).trim();
//                 e=enunciado.substring(eIndex+2).trim();
//             }
//             else if(AIndex!=-1&&BIndex!=-1&&CIndex!=-1&&DIndex!=-1&&EIndex!=-1){
//                 enunciadoCorrigido = enunciado.substring(0,AIndex);
//                 a=enunciado.substring(AIndex+3,BIndex).trim();
//                 b=enunciado.substring(BIndex+3,CIndex).trim();
//                 c=enunciado.substring(CIndex+3,DIndex).trim();
//                 d=enunciado.substring(DIndex+3,EIndex).trim();
//                 e=enunciado.substring(EIndex+3).trim();
//             }
//             else{
//                 enunciadoCorrigido = enunciado;
//                 respostaCorrigida = resposta;
//             }
//         console.log('assunto:'+assunto);
//         console.log('subAssunto:'+subAssunto);
//         console.log('ano:' + ano);
//         console.log('vestibular:'+vestibularCorrigido);
//         console.log('q:' + enunciadoCorrigido)
//         console.log('a:' + a);
//         console.log('b:' + b);
//         console.log('c:' + c);
//         console.log('d:' + d);
//         console.log('e:' + e);
//         console.log('r:' + respostaCorrigida);
//         tipo = 'alternativa';
//         //TODO criar lista aqui; Aqui a questão é alternativa
//         return {
//             assunto:assunto,
//             subAssunto: subAssunto,
//             ano: ano,
//             vestibular: vestibularCorrigido,
//             enunciadoCorrigido: enunciadoCorrigido,
//             resposta: respostaCorrigida,
//             alternativas: JSON.stringify([a, b, c, d, e]),
//             tipo: tipo
//         }

//     }
//     else{
//         console.log('assunto:'+assunto);
//         console.log('subAssunto:'+subAssunto);
//         console.log('ano:' + ano);
//         console.log('vestibular:'+vestibularCorrigido);
//         console.log('q:' + enunciadoCorrigido) 
//         console.log('r:' + respostaCorrigida)
//         tipo='dissertativa';
//         // TODO aqui a questão não se enquadrou na captura de alternativa
//         return {
//             assunto: assunto,
//             subAssunto: subAssunto,
//             ano: ano,
//             vestibular: vestibularCorrigido,
//             enunciadoCorrigido: enunciadoCorrigido,
//             resposta: respostaCorrigida,
//             alternativas: "",
//             tipo: tipo
//         }
//     }
        
// }



////////////////////////////////////////////////////////////////
const sleep = (delay)=> new Promise ((resolve)=>setTimeout(resolve,delay));

// this way of working with axios is the recomended, because the promise way is still in level three of formal acceptance
const axios = require('axios')
//const { get } = require("request")
async function getQuestions() {
    var errorArray = []
    let i = 1
    while (i <= NUM_PAGINAS) {
        await sleep(1000);
        url = `http://professor.bio.br/${MATERIA}/lista.all.asp?curpage=${i}`
        try {
            const response = await axios.request( /// changed from `get` to `request`
                ////`http://professor.bio.br/quimica/lista.all.asp?curpage=${i}`
            {
                method: "GET",
                url: url,
                responseType:'arraybuffer',
                responseEncoding:'binary',
            })
            const cheerio = require('cheerio')
            const $ = cheerio.load(response.data.toString('latin1'))
            
            ROOT_SELECTOR_QUIMICA = "body > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(8) > td > table > tbody > "

            for (var n = 1; n <= 15; n++) {
                await sleep(100);
                selectorQuestion = ROOT_SELECTOR_QUIMICA + `tr:nth-child(${n + 1}) > `

                id_questao = ( 15*(i-1) + n )
                pagina = i
                vestibular = $(selectorQuestion + "td:nth-child(1) > font:nth-child(1) > a").text()
                assunto = $(selectorQuestion + "td:nth-child(1) > font:nth-child(1)").text()
                subAssunto = $(selectorQuestion + "td:nth-child(1) > font:nth-child(3)").text()
                enunciadoEResposta = $(selectorQuestion + "td:nth-child(2) > font").text()
                imagens = $(selectorQuestion + "td:nth-child(2) > font > font").children('img').map(function(){
                    return $(this).attr('src')
                }).get()

                /// filtering with regular expressions
                classificada = assunto.match(/o classificada/) == null ? 1 : 0
                assunto = assunto.match(/quest(.*)es de(.*)/)[2]
                subAssunto = subAssunto.match(/sub-grupo:(.*)/)[1]
                temSubAssunto = subAssunto.length == 0 ? 0 : 1
                enunciado = enunciadoEResposta.substring(9+enunciadoEResposta.indexOf("pergunta:"),enunciadoEResposta.lastIndexOf("resposta:")).trim()
                resposta = enunciadoEResposta.substring(enunciadoEResposta.lastIndexOf("resposta:")+9).trim()
                nImagens = imagens.length
                imagensJSON = nImagens === 0 ? "" : JSON.stringify(imagens)
                
                // console.log("id: ", id)
                // console.log("vestibular: ", vestibular)
                // console.log("questao de: ", assunto)
                // console.log("sub grupo: ", subAssunto)
                // console.log("enunciado: ", enunciado)
                // console.log("resposta: ", resposta)
                // console.log("imagens: ", imagensJSON)
                // console.log("tem imagem?: ", nImagens)
                // console.log("classificada?: ", classificada)
                // console.log("tem sub grupo?: ", temSubAssunto)

                //camposCorrigidos = corrige(enunciado,resposta,vestibular,assunto,subAssunto);


                //////////////////////////////////////////////////////////////// MICHEL CORRIGE FUNCTION


//corrige = (enunciado,resposta,vestibular,assunto,subAssunto)=>{
    // [A] || Alternativa C.|| (A) resposta...||A.|| A 
    let isAlternativa = true;
    let enunciadoCorrigido;
    let respostaCorrigida;
    let vestibularCorrigido;
    let a,b,c,d,e;
    let aIndex,bIndex,cIndex,dIndex, eIndex;
    let AIndex,BIndex,CIndex,DIndex,EIndex;
    let hifenIndex;
    let dimResposta
    let tipo;
    hifenIndex = vestibular.lastIndexOf('-');
    if(hifenIndex!=-1){
        vestibularCorrigido = vestibular.substring(0,hifenIndex);
        ano = vestibular.substring(1+hifenIndex);
    }
    else {
        vestibularCorrigido = vestibular.match(/(.*)(\d\d\d\d)/) === null ? vestibular : vestibular.match(/(.*)(\d\d\d\d)/)[1] ;
        ano = vestibular.match(/(.*)(\d\d\d\d)/) === null ? "" : vestibular.match(/(.*)(\d\d\d\d)/)[2] ;
    }
    
    resposta = resposta.trim();
    dimResposta = resposta.length;
    if(dimResposta>=16){
        isAlternativa = false;
        respostaCorrigida = resposta;
        enunciadoCorrigido = enunciado;       
    }
    else if (resposta.match(/[[A]]/)||resposta.match(/Alternativa A./)||resposta.match(/A./)){
        respostaCorrigida = 'A';
    }
    else if(resposta.match(/[[B]]/)||resposta.match(/Alternativa B./)||resposta.match(/B./)){
        respostaCorrigida = 'B';
    }
    else if(resposta.match(/[[C]]/)||resposta.match(/Alternativa C./)||resposta.match(/C./)){
        respostaCorrigida = 'C';
    }
    else if(resposta.match(/[[D]]/)||resposta.match(/Alternativa D./)||resposta.match(/D./)){
        respostaCorrigida = 'D';
    }
    else if(resposta.match(/[[E]]/)||resposta.match(/Alternativa E./)||resposta.match(/E./)){
        respostaCorrigida = 'E';
    }
    else{
        isAlternativa = false;
        respostaCorrigida = resposta;
        enunciadoCorrigido = enunciado;
    }
    if(isAlternativa){

            
            aIndex=enunciado.lastIndexOf("a)");
            bIndex=enunciado.lastIndexOf("b)");
            cIndex=enunciado.lastIndexOf("c)");
            dIndex=enunciado.lastIndexOf("d)");
            eIndex=enunciado.lastIndexOf("e)");
            AIndex = enunciado.lastIndexOf("(A)");
            BIndex = enunciado.lastIndexOf("(B)");
            CIndex = enunciado.lastIndexOf("(C)");
            DIndex = enunciado.lastIndexOf("(D)");
            EIndex = enunciado.lastIndexOf("(E)");
            if(aIndex!=-1&&bIndex!=-1&&cIndex!=-1&&dIndex!=-1&&eIndex!=-1&&(eIndex>dIndex&&dIndex>cIndex&&cIndex>bIndex&&bIndex>aIndex)){
                enunciadoCorrigido = enunciado.substring(0,aIndex);
                a=enunciado.substring(aIndex+2,bIndex).trim();
                b=enunciado.substring(bIndex+2,cIndex).trim();
                c=enunciado.substring(cIndex+2,dIndex).trim();
                d=enunciado.substring(dIndex+2,eIndex).trim();
                e=enunciado.substring(eIndex+2).trim();
            }
            else if(AIndex!=-1&&BIndex!=-1&&CIndex!=-1&&DIndex!=-1&&EIndex!=-1){
                enunciadoCorrigido = enunciado.substring(0,AIndex);
                a=enunciado.substring(AIndex+3,BIndex).trim();
                b=enunciado.substring(BIndex+3,CIndex).trim();
                c=enunciado.substring(CIndex+3,DIndex).trim();
                d=enunciado.substring(DIndex+3,EIndex).trim();
                e=enunciado.substring(EIndex+3).trim();
            }
            else{
                enunciadoCorrigido = enunciado;
                respostaCorrigida = resposta;
            }
        // console.log('assunto:'+assunto);
        // console.log('subAssunto:'+subAssunto);
        // console.log('ano:' + ano);
        // console.log('vestibular:'+vestibularCorrigido);
        // console.log('q:' + enunciadoCorrigido)
        // console.log('a:' + a);
        // console.log('b:' + b);
        // console.log('c:' + c);
        // console.log('d:' + d);
        // console.log('e:' + e);
        // console.log('r:' + respostaCorrigida);
        tipo = 'alternativa';

        //TODO criar lista aqui; Aqui a questão é alternativa
        // return {
        //     assunto:assunto,
        //     subAssunto: subAssunto,
        //     ano: ano,
        //     vestibular: vestibularCorrigido,
        //     enunciadoCorrigido: enunciadoCorrigido,
        //     resposta: respostaCorrigida,
        //     alternativas: JSON.stringify([a, b, c, d, e]),
        //     tipo: tipo
        // }

        alternativas = JSON.stringify([a, b, c, d, e])

    }
    else{
        // console.log('assunto:'+assunto);
        // console.log('subAssunto:'+subAssunto);
        // console.log('ano:' + ano);
        // console.log('vestibular:'+vestibularCorrigido);
        // console.log('q:' + enunciadoCorrigido) 
        // console.log('r:' + respostaCorrigida)
        tipo='dissertativa';
        // TODO aqui a questão não se enquadrou na captura de alternativa
        // return {
            // assunto: assunto,
            // subAssunto: subAssunto,
            // ano: ano,
            // vestibular: vestibularCorrigido,
            // enunciadoCorrigido: enunciadoCorrigido,
            // resposta: respostaCorrigida,
            // alternativas: "",
            // tipo: tipo
        // }

        alternativas = ""
    }
        
//}



////////////////////////////////////////////////////////////////

                ///---Criando uma nova linha no banco `questoes` na tabela `quimica`
                Tabela.create({
                    id_questao: id_questao,
                    pagina: pagina,
                    enunciado: enunciado,
                    imagens: imagensJSON,
                    nImagens: nImagens,        
                    classificada: classificada,
                    temSubAssunto: temSubAssunto,
                    assunto: assunto,
                    subAssunto: subAssunto,
                    ano: ano,
                    vestibular: vestibularCorrigido,
                    enunciadoCorrigido: enunciadoCorrigido,
                    resposta: respostaCorrigida,
                    alternativas: alternativas,
                    tipo: tipo
                })

            }

            i++

        } catch (error) {
            // Quimica.create({
            //     id: id,
            //     enunciado: enunciado,
            //     imagens: imagensJSON,
            //     nImagens: nImagens,        
            //     classificada: classificada,
            //     temSubAssunto: temSubAssunto,
            //     assunto: assunto,
            //     subAssunto: subAssunto,
            //     ano: ano,
            //     vestibular: vestibularCorrigido,
            //     enunciadoCorrigido: enunciadoCorrigido,
            //     resposta: respostaCorrigida,
            //     alternativas: alternativas,
            //     tipo: tipo
            // })

            console.error("- deu erro na pagina: ", i, " | erro: ", error.response.status, error.response.statusText)
            errorArray.push(i)
        }
    }
    console.log("- erro nas paginas:", errorArray)
}
getQuestions()




// const server = http.createServer((req, res) => {
//     res.statusCode = 200;
//     res.setHeader('Content-Type', 'text/plain');
//     res.end('Hello World....................');
//   });

// server.listen(PORT, () => {
//   console.log(`Server running at PORT:${PORT}/`);
// });