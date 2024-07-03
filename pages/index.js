import { MongoClient } from 'mongodb';
import MeetupList from './../components/meetups/MeetupList';
import Head from 'next/head';

// const Dummy_meetups = [
//     {
//         id: "m1",
//         title: "first meetup",
//         image: "https://www.tourmyindia.com/blog//wp-content/uploads/2020/11/kashmir.jpg",
//         address: "Kashmir",
//         description: "place to make a meetup"
//     },
//     {
//         id: "m2",
//         title: "second meetup",
//         image: "https://www.tourmyindia.com/blog//wp-content/uploads/2020/11/Taj-Mahal-Agra-feature.jpg",
//         address: "Ladakh",
//         description: "place to make a meetup"
//     }
// ]

export default function HomePage(props) {
    return (
        <>
            <Head>
                <title>Meetups</title>
                <meta name="description" content="Browse a huge list of highly active meetups" />
            </Head>
            <MeetupList meetups={props.meetups} />
        </>
    );
}

// it can be cashed and reused instead of regenerated all times
export async function getStaticProps() {
    // fetch data from an api
    const client = await MongoClient.connect("mongodb+srv://ahmed925elshahawy:4D4SR4t97H74V5SO@cluster0.c1fgspe.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0");
    const db = client.db();
    const meetupCollection = db.collection("meetups");
    const meetups = await meetupCollection.find().toArray();
    client.close();

    return {
        props: {
            meetups: meetups.map(meetup => ({
                title: meetup.title,
                address: meetup.address,
                image: meetup.image,
                id: meetup._id.toString(),
            }))
        },
        revalidate: 1  // make a revalidate for data changes every 1 second
    };
}

// // use this option when i have data changes multiple times every second
// // cons => it generates on every incoming request
// export async function getServerSideProps(context) {
//     const req = context.req;
//     const res = context.res; // deals with a request or response or authentication

//     // fetch data from an api

//     return {
//         props: {
//             meetups: Dummy_meetups
//         },
//     };
// }

// here I also don't need to work

// with the incoming request.

// And therefore I will comment getServerSideprops out again,

// and comment getStaticProps in.

// Because with that, we can take advantage of the caching

// and we're not regenerating the page multiple times,