import React from 'react'

export const Home = () => {
          return (
          <>
                    <h1>Todos App</h1>
                     <form class="add-form">
                      <input type="text" class="todosInput" name="item" placeholder="write todos" />
                      <button class="add">add</button>
                     </form>
                    <ul class="todoContainer">
                    <div class="btnEl"></div>
                    </ul>
          </>
          )
}
