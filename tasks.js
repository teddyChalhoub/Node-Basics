/**
 * Starts the application
 * This is the function that is run when the app starts
 *
 * It prints a welcome line, and then a line with "----",
 * then nothing.
 *
 * @param  {string} name the name of the app
 * @returns {void}
 */
function startApp(name) {
  process.stdin.resume();
  process.stdin.setEncoding("utf8");
  process.stdin.on("data", onDataReceived);
  console.log(`Welcome to ${name}'s application!`);
  console.log("--------------------");
}

/**
 * Decides what to do depending on the data that was received
 * This function receives the input sent by the user.
 *
 * For example, if the user entered
 * ```
 * node tasks.js batata
 * ```
 *
 * The text received would be "batata"
 * This function  then directs to other functions
 *
 * @param  {string} text data typed by the user
 * @returns {void}
 */
function onDataReceived(text) {
  let helloComp = /hello/;
  let listComp = /list/;
  let addComp = /add/;
  let rmComp = /remove/;
  let editComp = /edit/;

  if (text === "quit\n" || text === "exit\n") {
    quit();
  } else if (helloComp.test(text)) {
    hello(text);
  } else if (listComp.test(text)) {
    list();
  } else if (addComp.test(text)) {
    add(text, addComp);
  } else if (editComp.test(text)) {
    edit(text, editComp);
  } else if (rmComp.test(text)) {
    remove(text, rmComp);
  } else if (text === "help\n") {
    help();
  } else {
    unknownCommand(text);
  }
}

/**
 * prints "unknown command"
 * This function is supposed to run when all other commands have failed
 *
 * @param  {string} c the text received
 * @returns {void}
 */
function unknownCommand(c) {
  console.log('unknown command: "' + c.trim() + '"');
}

/**
 * Says hello
 * @param  {string} value string input provided by the user
 * @returns {void}
 */
function hello(value) {
  const newValue = value.replace(/ +/g, " ");
  console.log(newValue.trim() + "!");
}

/**
 * list : list all the items that exist in the array
 */

function list() {
  let data = getData();

  data.map((values) => {
    console.log(`${values.task}`);
  });
}

/**
 * add x : it add an item into the array
 */

function add(value, plus) {
  let userInput = value.replace(plus, "").trim();

  let data = getData();

  let index = data.findIndex((x) => x.task === userInput);

  if (userInput !== "") {
    if (index === -1) {
      data.push({ unchecked: "[]", done:false, task: userInput });
      console.log(data);
    } else {
      console.log(`${userInput} is the ${index + 1} task in the list`);
    }
  } else {
    console.log('Please provide a task after the "add" command');
  }
}

/**
 * edit x : it edit item into the array
 */

function edit(value, update) {
  let input = value.replace(update, "").trim();

  let index = input.match(/[0-9]/);

  let userInput = input.replace(index, "").trim();

  let data = getData();

  if (data.length !== 0) {
    if (index !== null && userInput !== "") {
      index = parseInt(input.match(/[0-9]/).input);
      data[index - 1].task = userInput.toString();
      console.log(data);
    } else {
      if (userInput !== "" ) {
        console.log(data);
        data[data.length - 1].task = userInput.toString();
        console.log(data);
      } else {
        console.log(
          "Please specify which task you wish to update by providing the task number or the value to update to"
        );
      }
    }
  } else {
    console.log("No Task available to update");
  }
}

/**
 * remove : it remove the last element from the list
 * remove nb : it remove the specified number in the list
 */
function remove(value, rm) {
  let userInput = value.replace(rm, "").trim();

  let data = getData();

  let index = data.findIndex((x) => x.task === userInput);

  if (data.length !== 0) {
    if (userInput !== "") {
      if (index !== -1) {
        if (index === 0) {
          data.shift();
          console.log(data);
        } else {
          data.splice(index, index);
          console.log(data);
        }
      } else {
        console.log(`${userInput} doesn't exist in the list`);
      }
    } else {
      data.pop();
      console.log(data);
    }
  } else {
    console.log("List is empty");
  }
}

/**
 * Exits the application
function quit() {
  console.log("Quitting now, goodbye!");
  process.exit();
}

/**Help part
 * provided you with the command you can use when running tasks.js file:

 * hello : will display hello with exclamation mark at the end
 * extended hello : will handle the existing spaces with any phrase provided by the * user
 * list : "list: list all the items added to the list;
 * add : add nb : add task to the list  (you should add a task after add command);
 * remove : remove: removes the last item in the list ;
 * remove : remove nb : after remove command add a number to specify which item you  * wish to remove from the list; 
 * quit or exit : will stop the program from running
 * help : display the commands available
 
 * @returns {void}
 * */

function help() {
  const hello = "hello : will display hello with exclamation mark at the end";
  const quit = "quit or exit : will stop the program from running";
  const help = "help : display the commands available";
  const extHello =
    "extended hello : will handle the existing spaces with any phrase that start with hello";

  const list = "list: list all the items added to the list";
  const add =
    "add nb : add task to the list  (you should add a task after add command)";
  const remove = "remove: removes the last item in the list ";
  const remove2 =
    "remove nb : after remove command add a number to specify which item you wish to remove from the list";

  console.log(
    "Available commands : \n" +
      hello +
      "\n" +
      extHello +
      "\n" +
      list +
      "\n" +
      add +
      "\n" +
      remove +
      "\n" +
      remove2 +
      "\n" +
      quit +
      "\n" +
      help +
      "\n"
  );
}

function getData() {
  let arrayList = [
    { checkBox: "[]",done: false, task: "1" },
    { checkBox: "[]", done: false, task: "teddy chalhoub" },
    { checkBox: "[✓]",done:true, task: "3" },
    { checkBox: "[✓]",done:true, task: "get milk" },
  ];

  return arrayList;
}

// The following line starts the application
startApp("Teddy Chalhoub");
