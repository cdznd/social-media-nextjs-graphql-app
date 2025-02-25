import { enumType } from "nexus"

export const PostVisibilityType = enumType({
    name: "PostVisibilityType",
    members: ["PUBLIC", "PRIVATE"]
})