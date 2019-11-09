import React from 'react'

export default function BlogItem(props) {
  return (
    <li>
      <span>{props.userId}</span>
      <h1>{props.title}</h1>
      <h5>{props.body}</h5>
    </li>
  )
}
