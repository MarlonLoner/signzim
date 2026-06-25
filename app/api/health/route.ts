import { NextResponse } from "next/server";
import { appConfig, getServerConfigStatus } from "@/lib/config";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const HEALTH_CHECK_TIMEOUT_MS = 5000;

async function checkDatabaseConnection() {
  let timeout: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeout = setTimeout(() => reject(new Error("Database health check timed out")), HEALTH_CHECK_TIMEOUT_MS);
  });

  try {
    await Promise.race([prisma.$queryRaw`SELECT 1`, timeoutPromise]);
    return "connected" as const;
  } catch {
    console.error("Health check database connection failed");
    return "error" as const;
  } finally {
    if (timeout) {
      clearTimeout(timeout);
    }
  }
}

export async function GET() {
  const configStatus = getServerConfigStatus();
  const database = await checkDatabaseConnection();

  const ok = database === "connected";

  return NextResponse.json(
    {
      ok,
      app: appConfig.appName,
      environment: appConfig.environment,
      database,
      databaseUrlConfigured: configStatus.databaseUrlConfigured,
      timestamp: new Date().toISOString()
    },
    { status: ok ? 200 : 503 }
  );
}
