import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid2';

const cardData = [
    {
        img: 'https://picsum.photos/800/450?random=1',
        tag: 'Engineering',
        title: 'Revolutionizing software development with cutting-edge tools',
        description:
            'Our latest engineering tools are designed to streamline workflows and boost productivity. Discover how these innovations are transforming the software development landscape.',
        authors: [
            { name: 'Remy Sharp', avatar: '/static/images/avatar/1.jpg' },
            { name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' },
        ],
    },
    {
        img: 'https://picsum.photos/800/450?random=2',
        tag: 'Product',
        title: 'Innovative product features that drive success',
        description:
            'Explore the key features of our latest product release that are helping businesses achieve their goals. From user-friendly interfaces to robust functionality, learn why our product stands out.',
        authors: [{ name: 'Erica Johns', avatar: '/static/images/avatar/6.jpg' }],
    },
    {
        img: 'https://picsum.photos/800/450?random=3',
        tag: 'Design',
        title: 'Designing for the future: trends and insights',
        description:
            'Stay ahead of the curve with the latest design trends and insights. Our design team shares their expertise on creating intuitive and visually stunning user experiences.',
        authors: [{ name: 'Kate Morrison', avatar: '/static/images/avatar/7.jpg' }],
    },
    {
        img: 'https://picsum.photos/800/450?random=4',
        tag: 'Company',
        title: "Our company's journey: milestones and achievements",
        description:
            "Take a look at our company's journey and the milestones we've achieved along the way. From humble beginnings to industry leader, discover our story of growth and success.",
        authors: [{ name: 'Cindy Baker', avatar: '/static/images/avatar/3.jpg' }],
    },
    {
        img: 'https://picsum.photos/800/450?random=45',
        tag: 'Engineering',
        title: 'Pioneering sustainable engineering solutions',
        description:
            "Learn about our commitment to sustainability and the innovative engineering solutions we're implementing to create a greener future. Discover the impact of our eco-friendly initiatives.",
        authors: [
            { name: 'Agnes Walker', avatar: '/static/images/avatar/4.jpg' },
            { name: 'Trevor Henderson', avatar: '/static/images/avatar/5.jpg' },
        ],
    },
    {
        img: 'https://picsum.photos/800/450?random=6',
        tag: 'Product',
        title: 'Maximizing efficiency with our latest product updates',
        description:
            'Our recent product updates are designed to help you maximize efficiency and achieve more. Get a detailed overview of the new features and improvements that can elevate your workflow.',
        authors: [{ name: 'Travis Howard', avatar: '/static/images/avatar/2.jpg' }],
    },
];

import FeedPost from '../FeedPost';

export default function FeedContent({ data }: { data: any }) {

    const posts = data?.posts

    if(posts.lenght <= 0) {
        return <h1>No data to display</h1>
    }

    console.log('data inside feedcontent', posts)

    console.log(posts[0])

    return (
        <>
            <Grid container spacing={2} columns={12}>
                <Grid size={{ xs: 12, md: 8 }}>
                    { posts[0] ? <FeedPost cardData={posts[0]} /> : <></> }
                </Grid>
                {/* <Grid size={{ xs: 12, md: 4 }}>
                    <Box
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}
                    >
                        { data[1] ?? <FeedPost cardData={data[1]} variation={'no-media'} /> }
                        { data[2] ?? <FeedPost cardData={data[2]} variation={'no-media'} /> }
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    { data[3] ? <FeedPost cardData={data[3]} variation={'small'} /> : <></> }
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    { data[4] ? <FeedPost cardData={data[4]} variation={'small'} /> : <></>}
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    { data[5] ? <FeedPost cardData={data[5]} /> : <></>}
                </Grid> */}
            </Grid>
        </>
    )
}


{/* <hr />
            <Grid container spacing={2} columns={12}>
                <Grid size={{ xs: 12, md: 6 }}>
                    <FeedPost cardData={cardData[0]} />
                </Grid>
                <Grid size={{ xs: 12, md: 6 }}>
                    <FeedPost cardData={cardData[1]} />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <FeedPost cardData={cardData[2]} variation={'small'} />
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <Box
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2, height: '100%' }}
                    >
                        <FeedPost cardData={cardData[3]} variation={'no-media'} />
                        <FeedPost cardData={cardData[4]} variation={'no-media'} />
                    </Box>
                </Grid>
                <Grid size={{ xs: 12, md: 4 }}>
                    <FeedPost cardData={cardData[5]} variation={'small'} />
                </Grid>
            </Grid> */}