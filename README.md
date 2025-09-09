1)

Var let and const all are used to declare variables

var was used earlier,it doesnt follow block scope

let is the newer way to write varibales in JS now it works in the block wheere it
 is wriiten

 const is for declaring constant we cant change once a const is decalred 


 side note= const cant be reassigned but if we declare a array with const its
 values can be changed but the const itself cant be changed.



 2)

 forEach is a loop used to go over items of a list, it gives us access
 to the items and let us do what we need and it doesnt return anything


 map() also goes through the items but now it does something to that particular item
 and creates a new array with the updated values

 filter() does exactly like its name, it checks for some conditiona nd
 and keeps the values that passed the conditon


 3)

 Normal function
 function add(a, b) {
  return a + b;
}

Arrow function
const add = (a, b) => a + b;

It is a shorter way to write a functon,  here we dont have to write a return for 
single lines.
or the word function so its shorter and looks cleaner


4)
const numbers = [1, 2, 3];
const [a, b] = numbers; // a = 1, b = 2

By destructing we can take values from arrays or objects easily.
it unpacks the array and give us the values


5)

Template literals are strings written with backticks (`).
Its like F string in python here we can access a variable within
the string without needing to use +. Its way easier and cleaner to write 