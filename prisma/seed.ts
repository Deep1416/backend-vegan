import { PrismaClient } from "@prisma/client";
import { hash } from "bcryptjs";

const prisma = new PrismaClient();

/**
 * Optional env (see .env.example):
 * - VEGANFIT_SKIP_TRAINER_LINK=true  → skip demo trainer user + linkedUserId (production if you manage trainers manually)
 * - VEGANFIT_SEED_TRAINER_EMAIL      → default trainer@veganfit.dev
 * - VEGANFIT_SEED_TRAINER_PASSWORD   → default dev password (change for real deployments)
 */

async function seedGymTrainerCatalog() {
  const existing = await prisma.gymTrainer.count();
  if (existing > 0) return;

  await prisma.gymTrainer.createMany({
    data: [
      {
        name: "Jordan Kim",
        title: "Strength & mobility",
        bio: "Competition prep and sustainable vegan strength.",
        imageUrl: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?auto=format&fit=crop&w=400&q=80",
        sortOrder: 1
      },
      {
        name: "Sam Rivera",
        title: "Hypertrophy & rehab",
        bio: "Joint-friendly progressions and weekly check-ins.",
        imageUrl: "https://images.unsplash.com/photo-1594381898411-846e7d193883?auto=format&fit=crop&w=400&q=80",
        sortOrder: 2
      },
      {
        name: "Alex Morgan",
        title: "Performance nutrition",
        bio: "Plant-first fueling for heavy training blocks.",
        imageUrl: "https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=400&q=80",
        sortOrder: 3
      }
    ]
  });
}

async function linkDemoTrainerUser() {
  if (process.env.VEGANFIT_SKIP_TRAINER_LINK === "true") {
    // eslint-disable-next-line no-console
    console.log("[seed] Skipping trainer user link (VEGANFIT_SKIP_TRAINER_LINK=true)");
    return;
  }

  const email =
    (process.env.VEGANFIT_SEED_TRAINER_EMAIL || "trainer@veganfit.dev").toLowerCase().trim();
  const plainPassword =
    process.env.VEGANFIT_SEED_TRAINER_PASSWORD || "ChangeMeTrainer!24";

  const primary = await prisma.gymTrainer.findFirst({
    orderBy: [{ sortOrder: "asc" }, { id: "asc" }]
  });
  if (!primary) {
    // eslint-disable-next-line no-console
    console.warn("[seed] No GymTrainer rows — run catalog seed first.");
    return;
  }

  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    const passwordHash = await hash(plainPassword, 10);
    user = await prisma.user.create({
      data: {
        email,
        name: "Demo Gym Trainer",
        role: "GYM_TRAINER",
        onboardingDone: true,
        passwordHash,
        goal: "MUSCLE_BUILD",
        gender: "OTHER",
        activityLevel: "MODERATE",
        heightCm: 175,
        weightKg: 75,
        age: 32
      }
    });
    // eslint-disable-next-line no-console
    console.log(`[seed] Created trainer user ${email} (role GYM_TRAINER). Password from env or default dev password.`);
  } else {
    user = await prisma.user.update({
      where: { id: user.id },
      data: { role: "GYM_TRAINER" }
    });
    // eslint-disable-next-line no-console
    console.log(`[seed] Existing user ${email} promoted to GYM_TRAINER (password unchanged).`);
  }

  await prisma.$transaction([
    prisma.gymTrainer.updateMany({
      where: { linkedUserId: user.id },
      data: { linkedUserId: null }
    }),
    prisma.gymTrainer.update({
      where: { id: primary.id },
      data: { linkedUserId: user.id }
    })
  ]);

  // eslint-disable-next-line no-console
  console.log(
    `[seed] Linked catalog trainer "${primary.name}" (id ${primary.id}) → User ${user.id}. ` +
      `DM notifications use this link. Trainer dashboard: /trainer after login.`
  );
}

async function seedAdminUser() {
  if (process.env.VEGANFIT_SKIP_ADMIN_SEED === "true") {
    // eslint-disable-next-line no-console
    console.log("[seed] Skipping admin user (VEGANFIT_SKIP_ADMIN_SEED=true)");
    return;
  }

  const email = (process.env.VEGANFIT_SEED_ADMIN_EMAIL || "admin@veganfit.dev").toLowerCase().trim();
  const plainPassword = process.env.VEGANFIT_SEED_ADMIN_PASSWORD || "ChangeMeAdmin!24";

  let user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    const passwordHash = await hash(plainPassword, 10);
    user = await prisma.user.create({
      data: {
        email,
        name: "Platform Admin",
        role: "ADMIN",
        onboardingDone: true,
        passwordHash,
        goal: "LIFESTYLE",
        gender: "OTHER",
        activityLevel: "MODERATE",
        heightCm: 170,
        weightKg: 70,
        age: 30
      }
    });
    // eslint-disable-next-line no-console
    console.log(`[seed] Created admin user ${email} (role ADMIN). Password from env or default dev password.`);
  } else if (user.role !== "ADMIN") {
    await prisma.user.update({
      where: { id: user.id },
      data: { role: "ADMIN" }
    });
    // eslint-disable-next-line no-console
    console.log(`[seed] Promoted existing user ${email} to ADMIN (password unchanged).`);
  }
}

async function main() {
  await seedGymTrainerCatalog();
  await linkDemoTrainerUser();
  await seedAdminUser();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
