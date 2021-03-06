const socket = io()

socket.on("render_products", (data) => {
    renderProducts(data)
    socket.emit("message_cliente", "Hola servidor!")
})
socket.on("render_messages", (data) => {
    renderMessages(data)
})

const submitProduct = (e) => {
    e.preventDefault()
    let obj = { 
        title : document.querySelector("#title").value,
        price : document.querySelector("#price").value, 
        thumbnail : document.querySelector("#thumbnail").value
    }
    socket.emit("data_products", obj)
}
const renderProducts = (data) => {
    let html = data.map(item => `
  <tr>
    <td>${item.title}</td>
    <td>$${item.price}</td>
    <td><img class="icon" src="${item.thumbnail}" alt="test"></td>
  </tr>`
  ).join(" ")

    document.querySelector("#caja").innerHTML = html
}

const sendMsg = (e) => {
  e.preventDefault();
  const msg = {
    user_id: socket.id,
    user: document.querySelector('#mail').value,
    msg: document.querySelector('#msg').value,
  }
  socket.emit('data_messages', msg)
}

const renderMessages = (data) => {
  let date = new Date();
  let html = data.map(item => `
    <p><span class="${userClass(item.user_id)}">${item.user}</span> <span class="timestamp">[${date.toLocaleString()}]</span>: <span class="user-msg">${item.msg}</span></p> 
  `
  );
  const body = document.querySelector('#chat-msgs')
  body.innerHTML = html.join("");
}

const userClass = (msgUser) => {
  if (msgUser === socket.id) {
    return 'my-user';
  }
  return 'user';
}