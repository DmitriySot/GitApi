import React from 'react'
import styled from 'styled-components'
import { FaMapMarkerAlt, FaEnvelope, FaStar } from 'react-icons/fa'

const ListItem = styled.div`
  display: flex;
  margin: 10px 10px 20px 10px;
  justify-content: flex-start;
`
const Login = styled.div`
  display: flex;
  margin-left: 10px;
  margin-bottom: 5px;
`
const Avatar = styled.img`
  width: 50px;
  border-radius: 5px;
`
const Link = styled.a`
  margin-right: 10px;
`
const About = styled.div`
  text-align: left;
  margin-left: 10px;
  font: 0.8em sans-serif;
`
const Location = styled.div`
  display: flex;
  margin-left: 10px;
  margin-top: 5px;
  font: 0.7em sans-serif;
  opacity: 0.5;
`
const Icon = styled.div`
  margin: 0 5px;
`

const Stars = styled.div`
  margin-left: 15px;
`

const UserItem = ({ user, ...props }) => (
  <ListItem>
    <div>
      <Avatar src={user.avatar_url} />
    </div>

    <div>
      <Login>
        <Link href={`https://github.com/${user.login}`}>{user.login}</Link>
        <div>{user.name} </div>
      </Login>
      <About>{user.bio}</About>
      <Location>
        <FaMapMarkerAlt />
        <Icon>{user.location}</Icon>
        {user.email && (
          <>
            <FaEnvelope />
            <div> {user.email} </div>
          </>
        )}
        {user.stars && (
          <Stars>
            <FaStar /> {user.stars}
          </Stars>
        )}
      </Location>
    </div>
  </ListItem>
)

export default UserItem
