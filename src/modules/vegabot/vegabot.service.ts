export function generateOfflineReply(input: { goal: "FAT_LOSS" | "MUSCLE_BUILD" | "LIFESTYLE"; lastUser: string }) {
  const goalLabel = input.goal.replace("_", " ");
  const reply = [
    `Goal: ${goalLabel}`,
    "",
    `I got you. Based on what you said: "${input.lastUser.slice(0, 180)}"`,
    "",
    "Action now:",
    "1. Do a 6-8 min warm-up and start your first main exercise.",
    "2. Hit protein first in your next meal (tofu/soya/daal).",
    "3. Send me your available time today (30/45/60 min) for a precise plan."
  ].join("\n");
  return { reply, mode: "offline" as const };
}

