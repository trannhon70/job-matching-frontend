import { globalVariable } from "@/config/variables";

export async function getJob(slug: string) {
  const URI = `${globalVariable.API_URL}/job/getDetail/${slug}`;
  const res = await fetch(URI, {
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) return { ...data, ok: false };

  return { ...data, ok: true };
}

export async function getCompany(slug: string) {
  const URI = `${globalVariable.API_URL}/company/getDetail/${slug}`;
  const res = await fetch(URI, {
    cache: "no-store",
  });

  const data = await res.json();

  if (!res.ok) return { ...data, ok: false };

  return { ...data, ok: true };
}
