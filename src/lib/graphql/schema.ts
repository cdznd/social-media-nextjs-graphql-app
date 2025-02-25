import {
    makeSchema,
    asNexusMethod,
} from 'nexus'
import path from 'path';
import { GraphQLDateTime } from "graphql-scalars";

import * as ObjectTypes from "./schema/types";
import * as EnumTypes from "./schema/enums";
import * as QueryTypes from "./schema/queries";
import * as MutationTypes from "./schema/mutations";

const DateTime = asNexusMethod(GraphQLDateTime, "DateTime");

// TODO: Read about build in https://nexusjs.org/docs/adoption-guides/nextjs-users
export const schema = makeSchema({
    types: [
        ObjectTypes,
        EnumTypes,
        DateTime,
        QueryTypes,
        MutationTypes,
    ],
    outputs: {
        typegen: path.join(process.cwd(), '/src/lib/graphql/generated/nexus-typegen.d.ts'),
        schema: path.join(process.cwd(), '/src/lib/graphql/generated/schema.graphql'),
    },
    contextType: {
        module: path.join(process.cwd(), '/src/lib/prisma/context.ts'),
        export: 'Context',
    },
    sourceTypes: {
        modules: [
            {
                module: '@prisma/client',
                alias: 'prisma',
            },
        ],
    },
})