
function avancar(){
    let nome = document.getElementById('nome').value
    if(nome == ''){
        alert("Insira um nome ou um apelido válidos")
        document.getElementById('nome').focus()
    }
    else{
        localStorage.setItem('nome', nome)
        window.location.href = "./quiz.html"
        console.log(nome)
    }
}