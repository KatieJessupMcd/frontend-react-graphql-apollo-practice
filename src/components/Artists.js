import React from 'react';
import { useQuery, gql } from '@apollo/client';

const ARTISTS = gql`
  query GetArtists {
    artists {
      id
      firstName
      lastName
      email
      createdAt
    }
  }
`;

export default function Artists() {
  const { loading, error, data } = useQuery(ARTISTS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.artists.map(({ id, firstName, lastName, email }) => (
    <div key={id}>
      <p>{firstName}</p>
      <p>{lastName}</p>
      <p>{email}</p>
    </div>
  ));
}
