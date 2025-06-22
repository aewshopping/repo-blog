---
title: Loading an sqlite database from remote github url for processing with sql.js
tags: [sqlite, github]
date: 2026-06-22
---
# Loading an sqlite database from remote github url for processing with sql.js

This is to demonstrate a stripped back minimal code for a webpage (client) that loads an sqlite db from github.

The main gotcha from me was that when getting the raw url directly from github it provided:

`https://github.com/aewshopping/history-books-lite/raw/refs/heads/main/data.db`

But this didn't work - the url pattern to the same file which **did** work is:

`https://raw.githubusercontent.com/aewshopping/history-books-lite/main/data.db`

Then using the code from https://sql.js.org/#/?id=using-fetch it is fairly simple to getting it up and running:

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Fetch SQLite with SQL.js</title>
    <!-- Include sql.js library -->
    <!-- You can find the latest CDN at https://cdnjs.com/libraries/sql.js -->
    <script src="https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/sql-wasm.js"></script>
</head>
<body>

    <div>
        <h1>Load SQLite Database Demo</h1>

        <p>
            Click the button below to fetch a sample SQLite database file from a public GitHub repository
            and load it using sql.js. The results of a sample query will be logged to the console.
        </p>

        <button id="loadDbButton">
            Fetch & Load SQLite Database
        </button>

        <p id="message"></p>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const loadDbButton = document.getElementById('loadDbButton');
            const messageElement = document.getElementById('message');

            const SQLITE_RAW_URL = 'https://raw.githubusercontent.com/aewshopping/history-books-lite/main/data.db';

            loadDbButton.addEventListener('click', async () => {
                messageElement.textContent = 'Starting process... Please wait.';
                    
                // Minimal loading pattern ala https://sql.js.org/#/?id=using-fetch

                const sqlPromise = initSqlJs({
                locateFile: file => `https://cdnjs.cloudflare.com/ajax/libs/sql.js/1.10.3/${file}`
                });
                const dataPromise = fetch(SQLITE_RAW_URL).then(res => res.arrayBuffer());
                const [SQL, buf] = await Promise.all([sqlPromise, dataPromise])
                const db = new SQL.Database(new Uint8Array(buf));

                // Run a test query

                const query = "SELECT * from books LIMIT 1;";
                const res = db.exec(query);

                // Log the results to the console and display on page

                const myOutput = JSON.stringify(res);
                const myOutputMsg = `SUCCESS: Database loaded and query successful! \n\n Results for "${query}":\n\n ${myOutput}` 
                console.log(myOutputMsg);
                messageElement.textContent = myOutputMsg;

                // Close the database when done (important for memory management)

                db.close();
                console.log("Database closed.");

            });
        });
    </script>
</body>
</html>

```
