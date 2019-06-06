import React, { useState } from 'react'
import { connect } from 'react-redux'
import { setLocation as setNewLocation } from '../../ducks/users'
import styled from 'styled-components'

const Input = styled.input`
  padding: 10px;
  font-size: 1rem;
  color: gray;
  border-radius: 5px 0 0 5px;
  border: 1px solid #999;
`

const Button = styled.button`
  padding: 10px;
  font-size: 1rem;
  color: gray;
  border-radius: 0 5px 5px 0;
  border-left: none;
`

function LocationForm(props) {
  const [location, setLocation] = useState('Biysk')

  const handleLocationChange = e => setLocation(e.target.value)
  const handleLocationSet = () => {
    if (!location) return

    props.setNewLocation(location)
  }

  return (
    <div>
      <Input
        placeholder="Type location..."
        value={location}
        onChange={handleLocationChange}
      />
      <Button onClick={handleLocationSet}>Search</Button>
    </div>
  )
}

export default connect(
  null,
  { setNewLocation }
)(LocationForm)
