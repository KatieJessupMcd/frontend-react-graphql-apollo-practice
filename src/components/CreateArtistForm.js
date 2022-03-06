import React, { useState } from 'react';

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  useQuery,
  useMutation,
  gql,
} from '@apollo/client';

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

const CREATE_ARTIST = gql`
  mutation CreateArtist(
    $firstName: String!
    $lastName: String!
    $email: String!
  ) {
    createArtist(
      input: { firstName: $firstName, lastName: $lastName, email: $email }
    ) {
      artist {
        id
        firstName
        lastName
        email
      }
      errors
    }
  }
`;

export default function CreateArtistForm(props) {
  const { loading, error, data } = useQuery(ARTISTS);
  const [createArtist, newArtist] = useMutation(CREATE_ARTIST, {
    update(cache, { data: { createArtist } }) {
      const data = cache.readQuery({ query: ARTISTS });
      cache.writeQuery({
        query: ARTISTS,
        data: { artists: [createArtist.artist, ...data.artists] },
      });
    },
  });
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');

  if (loading) return 'Submitting...';
  if (error) return `Submission error! ${error.message}`;

  const onSubmit = (input) => {
    console.log('this is the input we are passing in', input);
    createArtist({
      variables: {
        firstName: input.firstName,
        lastName: input.lastName,
        email: input.email,
      },
    });
    setFirstName('');
    setLastName('');
    setEmail('');
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    onSubmit({ firstName, lastName, email });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        First Name:
        <input
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
      </label>
      <label>
        Last Name:
        <input
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
}
