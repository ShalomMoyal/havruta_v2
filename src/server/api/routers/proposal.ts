import { z } from "zod";

import {
    createTRPCRouter,
    protectedProcedure,
    publicProcedure,
  } from "~/server/api/trpc";

export const prposalRouter = createTRPCRouter({
    hello: publicProcedure
    .input(z.object({ text: z.string() }))
    .query(({ input }) => {
      return {
        greeting: `Hello ${input.text}`,
      };
    }),
    
    create: protectedProcedure
    .input(z.object({ interestedStudies: z.string().min(1), formLearning: z.string().min(1), studyTime: z.string().min(1), contact: z.string().min(1) }))
    .mutation(async ({ ctx, input }) => {
      return ctx.db.proposal.create({
        data: {
            interestedStudies: input.interestedStudies,
            formLearning: input.formLearning,
            studyTime: input.studyTime,
            contact: input.contact,
            createdBy: { connect: { id: ctx.session.user.id } },
        },
      });
    }),
    getAll: publicProcedure.query(async ({ ctx }) => {
      const proposals = await ctx.db.proposal.findMany({
        where: { createdById: ctx.session?.user.id }, // assuming 'createdById' is the correct field
        orderBy: { createdAt: 'desc' },
        include: {
          createdBy: {
            select: {
              firstName: true,  // Fetch the user's name
              lestName: true, // Optionally fetch the user's email
            },
          },
        },
      });
      return proposals;
    }),
    

})