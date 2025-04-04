// src/app/api/revalidate/route.js
import fetch from "node-fetch";

let isBuilding = false;
let lastBuildTime = 0;
const BUILD_COOLDOWN = 30000; // 30 seconds cooldown between builds

export async function POST(req) {
  try {
    // Controleer het geheim (optioneel maar aanbevolen voor beveiliging)
    const secret = req.headers.get("x-builder-secret");
    if (secret !== process.env.BUILDER_WEBHOOK_SECRET) {
      return new Response(JSON.stringify({ message: "Invalid secret" }), {
        status: 401,
      });
    }

    const currentTime = Date.now();

    if (isBuilding && currentTime - lastBuildTime < BUILD_COOLDOWN) {
      return new Response(
        JSON.stringify({ message: "Build cooldown in effect" }),
        { status: 429 }
      );
    }

    isBuilding = true;
    lastBuildTime = currentTime;

    // Start een nieuwe build door de Vercel deploy hook aan te roepen
    const deployHookUrl = process.env.VERCEL_DEPLOY_HOOK_URL;
    const deployRes = await fetch(deployHookUrl, { method: "POST" });

    if (!deployRes.ok) {
      throw new Error(`Failed to trigger deploy: ${deployRes.statusText}`);
    }

    isBuilding = false;
    return new Response(JSON.stringify({ revalidated: true }), { status: 200 });
  } catch (err) {
    isBuilding = false;
    return new Response(`Error revalidating: ${err.message}`, { status: 500 });
  }
}
