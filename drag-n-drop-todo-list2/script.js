document.addEventListener('DOMContentLoaded', () => {
    const containers = document.querySelectorAll('.container');
    let draggedNode = null;
    const cards = document.querySelectorAll('.card');

    cards.forEach(card => {
        card.addEventListener('dragstart', cardDragStart);
    })

    function cardDragStart(e) {
        e.target.addEventListener('dragend', cardDragEnd);
        e.target.classList.toggle('beingDraggedClass');
        draggedNode = e.target;
    }

    function cardDragEnd(e) {
        e.target.removeEventListener('dragend', cardDragStart);
        e.target.classList.toggle('beingDraggedClass');
        draggedNode = null;
    }

    containers.forEach(container => {
        container.addEventListener('dragenter', handleDragEnter)
    })

    function handleDragEnter(e) {
        if (e.target.classList.contains('container')) {
            let closestChild = getNextDraggable(e);
            if(closestChild) closestChild.insertAdjacentElement('beforebegin', document.querySelector('.beingDraggedClass'))
            else e.target.appendChild(draggedNode)
        }
    }

    function getNextDraggable(e) {
        let closestChild = null;
        let currentMouseY = e.clientY;
        let targetChildren = [...e.target.children];
        let minOffset = Number.NEGATIVE_INFINITY;
        targetChildren.forEach(child => {
            let box = child.getBoundingClientRect();
            let offset = currentMouseY - box.top - box.height / 2;
            if(offset < 0) {
                if(offset > minOffset) {
                    closestChild = child;
                    minOffset = offset;
                }
            }
        });
        return closestChild;
    }
})