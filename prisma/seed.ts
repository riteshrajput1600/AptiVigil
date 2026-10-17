import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() { const organization=await prisma.organization.upsert({where:{id:'00000000-0000-4000-8000-000000000001'},update:{},create:{id:'00000000-0000-4000-8000-000000000001',name:'Demo Organization'}}); console.log(`Seeded local organization: ${organization.name} (${organization.id})`); }
main().finally(()=>prisma.$disconnect());
