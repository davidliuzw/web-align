# WEB ALIGN FULL STACK

### This is a web application for sequence alignment.

| <center>Component</center>  | <center>Technology</center>          |
|-----------------------------|--------------------------------------|
| <center>Backend</center>    | <center>Django</center>              |
| <center>Frontend</center>   | <center>React</center>               |
| <center>Database</center>   | <center>SQLite, Redis</center>       |
| <center>Real Time Communication</center> | <center>Long Polling, WebSocket</center> |
| <center>Sequence Alignment</center> | <center>Biopython with self-designed library</center> |
| <center>Containerization</center> | <center>Docker</center>          |

### Usage

`git clone https://github.com/davidliuzw/web-align-david.git`

`cd /path/to/repo`

#### Local deployment with one command

`docker-compose up --build`

#### Local development with multiple commands
1.Backend

1.1 Create/Activate virtual environment

    python3 -m venv myenv

    source myenv/bin/activate

1.2 Install dependency

    cd /path/to/backend

    pip install -r requirements.txt

1.3 Migrate database

    python manage.py makemigrations

    python manage.py migrate

1.4 Install/Start Redis Server

    sudo apt-get install redis-server

    redis-server

2.Frontend

2.1 Install dependency

    cd /path/to/frontend

    npm i

2.2 Build application

    npm run build

3.Start the application under the right directory

    python manage.py runserver

    npm start

#### Test User Credentials
| Username | Password  |
|----------|-----------|
| test1    | test12345 |
| test2    | test12345 |

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

### Future work
- Use Celery to enhance asynchoronous ability.
- Improve alignment page by allowing parameters and providing more details of the result.
- Expand unit tests, error handling and logs.
- Enable more secure connection and authentication.
- Redesign the page to meet clients' need.