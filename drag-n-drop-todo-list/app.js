document.addEventListener('DOMContentLoaded', () => {
    const gridContainer = document.querySelector('.grid-container');
    let draggedNodeInfo = null;

    const cardData = {
        A: [1, 2, 3],
        B: [4, 5]
    }

    function createGrid() {
        for (let col of Object.keys(cardData)) {
            const column = createColumn(col);
            for (let item of cardData[col]) {
                const card = createCard(item, col);
                column.appendChild(card);
            }
            gridContainer.appendChild(column)
        }
    };
    createGrid();
    function createColumn(colName) {
        const col = document.createElement('div');
        col.classList.add('grid-column');
        col.addEventListener('dragenter', handleDragEnterCol);
        col.setAttribute('listname-col', colName);
        col.textContent = colName;
        return col;
    };
    function createCard(num, col) {
        const card = document.createElement('div');
        card.textContent = num;
        card.classList.add('card')
        card.setAttribute('draggable', true);
        card.setAttribute('listname', col)
        card.addEventListener('dragstart', dragStart)
        card.addEventListener('dragenter', dragEnter)
        return card;
    };

    function dragStart(e) {
        draggedNode = e.target;
        draggedNodeInfo = {
            listname: e.target.getAttribute('listname'),
            item: e.target.textContent
        };
    }

    function handleDragEnterCol(e) {
        if (e.target.getAttribute('listname-col') && e.target.childNodes.length === 1) {
            listNameDraggedEnter = e.target.getAttribute('listname-col');

            // // remove item from list
            const { listname, item } = draggedNodeInfo;
            const colToDelete = document.querySelector(`[listname-col=${listname}]`);
            colToDelete.removeChild(draggedNode);

            e.target.appendChild(draggedNode);
        };
    }

    function dragEnter(e) {
        if (e.target.textContent !== draggedNodeInfo.item) {
            listNameDraggedEnter = e.target.getAttribute('listname');

            // remove item from list
            const { listname, item } = draggedNodeInfo;

            if (listNameDraggedEnter === listname) {
                let compareMask = draggedNode.compareDocumentPosition(e.target);
                if (compareMask == 2) e.target.insertAdjacentElement('beforebegin', draggedNode);
                if (compareMask === 4) e.target.insertAdjacentElement('afterend', draggedNode);
            } else {
                draggedNode.setAttribute('listname', listNameDraggedEnter)
                e.target.insertAdjacentElement('afterend', draggedNode);
                draggedNodeInfo.listname = listNameDraggedEnter;
            }
        }
    }
});