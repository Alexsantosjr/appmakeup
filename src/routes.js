const express = require("express")
const routes = express.Router()
const alunos = require("./app/controllers/alunos")

routes.get("/", function(req, res){
    return res.render("makeup/index")
})
routes.get("/makeup/", alunos.index)
routes.get("/registro", alunos.create)
routes.get("/aluno/:id", alunos.show)
routes.post("/makeup", alunos.post)
routes.get("/aluno/:id/edit", alunos.edit)
routes.put("/makeup", alunos.put)
routes.delete("/makeup", alunos.delete)
routes.get("/makeup/maquiadoras", alunos.makes)
routes.get("/makeup/more", alunos.more)


module.exports = routes