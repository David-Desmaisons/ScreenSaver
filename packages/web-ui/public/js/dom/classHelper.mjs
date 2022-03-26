/**
 * 
 * @param {HTMLElement} element
 * @param {String} newClass 
 * @param {String} oldClass
 */
function switchClass(element, newClass, oldClass){
    element.classList.remove(oldClass);
    element.classList.add(newClass);
} 

export {
    switchClass
}