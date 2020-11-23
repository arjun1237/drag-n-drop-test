const draggables = document.querySelectorAll(".draggable")
const containers = document.querySelectorAll(".container")

draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging')
    })

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging')
    })
})

containers.forEach(container => {
    container.addEventListener('dragover', (e) => {
        e.preventDefault()
		console.log(e.target, e.clientY)
        const elem = getDragOverElement(container, e.clientY)
        const draggable = document.querySelector('.dragging')
        elem === null ? container.appendChild(draggable) : container.insertBefore(draggable, elem)
    })
})

function getDragOverElement(container, y){
	// get all elements that are draggable but not currenty dragging
    const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

	// return the element over which the mouse is dragging another element
    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect()
        const offset = y - box.top - box.height /2
        return offset < 0 && offset > closest.offset ? { offset, element: child } : closest
    }, {offset: Number.NEGATIVE_INFINITY}).element
}