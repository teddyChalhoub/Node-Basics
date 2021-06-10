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

  if (text === "quit\n" || text === "exit\n") {
    quit();
  } else if (helloComp.test(text)) {
    hello(text);
  } else if (listComp.test(text)) {
    list();
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
  let arrayList = [
    { unchecked: "[]", checked: "[✓]", task: 1 },
    { unchecked: "[]", checked: "[✓]", task: 2 },
    { unchecked: "[]", checked: "[✓]", task: 3 },
  ];

  arrayList.map((data) => {
    console.log(`${data.task}`);
  });
}

/**
 * Exits the application
 *
 * @returns {void}
 */
function quit() {
  console.log("Quitting now, goodbye!");
  process.exit();
}

/**Help part
 * provided you with the command you can use when running tasks.js file:
 * help : display the commands available
 * hello : will display hello with exclamation mark at the end
 * quit or exit : will stop the program from running
 * extended hello : will handle the existing spaces with any phrase that start with * hello
 * @returns {void}
 * */

function help() {
  const hello = "hello : will display hello with exclamation mark at the end";
  const quit = "quit or exit : will stop the program from running";
  const help = "help : display the commands available";
  const extHello =
    "extended hello : will handle the existing spaces with any phrase that start with hello";
  console.log(
    "Available commands : \n" +
      hello +
      "\n" +
      quit +
      "\n" +
      help +
      "\n" +
      extHello
  );
}

// The following line starts the application
startApp("Teddy Chalhoub");
