// Modal funcitons

export default {
    open: (id) => {
        let x = document.getElementById(id)
        x.classList.replace('fadeOut', 'fadeIn');
    },
    close: (id) => {
        let x = document.getElementById(id)
        x.classList.replace('fadeIn', 'fadeOut');
    }
}