const items = document.querySelector('.items');
const input = document.querySelector('.footer_input');
const addBtn = document.querySelector('.footer_button');

addBtn.addEventListener('click', () => {
    onAdd();
});
function onAdd() {
    const textInput = input.value;
    console.log(textInput);
    const item = createItem(textInput);
    items.appendChild(item);
    input.value = '';
    input.focus();
}
function createItem(text) {
    const itemRow = document.createElement('li')
    itemRow.setAttribute('class', 'item_row')

    const item = document.createElement('div');
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
    itemRow.appendChild(itemDivider);
    return itemRow;
}
