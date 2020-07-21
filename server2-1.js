

// this way of working with axios is the recomended, because the above is still in level three of formal acceptance
const axios = require('axios');    
const { url } = require('inspector');
const { ok } = require('assert');
corrige = (enunciado,resposta,vestibular)=>{
    // [A] || Alternativa C.|| (A) resposta...||A.|| A 
    let isAlternativa = true;
    let enunciadoCorrigido;
    let respostaCorrigida;
    let vestibularCorrigido;
    let a,b,c,d,e;
    let aIndex,bIndex,cIndex,dIndex, eIndex;
    let AIndex,BIndex,CIndex,DIndex,EIndex;
    let hifenIndex;
    let tipo;
    hifenIndex = vestibular.lastIndexOf('-');
    if(hifenIndex!=-1){
        vestibularCorrigido = vestibular.substring(0,hifenIndex);
        ano= vestibular.substring(1+hifenIndex);
    }
    else{
        vestibularCorrigido="";
        ano="";
    }
    
    if (vestibular)
    resposta = resposta.trim();
    if (resposta.match(/[[A]]/)||resposta.match(/Alternativa A./)||resposta.match(/A./)){
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
        console.log('ano:' + ano);
        console.log('vestibular:'+vestibularCorrigido);
        console.log('q:' + enunciadoCorrigido)
        console.log('a:' + a);
        console.log('b:' + b);
        console.log('c:' + c);
        console.log('d:' + d);
        console.log('e:' + e);
        console.log('r:' + respostaCorrigida);
        tipo = 'alternativa';
        //TODO criar lista aqui; Aqui a questão é alternativa

    }
    else{
        console.log('ano:' + ano);
        console.log('vestibular:'+vestibularCorrigido);
        console.log('q:' + enunciadoCorrigido) 
        console.log('r:' + respostaCorrigida)
        tipo='dissertativa';
        // TODO aqui a questão não se enquadrou na captura de alternativa
    }
        
}
async function getQuestions() {
    try {
        const response = await axios.request({
            method:'GET',
            url: 'http://professor.bio.br/quimica/lista.all.asp?curpage=61',
            responseType:'arraybuffer',
            responseEncoding:'binary'
        }
        );
        const cheerio = require('cheerio')
        const $ = cheerio.load(response.data.toString('latin1'))  
        ROOT_SELECTOR_QUIMICA = "body > table > tbody > tr > td:nth-child(1) > table > tbody > tr:nth-child(8) > td > table > tbody > "
        for (var n = 1; n <= 15; n++) {
            selectorQuestion = ROOT_SELECTOR_QUIMICA + `tr:nth-child(${n + 1}) > `
            vestibular = $(selectorQuestion + "td:nth-child(1) > font:nth-child(1) > a").text()
            questaoDe = $(selectorQuestion + "td:nth-child(1) > font:nth-child(1)").text()
            subGrupo = $(selectorQuestion + "td:nth-child(1) > font:nth-child(3)").text()
            enunciadoEResposta = $(selectorQuestion + "td:nth-child(2) > font").text()
            /// filtering with regular expressions
            classificada = questaoDe.match(/o classificada/) == null ? 1 : 0
            questaoDe = (questaoDe.match(/quest(.*)es de(.*)/)[2]).trim();
            subGrupo = (subGrupo.match(/sub-grupo:(.*)/)[1]).trim();
            temSubGrupo = subGrupo.length == 0 ? 0 : 1
            enunciado =enunciadoEResposta.substring(9+enunciadoEResposta.indexOf("pergunta"),enunciadoEResposta.lastIndexOf("resposta")).trim();
            resposta = enunciadoEResposta.substring(enunciadoEResposta.lastIndexOf("resposta")+9).trim();
            //resposta = enunciadoEResposta.match(/pergunta:(.*)resposta:(.*)/)[2]enunciadoEResposta.substring(9+enunciadoEResposta.indexOf("pergunta"),enunciadoEResposta.lastIndexOf("resposta")).trim()
            corrige(enunciado,resposta,vestibular);
            //console.log("enunciado e resposta: " + enunciadoEResposta)
            console.log("--------------------------")
        }
    } catch (error) {
        console.error("deu ruim: ", error)
    }
}
getQuestions()
