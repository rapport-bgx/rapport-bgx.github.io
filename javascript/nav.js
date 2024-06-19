/* code pour le menu de navigation */

const navigation = document.querySelector('nav');
console.log(navigation);

window.addEventListener('scroll', () => {
    if(window.scrollY > 30){
        navigation.classList.add('anim-nav');
    } else{
        navigation.classList.remove('anim-nav');
    }
})
