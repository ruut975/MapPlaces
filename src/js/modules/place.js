import axios from 'axios'

const place = {}
const url = 'https://jsonplaceholder.typicode.com/todos/1'

 export const loadPlace = () => {
  axios.get(url)
  .then(response => () => {
    console.log(response.data)
  })
  .catch(error => console.log(error))
}