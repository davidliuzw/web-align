# WEB ALIGN FULL STACK

### This is a web application for sequence alignment.

| <center>Component</center>  | <center>Technology</center>          |
|-----------------------------|--------------------------------------|
| <center>Backend</center>    | <center>Django</center>              |
| <center>Frontend</center>   | <center>React</center>               |
| <center>Database</center>   | <center>SQLite, Redis</center>       |
| <center>Real Time Communication</center> | <center>HTTP, WebSocket</center> |
| <center>Sequence Alignment</center> | <center>Biopython with self-designed library</center> |
| <center>Containerization</center> | <center>Docker</center>          |
| <center>Deployment</center> | <center>Heroku</center>              |


### Usage
#### Public URL
#### Local deployment with one command

`git clone https://github.com/davidliuzw/web-align-david.git`

`cd /path/to/repo`

`docker-compose up --build`

***

### Core Feature

- Alignment Application to find the protein from the following list that contains submitted sequence.
- Asynchronous and parallel submission with two method, **Long Polling** and **WebSocket**.
- User authentication and query results storage.
- Cache recent query results to reduce latency.
- Well designed user interface.

#### Genome List

- NC_000852
- NC_007346
- NC_008724
- NC_009899
- NC_014637
- NC_020104
- NC_023423
- NC_023640
- NC_023719
- NC_027867

***