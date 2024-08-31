document.addEventListener("DOMContentLoaded", function () {
    function setupEventListeners() {
        const moveLeftButtons = document.querySelectorAll(".move-left");
        const moveRightButtons = document.querySelectorAll(".move-right");

        moveLeftButtons.forEach(button => {
            button.addEventListener("click", function () {
                moveTask(this.parentElement, "left");
            });
        });

        moveRightButtons.forEach(button => {
            button.addEventListener("click", function () {
                moveTask(this.parentElement, "right");
            });
        });
    }

    function moveTask(taskItem, direction) {
        const parentCard = taskItem.closest(".todo-card");
        let targetCard;
        if (direction === "left") {
            if (parentCard.id === "todo") targetCard = document.getElementById("backlog");
            else if (parentCard.id === "ongoing") targetCard = document.getElementById("todo");
            else if (parentCard.id === "done") targetCard = document.getElementById("ongoing");
        } else if (direction === "right") {
            if (parentCard.id === "backlog") targetCard = document.getElementById("todo");
            else if (parentCard.id === "todo") targetCard = document.getElementById("ongoing");
            else if (parentCard.id === "ongoing") targetCard = document.getElementById("done");
        }

        if (targetCard) {
            taskItem.parentElement.removeChild(taskItem);
            targetCard.querySelector(".todo-list").appendChild(taskItem);
            updateButtonStates();
        }
    }

    function updateButtonStates() {
        document.querySelectorAll(".todo-card").forEach(card => {
            card.querySelectorAll("li").forEach(taskItem => {
                const leftButton = taskItem.querySelector(".move-left");
                const rightButton = taskItem.querySelector(".move-right");
                if (card.id === "backlog") {
                    if (leftButton) leftButton.disabled = true;
                    if (rightButton) rightButton.disabled = false;
                } else if (card.id === "todo") {
                    if (leftButton) leftButton.disabled = false;
                    if (rightButton) rightButton.disabled = false;
                } else if (card.id === "ongoing") {
                    if (leftButton) leftButton.disabled = false;
                    if (rightButton) rightButton.disabled = false;
                } else if (card.id === "done") {
                    if (leftButton) leftButton.disabled = false;
                    if (rightButton) rightButton.disabled = true;
                }
            });
        });
    }
    setupEventListeners();
    updateButtonStates();
});



















