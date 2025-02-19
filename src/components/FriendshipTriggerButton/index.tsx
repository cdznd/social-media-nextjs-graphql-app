'use client'

import { Button } from "@mui/material"
import { useMutation, useQuery } from "@apollo/client"
import { CREATE_FRIENDSHIP_REQUEST_MUTATION } from "@/lib/graphql/fragments/mutations/friendship"
import { useSession } from "next-auth/react"
import { GET_FRIENDSHIP } from "@/lib/graphql/fragments/queries/friendship"

export default function FriendshipTriggerButton(
    { toUserId }: { toUserId: string }
) {

    const session = useSession()
    const loggedUser = session?.data?.user

    // Try to find a friendship between the logged user and the other user
    const { data: friendshipData, loading: queryLoading } = useQuery(GET_FRIENDSHIP, {
        variables: {
            fromUserId: loggedUser?.id,
            toUserId: toUserId
        },
        skip: !loggedUser?.id || !toUserId
    })

    const currentFriendship = friendshipData?.friendship
    const friendshipStatus = currentFriendship?.status || null

    const [triggerFriendship, { loading: mutationLoading }] = useMutation(CREATE_FRIENDSHIP_REQUEST_MUTATION, {
        refetchQueries: [
            {
                query: GET_FRIENDSHIP,
                variables: { fromUserId: loggedUser?.id, toUserId }
            }
        ]
    })

    const sendFriendRequest = () => {
        triggerFriendship({
            variables: {
                fromUserId: loggedUser?.id,
                toUserId
            }
        })
    }

    const getButtonConfig = () => {
        switch (friendshipStatus) {
            case 'PENDING':
                return {
                    variant: 'outlined' as const,
                    color: 'primary' as const,
                    text: 'Pending Approval',
                    disabled: true
                }
            case 'ACCEPTED':
                return {
                    variant: 'contained' as const,
                    color: 'success' as const,
                    text: 'Friends',
                    disabled: true
                }
            default:
                return {
                    variant: 'contained' as const,
                    color: 'primary' as const,
                    text: 'Add Friend',
                    disabled: false
                }
        }
    }

    const buttonConfig = getButtonConfig()

    return (
        <Button
            variant={buttonConfig.variant}
            color={buttonConfig.color}
            onClick={sendFriendRequest}
            disabled={buttonConfig.disabled || queryLoading || mutationLoading}
            size="small"
        >
            {buttonConfig.text}
        </Button>
    );
}