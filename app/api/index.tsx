const BASE_URL = "https://api.themoviedb.org/3";
const DEFAULT_PARAMS = {
  language: "pt-BR",
};

export async function fetchFromApi(
  endpoint: string,
  params: Record<string, any> = {}
): Promise<any> {
  const url = new URL(`${BASE_URL}${endpoint}`);

  Object.entries({ ...DEFAULT_PARAMS, ...params }).forEach(([key, value]) =>
    url.searchParams.append(key, value)
  );

  const response = await fetch(url.toString(), {
    headers: {
      Authorization: `Bearer ${process.env.NEXT_PUBLIC_API_TOKEN_TMDB}`,
    },
  });

  if (!response.ok) {
    throw new Error(
      `Error fetching data: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}
