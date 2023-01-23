const items = document.querySelector('.items');
const input = document.querySelector('.footer_input');
const addBtn = document.querySelector('.footer_button');
const form = document.querySelector('.new-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();
    onAdd();
})
function onAdd() {
    const textInput = input.value;
    if (textInput == "") {
        input.focus(); //input 값 초기화
        return;
    }
    const item = createItem(textInput);
    items.appendChild(item);
    item.scrollIntoView({ block: 'center' });
    input.value = '';
    input.focus();
}
let id = 0; //UUID
function createItem(text) {
    const itemRow = document.createElement('li')
    itemRow.setAttribute('class', 'item_row')
    itemRow.setAttribute('data-id', id);
    itemRow.innerHTML = `
        <div class="item">
            <span class="item_name">${text}</span>
            <button class="item_delete" >
                <i class="fa-solid fa-trash" data-id=${id}></i>
            </button>             
        </div>
        <div class="item_divider"></div>
    `;
    /*const item = document.createElement('div');
    item.setAttribute('class', 'item');

    const name = document.createElement('span');
    name.setAttribute('class', 'item_name');
    name.innerText = text;

    const deleteBtn = document.createElement('button');
    deleteBtn.setAttribute('class', 'item_delete');
    deleteBtn.innerHTML = '<i class="fa-solid fa-trash"></i>';
    deleteBtn.addEventListener('click', () => {
        items.removeChild(itemRow);

    });

    const itemDivider = document.createElement('div');
    itemDivider.setAttribute('class', 'item_divider');

    item.appendChild(name);
    item.appendChild(deleteBtn);
    itemRow.appendChild(item);
    itemRow.appendChild(itemDivider);*/
    id++;
    return itemRow;
}
addBtn.addEventListener('click', () => {
    onAdd();
});
input.addEventListener('keypress', (event) => {
    if (event.key == 'Enter') {
        onAdd();
    }
});

items.addEventListener('click', (event) => {
    const id = event.target.dataset.id;
    if (id) {
        const toBeDeleted = document.querySelector(`.item_row[data-id="${id}"]`);
        toBeDeleted.remove();
    }
})