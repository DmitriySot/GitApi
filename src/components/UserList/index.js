import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchUsers } from '../../ducks/users'
import Loader from '../Loader'
import UserItem from '../UserItem'
import styled from 'styled-components'

const List = styled.ul`
  list-style: none;
  padding-left: 0;
`

const Error = styled.h2`
  opacity: 0.7;
  color: tomato;
  padding-top: 20px;
`

const NotFound = styled.h2`
  opacity: 0.7;
  color: brown;
  padding-top: 20px;
`

function UserList({
  users,
  loading,
  error,
  location = 'russia',
  ...props
}) {
  useEffect(() => {
    props.fetchUsers(location)
  }, [location])

  if (loading) return <Loader />
  if (error)  return <Error>{error.message} </Error>
	if(!users) return null
	if(!users.length) return <NotFound> Users not found</NotFound>

  return (
    <List>
      {users.map(user => (
        <UserItem user={user} key={user.id} />
      ))}
    </List>
  )
}

export default connect(
  ({ users }) => {
    return {
      users: users.users,
      loading: users.loading,
      location: users.location,
      error: users.error
    }
  },
  { fetchUsers }
)(UserList)
