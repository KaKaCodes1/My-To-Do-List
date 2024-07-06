/*
An Immediately Invoked Function Expression (IIFE) is used to encapsulate the 
entire code block. This pattern is often used to create a private scope for 
variables, preventing them from polluting the global scope.
*/
(() => { 
    // state variables
    let toDoListArray = [];
    // ui variables
    const form = document.querySelector(".form"); 
    const input = form.querySelector(".form_input");
    const ul = document.querySelector(".toDoList"); 
  
    // event listeners
    form.addEventListener('submit', e => {
      // prevent default behaviour - Page reload
      e.preventDefault();
      // give item a unique ID
      let itemId = String(Date.now());
      // get/assign input value
      let toDoItem = input.value;
      //pass ID and item into functions
      addItemToDOM(itemId , toDoItem);
      addItemToArray(itemId, toDoItem);
      // clear the input box. (this is default behaviour but we got rid of that)
      input.value = '';
    });
    
    ul.addEventListener('click', e => {
      let id = e.target.getAttribute('data-id')
      if (!id) return // user clicked in something else 
      //toggle line-through class
      toggleLineThrough(id);     
    //   //pass id through to functions
    //   removeItemFromDOM(id);
    //   removeItemFromArray(id);
    });

    // Add event listener for delete button clicks
    ul.addEventListener('click', e => {
        if (e.target.classList.contains('deleteButton')) {
        const li = e.target.closest('li');
        const itemId = li.getAttribute('data-id');
        removeItemFromDOM(itemId);
        removeItemFromArray(itemId);
        }
    });
    
    // functions 
    function addItemToDOM(itemId, toDoItem) {    
      // create an li
      const li = document.createElement('li')
      li.setAttribute("data-id", itemId);
      // add toDoItem text to li
      li.innerText = toDoItem
      //create a delete button
      const deleteButton = document.createElement('button');
      deleteButton.textContent = 'x';
      deleteButton.classList.add('deleteButton');
      //Append delete button to li
      li.appendChild(deleteButton);
      // add li to the DOM
      ul.appendChild(li);
    }
    
    function addItemToArray(itemId, toDoItem) {
      // add item to array as an object with an ID so we can find and delete it later
      toDoListArray.push({ itemId, toDoItem});
      console.log(toDoListArray)
    }

    function toggleLineThrough(id){
      // get the list item by data ID
      var li = document.querySelector('[data-id="' + id + '"]'); 
      if (li){
        li.classList.toggle('line-through');
        li.classList.toggle('completed');
      } 
    }
    
    function removeItemFromDOM(id) {
      // get the list item by data ID
      var li = document.querySelector('[data-id="' + id + '"]');
      // remove list item
      ul.removeChild(li);
    }
    
    function removeItemFromArray(id) {
      // create a new toDoListArray with all li's that don't match the ID
      toDoListArray = toDoListArray.filter(item => item.itemId !== id);
      console.log(toDoListArray);
    }
    
  })();