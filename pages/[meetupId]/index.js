import { MongoClient, ObjectId } from "mongodb";
import { MeetupDetails } from "../../components/meetups/MeetupDetails";
import Head from "next/head";


export default function MeetupDetailsPage(props) {
    return (
        <>
            <Head>
                <title>{props.meetupData.title}</title>
                <meta name="description" content={props.meetupData.description} />
            </Head>
            <MeetupDetails
                image={props.meetupData.image}
                title={props.meetupData.title}
                address={props.meetupData.address}
                description={props.meetupData.description}
            />
        </>
    );
}

export async function getStaticProps(context) {
    const meetupId = context.params.meetupId;
    const client = await MongoClient.connect("mongodb+srv://ahmed925elshahawy:4D4SR4t97H74V5SO@cluster0.c1fgspe.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0");
    const db = client.db();
    const meetupCollection = db.collection("meetups");
    const selectedMeetup = await meetupCollection.findOne({ _id: new ObjectId(meetupId) });
    client.close();

    return {
        props: {
            meetupData: {
                id: selectedMeetup._id.toString(),
                title: selectedMeetup.title,
                address: selectedMeetup.address,
                image: selectedMeetup.image,
                description: selectedMeetup.description
            }
        }
    }
}

// used to pre-define the paths because it should be defined before run time ("which dynamic parameter values this page should be pre-generated")
export async function getStaticPaths() {
    const client = await MongoClient.connect("mongodb+srv://ahmed925elshahawy:4D4SR4t97H74V5SO@cluster0.c1fgspe.mongodb.net/meetups?retryWrites=true&w=majority&appName=Cluster0");
    const db = client.db();
    const meetupCollection = db.collection("meetups");
    const meetups = await meetupCollection.find({}, { _id: 1 }).toArray();
    client.close();

    return {
        fallback: false, // (false) if i defined all paths and except of those give me an error page // if true then next js try to generate a page
        // paths: [
        //     {
        //         params: {
        //             meetupId: "m1"
        //         }
        //     },
        //     {
        //         params: {
        //             meetupId: "m2"
        //         }
        //     }
        // ]
        paths: meetups.map(meetup => ({
            params: {
                meetupId: meetup._id.toString()
            }
        }))
    }
}