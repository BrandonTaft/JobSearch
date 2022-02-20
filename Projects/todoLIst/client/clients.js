
const taskUL = document.getElementById("taskUL")
let taskBox = document.getElementById("taskBox")
let priorityBox = document.getElementById("priorityBox")
let dateBox = document.getElementById("dateBox")
let addButton = document.getElementById("addButton")
let getButton = document.getElementById("getButton")


function getTasks(){
    fetch('http://localhost:3000/tasks')
        .then(response => response.json())
        .then(tasks => {
            const taskItems = tasks.map((tasks) => {
                return `<li>
                ${tasks.title} , ${tasks.priority} , ${tasks.date}
                </li>`
            })
            taskUL.innerHTML = taskItems.join("")
        })
}


getButton.addEventListener("click", function () {
    console.log("hey")
    getTasks()
    

})


addButton.addEventListener("click", function () {
    console.log(taskBox.value)
    fetch('http://localhost:3000/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'

        },
        body: JSON.stringify({
            task: taskBox.value,
            priority: priorityBox.value,
            date: dateBox.value
        })
   
        }).then(response => response.json())
            .then(result => {
                getTasks()
            })
})