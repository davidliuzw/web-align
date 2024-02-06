import React from 'react'

const Home = () => {
  return (
    <div>
      <h1>WEB ALIGN FULL STACK</h1>
      <h2>This is a web application for sequence alignment.</h2>

      <table>
        <thead>
          <tr>
            <th>Component</th>
            <th>Technology</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Backend</td>
            <td>Django</td>
          </tr>
          <tr>
            <td>Frontend</td>
            <td>React</td>
          </tr>
          <tr>
            <td>Database</td>
            <td>SQLite, Redis</td>
          </tr>
          <tr>
            <td>Real Time Communication</td>
            <td>HTTP, WebSocket</td>
          </tr>
          <tr>
            <td>Sequence Alignment</td>
            <td>Biopython with self-designed library</td>
          </tr>
          <tr>
            <td>Containerization</td>
            <td>Docker</td>
          </tr>
          <tr>
            <td>Deployment</td>
            <td>Heroku</td>
          </tr>
        </tbody>
      </table>
      <h3>Usage</h3>
      <p>Public URL</p>
      <p>Local deployment with one command:</p>
      <pre>
        <code>
          git clone https://github.com/davidliuzw/web-align-david.git <br />
          cd /path/to/repo <br />
          docker-compose up --build
        </code>
      </pre>
      <h3>Test User Credentials</h3>
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Password</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>test1</td>
            <td>test12345</td>
          </tr>
          <tr>
            <td>test2</td>
            <td>test12345</td>
          </tr>
        </tbody>
      </table>
      <h3>Core Feature</h3>
      <ul>
        <li>
          Alignment Application to find the protein from the following list that contains submitted
          sequence.
        </li>
        <li>
          Asynchronous and parallel submission with two method, <strong>Long Polling</strong> and
          <strong>WebSocket</strong>.
        </li>
        <li>User authentication and query results storage.</li>
        <li>Cache recent query results to reduce latency.</li>
        <li>Well designed user interface.</li>
      </ul>
      <h3>Genome List</h3>
      <ul>
        <li>NC_000852</li>
        <li>NC_007346</li>
        <li>NC_008724</li>
        <li>NC_009899</li>
        <li>NC_014637</li>
        <li>NC_020104</li>
        <li>NC_023423</li>
        <li>NC_023640</li>
        <li>NC_023719</li>
        <li>NC_027867</li>
      </ul>
    </div>
  )
}

export default Home
