const menuButton = document.getElementById('menu-button')
const menu = document.getElementById('menu')

menuButton.addEventListener('click',()=>{
    if(menu.style.display == 'block'){
        menu.style.display = 'none'
    }else{
        menu.style.display = 'block'
    }

})