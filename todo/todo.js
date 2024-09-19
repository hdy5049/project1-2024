function    addItem(){


    alert("addItem 함수가 호출되었습니다")
        list = document.getElementById('todolist');
        todo = document.getElementById('item');

        let listitem = document.createElement('li');
        let xbtn = document.createElement('button');

        listitem.className = 'list-group-item list-group-item-action list-group'
        xbtn.className = 'close';
        xbtn.innerHTML = '&times';

        listitem.innerText = todo.value;
        list.appendChild(listitem);
}