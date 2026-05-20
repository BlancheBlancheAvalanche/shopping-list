"use strict";
class ShoppingList {
    items;
    constructor() {
        this.items = [];
    }
    addItem(item) {
        this.items.push(item);
    }
    removeItem(index) {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1);
        }
    }
    clear() {
        this.items = [];
    }
    render(container) {
        // Очищаем контейнер перед перерисовкой
        container.innerHTML = "";
        for (let i = 0; i < this.items.length; i++) {
            const item = this.items[i];
            const li = document.createElement("li");
            li.textContent = `${item.name} — ${item.quantity} шт. `;
            const delBtn = document.createElement("button");
            delBtn.textContent = "Удалить";
            delBtn.addEventListener("click", () => {
                this.removeItem(i);
                this.render(container);
            });
            li.appendChild(delBtn);
            container.appendChild(li);
        }
    }
}
document.addEventListener("DOMContentLoaded", () => {
    const nameInput = document.getElementById("itemName");
    const qtyInput = document.getElementById("itemQty");
    const addBtn = document.getElementById("addBtn");
    const listElement = document.getElementById("shoppingList");
    const clearBtn = document.getElementById("clearBtn");
    const shoppingList = new ShoppingList();
    addBtn.addEventListener("click", () => {
        const name = nameInput.value.trim();
        const quantity = parseInt(qtyInput.value, 10);
        if (name === "" || isNaN(quantity) || quantity < 1) {
            alert("Введите корректное название и количество (не менее 1).");
            return;
        }
        const newItem = { name, quantity };
        shoppingList.addItem(newItem);
        shoppingList.render(listElement);
        // Очистка полей ввода
        nameInput.value = "";
        qtyInput.value = "1";
    });
    clearBtn.addEventListener("click", () => {
        shoppingList.clear();
        shoppingList.render(listElement);
    });
    // Первоначальная отрисовка пустого списка
    shoppingList.render(listElement);
});
