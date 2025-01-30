"use client"

import MainContent from "@/components/blog/components/MainContent";
import Latest from "@/components/blog/components/Latest";

import { useQuery, gql } from '@apollo/client';

const GET_DATA = gql`
  query Posts {
    posts {
      id
      likes {
        user {
          id
          name
          image
        }
      }
    }
  }
`;

export default function Home() {

  const { loading, error, data } = useQuery(GET_DATA);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log('data here', data)

  return (
    <>
      <MainContent />
      {/* <Latest /> */}
    </>
  );
}
