import Feed from "@/components/Feed";

export default async function Home() {

  // const { feedData } = await getServerSideProps()

  // const { loading, error, data } = useQuery(GET_DATA);

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error.message}</p>;

  // console.log('data here')
  // console.log(data)

  // const allPosts = data?.posts;
  
  return (
    <>
      <Feed />
    </>
  );
}
