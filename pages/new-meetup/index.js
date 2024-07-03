import { useRouter } from 'next/router';
import NewMeetupForm from './../../components/meetups/NewMeetupForm';
import Head from 'next/head';

export default function NewMeetup() {
    const router = useRouter();
    const handleAddMeetup = async (meetupData) => {
        const res = await fetch("/api/new-meetup", {
            method: "POST",
            body: JSON.stringify(meetupData),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        const data = await res.json();
        console.log(data);
        router.push("/");
    }

    return (
        <>
            <Head>
                <title>New Meetup</title>
                <meta name="description" content="Add a new meetup" />
            </Head>
            <NewMeetupForm onAddMeetup={handleAddMeetup} />
        </>
    );
}