# Intro to programming - Backend track

In this course,
we are going to write a little Go-based service.
No previous programming knowledge is needed.


## Requirements

- a laptop with internet access
- a [Pairforce.io](http://pairforce.io) account


## Intro to Go

Go is a modern language for building backend services.
It is optimized for engineering in the large -
large teams working over long periods of time on large code bases solving big problems.


## Step 1 - a hello world program

The first step in every programmer journey is a "hello world" program.
It is the simplest possible program.
All it does is print "hello world".

<a textrun="create-file">Create a file __hello.go__ with the content:

```go
package main

import "fmt"

func main() {
	fmt.Println("Hello world!")
}
```
</a>

<a textrun="run-console-command">
Now run this command in the terminal:

```
go run hello.go
```
</a>

It prints:
<a textrun="verify-run-console-command-output">

```
Hello world!
```
</a>


## Step 2 - a simple calculator

Programs can do more than just return text.
They can calculate things.
Let's build a little calculator in Go.
<a textrun="create-file">
Create a file __calc.go__ with the content:

```go
package main

import "fmt"

func main() {
	fmt.Println(1 + 1)
}
```
</a>

<a textrun="run-console-command">
Run it in the terminal:

```
go run calc.go
```
</a>

<a textrun="verify-run-console-command-output">
It prints the correct result:


```
2
```
</a>

Play with more complex formulas to get a feeling for how easy it.
The [math](https://golang.org/pkg/math) package of Go provides many mathematical functions.
Here is a slighly more complex example program:
<a textrun="verify-go-code-runs">

```go
package main

import (
	"fmt"
	"math"
)

func main() {
	fmt.Println(math.Sqrt(10000000 / 42 * 13.4))
}
```
</a>



## Step 3 - a simple API server

Go was invented just a few years ago, in the internet age.
It has all the functionality needed to create network servers built in.

<a textrun="create-file">

Create a file **hello-server.go** with the content:

```go
package main

import (
	"fmt"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "hello world!")
}

func main() {
	http.HandleFunc("/", handler)
	fmt.Println("server online at http://localhost:8080")
	http.ListenAndServe(":8080", nil)
}
```
</a>

<a textrun="start-console-command">
Start the server by running:

```
go run hello-server.go
```
</a>
<a textrun="wait-for-output">
You should see:

```
server online at http://localhost:8080
```
</a>

<a textrun="verify-url-content">

Now go to __http://localhost:8080__ and you see:

```
hello world!
```
</a>

<a textrun="stop-console-command">
When you are done, stop the server by hitting `Ctrl-C`.
</a>


## Step 4 - a static web server

Messing around in Go source code each time we want to change the server output is getting cumbersome.
Let's create a basic web server.
For each request, it reads the file "index.html" and returns its content to the browser.
<a textrun="create-file">
Create a file __web-server.go__


```go
package main

import (
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
)

func handler(w http.ResponseWriter, r *http.Request) {
	content, err := ioutil.ReadFile("index.html")
	if err != nil {
		log.Fatal(err)
	}
	fmt.Fprintf(w, "%s", content)
}

func main() {
	http.HandleFunc("/", handler)
	fmt.Println("server online at http://localhost:8081")
	http.ListenAndServe(":8081", nil)
}
```
</a>

<a textrun="create-file">
and a file __index.html__:

```html
<html>
  <body>
    <h1>Hello World!</h1>
    It feels good to be alive!
  </body>
</html>
```
</a>


<a textrun="start-console-command">
Start the server by running:

```
go run web-server.go
```
</a>

and make sure it starts up properly and says

<a textrun="wait-for-output">

```
server online at http://localhost:8081
```
</a>


<a textrun="verify-url-content">

Go to __http://localhost:8081__ and
you see a web page saying

```
Hello World!
```
</a>

You can modify the content of the file `index.html`
to make your webserver show different things.
<a textrun="stop-console-command">
When you are done, hit `Ctrl-C` to stop the server.
</a>

In the next session about front-end development,
we are going to populate this website with content and make it look polished.
