import { withSession } from "supertokens-node/nextjs";
import SuperTokens from "supertokens-node";
import { NextResponse, NextRequest } from "next/server";
import { ensureSuperTokensInit } from '../../config/backend';
import UserRoles from "supertokens-node/recipe/userroles";

ensureSuperTokensInit();

export function GET(request: NextRequest) {
  return withSession(request, async (err, session) => {
      if (err) {
          return NextResponse.json(err, { status: 500 });
      }
      if (!session) {
          return new NextResponse("Authentication required", { status: 401 });
      }

      return NextResponse.json({
          note: "Fetch any data from your application for authenticated user after using verifySession middleware",
          userId: session.getUserId(),
          userInfo: await SuperTokens.getUser(session.getUserId()),
          roles: session.getClaimValue(UserRoles.UserRoleClaim),
          sessionHandle: session.getHandle(),
          accessTokenPayload: session.getAccessTokenPayload(),
      });
  });
}