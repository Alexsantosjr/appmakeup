const { date } = require("../lib/utils")
const Aluno = require("../models/Aluno")

module.exports = {
    index(req, res){
        return res.render("makeup/index")
    },
    create(req, res){
        return res.render("makeup/registro")
    },
    post(req,res){
        const keys = Object.keys(req.body)


        for( key of keys){
            if (req.body[key] == ""){
                return res.send("Please, fill all fields")
            }
        }

    Aluno.create(req.body, function(aluno){
        return res.redirect(`aluno/${aluno.id}`)
    })
    },
    show(req, res){
       Aluno.find(req.params.id, function(aluno){
           if(!aluno) return res.send("Aluno não encontrado!")

           aluno.created_at =  date(aluno.created_at).format

           return res.render("makeup/aluno", { aluno })
       })
    },
    edit(req, res){
        Aluno.find(req.params.id, function(aluno){
            if(!aluno) return res.send("Aluno não encontrado!")
 
            aluno.created_at =  date(aluno.created_at).format
 
            return res.render("makeup/edit", { aluno })
        })
    },
    put(req, res){
        const keys = Object.keys(req.body)

        for(key of keys){
            if(req.body[key] == ""){
                return res.send("Please, fill all fields")
            }
        }

        Aluno.update(req.body, function(){
            return res.redirect(`/aluno/${req.body.id}`)
        })
    },
    delete(req, res){
        const { id } = req.body

        const filterAluno = data.alunos.filter(function(aluno){
            return aluno.id != id
        })
    
        data.alunos = filterAluno
    
        fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err){
            if (err) return res.send("Write file error")
    
            return res.redirect("/makeup/maquiadoras")
        })
    },
    makes(req, res){
        Aluno.all(function(alunos){
            return res.render("makeup/maquiadoras", { alunos })
        })
    },
    more(req, res){
        return res.render("makeup/more")
    }
}