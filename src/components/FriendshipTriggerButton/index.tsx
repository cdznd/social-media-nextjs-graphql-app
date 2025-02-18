'use client'

import { Button } from "@mui/material"
import { useMutation, useQuery } from "@apollo/client"
import { TRIGGER_FRIENDSHIP_MUTATION } from "@/lib/graphql/fragments/mutations/mutations"
import { useSession } from "next-auth/react"
import { GET_FRIENDS, GET_FRIENDSHIP } from "@/lib/graphql/fragments/queries/friendship"

export default function FriendshipTriggerButton(
    { toUserId }: { toUserId: string }
) {

    const session = useSession()
    const loggedUser = session?.data?.user

    // Create a mutation that based on the loggedUser id, checks if there's a friendship with the currentUser.
    // If there is one, it should return the friendship object, otherwise it should return null.

    // Get all friends from the logged user
    const { data: friendshipData, loading: queryLoading } = useQuery(GET_FRIENDSHIP, {
        variables: {
            fromUserId: loggedUser?.id,
            toUserId: toUserId
        },
        skip: !loggedUser?.id || !toUserId
    })

    const currentFriendship = friendshipData?.friendship

    // Triggers friendship invite :working on
    const [triggerFriendship, { loading: mutationLoading }] = useMutation(TRIGGER_FRIENDSHIP_MUTATION, {
        refetchQueries: [
            {
                query: GET_FRIENDSHIP,
                variables: { fromUserId: loggedUser?.id, toUserId }
            }
        ]
    })

    const friendshipStatus = currentFriendship?.status || null

    const sendFriendRequest = () => {
        triggerFriendship({
            variables: {
                fromUserId: loggedUser?.id,
                toUserId
            }
        })
    }

    return (
        friendshipStatus !== 'ACCEPTED' ? (
            <Button
                variant={friendshipStatus === 'PENDING' ? 'outlined' : 'contained'}
                color={friendshipStatus === 'PENDING' ? undefined : 'primary'}
                onClick={() => sendFriendRequest()}
                disabled={queryLoading || mutationLoading}
            >
                {friendshipStatus === 'PENDING' ? 'Pending' : 'Add Friend'}
            </Button>
        ) : (
            <h1>Friends</h1>
        )
    );
}