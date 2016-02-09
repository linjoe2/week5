Instructions:
​
- Add your answers inline to the markdown file.
- Use your own words.
- Come up with an answer from memory. Write it down, even if the answer is "I don't know."
- Then, we will go over the answers in class. Write down your revised answer below your original answer.
- There are two intermissions. We will go over the answers to the previous parts during those times.
- Finally, submit all of your answers in a file to canvas. This is so Lloyd and I can get a sense of your understanding.
​
---
### Part 1: Servers - 20 minutes
​
1. What is a server? What does a server do?
​a server is a computer somewhere on the internet that will send and recieve commands on request of a other computer in the network or the internet.

2. What is Node.js?
​Node.js is a package module software for javascript wich gives you the possebility to add more functionality

3. What is express?
​express is a node module that gives you server capability's that you normaly wouldnt have.

4. What is a client? What does a client do?
​A client is the computer in the network that is asking for information from the server. if i connect to facebook, facebook is the server and my computer is the client.

5. How do the server and the client communicate?
​the comunicate over the internet or a local network using ports to comunicate the data trough.

6. Debugging:
- 6a. How do you view server logs?
you check them on the server itself

- 6b. How do you view client logs?
​you check them in the browser through the inspect tool.

---
### Part 2: HTTP Requests - 15 minutes
​
1. What is an HTTP Request?
​this is a website request this is most typicaly handled by a web browser

2. GET Requests
- 2a. What is a GET request?
it send a request asking for information

- 2b. When do you use GET requests?
when you want to know something from the server without having that involve your own input.

- 2c. How do you send data in a GET request?
​through a http conection.


3. POST Requests
- 3a. What is a POST request?
it posts data to get processed waiting for a response from the server.

- 3b. When do you use POST requests?
you use it when you want to send unique information to a server like a textmessage or a image.

- 3c. How do you send data in a POST request? 
​through a HTTP connection.

---
​
### Intermission
​
---
### Part 3: Ajax - 15 minutes
​
1. Ajax
- 1a. What is Ajax?
AJAX = Asynchronous JavaScript and XML(but now adays nobody uses it for XML)

- 1b. When should you use Ajax?
Ajax updates the pages asynchronously wich means it has the possiblity to update the information without having to reload the page.

2. Given the following code snippet:
​
```js
console.log("A");
$('#map').click(function(event) {
	console.log("B");
	var coordinates = convertMouseCoordinatesToGeoCoordinates(event);
​
	console.log("C");
	$.get('/map', { lat: coordinates.x, lon: coordinates.y }, function(response, status) {
		console.log("D");
		mapDisplay.update(response);
	});
	
	console.log("E");
});
console.log("F");
```
​
- 2a. Describe what seems to be happening.
it consolelogs 'a'
console logs 'F'
if you click on the map, the function starts: 
it will console logs 'b'
convertMouseCoordinatesToGeoCoordinates is a function that starts but is outside this script, it sends back the mouse cordonats
console logs 'c'
get request for the map with the coordinates of the mouse
consolelog 'E' because respose takes longer
console logs 'd'
sends a response with a updated map



- 2b. In what order is `A` through `F` printed?
afbced

- 2c. Describe the events that happen between each letter. When does the server get hit?
​between f and b

---
​
### Intermission
​
---
### Part 4: Jade - 20 minutes
​
1. Jade
- 1a. What is Jade?
jade is the new html templat engine, instead of starting a complete new language that needs a own decoder on every client, it actually choses to decode it to html on the server so that every browser can read it.

- 1b. Why should we use Jade?
​its a lot faster and works way more efficient inside javascript apps.

2. Explain the difference between 'server side' JavaScript and 'client side' JavaScript.
​serverside: gets and posts requests recieved from the client wich activate the script.

clientside: sends the get and post request to the server or do's interactions within the page itself.


3. Given this example `index.jade` file:
​
```js
doctype html
html
	head
		script(src='boop.js')
		script.
			var x = 1;
	body
		- var y = 2;
		h2= z + y
```
​
- 3a. Is `x` executed server side or client side? Does the client ever see `x`?
clientside no

- 3b. Is `y` executed server side or client side? Does the client ever see `y`?
serverside 

- 3c. Is `z` executed server side or client side? Does the client ever see `z`?
serverside, yes

- 3d. When is `boop.js` executed? Does the client ever see `boop.js`?
​yes

---
### Part 5: Request Lifecycle - 15 minutes
​
5. Given the following code snippet in an express application:
​
```js
app.get('/home', function (request, response) {
	response.render('index', { z: 3 } );
});
```
​
- 5a. List the complete order of events, starting from the browser making a `GET` request to `/home`. Assume that `index` refers to the Jade file in Part 3. Be sure to describe when each JavaScript statement (`x`, `y`, `z`, and `boop.js`) gets executed.

html gets loaded
script request boop.js
x = 1 gets places in the html as script
it starts var y = 2
than places inside h2 the sum of 2(y) and 3(z)


- 5b. What is displayed on the page?
a 5 in header2 style

- 5c. What is visible from 'view page source'?

<!DOCTYPE html>
<html>
  <head>
    <script src="boop.js"></script>
    <script>var x = 1;</script>
  </head>
  <body>
    <h2>5</h2>
  </body>
</html>
