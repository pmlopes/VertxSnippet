# VertxSnippet

A collection of snippets for Vert.x, currently `Java` and `JavaScript` snippets are supported.

## List of snippets

| Snippet        | Description            | Java  | JavaScript |
| -------------- |:-----------------------|:-----:|:----------:|
| maven-pom      | basic pom.xml          | ✔     | ✔         |
| verticle       | empty verticle         | ✔     |           |
| router-get     | HTTP GET handler       | ✔     | ✔         |
| router-head    | HTTP GET handler       | ✔     | ✔         |
| router-options | HTTP GET handler       | ✔     | ✔         |
| router-put     | HTTP GET handler       | ✔     | ✔         |
| router-post    | HTTP GET handler       | ✔     | ✔         |
| router-delete  | HTTP GET handler       | ✔     | ✔         |
| router-trace   | HTTP GET handler       | ✔     | ✔         |
| router-connect | HTTP GET handler       | ✔     | ✔         |
| router-patch   | HTTP GET handler       | ✔     | ✔         |
| router-route   | ALL HTTP verbs handler | ✔     | ✔         |
| httpServer     | bootstrap HTTP server  | ✔     | ✔         |
| httpsServer    | bootstrap HTTPS server | ✔     | ✔         |
| http2Server    | bootstrap HTTP2 server | ✔     | ✔         |

## Create a Project

This is a new feature, hover your mouse over the file explorer and right click. You will be presented with a new context menu item: `New Vert.x Project`.

You will be asked for which build tool you prefer, if you don't see the tool you like feel free to contribute it to the metadata file.

Once you select that if there are multiple templates for that tool you select it and you're done.

Internally it derives the project name from the current working folder and that's it!
