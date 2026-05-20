interface ShoppingItem {
    name: string;
    quantity: number;
}

class ShoppingList {
    private items: ShoppingItem[];

    constructor() {
        this.items = [];
    }

    addItem(item: ShoppingItem): void {
        this.items.push(item);
    }

    removeItem(index: number): void {
        if (index >= 0 && index < this.items.length) {
            this.items.splice(index, 1);
        }
    }

    clear(): void {
        this.items = [];
    }

    render(container: HTMLUListElement): void {
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
    const nameInput = document.getElementById("itemName") as HTMLInputElement;
    const qtyInput = document.getElementById("itemQty") as HTMLInputElement;
    const addBtn = document.getElementById("addBtn") as HTMLButtonElement;
    const listElement = document.getElementById("shoppingList") as HTMLUListElement;
    const clearBtn = document.getElementById("clearBtn") as HTMLButtonElement;

    const shoppingList = new ShoppingList();

    addBtn.addEventListener("click", () => {
        const name = nameInput.value.trim();
        const quantity = parseInt(qtyInput.value, 10);

        if (name === "" || isNaN(quantity) || quantity < 1) {
            alert("Введите корректное название и количество (не менее 1).");
            return;
        }

        const newItem: ShoppingItem = { name, quantity };
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