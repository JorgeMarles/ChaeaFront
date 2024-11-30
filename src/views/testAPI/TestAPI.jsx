import React, { useState } from 'react'
import { callTest } from '../../util/services/apiService'

const TestAPI = () => {
  const [method, setMethod] = useState('GET')
  const [endpoint, setEndpoint] = useState('')
  const [data, setData] = useState('')

  const handleMethodChange = (e) => {
    setMethod(e.target.value)
  }

  const handleEndpointChange = (e) => {
    setEndpoint(e.target.value)
  }

  const handleDataChange = (e) => {
    setData(e.target.value)
  }

  const handleSubmit = async () => {
    const jsonData = data ? JSON.parse(data) : null
    // Aquí puedes manejar la lógica para enviar la petición.

    const response = await callTest(endpoint, jsonData, method)

    console.log(response)
    console.log(response.data)

    console.log('Método:', method)
    console.log('Endpoint:', endpoint)
    console.log('Datos:', jsonData)
  }

  return (
    <div>
      <h1>API Requester</h1>
      <div>
        <label htmlFor="method">Método: </label>
        <select id="method" value={method} onChange={handleMethodChange}>
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="DELETE">DELETE</option>
        </select>
      </div>
      <div>
        <label htmlFor="endpoint">Endpoint: </label>
        <textarea
          type="text"
          id="endpoint"
          value={endpoint}
          onChange={handleEndpointChange}
          style={{
            resize: 'both',
          }}
        />
      </div>
      <div>
        <label htmlFor="data">Datos (JSON): </label>
        <textarea
          id="data"
          value={data}
          onChange={handleDataChange}
          style={{
            resize: 'both',
          }}
        />
      </div>
      <button onClick={handleSubmit}>Enviar Petición</button>
    </div>
  )
}

export default TestAPI
